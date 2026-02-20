'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import TimerInterface from '../../components/TimerInterface'
import FilipinoRecipeSections from '../../components/FilipinoRecipeSections'
import NutritionInfo from '../../components/NutritionInfo'
import IngredientCalculator from '../../components/IngredientCalculator'
import CookingProgress from '../../components/CookingProgress'
import TouchGestures from '../../components/TouchGestures'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Dish } from '../../data/filipino-dishes'

interface DishClientProps {
  dish: Dish | null
}

export default function DishClient({ dish }: DishClientProps) {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleBack = () => {
    router.back()
  }

  if (!dish) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cooking-50 to-warm-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">Dish not found</h1>
          <button
            onClick={handleBack}
            className="text-cooking-600 dark:text-cooking-400 hover:underline transition-colors duration-300"
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  const handleStepComplete = (stepId: number) => {
    setCompletedSteps(prev => [...prev, stepId])
    setCurrentStep(prev => Math.min(prev + 1, dish.steps.length))
  }

  const handleStepSelect = (stepId: number) => {
    setCurrentStep(stepId)
  }

  const handleSwipeLeft = () => {
    if (currentStep < dish.steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSwipeRight = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const cookingSteps = dish.steps.map((step, index) => ({
    id: index + 1,
    description: step,
    estimatedTime: 5, // Default time, could be extracted from step text
    isCompleted: completedSteps.includes(index + 1)
  }))

  return (
    <main className="min-h-screen landscape-compact">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-cooking-600 dark:text-cooking-400 hover:text-cooking-700 dark:hover:text-cooking-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </motion.div>

        {/* Dish Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-8xl mb-4">{dish.emoji}</div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">{dish.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">{dish.description}</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Timer Interface */}
            <TouchGestures onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight}>
              <TimerInterface
                recommendedMinutes={dish.recommendedMinutes}
                dishName={dish.title}
              />
            </TouchGestures>

            {/* Cooking Progress */}
            <CookingProgress
              steps={cookingSteps}
              currentStep={currentStep}
              onStepComplete={handleStepComplete}
              onStepSelect={handleStepSelect}
              dishName={dish.title}
            />

            {/* Ingredient Calculator */}
            <IngredientCalculator
              ingredients={dish.ingredients}
              originalServings={dish.servings}
              dishName={dish.title}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Nutrition Information */}
            <NutritionInfo
              nutrition={dish.nutrition}
              servings={dish.servings}
            />

            {/* Recipe Sections */}
            <FilipinoRecipeSections dish={dish} />
          </div>
        </div>
      </div>
    </main>
  )
}
