'use client'

import React from 'react'
import Header from '../components/Header'
import FoodCard from '../components/FoodCard'
import { MENU_ITEMS } from './items'

export default function MenuPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">🍽️ Popular Filipino Dishes</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">Discover authentic Filipino recipes with step-by-step instructions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MENU_ITEMS.map((item) => (
            <FoodCard
              key={item.title}
              {...item}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
