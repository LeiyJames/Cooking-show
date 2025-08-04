'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

interface TimerState {
  timeLeft: number
  isRunning: boolean
  inputMinutes: string
  inputSeconds: string
  timestamp: number
}

interface TimerContextType {
  getTimerState: (dishName: string) => TimerState
  startTimer: (minutes: number, seconds: number, dishName: string) => void
  pauseTimer: (dishName: string) => void
  resetTimer: (dishName: string) => void
  clearAllTimers: () => void
  setPresetTime: (minutes: number, dishName: string) => void
  setRecommendedTime: (minutes: number, dishName: string) => void
  updateInputValue: (field: 'inputMinutes' | 'inputSeconds', value: string, dishName: string) => void
  formatTime: (seconds: number) => string
  isScreenWake: boolean
  showFinishAnimation: boolean
  setShowFinishAnimation: (show: boolean) => void
  getCurrentRunningDish: () => string | null
}

const TimerContext = createContext<TimerContextType | undefined>(undefined)

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timers, setTimers] = useState<Record<string, TimerState>>({})
  const [showFinishAnimation, setShowFinishAnimation] = useState(false)
  const [isScreenWake, setIsScreenWake] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load saved timer states from localStorage
  useEffect(() => {
    const savedTimers = localStorage.getItem('recipeTimers')
    if (savedTimers) {
      try {
        const timersData = JSON.parse(savedTimers)
        
        // Check if data is corrupted or has invalid values
        let hasCorruptedData = false
        Object.keys(timersData).forEach(dishName => {
          const timer = timersData[dishName]
          if (isNaN(timer.timeLeft) || 
              typeof timer.inputMinutes !== 'string' || 
              typeof timer.inputSeconds !== 'string' ||
              timer.inputMinutes === '' ||
              timer.inputSeconds === '') {
            hasCorruptedData = true
          }
        })
        
        if (hasCorruptedData) {
          console.log('Detected corrupted timer data, clearing localStorage')
          localStorage.removeItem('recipeTimers')
          setTimers({})
        } else {
          // Normalize any empty strings to "0" for input fields
          const normalizedTimers = Object.keys(timersData).reduce((acc, dishName) => {
            acc[dishName] = {
              ...timersData[dishName],
              inputMinutes: timersData[dishName].inputMinutes || '0',
              inputSeconds: timersData[dishName].inputSeconds || '0'
            }
            return acc
          }, {} as Record<string, TimerState>)
          setTimers(normalizedTimers)
        }
      } catch (error) {
        console.error('Error loading timer states:', error)
        // Clear corrupted data
        localStorage.removeItem('recipeTimers')
      }
    }
    setIsInitialized(true)
  }, [])

  // Save timer states to localStorage whenever they change (debounced)
  const saveTimeoutRef = useRef<NodeJS.Timeout>()
  const saveTimerStates = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      const timersToSave = Object.keys(timers).reduce((acc, dishName) => {
        acc[dishName] = {
          ...timers[dishName],
          timestamp: Date.now()
        }
        return acc
      }, {} as Record<string, TimerState>)
      localStorage.setItem('recipeTimers', JSON.stringify(timersToSave))
    }, 500)
  }, [timers])

  useEffect(() => {
    if (isInitialized) {
      saveTimerStates()
    }
  }, [saveTimerStates, isInitialized])

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    const runningDishes = Object.entries(timers).filter(([_, timer]) => timer.isRunning && timer.timeLeft > 0)
    
    if (runningDishes.length > 0) {
      interval = setInterval(() => {
        setTimers(prev => {
          const updated = { ...prev }
          let hasFinished = false
          let finishedDish = ''

          Object.keys(updated).forEach(dishName => {
            const timer = updated[dishName]
            if (timer.isRunning && timer.timeLeft > 0) {
              if (timer.timeLeft <= 1) {
                updated[dishName] = { ...timer, timeLeft: 0, isRunning: false }
                hasFinished = true
                finishedDish = dishName
              } else {
                updated[dishName] = { ...timer, timeLeft: timer.timeLeft - 1 }
              }
            }
          })

          if (hasFinished) {
            // Haptic feedback
            if ('vibrate' in navigator) {
              navigator.vibrate([200, 100, 200])
            }
            // Play sound or show notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Timer Finished!', {
                body: `${finishedDish} timer is complete!`,
                icon: '/favicon.ico'
              })
            }
            setShowFinishAnimation(true)
          }

          return updated
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timers])

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

    const hasRunningTimer = Object.values(timers).some(timer => timer.isRunning)
    
    if (hasRunningTimer) {
      requestWakeLock()
    } else {
      releaseWakeLock()
    }

    return () => {
      releaseWakeLock()
    }
  }, [timers])

  const getTimerState = useCallback((dishName: string): TimerState => {
    const existingState = timers[dishName]
    
    // Ensure we always have valid default values
    const state = {
      timeLeft: existingState?.timeLeft || 0,
      isRunning: existingState?.isRunning || false,
      inputMinutes: existingState?.inputMinutes || '0',
      inputSeconds: existingState?.inputSeconds || '0',
      timestamp: existingState?.timestamp || Date.now()
    }
    
    // Force validate and fix any invalid values
    if (isNaN(state.timeLeft) || state.timeLeft < 0) state.timeLeft = 0
    if (typeof state.inputMinutes !== 'string' || state.inputMinutes === '') state.inputMinutes = '0'
    if (typeof state.inputSeconds !== 'string' || state.inputSeconds === '') state.inputSeconds = '0'
    
    // Debug logging
    console.log('getTimerState Debug:', {
      dishName,
      existingState,
      finalState: state,
      allTimers: Object.keys(timers)
    })
    
    return state
  }, [timers])

  const startTimer = useCallback((minutes: number, seconds: number, dishName: string) => {
    const totalSeconds = minutes * 60 + seconds
    if (totalSeconds > 0) {
      console.log('startTimer Debug:', {
        dishName,
        minutes,
        seconds,
        totalSeconds
      })
      
      setTimers(prev => ({
        ...prev,
        [dishName]: {
          timeLeft: totalSeconds,
          isRunning: true,
          inputMinutes: minutes.toString(),
          inputSeconds: seconds.toString(),
          timestamp: Date.now()
        }
      }))
    }
  }, [])

  const pauseTimer = useCallback((dishName: string) => {
    setTimers(prev => ({
      ...prev,
      [dishName]: {
        ...prev[dishName],
        isRunning: false
      }
    }))
  }, [])

  const resetTimer = useCallback((dishName: string) => {
    setTimers(prev => {
      const updated = { ...prev }
      delete updated[dishName]
      return updated
    })
  }, [])

  const clearAllTimers = useCallback(() => {
    setTimers({})
    localStorage.removeItem('recipeTimers')
    // Force page reload to start completely fresh
    window.location.reload()
  }, [])

  const setPresetTime = useCallback((minutes: number, dishName: string) => {
    setTimers(prev => ({
      ...prev,
      [dishName]: {
        ...prev[dishName],
        inputMinutes: minutes.toString(),
        inputSeconds: '0'
      }
    }))
  }, [])

  const setRecommendedTime = useCallback((minutes: number, dishName: string) => {
    setTimers(prev => ({
      ...prev,
      [dishName]: {
        ...prev[dishName],
        inputMinutes: minutes.toString(),
        inputSeconds: '0'
      }
    }))
  }, [])

  const updateInputValue = useCallback((field: 'inputMinutes' | 'inputSeconds', value: string, dishName: string) => {
    setTimers(prev => ({
      ...prev,
      [dishName]: {
        ...prev[dishName],
        [field]: value
      }
    }))
  }, [])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const getCurrentRunningDish = useCallback(() => {
    const runningDish = Object.entries(timers).find(([_, timer]) => timer.isRunning)
    return runningDish ? runningDish[0] : null
  }, [timers])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  const value: TimerContextType = {
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
  }

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  )
}

export function useTimer() {
  const context = useContext(TimerContext)
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider')
  }
  return context
} 