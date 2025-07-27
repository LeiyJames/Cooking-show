'use client'

import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '../../components/Header'
import TimerInterface from '../../components/TimerInterface'
import FilipinoRecipeSections from '../../components/FilipinoRecipeSections'
import NutritionInfo from '../../components/NutritionInfo'
import IngredientCalculator from '../../components/IngredientCalculator'
import CookingProgress from '../../components/CookingProgress'
import TouchGestures from '../../components/TouchGestures'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

// Type definitions
interface Ingredient {
  name: string
  amount: number
  unit: string
}

interface NutritionData {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sodium: number
  sugar: number
}

interface Dish {
  title: string
  emoji: string
  description: string
  recommendedMinutes: number
  servings: number
  nutrition: NutritionData
  ingredients: Ingredient[]
  steps: string[]
  tips: string[]
  defaultNotes: string
}

// Filipino dish data with nutrition information
const filipinoDishes: Record<string, Dish> = {
  adobo: {
    title: 'Chicken Adobo',
    emoji: '🍗',
    description: 'Classic Filipino chicken adobo with soy sauce and vinegar',
    recommendedMinutes: 45,
    servings: 6,
    nutrition: {
      calories: 1200,
      protein: 45,
      carbs: 15,
      fat: 35,
      fiber: 8,
      sodium: 1800,
      sugar: 12
    },
    ingredients: [
      { name: 'Chicken pieces', amount: 1, unit: 'kg' },
      { name: 'Soy sauce', amount: 0.5, unit: 'cup' },
      { name: 'Vinegar', amount: 0.25, unit: 'cup' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Bay leaves', amount: 3, unit: 'pieces' },
      { name: 'Black peppercorns', amount: 1, unit: 'tsp' },
      { name: 'Water', amount: 1, unit: 'cup' }
    ],
    steps: [
      'Heat oil in a large pot over medium heat (2-3 minutes)',
      'Sauté garlic and onion until fragrant (3-4 minutes)',
      'Add chicken pieces and cook until lightly browned (5-7 minutes)',
      'Pour in soy sauce, vinegar, and water',
      'Add bay leaves and peppercorns',
      'Bring to a boil, then reduce heat to simmer (2-3 minutes)',
      'Cook for 30-40 minutes until chicken is tender (set timer for 35 minutes)',
      'Increase heat to reduce sauce if needed (5-10 minutes)',
      'Serve hot with steamed rice'
    ],
    tips: [
      'Use chicken thighs for better flavor and tenderness',
      'Let the adobo rest for 10 minutes before serving for better flavor',
      'You can make this ahead and reheat - it tastes even better the next day'
    ],
    defaultNotes: 'Perfect for family gatherings and can be made ahead of time.'
  },
  sinigang: {
    title: 'Sinigang na Baboy',
    emoji: '🥘',
    description: 'Sour tamarind soup with pork and vegetables',
    recommendedMinutes: 90,
    servings: 8,
    nutrition: {
      calories: 800,
      protein: 35,
      carbs: 25,
      fat: 20,
      fiber: 12,
      sodium: 1200,
      sugar: 8
    },
    ingredients: [
      { name: 'Pork belly', amount: 1, unit: 'kg' },
      { name: 'Tamarind soup base', amount: 1, unit: 'pack' },
      { name: 'Tomatoes', amount: 4, unit: 'pieces' },
      { name: 'Onion', amount: 1, unit: 'large' },
      { name: 'Radish', amount: 2, unit: 'pieces' },
      { name: 'Eggplant', amount: 2, unit: 'pieces' },
      { name: 'Kangkong', amount: 1, unit: 'bunch' },
      { name: 'Green chili peppers', amount: 4, unit: 'pieces' }
    ],
    steps: [
      'In a large pot, bring water to a boil (5-7 minutes)',
      'Add pork belly and simmer for 1 hour until tender (set timer for 60 minutes)',
      'Add tomatoes and onion, cook for 5 minutes (set timer for 5 minutes)',
      'Add sinigang mix and stir until dissolved (1-2 minutes)',
      'Add radish and eggplant, cook for 10 minutes (set timer for 10 minutes)',
      'Add kangkong and green chili peppers',
      'Cook for 2-3 minutes until vegetables are tender (set timer for 3 minutes)',
      'Season with salt if needed',
      'Serve hot with steamed rice'
    ],
    tips: [
      'Use fresh tamarind for authentic sour taste',
      'Add vegetables according to cooking time - hard vegetables first',
      'Don\'t overcook the vegetables to maintain texture'
    ],
    defaultNotes: 'Great comfort food, especially during rainy days.'
  },
  'kare-kare': {
    title: 'Kare-Kare',
    emoji: '🥜',
    description: 'Peanut stew with beef and vegetables',
    recommendedMinutes: 120,
    servings: 6,
    nutrition: {
      calories: 1100,
      protein: 40,
      carbs: 30,
      fat: 45,
      fiber: 10,
      sodium: 1400,
      sugar: 15
    },
    ingredients: [
      { name: 'Beef oxtail', amount: 1, unit: 'kg' },
      { name: 'Peanut butter', amount: 0.5, unit: 'cup' },
      { name: 'Annatto seeds', amount: 2, unit: 'tbsp' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'large' },
      { name: 'String beans', amount: 1, unit: 'bunch' },
      { name: 'Eggplant', amount: 2, unit: 'pieces' },
      { name: 'Bagoong', amount: 0.25, unit: 'cup' }
    ],
    steps: [
      'Boil beef oxtail until tender (set timer for 90 minutes)',
      'Sauté garlic and onion until fragrant (3-4 minutes)',
      'Add peanut butter and annatto water',
      'Add beef and broth, simmer for 30 minutes (set timer for 30 minutes)',
      'Add vegetables and cook for 10 minutes (set timer for 10 minutes)',
      'Season with salt and pepper',
      'Serve with bagoong on the side'
    ],
    tips: [
      'Use oxtail for authentic flavor and texture',
      'Make sure the peanut butter is well dissolved',
      'Don\'t skip the bagoong - it\'s essential for the flavor'
    ],
    defaultNotes: 'A rich and hearty dish perfect for special occasions.'
  },
  'lechon-kawali': {
    title: 'Lechon Kawali',
    emoji: '🥓',
    description: 'Crispy fried pork belly',
    recommendedMinutes: 75,
    servings: 4,
    nutrition: {
      calories: 1500,
      protein: 50,
      carbs: 10,
      fat: 60,
      fiber: 2,
      sodium: 2000,
      sugar: 5
    },
    ingredients: [
      { name: 'Pork belly', amount: 1, unit: 'kg' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Bay leaves', amount: 3, unit: 'pieces' },
      { name: 'Black peppercorns', amount: 1, unit: 'tbsp' },
      { name: 'Salt', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 2, unit: 'cups' }
    ],
    steps: [
      'Boil pork belly with garlic, bay leaves, and peppercorns (set timer for 45 minutes)',
      'Drain and let cool for 10 minutes',
      'Heat oil in a deep pan (5-7 minutes)',
      'Fry pork belly until golden and crispy (set timer for 20 minutes)',
      'Drain on paper towels',
      'Cut into serving pieces',
      'Serve with lechon sauce and rice'
    ],
    tips: [
      'Make sure the oil is very hot before frying',
      'Don\'t overcrowd the pan when frying',
      'Let the pork cool slightly before cutting'
    ],
    defaultNotes: 'Best served immediately while still crispy.'
  },
  'pancit-canton': {
    title: 'Pancit Canton',
    emoji: '🍜',
    description: 'Stir-fried noodles with vegetables and meat',
    recommendedMinutes: 25,
    servings: 4,
    nutrition: {
      calories: 600,
      protein: 25,
      carbs: 80,
      fat: 15,
      fiber: 8,
      sodium: 1200,
      sugar: 10
    },
    ingredients: [
      { name: 'Canton noodles', amount: 500, unit: 'g' },
      { name: 'Pork belly', amount: 200, unit: 'g' },
      { name: 'Shrimp', amount: 200, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Cabbage', amount: 0.5, unit: 'head' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Oyster sauce', amount: 2, unit: 'tbsp' },
      { name: 'Garlic', amount: 6, unit: 'cloves' }
    ],
    steps: [
      'Soak noodles in warm water for 10 minutes',
      'Sauté garlic until fragrant (2-3 minutes)',
      'Add pork and cook until browned (5-7 minutes)',
      'Add shrimp and cook for 2 minutes',
      'Add vegetables and stir-fry (set timer for 5 minutes)',
      'Add noodles and sauces',
      'Stir-fry until well combined (set timer for 3 minutes)',
      'Serve hot with calamansi'
    ],
    tips: [
      'Don\'t overcook the noodles',
      'Keep the heat high for authentic stir-fry taste',
      'Add calamansi juice for authentic Filipino flavor'
    ],
    defaultNotes: 'Quick and easy dish perfect for busy weeknights.'
  },
  'halo-halo': {
    title: 'Halo-Halo',
    emoji: '🍧',
    description: 'Mixed dessert with shaved ice and sweet ingredients',
    recommendedMinutes: 15,
    servings: 2,
    nutrition: {
      calories: 400,
      protein: 8,
      carbs: 70,
      fat: 12,
      fiber: 5,
      sodium: 200,
      sugar: 60
    },
    ingredients: [
      { name: 'Shaved ice', amount: 2, unit: 'cups' },
      { name: 'Sweetened beans', amount: 0.25, unit: 'cup' },
      { name: 'Nata de coco', amount: 0.25, unit: 'cup' },
      { name: 'Sweet potato', amount: 0.25, unit: 'cup' },
      { name: 'Ube halaya', amount: 0.25, unit: 'cup' },
      { name: 'Leche flan', amount: 0.25, unit: 'cup' },
      { name: 'Evaporated milk', amount: 0.5, unit: 'cup' },
      { name: 'Sugar', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Layer sweet ingredients in a tall glass (2-3 minutes)',
      'Add shaved ice on top (1-2 minutes)',
      'Pour evaporated milk over ice',
      'Sprinkle sugar on top',
      'Mix well before eating',
      'Serve immediately with a long spoon'
    ],
    tips: [
      'Use very fine shaved ice for best texture',
      'Layer ingredients in order of density',
      'Don\'t let it sit too long or the ice will melt'
    ],
    defaultNotes: 'Perfect refreshing dessert for hot days.'
  },
  tapsilog: {
    title: 'Tapsilog',
    emoji: '🍳',
    description: 'Beef tapa with garlic rice and fried egg',
    recommendedMinutes: 20,
    servings: 2,
    nutrition: {
      calories: 800,
      protein: 35,
      carbs: 60,
      fat: 25,
      fiber: 3,
      sodium: 1500,
      sugar: 8
    },
    ingredients: [
      { name: 'Beef tapa', amount: 200, unit: 'g' },
      { name: 'Garlic rice', amount: 2, unit: 'cups' },
      { name: 'Eggs', amount: 2, unit: 'pieces' },
      { name: 'Garlic', amount: 4, unit: 'cloves' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' },
      { name: 'Salt', amount: 1, unit: 'tsp' }
    ],
    steps: [
      'Cook garlic rice in a pan (set timer for 8 minutes)',
      'Fry beef tapa until crispy (set timer for 5 minutes)',
      'Fry eggs sunny side up (set timer for 3 minutes)',
      'Plate with rice, tapa, and egg',
      'Serve with tomato and cucumber slices'
    ],
    tips: [
      'Use day-old rice for better garlic rice',
      'Don\'t overcook the eggs',
      'Serve with atchara (pickled papaya) for authentic taste'
    ],
    defaultNotes: 'Classic Filipino breakfast combination.'
  },
  longganisa: {
    title: 'Longganisa',
    emoji: '🌭',
    description: 'Sweet Filipino sausage with garlic rice',
    recommendedMinutes: 15,
    servings: 2,
    nutrition: {
      calories: 700,
      protein: 30,
      carbs: 55,
      fat: 30,
      fiber: 2,
      sodium: 1800,
      sugar: 15
    },
    ingredients: [
      { name: 'Longganisa', amount: 6, unit: 'pieces' },
      { name: 'Garlic rice', amount: 2, unit: 'cups' },
      { name: 'Garlic', amount: 4, unit: 'cloves' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' },
      { name: 'Vinegar', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Cook garlic rice in a pan (set timer for 8 minutes)',
      'Fry longganisa until golden brown (set timer for 5 minutes)',
      'Serve with garlic rice and vinegar dip',
      'Garnish with tomato and cucumber'
    ],
    tips: [
      'Don\'t prick the longganisa to keep juices in',
      'Serve with spicy vinegar for authentic taste',
      'Use fresh garlic for the rice'
    ],
    defaultNotes: 'Sweet and savory breakfast favorite.'
  },
  tocino: {
    title: 'Tocino',
    emoji: '🥩',
    description: 'Sweet cured pork with garlic rice',
    recommendedMinutes: 15,
    servings: 2,
    nutrition: {
      calories: 750,
      protein: 25,
      carbs: 60,
      fat: 35,
      fiber: 2,
      sodium: 2000,
      sugar: 20
    },
    ingredients: [
      { name: 'Tocino', amount: 200, unit: 'g' },
      { name: 'Garlic rice', amount: 2, unit: 'cups' },
      { name: 'Eggs', amount: 2, unit: 'pieces' },
      { name: 'Garlic', amount: 4, unit: 'cloves' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Cook garlic rice in a pan (set timer for 8 minutes)',
      'Fry tocino until caramelized (set timer for 5 minutes)',
      'Fry eggs sunny side up (set timer for 3 minutes)',
      'Plate with rice, tocino, and egg',
      'Serve with tomato and cucumber'
    ],
    tips: [
      'Don\'t add oil when frying tocino - it has enough fat',
      'Let tocino caramelize for best flavor',
      'Serve with atchara for balance'
    ],
    defaultNotes: 'Sweet and savory breakfast treat.'
  },
  'chicken-tinola': {
    title: 'Chicken Tinola',
    emoji: '🍲',
    description: 'Ginger chicken soup with green papaya',
    recommendedMinutes: 60,
    servings: 6,
    nutrition: {
      calories: 600,
      protein: 40,
      carbs: 20,
      fat: 25,
      fiber: 8,
      sodium: 1000,
      sugar: 5
    },
    ingredients: [
      { name: 'Chicken pieces', amount: 1, unit: 'kg' },
      { name: 'Green papaya', amount: 1, unit: 'piece' },
      { name: 'Ginger', amount: 50, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'large' },
      { name: 'Malunggay leaves', amount: 1, unit: 'bunch' },
      { name: 'Fish sauce', amount: 2, unit: 'tbsp' },
      { name: 'Water', amount: 6, unit: 'cups' }
    ],
    steps: [
      'Sauté ginger, garlic, and onion (3-4 minutes)',
      'Add chicken and cook until lightly browned (5-7 minutes)',
      'Add water and bring to a boil (5-7 minutes)',
      'Simmer for 30 minutes until chicken is tender (set timer for 30 minutes)',
      'Add green papaya and cook for 10 minutes (set timer for 10 minutes)',
      'Add malunggay leaves and fish sauce',
      'Cook for 2-3 minutes',
      'Serve hot with steamed rice'
    ],
    tips: [
      'Use young green papaya for authentic taste',
      'Don\'t overcook the malunggay leaves',
      'Add more ginger for stronger flavor'
    ],
    defaultNotes: 'Comforting soup perfect for cold weather.'
  },
  'beef-caldereta': {
    title: 'Beef Caldereta',
    emoji: '🥘',
    description: 'Spicy beef stew with tomato sauce',
    recommendedMinutes: 120,
    servings: 6,
    nutrition: {
      calories: 1000,
      protein: 45,
      carbs: 25,
      fat: 40,
      fiber: 8,
      sodium: 1600,
      sugar: 10
    },
    ingredients: [
      { name: 'Beef chuck', amount: 1, unit: 'kg' },
      { name: 'Tomato sauce', amount: 1, unit: 'can' },
      { name: 'Liver spread', amount: 0.25, unit: 'cup' },
      { name: 'Bell peppers', amount: 2, unit: 'pieces' },
      { name: 'Carrots', amount: 3, unit: 'pieces' },
      { name: 'Potatoes', amount: 3, unit: 'pieces' },
      { name: 'Green olives', amount: 0.5, unit: 'cup' },
      { name: 'Garlic', amount: 8, unit: 'cloves' }
    ],
    steps: [
      'Sauté garlic and onion until fragrant (3-4 minutes)',
      'Add beef and brown on all sides (10-12 minutes)',
      'Add tomato sauce and liver spread',
      'Simmer for 1 hour until beef is tender (set timer for 60 minutes)',
      'Add vegetables and cook for 20 minutes (set timer for 20 minutes)',
      'Add olives and simmer for 5 minutes',
      'Season with salt and pepper',
      'Serve hot with steamed rice'
    ],
    tips: [
      'Use beef chuck for best tenderness',
      'Don\'t skip the liver spread - it adds richness',
      'Add vegetables according to cooking time'
    ],
    defaultNotes: 'Rich and hearty stew perfect for special occasions.'
  },
  'pancit-bihon': {
    title: 'Pancit Bihon',
    emoji: '🍝',
    description: 'Rice noodles with vegetables and meat',
    recommendedMinutes: 30,
    servings: 4,
    nutrition: {
      calories: 550,
      protein: 20,
      carbs: 75,
      fat: 12,
      fiber: 6,
      sodium: 1100,
      sugar: 8
    },
    ingredients: [
      { name: 'Bihon noodles', amount: 400, unit: 'g' },
      { name: 'Pork belly', amount: 200, unit: 'g' },
      { name: 'Shrimp', amount: 200, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Cabbage', amount: 0.5, unit: 'head' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Oyster sauce', amount: 2, unit: 'tbsp' },
      { name: 'Garlic', amount: 6, unit: 'cloves' }
    ],
    steps: [
      'Soak bihon in warm water for 15 minutes',
      'Sauté garlic until fragrant (2-3 minutes)',
      'Add pork and cook until browned (5-7 minutes)',
      'Add shrimp and cook for 2 minutes',
      'Add vegetables and stir-fry (set timer for 8 minutes)',
      'Add noodles and sauces',
      'Stir-fry until well combined (set timer for 5 minutes)',
      'Serve hot with calamansi'
    ],
    tips: [
      'Don\'t overcook the bihon noodles',
      'Keep the heat high for authentic stir-fry taste',
      'Add calamansi juice for authentic Filipino flavor'
    ],
    defaultNotes: 'Light and healthy noodle dish.'
  },
  lumpia: {
    title: 'Lumpia',
    emoji: '🥬',
    description: 'Fresh spring rolls with vegetables',
    recommendedMinutes: 45,
    servings: 4,
    nutrition: {
      calories: 300,
      protein: 15,
      carbs: 40,
      fat: 10,
      fiber: 12,
      sodium: 800,
      sugar: 5
    },
    ingredients: [
      { name: 'Lumpia wrapper', amount: 20, unit: 'pieces' },
      { name: 'Ground pork', amount: 300, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Cabbage', amount: 0.5, unit: 'head' },
      { name: 'Bean sprouts', amount: 200, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Sauté garlic until fragrant (2-3 minutes)',
      'Add ground pork and cook until browned (5-7 minutes)',
      'Add vegetables and stir-fry (set timer for 8 minutes)',
      'Season with soy sauce and let cool',
      'Wrap mixture in lumpia wrappers (set timer for 15 minutes)',
      'Fry lumpia until golden brown (set timer for 10 minutes)',
      'Serve with sweet chili sauce'
    ],
    tips: [
      'Don\'t overfill the wrappers',
      'Make sure the filling is completely cool before wrapping',
      'Fry in batches to avoid overcrowding'
    ],
    defaultNotes: 'Perfect appetizer for parties and gatherings.'
  },
  sisig: {
    title: 'Sisig',
    emoji: '🔥',
    description: 'Sizzling pork dish with onions and chili',
    recommendedMinutes: 40,
    servings: 4,
    nutrition: {
      calories: 800,
      protein: 35,
      carbs: 15,
      fat: 45,
      fiber: 5,
      sodium: 1800,
      sugar: 8
    },
    ingredients: [
      { name: 'Pork belly', amount: 500, unit: 'g' },
      { name: 'Pork ears', amount: 200, unit: 'g' },
      { name: 'Onion', amount: 2, unit: 'pieces' },
      { name: 'Chili peppers', amount: 4, unit: 'pieces' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Calamansi', amount: 4, unit: 'pieces' },
      { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Boil pork until tender (set timer for 30 minutes)',
      'Grill or broil pork until crispy (set timer for 10 minutes)',
      'Chop pork into small pieces',
      'Sauté garlic and onion (3-4 minutes)',
      'Add pork and stir-fry (set timer for 5 minutes)',
      'Add chili peppers and calamansi juice',
      'Season with soy sauce',
      'Serve on a sizzling plate with egg on top'
    ],
    tips: [
      'Use a mix of pork cuts for authentic texture',
      'Don\'t skip the calamansi juice',
      'Serve immediately while still sizzling'
    ],
    defaultNotes: 'Best served hot and sizzling with beer.'
  },
  bulalo: {
    title: 'Bulalo',
    emoji: '🍖',
    description: 'Beef marrow soup with corn and vegetables',
    recommendedMinutes: 180,
    servings: 8,
    nutrition: {
      calories: 1200,
      protein: 50,
      carbs: 30,
      fat: 35,
      fiber: 10,
      sodium: 1400,
      sugar: 8
    },
    ingredients: [
      { name: 'Beef shanks', amount: 2, unit: 'kg' },
      { name: 'Corn', amount: 4, unit: 'pieces' },
      { name: 'Cabbage', amount: 1, unit: 'head' },
      { name: 'Carrots', amount: 4, unit: 'pieces' },
      { name: 'Potatoes', amount: 4, unit: 'pieces' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Onion', amount: 2, unit: 'pieces' },
      { name: 'Black peppercorns', amount: 1, unit: 'tbsp' }
    ],
    steps: [
      'Boil beef shanks with garlic and peppercorns (set timer for 90 minutes)',
      'Add corn and cook for 20 minutes (set timer for 20 minutes)',
      'Add carrots and potatoes, cook for 15 minutes (set timer for 15 minutes)',
      'Add cabbage and cook for 10 minutes (set timer for 10 minutes)',
      'Season with salt and pepper',
      'Serve hot with steamed rice and fish sauce'
    ],
    tips: [
      'Use beef shanks with marrow for authentic flavor',
      'Don\'t overcook the vegetables',
      'Serve with fish sauce and calamansi'
    ],
    defaultNotes: 'Rich and hearty soup perfect for cold weather.'
  },
  'bicol-express': {
    title: 'Bicol Express',
    emoji: '🌶️',
    description: 'Spicy pork with coconut milk and chili',
    recommendedMinutes: 60,
    servings: 4,
    nutrition: {
      calories: 900,
      protein: 35,
      carbs: 20,
      fat: 50,
      fiber: 8,
      sodium: 1600,
      sugar: 10
    },
    ingredients: [
      { name: 'Pork belly', amount: 500, unit: 'g' },
      { name: 'Coconut milk', amount: 2, unit: 'cups' },
      { name: 'Chili peppers', amount: 6, unit: 'pieces' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Onion', amount: 2, unit: 'pieces' },
      { name: 'Ginger', amount: 30, unit: 'g' },
      { name: 'Shrimp paste', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Sauté garlic, onion, and ginger (3-4 minutes)',
      'Add pork and cook until browned (8-10 minutes)',
      'Add coconut milk and bring to a boil (5-7 minutes)',
      'Simmer for 30 minutes until pork is tender (set timer for 30 minutes)',
      'Add chili peppers and shrimp paste',
      'Cook for 10 minutes until sauce thickens (set timer for 10 minutes)',
      'Season with salt and pepper',
      'Serve hot with steamed rice'
    ],
    tips: [
      'Use fresh coconut milk for best flavor',
      'Adjust chili amount according to preference',
      'Don\'t skip the shrimp paste - it\'s essential'
    ],
    defaultNotes: 'Spicy and creamy dish from Bicol region.'
  },
  dinuguan: {
    title: 'Dinuguan',
    emoji: '🩸',
    description: 'Pork blood stew with vinegar',
    recommendedMinutes: 90,
    servings: 6,
    nutrition: {
      calories: 1000,
      protein: 40,
      carbs: 25,
      fat: 40,
      fiber: 6,
      sodium: 1800,
      sugar: 8
    },
    ingredients: [
      { name: 'Pork belly', amount: 500, unit: 'g' },
      { name: 'Pork blood', amount: 1, unit: 'cup' },
      { name: 'Vinegar', amount: 0.5, unit: 'cup' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Onion', amount: 2, unit: 'pieces' },
      { name: 'Chili peppers', amount: 4, unit: 'pieces' },
      { name: 'Bay leaves', amount: 3, unit: 'pieces' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Sauté garlic and onion until fragrant (3-4 minutes)',
      'Add pork and cook until browned (8-10 minutes)',
      'Add vinegar and bay leaves',
      'Simmer for 45 minutes until pork is tender (set timer for 45 minutes)',
      'Add pork blood and stir continuously',
      'Cook for 15 minutes until sauce thickens (set timer for 15 minutes)',
      'Add chili peppers and cook for 5 minutes',
      'Serve hot with steamed rice'
    ],
    tips: [
      'Stir continuously when adding blood to prevent curdling',
      'Use fresh pork blood for best results',
      'Don\'t overcook the blood'
    ],
    defaultNotes: 'Rich and flavorful dish with unique taste.'
  },
  'pancit-malabon': {
    title: 'Pancit Malabon',
    emoji: '🦐',
    description: 'Thick rice noodles with seafood',
    recommendedMinutes: 35,
    servings: 4,
    nutrition: {
      calories: 650,
      protein: 30,
      carbs: 85,
      fat: 18,
      fiber: 8,
      sodium: 1400,
      sugar: 12
    },
    ingredients: [
      { name: 'Thick rice noodles', amount: 400, unit: 'g' },
      { name: 'Shrimp', amount: 300, unit: 'g' },
      { name: 'Squid', amount: 200, unit: 'g' },
      { name: 'Pork belly', amount: 200, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Cabbage', amount: 0.5, unit: 'head' },
      { name: 'Achuete oil', amount: 2, unit: 'tbsp' },
      { name: 'Garlic', amount: 6, unit: 'cloves' }
    ],
    steps: [
      'Soak noodles in warm water for 15 minutes',
      'Sauté garlic until fragrant (2-3 minutes)',
      'Add pork and cook until browned (5-7 minutes)',
      'Add seafood and cook for 3 minutes',
      'Add vegetables and stir-fry (set timer for 8 minutes)',
      'Add noodles and achuete oil',
      'Stir-fry until well combined (set timer for 5 minutes)',
      'Serve hot with calamansi'
    ],
    tips: [
      'Use fresh seafood for best flavor',
      'Don\'t overcook the seafood',
      'Add calamansi juice for authentic taste'
    ],
    defaultNotes: 'Rich and flavorful noodle dish from Malabon.'
  },
  'kare-kareng-pata': {
    title: 'Kare-Kareng Pata',
    emoji: '🍖',
    description: 'Peanut stew with pork hock',
    recommendedMinutes: 150,
    servings: 6,
    nutrition: {
      calories: 450,
      protein: 25,
      carbs: 15,
      fat: 35,
      fiber: 4,
      sodium: 1200,
      sugar: 3
    },
    ingredients: [
      { name: 'Pork hock', amount: 1.5, unit: 'kg' },
      { name: 'Peanut butter', amount: 0.5, unit: 'cup' },
      { name: 'String beans', amount: 200, unit: 'g' },
      { name: 'Eggplant', amount: 2, unit: 'pieces' },
      { name: 'Bok choy', amount: 200, unit: 'g' },
      { name: 'Achuete powder', amount: 2, unit: 'tbsp' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Fish sauce', amount: 3, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Boil pork hock until tender, about 1 hour',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add pork hock and cook for 5-6 minutes',
      'Add achuete powder and stir well (2-3 minutes)',
      'Add peanut butter and fish sauce, simmer for 10-15 minutes',
      'Add string beans and cook for 5-6 minutes',
      'Add eggplant and cook for 3-4 minutes',
      'Add bok choy and cook for 2-3 minutes',
      'Serve hot with bagoong on the side'
    ],
    tips: [
      'Use fresh pork hock for best results',
      'Don\'t overcook the vegetables',
      'Adjust peanut butter amount to taste',
      'Serve with bagoong for authentic flavor'
    ],
    defaultNotes: 'A rich and hearty dish perfect for special occasions.'
  },
  'chicken-arroz-caldo': {
    title: 'Chicken Arroz Caldo',
    emoji: '🍚',
    description: 'Chicken rice porridge with ginger',
    recommendedMinutes: 50,
    servings: 4,
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 45,
      fat: 12,
      fiber: 2,
      sodium: 800,
      sugar: 1
    },
    ingredients: [
      { name: 'Chicken pieces', amount: 800, unit: 'g' },
      { name: 'Rice', amount: 1, unit: 'cup' },
      { name: 'Ginger', amount: 50, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Fish sauce', amount: 3, unit: 'tbsp' },
      { name: 'Chicken broth', amount: 6, unit: 'cups' },
      { name: 'Green onions', amount: 4, unit: 'pieces' },
      { name: 'Calamansi', amount: 4, unit: 'pieces' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Sauté garlic, onion, and ginger in oil until fragrant (3-4 minutes)',
      'Add chicken pieces and cook until browned (5-6 minutes)',
      'Add fish sauce and stir well (1-2 minutes)',
      'Add rice and stir for 2-3 minutes',
      'Add chicken broth and bring to boil (5-6 minutes)',
      'Reduce heat and simmer until rice is cooked (20-25 minutes)',
      'Stir occasionally to prevent sticking',
      'Garnish with green onions and serve with calamansi'
    ],
    tips: [
      'Use sticky rice for better texture',
      'Don\'t stir too much to avoid breaking the rice',
      'Adjust fish sauce to taste',
      'Serve hot for best flavor'
    ],
    defaultNotes: 'A comforting rice porridge perfect for cold weather or when feeling under the weather.'
  },
  'ginisang-monggo': {
    title: 'Ginisang Monggo',
    emoji: '🫘',
    description: 'Mung bean soup with vegetables',
    recommendedMinutes: 80,
    servings: 6,
    nutrition: {
      calories: 280,
      protein: 15,
      carbs: 35,
      fat: 8,
      fiber: 8,
      sodium: 600,
      sugar: 2
    },
    ingredients: [
      { name: 'Mung beans', amount: 300, unit: 'g' },
      { name: 'Pork belly', amount: 200, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Tomato', amount: 2, unit: 'pieces' },
      { name: 'Spinach', amount: 200, unit: 'g' },
      { name: 'Fish sauce', amount: 2, unit: 'tbsp' },
      { name: 'Chicken broth', amount: 4, unit: 'cups' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Soak mung beans in water for 2 hours or overnight',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add pork belly and cook until browned (5-6 minutes)',
      'Add tomatoes and cook until soft (3-4 minutes)',
      'Add mung beans and chicken broth (5-6 minutes)',
      'Bring to boil and simmer until beans are tender (45-50 minutes)',
      'Add fish sauce and adjust seasoning (2-3 minutes)',
      'Add spinach and cook for 2-3 minutes',
      'Serve hot with rice'
    ],
    tips: [
      'Soak beans overnight for faster cooking',
      'Don\'t overcook the spinach',
      'Adjust fish sauce to taste',
      'Can be made vegetarian by omitting pork'
    ],
    defaultNotes: 'A healthy and nutritious soup that\'s perfect for any day of the week.'
  },
  'pancit-palabok': {
    title: 'Pancit Palabok',
    emoji: '🍜',
    description: 'Rice noodles with shrimp sauce',
    recommendedMinutes: 40,
    servings: 4,
    nutrition: {
      calories: 420,
      protein: 15,
      carbs: 50,
      fat: 20,
      fiber: 3,
      sodium: 900,
      sugar: 2
    },
    ingredients: [
      { name: 'Rice noodles', amount: 400, unit: 'g' },
      { name: 'Shrimp sauce', amount: 0.5, unit: 'cup' },
      { name: 'Pork belly', amount: 200, unit: 'g' },
      { name: 'Shrimp', amount: 200, unit: 'g' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Green onions', amount: 4, unit: 'pieces' },
      { name: 'Calamansi', amount: 4, unit: 'pieces' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Prepare shrimp sauce by mixing shrimp paste with water (5 minutes)',
      'Boil rice noodles until al dente, drain and set aside (8-10 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add pork belly and cook until browned (5-6 minutes)',
      'Add shrimp and cook for 2-3 minutes',
      'Add shrimp sauce and simmer for 3-4 minutes',
      'Add noodles and toss until well combined (2-3 minutes)',
      'Garnish with green onions and serve with calamansi'
    ],
    tips: [
      'Use fresh shrimp for best flavor',
      'Don\'t overcook the noodles',
      'Adjust shrimp sauce amount to taste',
      'Serve immediately while hot'
    ],
    defaultNotes: 'A flavorful noodle dish with rich shrimp sauce.'
  },
  'chicken-inasal': {
    title: 'Chicken Inasal',
    emoji: '🍗',
    description: 'Grilled chicken marinated in calamansi',
    recommendedMinutes: 60,
    servings: 4,
    nutrition: {
      calories: 380,
      protein: 35,
      carbs: 5,
      fat: 25,
      fiber: 1,
      sodium: 800,
      sugar: 2
    },
    ingredients: [
      { name: 'Chicken pieces', amount: 1, unit: 'kg' },
      { name: 'Calamansi juice', amount: 0.5, unit: 'cup' },
      { name: 'Soy sauce', amount: 0.25, unit: 'cup' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Ginger', amount: 30, unit: 'g' },
      { name: 'Atsuete oil', amount: 2, unit: 'tbsp' },
      { name: 'Salt and pepper', amount: 1, unit: 'tsp' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Marinate chicken in calamansi juice, soy sauce, garlic, and ginger for 2 hours',
      'Prepare atsuete oil by heating oil with atsuete seeds (5 minutes)',
      'Brush chicken with atsuete oil (2-3 minutes)',
      'Grill chicken over medium heat for 20-25 minutes per side',
      'Baste with marinade every 10 minutes',
      'Cook until internal temperature reaches 165°F',
      'Let rest for 5 minutes before serving',
      'Serve with garlic rice and dipping sauce'
    ],
    tips: [
      'Marinate overnight for best flavor',
      'Don\'t overcook the chicken',
      'Use fresh calamansi for authentic taste',
      'Serve with atchara (pickled papaya)'
    ],
    defaultNotes: 'A famous grilled chicken dish from Bacolod, known for its tangy and savory flavor.'
  },
  'beef-mechado': {
    title: 'Beef Mechado',
    emoji: '🥩',
    description: 'Beef stew with tomato sauce and vegetables',
    recommendedMinutes: 120,
    servings: 6,
    nutrition: {
      calories: 450,
      protein: 30,
      carbs: 20,
      fat: 30,
      fiber: 4,
      sodium: 1000,
      sugar: 5
    },
    ingredients: [
      { name: 'Beef chuck', amount: 1, unit: 'kg' },
      { name: 'Tomato sauce', amount: 2, unit: 'cups' },
      { name: 'Potatoes', amount: 4, unit: 'pieces' },
      { name: 'Carrots', amount: 3, unit: 'pieces' },
      { name: 'Bell peppers', amount: 2, unit: 'pieces' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Onion', amount: 2, unit: 'pieces' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Bay leaves', amount: 3, unit: 'pieces' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Cut beef into chunks and season with salt and pepper (5 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add beef and brown on all sides (8-10 minutes)',
      'Add soy sauce and stir well (2-3 minutes)',
      'Add tomato sauce and bay leaves (5-6 minutes)',
      'Add water and bring to boil (5-6 minutes)',
      'Simmer until beef is tender, about 1 hour',
      'Add potatoes and carrots, cook for 15-20 minutes',
      'Add bell peppers and cook for 5-6 minutes',
      'Serve hot with rice'
    ],
    tips: [
      'Use beef chuck for tender results',
      'Don\'t overcook the vegetables',
      'Adjust seasoning to taste',
      'Can be made ahead and reheated'
    ],
    defaultNotes: 'A hearty beef stew that\'s perfect for family gatherings.'
  },
  'pancit-sotanghon': {
    title: 'Pancit Sotanghon',
    emoji: '🍜',
    description: 'Glass noodles with chicken and vegetables',
    recommendedMinutes: 30,
    servings: 4,
    nutrition: {
      calories: 350,
      protein: 12,
      carbs: 40,
      fat: 15,
      fiber: 3,
      sodium: 700,
      sugar: 2
    },
    ingredients: [
      { name: 'Glass noodles', amount: 300, unit: 'g' },
      { name: 'Chicken breast', amount: 300, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Cabbage', amount: 200, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Oyster sauce', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Soak glass noodles in water for 15 minutes',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add chicken and cook until browned (5-6 minutes)',
      'Add carrots and cook for 3-4 minutes',
      'Add cabbage and cook for 2-3 minutes',
      'Add soaked noodles and stir well (2-3 minutes)',
      'Add soy sauce and oyster sauce (2-3 minutes)',
      'Toss until well combined and serve hot'
    ],
    tips: [
      'Don\'t overcook the glass noodles',
      'Use fresh vegetables for best taste',
      'Adjust sauce amounts to taste',
      'Serve immediately while hot'
    ],
    defaultNotes: 'A light and healthy noodle dish perfect for any meal.'
  },
  'chicken-afritada': {
    title: 'Chicken Afritada',
    emoji: '🍗',
    description: 'Chicken stew with tomato sauce and potatoes',
    recommendedMinutes: 60,
    servings: 4,
    nutrition: {
      calories: 380,
      protein: 25,
      carbs: 25,
      fat: 20,
      fiber: 3,
      sodium: 800,
      sugar: 4
    },
    ingredients: [
      { name: 'Chicken pieces', amount: 800, unit: 'g' },
      { name: 'Tomato sauce', amount: 1.5, unit: 'cups' },
      { name: 'Potatoes', amount: 3, unit: 'pieces' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Bell peppers', amount: 2, unit: 'pieces' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'Bay leaves', amount: 2, unit: 'pieces' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Season chicken with salt and pepper (2-3 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add chicken and brown on all sides (8-10 minutes)',
      'Add soy sauce and stir well (2-3 minutes)',
      'Add tomato sauce and bay leaves (5-6 minutes)',
      'Add water and bring to boil (5-6 minutes)',
      'Simmer until chicken is tender, about 30 minutes',
      'Add potatoes and carrots, cook for 15-20 minutes',
      'Add bell peppers and cook for 5-6 minutes',
      'Serve hot with rice'
    ],
    tips: [
      'Use chicken thighs for better flavor',
      'Don\'t overcook the vegetables',
      'Adjust seasoning to taste',
      'Can be made ahead and reheated'
    ],
    defaultNotes: 'A classic Filipino chicken stew that\'s perfect for family meals.'
  },
  'beef-tapa': {
    title: 'Beef Tapa',
    emoji: '🥩',
    description: 'Cured beef strips with garlic rice',
    recommendedMinutes: 20,
    servings: 2,
    nutrition: {
      calories: 350,
      protein: 30,
      carbs: 25,
      fat: 15,
      fiber: 1,
      sodium: 900,
      sugar: 2
    },
    ingredients: [
      { name: 'Beef sirloin', amount: 400, unit: 'g' },
      { name: 'Soy sauce', amount: 0.25, unit: 'cup' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Sugar', amount: 2, unit: 'tbsp' },
      { name: 'Black pepper', amount: 1, unit: 'tsp' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' },
      { name: 'Rice', amount: 2, unit: 'cups' },
      { name: 'Eggs', amount: 2, unit: 'pieces' }
    ],
    steps: [
      'Slice beef thinly against the grain (5 minutes)',
      'Marinate beef in soy sauce, garlic, sugar, and pepper for 2 hours',
      'Cook rice with garlic until fluffy (20-25 minutes)',
      'Heat oil in pan over medium heat (2-3 minutes)',
      'Fry beef strips until browned and crispy (8-10 minutes)',
      'Fry eggs sunny side up (3-4 minutes)',
      'Serve beef with garlic rice and fried eggs'
    ],
    tips: [
      'Marinate overnight for best flavor',
      'Don\'t overcook the beef',
      'Use fresh garlic for authentic taste',
      'Serve with atchara (pickled papaya)'
    ],
    defaultNotes: 'A classic Filipino breakfast dish that\'s perfect for any time of day.'
  },
  'pancit-luglug': {
    title: 'Pancit Luglug',
    emoji: '🍜',
    description: 'Thick rice noodles with shrimp sauce',
    recommendedMinutes: 35,
    servings: 4,
    nutrition: {
      calories: 400,
      protein: 14,
      carbs: 48,
      fat: 18,
      fiber: 3,
      sodium: 850,
      sugar: 2
    },
    ingredients: [
      { name: 'Thick rice noodles', amount: 400, unit: 'g' },
      { name: 'Shrimp sauce', amount: 0.5, unit: 'cup' },
      { name: 'Pork belly', amount: 200, unit: 'g' },
      { name: 'Shrimp', amount: 200, unit: 'g' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Green onions', amount: 4, unit: 'pieces' },
      { name: 'Calamansi', amount: 4, unit: 'pieces' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Prepare shrimp sauce by mixing shrimp paste with water (5 minutes)',
      'Boil thick rice noodles until al dente, drain and set aside (8-10 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add pork belly and cook until browned (5-6 minutes)',
      'Add shrimp and cook for 2-3 minutes',
      'Add shrimp sauce and simmer for 3-4 minutes',
      'Add noodles and toss until well combined (2-3 minutes)',
      'Garnish with green onions and serve with calamansi'
    ],
    tips: [
      'Use fresh shrimp for best flavor',
      'Don\'t overcook the noodles',
      'Adjust shrimp sauce amount to taste',
      'Serve immediately while hot'
    ],
    defaultNotes: 'A rich and flavorful noodle dish from Pampanga.'
  },
  'chicken-menudo': {
    title: 'Chicken Menudo',
    emoji: '🍗',
    description: 'Chicken stew with tomato sauce and vegetables',
    recommendedMinutes: 60,
    servings: 4,
    nutrition: {
      calories: 360,
      protein: 22,
      carbs: 20,
      fat: 18,
      fiber: 3,
      sodium: 750,
      sugar: 4
    },
    ingredients: [
      { name: 'Chicken pieces', amount: 600, unit: 'g' },
      { name: 'Tomato sauce', amount: 1, unit: 'cup' },
      { name: 'Potatoes', amount: 2, unit: 'pieces' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Bell peppers', amount: 1, unit: 'piece' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'Bay leaves', amount: 2, unit: 'pieces' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Season chicken with salt and pepper (2-3 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add chicken and brown on all sides (8-10 minutes)',
      'Add soy sauce and stir well (2-3 minutes)',
      'Add tomato sauce and bay leaves (5-6 minutes)',
      'Add water and bring to boil (5-6 minutes)',
      'Simmer until chicken is tender, about 30 minutes',
      'Add potatoes and carrots, cook for 15-20 minutes',
      'Add bell peppers and cook for 5-6 minutes',
      'Serve hot with rice'
    ],
    tips: [
      'Use chicken thighs for better flavor',
      'Don\'t overcook the vegetables',
      'Adjust seasoning to taste',
      'Can be made ahead and reheated'
    ],
    defaultNotes: 'A comforting chicken stew that\'s perfect for family meals.'
  },
  'beef-nilaga': {
    title: 'Beef Nilaga',
    emoji: '🥩',
    description: 'Boiled beef with vegetables',
    recommendedMinutes: 120,
    servings: 6,
    nutrition: {
      calories: 420,
      protein: 28,
      carbs: 15,
      fat: 25,
      fiber: 4,
      sodium: 600,
      sugar: 3
    },
    ingredients: [
      { name: 'Beef chuck', amount: 1, unit: 'kg' },
      { name: 'Potatoes', amount: 4, unit: 'pieces' },
      { name: 'Carrots', amount: 3, unit: 'pieces' },
      { name: 'Cabbage', amount: 0.5, unit: 'head' },
      { name: 'Corn', amount: 2, unit: 'pieces' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Black peppercorns', amount: 1, unit: 'tsp' },
      { name: 'Fish sauce', amount: 2, unit: 'tbsp' },
      { name: 'Water', amount: 8, unit: 'cups' }
    ],
    steps: [
      'Cut beef into chunks and season with salt and pepper (5 minutes)',
      'Boil water in a large pot (5-6 minutes)',
      'Add beef and bring to boil (5-6 minutes)',
      'Skim off foam and reduce heat (2-3 minutes)',
      'Add garlic, onion, and peppercorns (5-6 minutes)',
      'Simmer until beef is tender, about 1 hour',
      'Add potatoes and carrots, cook for 15-20 minutes',
      'Add corn and cook for 5-6 minutes',
      'Add cabbage and cook for 3-4 minutes',
      'Add fish sauce and serve hot'
    ],
    tips: [
      'Use beef chuck for tender results',
      'Don\'t overcook the vegetables',
      'Adjust seasoning to taste',
      'Serve with fish sauce and calamansi'
    ],
    defaultNotes: 'A simple and healthy beef soup that\'s perfect for any day.'
  },
  'pancit-canton-guisado': {
    title: 'Pancit Canton Guisado',
    emoji: '🍜',
    description: 'Stir-fried egg noodles with vegetables',
    recommendedMinutes: 25,
    servings: 4,
    nutrition: {
      calories: 380,
      protein: 12,
      carbs: 45,
      fat: 18,
      fiber: 3,
      sodium: 800,
      sugar: 2
    },
    ingredients: [
      { name: 'Egg noodles', amount: 400, unit: 'g' },
      { name: 'Pork belly', amount: 200, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Cabbage', amount: 200, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Oyster sauce', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Boil egg noodles until al dente, drain and set aside (8-10 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add pork belly and cook until browned (5-6 minutes)',
      'Add carrots and cook for 3-4 minutes',
      'Add cabbage and cook for 2-3 minutes',
      'Add noodles and stir well (2-3 minutes)',
      'Add soy sauce and oyster sauce (2-3 minutes)',
      'Toss until well combined and serve hot'
    ],
    tips: [
      'Don\'t overcook the noodles',
      'Use fresh vegetables for best taste',
      'Adjust sauce amounts to taste',
      'Serve immediately while hot'
    ],
    defaultNotes: 'A quick and easy noodle dish perfect for busy weeknights.'
  },
  'chicken-sopas': {
    title: 'Chicken Sopas',
    emoji: '🍲',
    description: 'Chicken macaroni soup with milk',
    recommendedMinutes: 45,
    servings: 6,
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 35,
      fat: 12,
      fiber: 2,
      sodium: 700,
      sugar: 3
    },
    ingredients: [
      { name: 'Chicken pieces', amount: 600, unit: 'g' },
      { name: 'Macaroni', amount: 200, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Cabbage', amount: 200, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Evaporated milk', amount: 1, unit: 'can' },
      { name: 'Chicken broth', amount: 6, unit: 'cups' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add chicken and cook until browned (5-6 minutes)',
      'Add chicken broth and bring to boil (5-6 minutes)',
      'Simmer until chicken is tender, about 20 minutes',
      'Add macaroni and cook for 8-10 minutes',
      'Add carrots and cook for 5-6 minutes',
      'Add cabbage and cook for 3-4 minutes',
      'Add evaporated milk and stir well (2-3 minutes)',
      'Serve hot'
    ],
    tips: [
      'Don\'t overcook the macaroni',
      'Use fresh vegetables for best taste',
      'Adjust milk amount to taste',
      'Serve hot for best flavor'
    ],
    defaultNotes: 'A creamy and comforting soup perfect for cold weather.'
  },
  'beef-pochero': {
    title: 'Beef Pochero',
    emoji: '🥩',
    description: 'Beef stew with banana and vegetables',
    recommendedMinutes: 120,
    servings: 6,
    nutrition: {
      calories: 450,
      protein: 30,
      carbs: 25,
      fat: 30,
      fiber: 4,
      sodium: 900,
      sugar: 5
    },
    ingredients: [
      { name: 'Beef chuck', amount: 1, unit: 'kg' },
      { name: 'Tomato sauce', amount: 1.5, unit: 'cups' },
      { name: 'Potatoes', amount: 4, unit: 'pieces' },
      { name: 'Carrots', amount: 3, unit: 'pieces' },
      { name: 'Banana', amount: 2, unit: 'pieces' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Onion', amount: 2, unit: 'pieces' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Bay leaves', amount: 3, unit: 'pieces' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Cut beef into chunks and season with salt and pepper (5 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add beef and brown on all sides (8-10 minutes)',
      'Add soy sauce and stir well (2-3 minutes)',
      'Add tomato sauce and bay leaves (5-6 minutes)',
      'Add water and bring to boil (5-6 minutes)',
      'Simmer until beef is tender, about 1 hour',
      'Add potatoes and carrots, cook for 15-20 minutes',
      'Add banana and cook for 5-6 minutes',
      'Serve hot with rice'
    ],
    tips: [
      'Use beef chuck for tender results',
      'Don\'t overcook the vegetables',
      'Adjust seasoning to taste',
      'Can be made ahead and reheated'
    ],
    defaultNotes: 'A hearty beef stew with a unique banana twist.'
  },
  'pancit-habhab': {
    title: 'Pancit Habhab',
    emoji: '🍜',
    description: 'Stir-fried rice noodles from Quezon',
    recommendedMinutes: 30,
    servings: 4,
    nutrition: {
      calories: 350,
      protein: 10,
      carbs: 42,
      fat: 15,
      fiber: 3,
      sodium: 750,
      sugar: 2
    },
    ingredients: [
      { name: 'Rice noodles', amount: 400, unit: 'g' },
      { name: 'Pork belly', amount: 200, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Cabbage', amount: 200, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Oyster sauce', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Boil rice noodles until al dente, drain and set aside (8-10 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add pork belly and cook until browned (5-6 minutes)',
      'Add carrots and cook for 3-4 minutes',
      'Add cabbage and cook for 2-3 minutes',
      'Add noodles and stir well (2-3 minutes)',
      'Add soy sauce and oyster sauce (2-3 minutes)',
      'Toss until well combined and serve hot'
    ],
    tips: [
      'Don\'t overcook the noodles',
      'Use fresh vegetables for best taste',
      'Adjust sauce amounts to taste',
      'Serve immediately while hot'
    ],
    defaultNotes: 'A traditional noodle dish from Quezon province.'
  },
  'chicken-pastel': {
    title: 'Chicken Pastel',
    emoji: '🥧',
    description: 'Chicken pie with vegetables and cream',
    recommendedMinutes: 90,
    servings: 4,
    nutrition: {
      calories: 480,
      protein: 25,
      carbs: 30,
      fat: 35,
      fiber: 3,
      sodium: 800,
      sugar: 4
    },
    ingredients: [
      { name: 'Chicken breast', amount: 600, unit: 'g' },
      { name: 'Pie crust', amount: 2, unit: 'pieces' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Peas', amount: 100, unit: 'g' },
      { name: 'Garlic', amount: 4, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Heavy cream', amount: 1, unit: 'cup' },
      { name: 'Butter', amount: 3, unit: 'tbsp' },
      { name: 'Flour', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Preheat oven to 375°F (5 minutes)',
      'Cook chicken until tender, shred and set aside (20-25 minutes)',
      'Sauté garlic and onion in butter until fragrant (3-4 minutes)',
      'Add flour and stir well (2-3 minutes)',
      'Add cream and stir until thickened (5-6 minutes)',
      'Add chicken and vegetables, cook for 5-6 minutes',
      'Line pie dish with crust (5 minutes)',
      'Fill with chicken mixture and cover with top crust (10 minutes)',
      'Bake until golden brown, about 30 minutes',
      'Let rest for 10 minutes before serving'
    ],
    tips: [
      'Use fresh vegetables for best taste',
      'Don\'t overcook the filling',
      'Brush crust with egg wash for golden color',
      'Serve warm for best flavor'
    ],
    defaultNotes: 'A rich and creamy chicken pie perfect for special occasions.'
  },
  'beef-estofado': {
    title: 'Beef Estofado',
    emoji: '🥩',
    description: 'Beef stew with sweet sauce and vegetables',
    recommendedMinutes: 120,
    servings: 6,
    nutrition: {
      calories: 440,
      protein: 28,
      carbs: 22,
      fat: 32,
      fiber: 3,
      sodium: 850,
      sugar: 6
    },
    ingredients: [
      { name: 'Beef chuck', amount: 1, unit: 'kg' },
      { name: 'Tomato sauce', amount: 1.5, unit: 'cups' },
      { name: 'Potatoes', amount: 4, unit: 'pieces' },
      { name: 'Carrots', amount: 3, unit: 'pieces' },
      { name: 'Bell peppers', amount: 2, unit: 'pieces' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Onion', amount: 2, unit: 'pieces' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Sugar', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Cut beef into chunks and season with salt and pepper (5 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add beef and brown on all sides (8-10 minutes)',
      'Add soy sauce and sugar, stir well (2-3 minutes)',
      'Add tomato sauce and bring to boil (5-6 minutes)',
      'Add water and simmer until beef is tender, about 1 hour',
      'Add potatoes and carrots, cook for 15-20 minutes',
      'Add bell peppers and cook for 5-6 minutes',
      'Serve hot with rice'
    ],
    tips: [
      'Use beef chuck for tender results',
      'Don\'t overcook the vegetables',
      'Adjust sweetness to taste',
      'Can be made ahead and reheated'
    ],
    defaultNotes: 'A sweet and savory beef stew that\'s perfect for family gatherings.'
  },
  'pancit-molo': {
    title: 'Pancit Molo',
    emoji: '🥟',
    description: 'Dumpling soup with ground pork',
    recommendedMinutes: 60,
    servings: 4,
    nutrition: {
      calories: 380,
      protein: 18,
      carbs: 35,
      fat: 20,
      fiber: 2,
      sodium: 800,
      sugar: 2
    },
    ingredients: [
      { name: 'Ground pork', amount: 400, unit: 'g' },
      { name: 'Wonton wrappers', amount: 1, unit: 'pack' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Green onions', amount: 4, unit: 'pieces' },
      { name: 'Chicken broth', amount: 6, unit: 'cups' },
      { name: 'Soy sauce', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 2, unit: 'tbsp' }
    ],
    steps: [
      'Mix ground pork with garlic, onion, and seasonings (5 minutes)',
      'Fill wonton wrappers with pork mixture (15-20 minutes)',
      'Bring chicken broth to boil (5-6 minutes)',
      'Add dumplings and cook for 5-6 minutes',
      'Add soy sauce and adjust seasoning (2-3 minutes)',
      'Garnish with green onions and serve hot'
    ],
    tips: [
      'Don\'t overfill the dumplings',
      'Use fresh wonton wrappers',
      'Adjust seasoning to taste',
      'Serve immediately while hot'
    ],
    defaultNotes: 'A comforting dumpling soup perfect for cold weather.'
  },
  'chicken-relleno': {
    title: 'Chicken Relleno',
    emoji: '🍗',
    description: 'Stuffed chicken with ground pork',
    recommendedMinutes: 120,
    servings: 4,
    nutrition: {
      calories: 520,
      protein: 35,
      carbs: 15,
      fat: 40,
      fiber: 2,
      sodium: 900,
      sugar: 3
    },
    ingredients: [
      { name: 'Whole chicken', amount: 1.5, unit: 'kg' },
      { name: 'Ground pork', amount: 300, unit: 'g' },
      { name: 'Garlic', amount: 8, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Raisins', amount: 50, unit: 'g' },
      { name: 'Hard-boiled eggs', amount: 2, unit: 'pieces' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Debone chicken carefully, keeping skin intact (20-25 minutes)',
      'Mix ground pork with garlic, onion, and seasonings (5-6 minutes)',
      'Stuff chicken with pork mixture, raisins, and eggs (10-15 minutes)',
      'Sew or secure opening with toothpicks (5 minutes)',
      'Season outside with salt and pepper (2-3 minutes)',
      'Roast in oven at 350°F for 1 hour',
      'Baste with oil every 20 minutes',
      'Let rest for 10 minutes before slicing'
    ],
    tips: [
      'Use a sharp knife for deboning',
      'Don\'t overstuff the chicken',
      'Secure opening well to prevent leakage',
      'Serve with gravy on the side'
    ],
    defaultNotes: 'An elegant stuffed chicken dish perfect for special occasions.'
  },
  'beef-morcon': {
    title: 'Beef Morcon',
    emoji: '🥩',
    description: 'Stuffed beef roll with vegetables',
    recommendedMinutes: 150,
    servings: 4,
    nutrition: {
      calories: 480,
      protein: 32,
      carbs: 18,
      fat: 35,
      fiber: 3,
      sodium: 950,
      sugar: 4
    },
    ingredients: [
      { name: 'Beef flank steak', amount: 800, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Pickles', amount: 4, unit: 'pieces' },
      { name: 'Hard-boiled eggs', amount: 2, unit: 'pieces' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Butterfly beef steak and pound to even thickness (10-15 minutes)',
      'Season beef with salt and pepper (2-3 minutes)',
      'Arrange carrots, pickles, and eggs on beef (5-6 minutes)',
      'Roll beef tightly and secure with kitchen twine (5 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add beef roll and brown on all sides (8-10 minutes)',
      'Add soy sauce and water, bring to boil (5-6 minutes)',
      'Simmer until beef is tender, about 1 hour',
      'Let rest for 10 minutes before slicing'
    ],
    tips: [
      'Use a meat mallet to pound beef evenly',
      'Don\'t overstuff the roll',
      'Secure roll tightly with twine',
      'Serve with gravy on the side'
    ],
    defaultNotes: 'A festive beef roll perfect for holiday celebrations.'
  },
  'pancit-batil-patung': {
    title: 'Pancit Batil Patung',
    emoji: '🍜',
    description: 'Egg noodles with carabao meat from Tuguegarao',
    recommendedMinutes: 45,
    servings: 4,
    nutrition: {
      calories: 420,
      protein: 16,
      carbs: 45,
      fat: 20,
      fiber: 3,
      sodium: 850,
      sugar: 2
    },
    ingredients: [
      { name: 'Egg noodles', amount: 400, unit: 'g' },
      { name: 'Carabao meat', amount: 300, unit: 'g' },
      { name: 'Carrots', amount: 2, unit: 'pieces' },
      { name: 'Cabbage', amount: 200, unit: 'g' },
      { name: 'Garlic', amount: 6, unit: 'cloves' },
      { name: 'Onion', amount: 1, unit: 'piece' },
      { name: 'Soy sauce', amount: 3, unit: 'tbsp' },
      { name: 'Oyster sauce', amount: 2, unit: 'tbsp' },
      { name: 'Cooking oil', amount: 3, unit: 'tbsp' }
    ],
    steps: [
      'Boil egg noodles until al dente, drain and set aside (8-10 minutes)',
      'Sauté garlic and onion in oil until fragrant (3-4 minutes)',
      'Add carabao meat and cook until browned (8-10 minutes)',
      'Add carrots and cook for 3-4 minutes',
      'Add cabbage and cook for 2-3 minutes',
      'Add noodles and stir well (2-3 minutes)',
      'Add soy sauce and oyster sauce (2-3 minutes)',
      'Toss until well combined and serve hot'
    ],
    tips: [
      'Use fresh carabao meat for authentic taste',
      'Don\'t overcook the noodles',
      'Adjust sauce amounts to taste',
      'Serve immediately while hot'
    ],
    defaultNotes: 'A unique noodle dish from Tuguegarao featuring carabao meat.'
  }
}

export default function FilipinoDishPage() {
  const params = useParams()
  const router = useRouter()
  const dishName = params.dish as string
  const dish = filipinoDishes[dishName]
  
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleBack = () => {
    router.back()
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