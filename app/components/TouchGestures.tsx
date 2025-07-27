'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [isDragging, setIsDragging] = useState(false)
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null)
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
    
    // Only show visual feedback if movement is significant
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      setIsDragging(true)
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        setDragDirection(deltaX > 0 ? 'right' : 'left')
      } else {
        setDragDirection(deltaY > 0 ? 'down' : 'up')
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
    setIsDragging(false)
    setDragDirection(null)
    
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
      className="relative touch-pan-y"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Swipe Indicators */}
      <AnimatePresence>
        {isDragging && dragDirection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ${
              dragDirection === 'left' ? 'justify-start' : 
              dragDirection === 'right' ? 'justify-end' : 
              dragDirection === 'up' ? 'items-start' : 'items-end'
            }`}
          >
            <div className={`p-4 rounded-full bg-cooking-500/20 backdrop-blur-sm ${
              dragDirection === 'left' ? 'ml-4' : 
              dragDirection === 'right' ? 'mr-4' : 
              dragDirection === 'up' ? 'mt-4' : 'mb-4'
            }`}>
              {dragDirection === 'left' && <ChevronLeft className="w-6 h-6 text-cooking-600" />}
              {dragDirection === 'right' && <ChevronRight className="w-6 h-6 text-cooking-600" />}
              {dragDirection === 'up' && <ChevronLeft className="w-6 h-6 text-cooking-600 rotate-90" />}
              {dragDirection === 'down' && <ChevronRight className="w-6 h-6 text-cooking-600 rotate-90" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        animate={{
          scale: isDragging ? 0.98 : 1,
          opacity: isDragging ? 0.8 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  )
} 