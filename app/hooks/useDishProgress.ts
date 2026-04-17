'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface DishProgressState {
  completedSteps: number[]
  currentStep: number
  timestamp: number
}

export function useDishProgress(dishName: string, totalSteps: number) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isInitialized, setIsInitialized] = useState(false)

  // Generate unique key for this progress instance
  const progressKey = `progress_${dishName}`

  // Load saved progress state from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(progressKey)
    if (savedProgress) {
      try {
        const state = JSON.parse(savedProgress) as DishProgressState
        setCompletedSteps(state.completedSteps || [])
        setCurrentStep(state.currentStep || 1)
      } catch (error) {
        console.error('Error loading progress state:', error)
      }
    }
    setIsInitialized(true)
  }, [progressKey])

  // Save progress state to localStorage whenever it changes (debounced)
  const saveTimeoutRef = useRef<NodeJS.Timeout>()
  const saveProgressState = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      const progressState: DishProgressState = {
        completedSteps,
        currentStep,
        timestamp: Date.now()
      }
      localStorage.setItem(progressKey, JSON.stringify(progressState))
    }, 500) // Debounce saves by 500ms
  }, [completedSteps, currentStep, progressKey])

  useEffect(() => {
    if (isInitialized) {
      saveProgressState()
    }
  }, [saveProgressState, isInitialized])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  const handleStepComplete = (stepId: number) => {
    setCompletedSteps(prev => {
      if (prev.includes(stepId)) return prev
      return [...prev, stepId]
    })
    setCurrentStep(prev => Math.min(prev + 1, totalSteps))
  }

  const handleStepSelect = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const handleSwipeLeft = useCallback(() => {
    setCurrentStep(prev => {
      if (prev < totalSteps) {
        return prev + 1
      }
      return prev
    })
  }, [totalSteps])


  const handleSwipeRight = useCallback(() => {
    setCurrentStep(prev => {
      if (prev > 1) {
        return prev - 1
      }
      return prev
    })
  }, [])


  const resetProgress = () => {
    setCompletedSteps([])
    setCurrentStep(1)
    localStorage.removeItem(progressKey)
  }

  return {
    completedSteps,
    currentStep,
    handleStepComplete,
    handleStepSelect,
    handleSwipeLeft,
    handleSwipeRight,
    resetProgress,
    isInitialized
  }
}
