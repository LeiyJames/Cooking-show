'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChefHat, Utensils } from 'lucide-react'

export default function HeroPage() {
  const router = useRouter()

  const handleMenuClick = () => {
    router.push('/menu')
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/cook.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <div className="mb-6">
            <ChefHat className="w-20 h-20 mx-auto text-cooking-400" />
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg">
            Filipino Cooking
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Discover authentic Filipino recipes with step-by-step instructions, 
            cooking timers, and detailed nutrition information
          </p>

          {/* Menu Button */}
          <motion.button
            onClick={handleMenuClick}
            className="inline-flex items-center gap-3 bg-cooking-500 hover:bg-cooking-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Utensils className="w-6 h-6" />
            Menu
          </motion.button>
        </motion.div>
      </div>

      {/* Floating elements for visual interest */}
      <motion.div
        className="absolute top-20 left-20 text-4xl opacity-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🍗
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-4xl opacity-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        🥘
      </motion.div>
      <motion.div
        className="absolute top-1/2 left-10 text-3xl opacity-20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        🍜
      </motion.div>
    </div>
  )
} 