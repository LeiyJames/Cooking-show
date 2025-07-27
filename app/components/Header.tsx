'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      setIsDark(false)
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    if (newTheme) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-colors duration-300"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.h1 
              className="text-2xl font-bold text-cooking-700 flex items-center gap-2 transition-colors duration-300 cursor-pointer hover:text-cooking-800"
              whileHover={{ scale: 1.05 }}
            >
              🍳 Cooking Show
            </motion.h1>
          </Link>
          
          <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
            <div className="w-5 h-5" />
          </div>
        </div>
      </motion.header>
    )
  }

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <motion.h1 
            className="text-2xl font-bold text-cooking-700 dark:text-cooking-400 flex items-center gap-2 transition-colors duration-300 cursor-pointer hover:text-cooking-800 dark:hover:text-cooking-300"
            whileHover={{ scale: 1.05 }}
          >
            🍳 Cooking Show
          </motion.h1>
        </Link>
        
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </motion.button>
      </div>
    </motion.header>
  )
} 