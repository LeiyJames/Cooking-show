'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Timer, Clock, Zap } from 'lucide-react'

interface TimerInterfaceProps {
  recommendedMinutes?: number
  dishName?: string
}

export default function TimerInterface({ recommendedMinutes, dishName }: TimerInterfaceProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [inputMinutes, setInputMinutes] = useState('')
  const [inputSeconds, setInputSeconds] = useState('')
  const [showFinishAnimation, setShowFinishAnimation] = useState(false)
  const [isScreenWake, setIsScreenWake] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Generate unique key for this timer instance
  const timerKey = `timer_${dishName || 'general'}`

  // Load saved timer state from localStorage
  useEffect(() => {
    const savedTimerState = localStorage.getItem(timerKey)
    if (savedTimerState) {
      try {
        const state = JSON.parse(savedTimerState)
        setTimeLeft(state.timeLeft || 0)
        setIsRunning(state.isRunning || false)
        setInputMinutes(state.inputMinutes || '')
        setInputSeconds(state.inputSeconds || '')
      } catch (error) {
        console.error('Error loading timer state:', error)
      }
    } else {
      // Load saved timer duration from localStorage (legacy)
      const savedDuration = localStorage.getItem('lastTimerDuration')
      if (savedDuration) {
        const duration = parseInt(savedDuration)
        setTimeLeft(duration)
        setInputMinutes(Math.floor(duration / 60).toString())
        setInputSeconds((duration % 60).toString())
      }
    }
    setIsInitialized(true)
  }, [timerKey])

  // Save timer state to localStorage whenever it changes (debounced)
  const saveTimeoutRef = useRef<NodeJS.Timeout>()
  const saveTimerState = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      const timerState = {
        timeLeft,
        isRunning,
        inputMinutes,
        inputSeconds,
        timestamp: Date.now()
      }
      localStorage.setItem(timerKey, JSON.stringify(timerState))
    }, 500) // Debounce saves by 500ms
  }, [timeLeft, isRunning, inputMinutes, inputSeconds, timerKey])

  useEffect(() => {
    if (isInitialized) {
      saveTimerState()
    }
  }, [saveTimerState, isInitialized])

  // Set recommended time when component mounts or dish changes
  useEffect(() => {
    if (recommendedMinutes && !inputMinutes && !inputSeconds && isInitialized) {
      setInputMinutes(recommendedMinutes.toString())
      setInputSeconds('0')
    }
  }, [recommendedMinutes, inputMinutes, inputSeconds, isInitialized])

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false)
            setShowFinishAnimation(true)
            // Haptic feedback
            if ('vibrate' in navigator) {
              navigator.vibrate([200, 100, 200])
            }
            // Play sound or show notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Timer Finished!', {
                body: `${dishName || 'Cooking'} timer is complete!`,
                icon: '/favicon.ico'
              })
            }
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, dishName])

  // Screen wake lock
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen')
          setIsScreenWake(true)
        }
      } catch (err) {
        console.log('Wake Lock not supported')
      }
    }

    const releaseWakeLock = async () => {
      if (wakeLock) {
        await wakeLock.release()
        setIsScreenWake(false)
      }
    }

    if (isRunning) {
      requestWakeLock()
    } else {
      releaseWakeLock()
    }

    return () => {
      releaseWakeLock()
    }
  }, [isRunning])

  const startTimer = useCallback(() => {
    const minutes = parseInt(inputMinutes) || 0
    const seconds = parseInt(inputSeconds) || 0
    const totalSeconds = minutes * 60 + seconds

    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds)
      setIsRunning(true)
      localStorage.setItem('lastTimerDuration', totalSeconds.toString())
    }
  }, [inputMinutes, inputSeconds])

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(0)
    setInputMinutes('')
    setInputSeconds('')
    localStorage.removeItem(timerKey)
    localStorage.removeItem('lastTimerDuration')
  }

  const setPresetTime = (minutes: number) => {
    setInputMinutes(minutes.toString())
    setInputSeconds('0')
  }

  const setRecommendedTime = () => {
    if (recommendedMinutes) {
      setInputMinutes(recommendedMinutes.toString())
      setInputSeconds('0')
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
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

        {/* Timer Presets */}
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setPresetTime(5)}
            className="px-3 py-1 bg-cooking-100 dark:bg-cooking-900/30 text-cooking-700 dark:text-cooking-300 rounded-lg hover:bg-cooking-200 dark:hover:bg-cooking-900/50 transition-colors duration-300 text-sm font-medium"
          >
            5min
          </button>
          <button
            onClick={() => setPresetTime(10)}
            className="px-3 py-1 bg-cooking-100 dark:bg-cooking-900/30 text-cooking-700 dark:text-cooking-300 rounded-lg hover:bg-cooking-200 dark:hover:bg-cooking-900/50 transition-colors duration-300 text-sm font-medium"
          >
            10min
          </button>
          <button
            onClick={() => setPresetTime(15)}
            className="px-3 py-1 bg-cooking-100 dark:bg-cooking-900/30 text-cooking-700 dark:text-cooking-300 rounded-lg hover:bg-cooking-200 dark:hover:bg-cooking-900/50 transition-colors duration-300 text-sm font-medium"
          >
            15min
          </button>
        </div>

        {/* Recommended Time Button */}
        {recommendedMinutes && (
          <div className="mb-4">
            <button
              onClick={setRecommendedTime}
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
            isRunning ? 'text-cooking-600 dark:text-cooking-400' : 'text-gray-700 dark:text-gray-200'
          } transition-colors duration-300`}
        >
          {formatTime(timeLeft)}
        </div>

        {/* Input Fields */}
        <div className="flex gap-4 justify-center mb-6">
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Minutes</label>
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              className="input-field w-20 text-center"
              min="0"
              max="999"
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300">Seconds</label>
            <input
              type="number"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(e.target.value)}
              className="input-field w-20 text-center"
              min="0"
              max="59"
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5 mr-2" />
            Start
          </button>

          <button
            onClick={pauseTimer}
            disabled={!isRunning}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </button>

          <button
            onClick={resetTimer}
            className="btn-outline"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
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
                {dishName ? `${dishName} is ready!` : 'Your cooking timer is complete!'}
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