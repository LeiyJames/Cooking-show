'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Flame, Droplets, Apple, Beef } from 'lucide-react'

interface NutritionData {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  sugar: number
}

interface NutritionInfoProps {
  nutrition: NutritionData
  servings: number
}

export default function NutritionInfo({ nutrition, servings }: NutritionInfoProps) {
  const nutritionPerServing = {
    calories: Math.round(nutrition.calories / servings),
    protein: Math.round((nutrition.protein / servings) * 10) / 10,
    carbs: Math.round((nutrition.carbs / servings) * 10) / 10,
    fat: Math.round((nutrition.fat / servings) * 10) / 10,
    fiber: Math.round((nutrition.fiber / servings) * 10) / 10,
    sodium: Math.round(nutrition.sodium / servings),
    sugar: Math.round((nutrition.sugar / servings) * 10) / 10
  }

  const getCalorieColor = (calories: number) => {
    if (calories < 300) return 'text-green-600 dark:text-green-400'
    if (calories < 500) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getNutrientColor = (type: string, value: number) => {
    switch (type) {
      case 'protein':
        return value > 20 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
      case 'fiber':
        return value > 5 ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
      case 'sugar':
        return value < 10 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      case 'sodium':
        return value < 500 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Apple className="w-6 h-6 text-cooking-600 dark:text-cooking-400" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
          Nutrition Information
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          (per serving)
        </span>
      </div>

      {/* Calories Highlight */}
      <div className="bg-gradient-to-r from-cooking-50 to-warm-50 dark:from-cooking-900/20 dark:to-warm-900/20 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Calories</span>
        </div>
        <div className={`text-3xl font-bold text-center ${getCalorieColor(nutritionPerServing.calories)}`}>
          {nutritionPerServing.calories}
        </div>
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
          kcal per serving
        </div>
      </div>

      {/* Macronutrients */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Beef className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Protein</span>
          </div>
          <div className={`text-lg font-bold ${getNutrientColor('protein', nutritionPerServing.protein)}`}>
            {nutritionPerServing.protein}g
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Apple className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Carbs</span>
          </div>
          <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {nutritionPerServing.carbs}g
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Droplets className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Fat</span>
          </div>
          <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
            {nutritionPerServing.fat}g
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Apple className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Fiber</span>
          </div>
          <div className={`text-lg font-bold ${getNutrientColor('fiber', nutritionPerServing.fiber)}`}>
            {nutritionPerServing.fiber}g
          </div>
        </div>
      </div>

      {/* Additional Nutrients */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sugar</span>
          <span className={`text-sm font-medium ${getNutrientColor('sugar', nutritionPerServing.sugar)}`}>
            {nutritionPerServing.sugar}g
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sodium</span>
          <span className={`text-sm font-medium ${getNutrientColor('sodium', nutritionPerServing.sodium)}`}>
            {nutritionPerServing.sodium}mg
          </span>
        </div>
      </div>

      {/* Nutrition Tips */}
      <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          💡 <strong>Tip:</strong> This recipe provides a good balance of nutrients. 
          {nutritionPerServing.protein > 20 && ' High in protein!'}
          {nutritionPerServing.fiber > 5 && ' Great source of fiber!'}
          {nutritionPerServing.sugar < 10 && ' Low in added sugar!'}
        </p>
      </div>
    </motion.div>
  )
} 