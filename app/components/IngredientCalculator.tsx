'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Plus, Minus, RotateCcw } from 'lucide-react'

interface Ingredient {
  name: string
  amount: number
  unit: string
}

interface IngredientCalculatorProps {
  ingredients: Ingredient[]
  originalServings: number
  dishName?: string
}

export default function IngredientCalculator({ ingredients, originalServings, dishName = 'recipe' }: IngredientCalculatorProps) {
  const [servings, setServings] = useState(originalServings)
  const [scaledIngredients, setScaledIngredients] = useState<Ingredient[]>(ingredients)
  const [isInitialized, setIsInitialized] = useState(false)

  // Generate unique key for this calculator instance
  const calculatorKey = `calculator_${dishName}`

  // Load saved servings from localStorage
  useEffect(() => {
    const savedCalculator = localStorage.getItem(calculatorKey)
    if (savedCalculator) {
      try {
        const state = JSON.parse(savedCalculator)
        setServings(state.servings || originalServings)
      } catch (error) {
        console.error('Error loading calculator state:', error)
      }
    }
    setIsInitialized(true)
  }, [calculatorKey, originalServings])

  // Save servings to localStorage whenever it changes (debounced)
  const saveTimeoutRef = useRef<NodeJS.Timeout>()
  const saveCalculatorState = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      const calculatorState = {
        servings,
        timestamp: Date.now()
      }
      localStorage.setItem(calculatorKey, JSON.stringify(calculatorState))
    }, 500) // Debounce saves by 500ms
  }, [servings, calculatorKey])

  useEffect(() => {
    if (isInitialized) {
      saveCalculatorState()
    }
  }, [saveCalculatorState, isInitialized])

  useEffect(() => {
    const scale = servings / originalServings
    const scaled = ingredients.map(ingredient => ({
      ...ingredient,
      amount: Math.round((ingredient.amount * scale) * 100) / 100
    }))
    setScaledIngredients(scaled)
  }, [servings, originalServings, ingredients])

  const adjustServings = (increment: number) => {
    const newServings = Math.max(1, servings + increment)
    setServings(newServings)
  }

  const resetServings = () => {
    setServings(originalServings)
    localStorage.removeItem(calculatorKey)
  }

  const formatAmount = (amount: number) => {
    if (amount === Math.floor(amount)) {
      return amount.toString()
    }
    return amount.toFixed(2).replace(/\.?0+$/, '')
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-6 h-6 text-cooking-600 dark:text-cooking-400" />
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
            Ingredient Calculator
          </h3>
        </div>
        <button
          onClick={resetServings}
          className="text-sm text-cooking-600 dark:text-cooking-400 hover:text-cooking-700 dark:hover:text-cooking-300 transition-colors duration-300"
        >
          Reset
        </button>
      </div>

      {/* Servings Control */}
      <div className="bg-gradient-to-r from-cooking-50 to-warm-50 dark:from-cooking-900/20 dark:to-warm-900/20 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
              Servings
            </label>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => adjustServings(-1)}
                className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={servings <= 1}
              >
                <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.button>
              
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200 min-w-[3rem] text-center">
                {servings}
              </span>
              
              <motion.button
                onClick={() => adjustServings(1)}
                className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>
          </div>
          
          <motion.button
            onClick={resetServings}
            className="p-2 bg-cooking-100 dark:bg-cooking-900/30 text-cooking-700 dark:text-cooking-300 rounded-lg hover:bg-cooking-200 dark:hover:bg-cooking-900/50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
        
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
          {servings !== originalServings && (
            <span className="text-cooking-600 dark:text-cooking-400">
              {servings > originalServings ? '+' : ''}{servings - originalServings} from original
            </span>
          )}
        </div>
      </div>

      {/* Scaled Ingredients List */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">
          Ingredients for {servings} {servings === 1 ? 'serving' : 'servings'}:
        </h4>
        
        <div className="space-y-2">
          {scaledIngredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {ingredient.name}
              </span>
              <span className="text-cooking-600 dark:text-cooking-400 font-semibold">
                {formatAmount(ingredient.amount)} {ingredient.unit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          💡 <strong>Tip:</strong> Adjust the number of servings to scale the recipe. 
          All ingredient amounts will be automatically calculated for you!
        </p>
      </div>
    </motion.div>
  )
} 