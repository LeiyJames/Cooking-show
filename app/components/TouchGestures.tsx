'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
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

  const handleDragStart = () => {
    if (disabled) return
    setIsDragging(true)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (disabled) return
    
    setIsDragging(false)
    setDragDirection(null)

    const { offset } = info
    const { x, y } = offset

    // Determine swipe direction
    if (Math.abs(x) > Math.abs(y)) {
      // Horizontal swipe
      if (Math.abs(x) > threshold) {
        if (x > 0 && onSwipeRight) {
          onSwipeRight()
        } else if (x < 0 && onSwipeLeft) {
          onSwipeLeft()
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(y) > threshold) {
        if (y > 0 && onSwipeDown) {
          onSwipeDown()
        } else if (y < 0 && onSwipeUp) {
          onSwipeUp()
        }
      }
    }
  }

  const handleDrag = (event: any, info: PanInfo) => {
    if (disabled) return
    
    const { offset } = info
    const { x, y } = offset

    // Update drag direction for visual feedback
    if (Math.abs(x) > Math.abs(y)) {
      setDragDirection(x > 0 ? 'right' : 'left')
    } else {
      setDragDirection(y > 0 ? 'down' : 'up')
    }
  }

  return (
    <motion.div
      ref={containerRef}
      drag={!disabled}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
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
    </motion.div>
  )
} 