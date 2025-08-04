'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Timer, Clock, Zap } from 'lucide-react'
import { useTimer } from './TimerContext'

interface TimerInterfaceProps {
  recommendedMinutes?: number
  dishName?: string
}

export default function TimerInterface({ recommendedMinutes, dishName }: TimerInterfaceProps) {
  const {
    getTimerState,
    startTimer,
    pauseTimer,
    resetTimer,
    clearAllTimers,
    setPresetTime,
    setRecommendedTime,
    updateInputValue,
    formatTime,
    isScreenWake,
    showFinishAnimation,
    setShowFinishAnimation,
    getCurrentRunningDish
  } = useTimer()

  const timerState = getTimerState(dishName || '')
  const currentRunningDish = getCurrentRunningDish()

  // Debug logging
  console.log('TimerInterface Debug:', {
    dishName,
    timerState,
    currentRunningDish,
    displayMinutes: timerState.inputMinutes || '0',
    displaySeconds: timerState.inputSeconds || '0'
  })

  // Ensure we have proper default values
  const displayMinutes = (timerState.inputMinutes && timerState.inputMinutes !== '') ? timerState.inputMinutes : '0'
  const displaySeconds = (timerState.inputSeconds && timerState.inputSeconds !== '') ? timerState.inputSeconds : '0'

  // Additional validation to prevent NaN
  const validatedMinutes = isNaN(parseInt(displayMinutes)) ? '0' : displayMinutes
  const validatedSeconds = isNaN(parseInt(displaySeconds)) ? '0' : displaySeconds

  const handleStartTimer = () => {
    const minutes = parseInt(validatedMinutes) || 0
    const seconds = parseInt(validatedSeconds) || 0
    startTimer(minutes, seconds, dishName || 'Cooking')
  }

  const handleSetRecommendedTime = () => {
    if (recommendedMinutes && dishName) {
      setRecommendedTime(recommendedMinutes, dishName)
    }
  }

  // Set recommended time when component mounts or dish changes
  React.useEffect(() => {
    if (recommendedMinutes && (!displayMinutes || displayMinutes === '0') && (!displaySeconds || displaySeconds === '0') && dishName) {
      setRecommendedTime(recommendedMinutes, dishName)
    }
  }, [recommendedMinutes, displayMinutes, displaySeconds, dishName, setRecommendedTime])

  return (
    <div className="card">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Timer className="w-8 h-8 text-cooking-600 dark:text-cooking-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">Timer</h2>
          {dishName && (
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 transition-colors duration-300">({dishName})</span>
          )}
          {isScreenWake && (
            <div className="ml-2">
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
          )}
        </div>

        {/* Show if another timer is running */}
        {currentRunningDish && currentRunningDish !== dishName && (
          <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⏰ Timer running for: <strong>{currentRunningDish}</strong>
            </p>
          </div>
        )}

        {/* Timer Presets */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setPresetTime(5, dishName || '')}
            className="px-3 py-1 bg-cooking-100 dark:bg-cooking-900/30 text-cooking-700 dark:text-cooking-300 rounded-lg hover:bg-cooking-200 dark:hover:bg-cooking-900/50 transition-colors duration-300 text-sm font-medium"
          >
            5min
          </button>
          <button
            onClick={() => setPresetTime(10, dishName || '')}
            className="px-3 py-1 bg-cooking-100 dark:bg-cooking-900/30 text-cooking-700 dark:text-cooking-300 rounded-lg hover:bg-cooking-200 dark:hover:bg-cooking-900/50 transition-colors duration-300 text-sm font-medium"
          >
            10min
          </button>
          <button
            onClick={() => setPresetTime(15, dishName || '')}
            className="px-3 py-1 bg-cooking-100 dark:bg-cooking-900/30 text-cooking-700 dark:text-cooking-300 rounded-lg hover:bg-cooking-200 dark:hover:bg-cooking-900/50 transition-colors duration-300 text-sm font-medium"
          >
            15min
          </button>
        </div>

        {/* Recommended Time Button */}
        {recommendedMinutes && (
          <div className="mb-4">
            <button
              onClick={handleSetRecommendedTime}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cooking-100 dark:bg-cooking-900/30 text-cooking-700 dark:text-cooking-300 rounded-lg hover:bg-cooking-200 dark:hover:bg-cooking-900/50 transition-colors duration-300 text-sm font-medium"
            >
              <Clock className="w-4 h-4" />
              Set Recommended Time ({recommendedMinutes} min)
            </button>
          </div>
        )}

        {/* Timer Display */}
        <div
          className={`text-8xl font-mono font-bold mb-8 ${
            timerState.isRunning ? 'text-cooking-600 dark:text-cooking-400' : 'text-gray-700 dark:text-gray-200'
          } transition-colors duration-300`}
        >
          {formatTime(timerState.timeLeft)}
        </div>

        {/* Input Fields */}
        <div className="flex gap-4 justify-center mb-6">
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Minutes</label>
            <input
              type="number"
              value={validatedMinutes}
              onChange={(e) => updateInputValue('inputMinutes', e.target.value, dishName || '')}
              className="input-field w-20 text-center"
              min="0"
              max="999"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Seconds</label>
            <input
              type="number"
              value={validatedSeconds}
              onChange={(e) => updateInputValue('inputSeconds', e.target.value, dishName || '')}
              className="input-field w-20 text-center"
              min="0"
              max="59"
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleStartTimer}
            disabled={timerState.isRunning}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5 mr-2" />
            Start
          </button>

          <button
            onClick={() => pauseTimer(dishName || '')}
            disabled={!timerState.isRunning}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </button>

          <button
            onClick={() => resetTimer(dishName || '')}
            className="btn-outline"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </button>
        </div>

        {/* Debug: Clear All Timers (temporary) */}
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              clearAllTimers()
              localStorage.removeItem('recipeTimers')
              window.location.reload()
            }}
            className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Clear All Timer Data (Debug)
          </button>
        </div>
      </div>

      {/* Finish Animation */}
      <AnimatePresence>
        {showFinishAnimation && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowFinishAnimation(false)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-2xl">
              <div className="text-6xl mb-4">
                🎉
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Timer Finished!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {currentRunningDish ? `${currentRunningDish} is ready!` : 'Your cooking timer is complete!'}
              </p>
              <button
                onClick={() => setShowFinishAnimation(false)}
                className="btn-primary"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
} 