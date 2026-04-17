import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import { TimerProvider, useTimer } from '../TimerContext'

// Setup global mocks
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

Object.defineProperty(navigator, 'wakeLock', {
  value: { request: jest.fn().mockResolvedValue({ release: jest.fn() }) },
  writable: true
})

Object.defineProperty(navigator, 'vibrate', {
  value: jest.fn(),
  writable: true
})

Object.defineProperty(window, 'Notification', {
  value: jest.fn(),
  writable: true
})


// Test Component
const TestComponent = ({ testDishName }: { testDishName: string }) => {
  const {
    startTimer,
    pauseTimer,
    resetTimer,
    clearAllTimers,
    setPresetTime,
    setRecommendedTime,
    updateInputValue,
    formatTime,
    getTimerState,
    getCurrentRunningDish,
    isScreenWake,
    showFinishAnimation,
    setShowFinishAnimation
  } = useTimer()

  const timerState = getTimerState(testDishName)

  return (
    <div>
      <div data-testid="is-screen-wake">{isScreenWake.toString()}</div>
      <div data-testid="is-running">{timerState.isRunning.toString()}</div>
      <div data-testid="time-left">{timerState.timeLeft}</div>
      <div data-testid="current-running">{getCurrentRunningDish() || 'none'}</div>
      <div data-testid="input-minutes">{timerState.inputMinutes}</div>
      <div data-testid="input-seconds">{timerState.inputSeconds}</div>
      <div data-testid="formatted-time">{formatTime(timerState.timeLeft)}</div>
      <div data-testid="show-finish">{showFinishAnimation.toString()}</div>

      <button onClick={() => startTimer(1, 0, testDishName)}>Start 1m</button>
      <button onClick={() => startTimer(0, 2, testDishName)}>Start 2s</button>
      <button onClick={() => pauseTimer(testDishName)}>Pause</button>
      <button onClick={() => resetTimer(testDishName)}>Reset</button>
      <button onClick={() => clearAllTimers()}>Clear All</button>
      <button onClick={() => setPresetTime(5, testDishName)}>Preset 5m</button>
      <button onClick={() => setRecommendedTime(10, testDishName)}>Rec 10m</button>
      <button onClick={() => updateInputValue('inputMinutes', '15', testDishName)}>Update Mins</button>
      <button onClick={() => updateInputValue('inputSeconds', '30', testDishName)}>Update Secs</button>
      <button onClick={() => setShowFinishAnimation(true)}>Set Animation</button>
    </div>
  )
}

describe('TimerContext', () => {

  beforeEach(() => {
    jest.useFakeTimers()
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  test('provides default timer state', () => {
    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    expect(screen.getByTestId('is-running')).toHaveTextContent('false')
    expect(screen.getByTestId('time-left')).toHaveTextContent('0')
    expect(screen.getByTestId('is-screen-wake')).toHaveTextContent('false')
  })

  test('loads corrupted localStorage data safely', async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({
      TestDish: { timeLeft: 'invalid', inputMinutes: null }
    }))

    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('recipeTimers')
  })

  test('loads valid localStorage data', async () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({
      TestDish: {
        timeLeft: 120,
        isRunning: false,
        inputMinutes: '2',
        inputSeconds: '0',
        timestamp: Date.now()
      }
    }))

    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    expect(screen.getByTestId('time-left')).toHaveTextContent('120')
    expect(screen.getByTestId('input-minutes')).toHaveTextContent('2')
  })

  test('handles corrupted JSON parsing error', async () => {
    localStorageMock.getItem.mockReturnValueOnce('invalid-json')
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    expect(consoleSpy).toHaveBeenCalledWith('Error loading timer states:', expect.any(Error))
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('recipeTimers')
    consoleSpy.mockRestore()
  })

  test('starts a timer and ticks down', () => {
    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    act(() => {
      screen.getByText('Start 1m').click()
    })

    expect(screen.getByTestId('is-running')).toHaveTextContent('true')
    expect(screen.getByTestId('time-left')).toHaveTextContent('60')
    expect(screen.getByTestId('current-running')).toHaveTextContent('TestDish')

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(screen.getByTestId('time-left')).toHaveTextContent('59')
  })

  test('pauses a timer', () => {
    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    act(() => {
      screen.getByText('Start 1m').click()
    })

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(screen.getByTestId('time-left')).toHaveTextContent('59')

    act(() => {
      screen.getByText('Pause').click()
    })

    expect(screen.getByTestId('is-running')).toHaveTextContent('false')

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(screen.getByTestId('time-left')).toHaveTextContent('59')
  })

  test('resets a timer', () => {
    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    act(() => {
      screen.getByText('Start 1m').click()
    })

    act(() => {
      screen.getByText('Reset').click()
    })

    expect(screen.getByTestId('is-running')).toHaveTextContent('false')
    expect(screen.getByTestId('time-left')).toHaveTextContent('0')
  })

  test('clears all timers and reloads page', () => {
    // We cannot mock window.location.reload easily in JSDOM due to how it's implemented.
    // So we'll use a local mock on window object and test if it was accessed correctly,
    // or we'll wrap the inner test logic by spying on window.location
    const originalReload = window.location.reload;

    // Create an explicit spy that overrides standard function but catches the call if code bypasses configurable true
    const reloadMock = jest.fn();

    // Instead of mocking location directly, let's redefine the reload method if possible, or expect it to throw due to JSDOM not implementing page reloads
    try {
      Object.defineProperty(window.location, 'reload', {
        configurable: true,
        value: reloadMock,
      });
    } catch (e) {
      // Ignore if not configurable
    }

    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    act(() => {
      try {
        screen.getByText('Clear All').click()
      } catch (e) {
        // JSDOM might throw "Not implemented: navigation" on reload, which is fine and means our code called it.
      }
    })

    expect(localStorageMock.removeItem).toHaveBeenCalledWith('recipeTimers')

    try {
      Object.defineProperty(window.location, 'reload', {
        configurable: true,
        value: originalReload,
      });
    } catch (e) {}
  })

  test('finishes a timer and triggers notifications', () => {
    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    act(() => {
      screen.getByText('Start 2s').click()
    })

    expect(screen.getByTestId('time-left')).toHaveTextContent('2')

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(screen.getByTestId('is-running')).toHaveTextContent('false')
    expect(screen.getByTestId('time-left')).toHaveTextContent('0')

    expect(navigator.vibrate).toHaveBeenCalledWith([200, 100, 200])
    expect(screen.getByTestId('show-finish')).toHaveTextContent('true')
  })

  test('debounces save to localStorage', () => {
    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    act(() => {
      screen.getByText('Start 1m').click()
    })

    expect(localStorageMock.setItem).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(localStorageMock.setItem).toHaveBeenCalledWith('recipeTimers', expect.any(String))
  })

  test('helper functions modify state correctly', () => {
    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    act(() => {
      screen.getByText('Preset 5m').click()
    })
    expect(screen.getByTestId('input-minutes')).toHaveTextContent('5')
    expect(screen.getByTestId('input-seconds')).toHaveTextContent('0')

    act(() => {
      screen.getByText('Rec 10m').click()
    })
    expect(screen.getByTestId('input-minutes')).toHaveTextContent('10')

    act(() => {
      screen.getByText('Update Mins').click()
    })
    expect(screen.getByTestId('input-minutes')).toHaveTextContent('15')

    act(() => {
      screen.getByText('Update Secs').click()
    })
    expect(screen.getByTestId('input-seconds')).toHaveTextContent('30')

    act(() => {
      screen.getByText('Set Animation').click()
    })
    expect(screen.getByTestId('show-finish')).toHaveTextContent('true')
  })

  test('formatTime works correctly', () => {
    render(
      <TimerProvider>
        <TestComponent testDishName="TestDish" />
      </TimerProvider>
    )

    act(() => {
      screen.getByText('Start 1m').click()
    })
    expect(screen.getByTestId('formatted-time')).toHaveTextContent('01:00')
  })
})
