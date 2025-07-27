'use client'

import React, { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface TouchGesturesProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
  disabled?: boolean
}

export default function TouchGestures({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  onSwipeUp, 
  onSwipeDown, 
  threshold = 50,
  disabled = false 
}: TouchGesturesProps) {
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return
    
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    touchEndRef.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || !touchStartRef.current) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    
    // Only show indicator if movement is significant and fast
    if (Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) {
      const currentTime = Date.now()
      const deltaTime = currentTime - touchStartRef.current.time
      
      // Only show indicator for fast movements
      if (deltaTime < 200) {
        setShowSwipeIndicator(true)
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          setSwipeDirection(deltaX > 0 ? 'right' : 'left')
        } else {
          setSwipeDirection(deltaY > 0 ? 'down' : 'up')
        }
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (disabled || !touchStartRef.current) return
    
    const touch = e.changedTouches[0]
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
    
    const deltaX = touchEndRef.current.x - touchStartRef.current.x
    const deltaY = touchEndRef.current.y - touchStartRef.current.y
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time
    
    // Reset visual state
    setShowSwipeIndicator(false)
    setSwipeDirection(null)
    
    // Only trigger swipe if movement is fast enough and exceeds threshold
    if (deltaTime < 300 && (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold)) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > threshold && onSwipeRight) {
          onSwipeRight()
        } else if (deltaX < -threshold && onSwipeLeft) {
          onSwipeLeft()
        }
      } else {
        // Vertical swipe
        if (deltaY > threshold && onSwipeDown) {
          onSwipeDown()
        } else if (deltaY < -threshold && onSwipeUp) {
          onSwipeUp()
        }
      }
    }
    
    touchStartRef.current = null
    touchEndRef.current = null
  }

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
      style={{ 
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {/* Swipe Indicators - Only show for fast swipes */}
      <AnimatePresence>
        {showSwipeIndicator && swipeDirection && (
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${
              swipeDirection === 'left' ? 'justify-start' : 
              swipeDirection === 'right' ? 'justify-end' : 
              swipeDirection === 'up' ? 'items-start' : 'items-end'
            }`}
          >
            <div className={`p-4 rounded-full bg-cooking-500/20 backdrop-blur-sm ${
              swipeDirection === 'left' ? 'ml-4' : 
              swipeDirection === 'right' ? 'mr-4' : 
              swipeDirection === 'up' ? 'mt-4' : 'mb-4'
            }`}>
              {swipeDirection === 'left' && <ChevronLeft className="w-6 h-6 text-cooking-600" />}
              {swipeDirection === 'right' && <ChevronRight className="w-6 h-6 text-cooking-600" />}
              {swipeDirection === 'up' && <ChevronLeft className="w-6 h-6 text-cooking-600 rotate-90" />}
              {swipeDirection === 'down' && <ChevronRight className="w-6 h-6 text-cooking-600 rotate-90" />}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Content - Completely static, no animations */}
      <div>
        {children}
      </div>
    </div>
  )
} 