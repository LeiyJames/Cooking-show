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

  // Save timer states to localStorage
  const saveTimeoutRef = useRef<NodeJS.Timeout>()

  // Create a ref for timers to avoid dependency in saveTimerStates callback
  const timersRef = useRef(timers)
  useEffect(() => {
    timersRef.current = timers
  }, [timers])

  const saveTimerStates = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      const currentTimers = timersRef.current
      const timersToSave = Object.keys(currentTimers).reduce((acc, dishName) => {
        acc[dishName] = {
          ...currentTimers[dishName],
          timestamp: Date.now()
        }
        return acc
      }, {} as Record<string, TimerState>)
      localStorage.setItem('recipeTimers', JSON.stringify(timersToSave))
    }, 500)
  }, []) // No dependencies needed as we use ref

  // IO Optimization: Only save when significant changes occur
  const prevTimersForSaveRef = useRef<Record<string, TimerState>>({})

  useEffect(() => {
    if (!isInitialized) return

    const prevTimers = prevTimersForSaveRef.current
    const currentTimers = timers

    // Check if change is just a tick
    let isTick = false

    const prevKeys = Object.keys(prevTimers)
    const currKeys = Object.keys(currentTimers)

    if (prevKeys.length === currKeys.length) {
       // Potential tick if keys match
       const allMatch = currKeys.every(key => {
         const prev = prevTimers[key]
         const curr = currentTimers[key]

         if (!prev) return false // Should not happen given length check

         // If inputs changed, it's not a tick
         if (prev.inputMinutes !== curr.inputMinutes || prev.inputSeconds !== curr.inputSeconds) return false

         // If isRunning changed, it's not a tick (start/pause/finish)
         if (prev.isRunning !== curr.isRunning) return false

         if (curr.isRunning) {
           // If running, tick means timeLeft decreased by 1
           // If timeLeft went from 1 to 0, isRunning changes to false (handled above)
           // So here we expect curr.timeLeft === prev.timeLeft - 1
           return curr.timeLeft === prev.timeLeft - 1
         } else {
           // If not running, tick means no change
           return curr.timeLeft === prev.timeLeft
         }
       })

       if (allMatch) {
         isTick = true
       }
    }

    if (!isTick) {
      saveTimerStates()
    }

    prevTimersForSaveRef.current = currentTimers
  }, [timers, isInitialized, saveTimerStates])


  // Timer countdown effect optimization
  const anyTimerRunning = Object.values(timers).some(timer => timer.isRunning && timer.timeLeft > 0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (anyTimerRunning) {
      interval = setInterval(() => {
        setTimers(prev => {
          const updated = { ...prev }
          let hasFinished = false
          let finishedDish = ''
          let needsUpdate = false;

          Object.keys(updated).forEach(dishName => {
            const timer = updated[dishName]
            if (timer.isRunning && timer.timeLeft > 0) {
              needsUpdate = true;
              if (timer.timeLeft <= 1) {
                updated[dishName] = { ...timer, timeLeft: 0, isRunning: false }
                hasFinished = true
                finishedDish = dishName
              } else {
                updated[dishName] = { ...timer, timeLeft: timer.timeLeft - 1 }
              }
            }
          })

          if (!needsUpdate && !hasFinished) return prev;

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
  }, [anyTimerRunning]) // Only restarts if we start/stop all timers

  // Screen wake lock optimization
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

    // Use derived boolean instead of timers object
    if (anyTimerRunning) {
      requestWakeLock()
    } else {
      releaseWakeLock()
    }

    return () => {
      releaseWakeLock()
    }
  }, [anyTimerRunning])

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
    
    return state
  }, [timers])

  const startTimer = useCallback((minutes: number, seconds: number, dishName: string) => {
    const totalSeconds = minutes * 60 + seconds
    if (totalSeconds > 0) {
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
