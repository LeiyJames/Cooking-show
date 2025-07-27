'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Circle, Clock, ChefHat } from 'lucide-react'

interface CookingStep {
  id: number
  description: string
  estimatedTime: number
  isCompleted: boolean
}

interface CookingProgressProps {
  steps: CookingStep[]
  currentStep: number
  onStepComplete: (stepId: number) => void
  onStepSelect: (stepId: number) => void
  dishName?: string
}

export default function CookingProgress({ 
  steps, 
  currentStep, 
  onStepComplete, 
  onStepSelect,
  dishName = 'recipe'
}: CookingProgressProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [localCurrentStep, setLocalCurrentStep] = useState(currentStep)
  const [isInitialized, setIsInitialized] = useState(false)

  // Generate unique key for this progress instance
  const progressKey = `progress_${dishName}`

  // Load saved progress state from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(progressKey)
    if (savedProgress) {
      try {
        const state = JSON.parse(savedProgress)
        setCompletedSteps(state.completedSteps || [])
        setLocalCurrentStep(state.currentStep || 1)
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
      const progressState = {
        completedSteps,
        currentStep: localCurrentStep,
        timestamp: Date.now()
      }
      localStorage.setItem(progressKey, JSON.stringify(progressState))
    }, 500) // Debounce saves by 500ms
  }, [completedSteps, localCurrentStep, progressKey])

  useEffect(() => {
    if (isInitialized) {
      saveProgressState()
    }
  }, [saveProgressState, isInitialized])

  // Update local state when props change
  useEffect(() => {
    if (isInitialized) {
      setLocalCurrentStep(currentStep)
    }
  }, [currentStep, isInitialized])

  const completedStepsCount = completedSteps.length
  const progressPercentage = (completedStepsCount / steps.length) * 100

  const getStepIcon = (step: CookingStep) => {
    if (completedSteps.includes(step.id)) {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    }
    if (step.id === localCurrentStep) {
      return <ChefHat className="w-5 h-5 text-cooking-500 animate-pulse" />
    }
    return <Circle className="w-5 h-5 text-gray-400" />
  }

  const getStepStatus = (step: CookingStep) => {
    if (completedSteps.includes(step.id)) return 'completed'
    if (step.id === localCurrentStep) return 'current'
    return 'pending'
  }

  const handleStepComplete = (stepId: number) => {
    const newCompletedSteps = [...completedSteps, stepId]
    setCompletedSteps(newCompletedSteps)
    setLocalCurrentStep(Math.min(localCurrentStep + 1, steps.length))
    onStepComplete(stepId)
  }

  const handleStepSelect = (stepId: number) => {
    setLocalCurrentStep(stepId)
    onStepSelect(stepId)
  }

  const resetProgress = () => {
    setCompletedSteps([])
    setLocalCurrentStep(1)
    localStorage.removeItem(progressKey)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ChefHat className="w-6 h-6 text-cooking-600 dark:text-cooking-400" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
            Cooking Progress
          </h3>
        </div>
        <button
          onClick={resetProgress}
          className="text-sm text-cooking-600 dark:text-cooking-400 hover:text-cooking-700 dark:hover:text-cooking-300 transition-colors duration-300"
        >
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Step {localCurrentStep} of {steps.length}
          </span>
          <span className="text-sm font-medium text-cooking-600 dark:text-cooking-400">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-cooking-500 to-cooking-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const status = getStepStatus(step)
          const isExpanded = expandedStep === step.id
          
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-4 transition-all duration-300 ${
                status === 'completed' 
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                  : status === 'current'
                  ? 'border-cooking-200 bg-cooking-50 dark:border-cooking-800 dark:bg-cooking-900/20'
                  : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
              }`}
            >
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
              >
                <div className="flex-shrink-0">
                  {getStepIcon(step)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium transition-colors duration-300 ${
                      status === 'completed' 
                        ? 'text-green-700 dark:text-green-300 line-through' 
                        : status === 'current'
                        ? 'text-cooking-700 dark:text-cooking-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      Step {step.id}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {step.estimatedTime} min
                      </span>
                    </div>
                  </div>
                  
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    status === 'completed' 
                      ? 'text-green-600 dark:text-green-400' 
                      : status === 'current'
                      ? 'text-cooking-600 dark:text-cooking-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex gap-2">
                      {!completedSteps.includes(step.id) && (
                        <motion.button
                          onClick={() => handleStepComplete(step.id)}
                          className="px-3 py-1 bg-cooking-500 hover:bg-cooking-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Mark Complete
                        </motion.button>
                      )}
                      
                      {completedSteps.includes(step.id) && (
                        <motion.button
                          onClick={() => handleStepSelect(step.id)}
                          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Go to Step
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-cooking-50 to-warm-50 dark:from-cooking-900/20 dark:to-warm-900/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {completedStepsCount === steps.length ? '🎉 All steps completed!' : 'Keep going!'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {steps.length - completedStepsCount} step{steps.length - completedStepsCount !== 1 ? 's' : ''} remaining
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-cooking-600 dark:text-cooking-400">
              {completedStepsCount}/{steps.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              steps done
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 