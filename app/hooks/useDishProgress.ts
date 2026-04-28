'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface DishProgressState {
  completedSteps: number[]
  currentStep: number
  timestamp: number
}

export function useDishProgress(dishName: string, totalSteps: number) {
  // ⚡ Bolt Performance: Store completedSteps directly as a Set for O(1) membership checks without repeated conversion
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
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
        setCompletedSteps(new Set(state.completedSteps || []))
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
        completedSteps: Array.from(completedSteps),
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
      if (prev.has(stepId)) return prev
      const next = new Set(prev)
      next.add(stepId)
      return next
    })
    setCurrentStep(prev => Math.min(prev + 1, totalSteps))
  }

  const handleStepSelect = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const handleSwipeLeft = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSwipeRight = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const resetProgress = () => {
    setCompletedSteps(new Set())
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
