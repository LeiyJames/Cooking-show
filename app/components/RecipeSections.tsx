'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Utensils, List, Lightbulb, FileText } from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: React.ReactNode
  content: React.ReactNode
}

export default function RecipeSections() {
  const [expandedSection, setExpandedSection] = useState<string | null>('ingredients')
  const [notes, setNotes] = useState('')
  const [ingredients, setIngredients] = useState([
    '2 cups all-purpose flour',
    '1 cup warm water',
    '1 tsp active dry yeast',
    '1 tsp salt',
    '2 tbsp olive oil'
  ])
  const [steps, setSteps] = useState([
    'Mix flour, yeast, and salt in a large bowl',
    'Add warm water and olive oil, mix until dough forms',
    'Knead dough for 10 minutes until smooth',
    'Let rise in a warm place for 1 hour',
    'Shape and bake at 450°F for 20-25 minutes'
  ])
  const [tips, setTips] = useState([
    'Use warm (not hot) water to activate the yeast properly',
    'Let the dough rise in a warm, draft-free area for best results'
  ])

  // Load saved data from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('cookingNotes')
    const savedIngredients = localStorage.getItem('cookingIngredients')
    const savedSteps = localStorage.getItem('cookingSteps')
    const savedTips = localStorage.getItem('cookingTips')

    if (savedNotes) setNotes(savedNotes)
    if (savedIngredients) setIngredients(JSON.parse(savedIngredients))
    if (savedSteps) setSteps(JSON.parse(savedSteps))
    if (savedTips) setTips(JSON.parse(savedTips))
  }, [])

  // Save notes to localStorage
  const handleNotesChange = (value: string) => {
    setNotes(value)
    localStorage.setItem('cookingNotes', value)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
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
              <span className="text-cooking-500 mt-1">•</span>
              <span className="text-gray-700">{ingredient}</span>
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
              <span className="flex-shrink-0 w-6 h-6 bg-cooking-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <span className="text-gray-700">{step}</span>
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
              className="bg-cooking-50 border-l-4 border-cooking-500 p-4 rounded-r-lg"
            >
              <p className="text-gray-700">{tip}</p>
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
          className="w-full h-32 p-3 border-2 border-gray-200 rounded-xl focus:border-cooking-500 focus:outline-none resize-none"
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
            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-cooking-600">{section.icon}</span>
              <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
            </div>
            <motion.div
              animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {expandedSection === section.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
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