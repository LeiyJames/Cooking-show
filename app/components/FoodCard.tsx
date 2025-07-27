'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Users, Star } from 'lucide-react'

interface FoodCardProps {
  title: string
  description: string
  image: string
  href: string
  cookingTime?: number
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  servings?: number
  rating?: number
}

export default function FoodCard({ 
  title, 
  description, 
  image, 
  href, 
  cookingTime = 30,
  difficulty = 'Medium',
  servings = 4,
  rating = 4.5
}: FoodCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'text-green-600 dark:text-green-400'
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400'
      case 'Hard': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-500 fill-current' 
            : i < rating 
              ? 'text-yellow-500 fill-current opacity-50' 
              : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  return (
    <Link href={href}>
      <motion.div
        className="card cursor-pointer group relative overflow-hidden transition-all duration-300"
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background Gradient Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cooking-50/50 to-warm-50/50 dark:from-cooking-900/20 dark:to-warm-900/20"
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main Content */}
        <div className="relative z-10">
          {/* Image Section */}
          <motion.div 
            className="text-center mb-4"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {image}
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-cooking-600 dark:group-hover:text-cooking-400 transition-colors duration-300"
            animate={{
              y: isHovered ? -2 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 transition-colors duration-300">
            {description}
          </p>

          {/* Recipe Info */}
          <div className="space-y-2 mb-4">
            {/* Cooking Time */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{cookingTime} min</span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(difficulty)} bg-opacity-10`}>
                {difficulty}
              </span>
            </div>

            {/* Servings */}
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span>{servings} servings</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {renderStars(rating)}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                ({rating})
              </span>
            </div>
          </div>

          {/* Action Button */}
          <motion.div 
            className="flex items-center justify-center gap-2 text-cooking-500 dark:text-cooking-400 font-medium transition-colors duration-300"
            animate={{
              x: isHovered ? 4 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <span>View Recipe</span>
            <motion.span
              className="text-lg"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-cooking-500/5 dark:bg-cooking-400/5 rounded-2xl"
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  )
} 