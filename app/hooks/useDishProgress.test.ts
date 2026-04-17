import { renderHook, act } from '@testing-library/react'
import { useDishProgress } from './useDishProgress'

describe('useDishProgress', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('initializes with default values', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 5))

    expect(result.current.completedSteps).toEqual([])
    expect(result.current.currentStep).toBe(1)
  })

  it('handleStepComplete adds step to completedSteps and advances currentStep', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 5))

    act(() => {
      result.current.handleStepComplete(1)
    })

    expect(result.current.completedSteps).toEqual([1])
    expect(result.current.currentStep).toBe(2)
  })

  it('handleStepComplete does not add duplicate steps', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 5))

    act(() => {
      result.current.handleStepComplete(1)
      result.current.handleStepComplete(1)
    })

    expect(result.current.completedSteps).toEqual([1])
  })

  it('handleStepSelect changes currentStep', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 5))

    act(() => {
      result.current.handleStepSelect(3)
    })

    expect(result.current.currentStep).toBe(3)
  })

  it('handleSwipeLeft advances currentStep', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 5))

    act(() => {
      result.current.handleSwipeLeft()
    })

    expect(result.current.currentStep).toBe(2)
  })

  it('handleSwipeLeft does not advance past totalSteps', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 2))

    act(() => {
      result.current.handleStepSelect(2)
      result.current.handleSwipeLeft()
    })

    expect(result.current.currentStep).toBe(2)
  })

  it('handleSwipeRight decreases currentStep', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 5))

    act(() => {
      result.current.handleStepSelect(3)
      result.current.handleSwipeRight()
    })

    expect(result.current.currentStep).toBe(2)
  })

  it('handleSwipeRight does not decrease below 1', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 5))

    act(() => {
      result.current.handleSwipeRight()
    })

    expect(result.current.currentStep).toBe(1)
  })

  it('resetProgress clears completedSteps, resets currentStep, and removes from localStorage', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 5))

    act(() => {
      result.current.handleStepComplete(1)
      result.current.handleStepSelect(3)
      // trigger save
      jest.advanceTimersByTime(500)
    })

    expect(localStorage.getItem('progress_adobo')).toBeTruthy()

    act(() => {
      result.current.resetProgress()
    })

    expect(result.current.completedSteps).toEqual([])
    expect(result.current.currentStep).toBe(1)
    expect(localStorage.getItem('progress_adobo')).toBeNull()
  })

  it('loads saved state from localStorage on init', () => {
    localStorage.setItem('progress_sinigang', JSON.stringify({
      completedSteps: [1, 2],
      currentStep: 3,
      timestamp: Date.now()
    }))

    const { result } = renderHook(() => useDishProgress('sinigang', 5))

    expect(result.current.completedSteps).toEqual([1, 2])
    expect(result.current.currentStep).toBe(3)
  })

  it('saves progress to localStorage with debounce', () => {
    const { result } = renderHook(() => useDishProgress('adobo', 5))

    act(() => {
      result.current.handleStepComplete(1)
    })

    // Immediately after, it shouldn't be saved yet
    expect(localStorage.getItem('progress_adobo')).toBeNull()

    // Advance timer by 500ms
    act(() => {
      jest.advanceTimersByTime(500)
    })

    const savedState = JSON.parse(localStorage.getItem('progress_adobo') || '{}')
    expect(savedState.completedSteps).toEqual([1])
    expect(savedState.currentStep).toBe(2)
  })
})
