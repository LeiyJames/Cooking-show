'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Utensils, List, Lightbulb, FileText } from 'lucide-react'

interface Ingredient {
  name: string
  amount: number
  unit: string
}

interface Dish {
  title: string
  emoji: string
  description: string
  ingredients: Ingredient[]
  steps: string[]
  tips: string[]
  defaultNotes: string
}

interface FilipinoRecipeSectionsProps {
  dish: Dish
}

interface Section {
  id: string
  title: string
  icon: React.ReactNode
  content: React.ReactNode
}

export default function FilipinoRecipeSections({ dish }: FilipinoRecipeSectionsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('ingredients')
  const [notes, setNotes] = useState(dish.defaultNotes)
  const [ingredients, setIngredients] = useState(dish.ingredients)
  const [steps, setSteps] = useState(dish.steps)
  const [tips, setTips] = useState(dish.tips)

  // Load saved data from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`cookingNotes_${dish.title}`)
    const savedIngredients = localStorage.getItem(`cookingIngredients_${dish.title}`)
    const savedSteps = localStorage.getItem(`cookingSteps_${dish.title}`)
    const savedTips = localStorage.getItem(`cookingTips_${dish.title}`)

    if (savedNotes) setNotes(savedNotes)
    if (savedIngredients) setIngredients(JSON.parse(savedIngredients))
    if (savedSteps) setSteps(JSON.parse(savedSteps))
    if (savedTips) setTips(JSON.parse(savedTips))
  }, [dish.title])

  // Save notes to localStorage
  const handleNotesChange = (value: string) => {
    setNotes(value)
    localStorage.setItem(`cookingNotes_${dish.title}`, value)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const formatAmount = (amount: number) => {
    if (amount === Math.floor(amount)) {
      return amount.toString()
    }
    return amount.toFixed(2).replace(/\.?0+$/, '')
  }

  const sections: Section[] = [
    {
      id: 'ingredients',
      title: 'Ingredients',
      icon: <Utensils className="w-5 h-5" />,
      content: (
        <ul className="space-y-2">
          {ingredients.map((ingredient, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2"
            >
              <span className="text-cooking-500 dark:text-cooking-400 mt-1 transition-colors duration-300">•</span>
              <span className="text-gray-700 dark:text-gray-200 transition-colors duration-300">
                {formatAmount(ingredient.amount)} {ingredient.unit} {ingredient.name}
              </span>
            </motion.li>
          ))}
        </ul>
      )
    },
    {
      id: 'steps',
      title: 'Steps',
      icon: <List className="w-5 h-5" />,
      content: (
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <motion.li
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-cooking-500 dark:bg-cooking-400 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300">
                {index + 1}
              </span>
              <span className="text-gray-700 dark:text-gray-200 transition-colors duration-300">{step}</span>
            </motion.li>
          ))}
        </ol>
      )
    },
    {
      id: 'tips',
      title: 'Tips',
      icon: <Lightbulb className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-cooking-50 dark:bg-cooking-900/20 border-l-4 border-cooking-500 dark:border-cooking-400 p-4 rounded-r-lg transition-colors duration-300"
            >
              <p className="text-gray-700 dark:text-gray-200 transition-colors duration-300">{tip}</p>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'notes',
      title: 'Notes',
      icon: <FileText className="w-5 h-5" />,
      content: (
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Add your cooking notes here..."
          className="w-full h-32 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-cooking-500 dark:focus:border-cooking-400 focus:outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
        />
      )
    }
  ]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      {sections.map((section) => (
        <motion.div
          key={section.id}
          className="card"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-cooking-600 dark:text-cooking-400 transition-colors duration-300">{section.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300">{section.title}</h3>
            </div>
            <motion.div
              animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {expandedSection === section.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              )}
            </motion.div>
          </button>

          <AnimatePresence>
            {expandedSection === section.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-2">
                  {section.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  )
} 