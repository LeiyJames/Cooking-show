'use client'

import React from 'react'
import Header from './components/Header'
import FoodCard from './components/FoodCard'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Filipino Food Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">🍽️ Popular Filipino Dishes</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">Discover authentic Filipino recipes with step-by-step instructions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <FoodCard 
            title="Adobo"
            description="Classic Filipino chicken or pork adobo with soy sauce and vinegar"
            image="🍗"
            href="/filipino/adobo"
            cookingTime={45}
            difficulty="Medium"
            servings={6}
            rating={4.8}
          />
          <FoodCard 
            title="Sinigang"
            description="Sour tamarind soup with pork and vegetables"
            image="🥘"
            href="/filipino/sinigang"
            cookingTime={90}
            difficulty="Medium"
            servings={8}
            rating={4.6}
          />
          <FoodCard 
            title="Kare-Kare"
            description="Peanut stew with beef and vegetables"
            image="🥜"
            href="/filipino/kare-kare"
            cookingTime={120}
            difficulty="Hard"
            servings={6}
            rating={4.7}
          />
          <FoodCard 
            title="Lechon Kawali"
            description="Crispy fried pork belly"
            image="🥓"
            href="/filipino/lechon-kawali"
            cookingTime={75}
            difficulty="Medium"
            servings={4}
            rating={4.5}
          />
          <FoodCard 
            title="Pancit Canton"
            description="Stir-fried noodles with vegetables and meat"
            image="🍜"
            href="/filipino/pancit-canton"
            cookingTime={25}
            difficulty="Easy"
            servings={4}
            rating={4.4}
          />
          <FoodCard 
            title="Halo-Halo"
            description="Mixed dessert with shaved ice and sweet ingredients"
            image="🍧"
            href="/filipino/halo-halo"
            cookingTime={15}
            difficulty="Easy"
            servings={2}
            rating={4.9}
          />
          <FoodCard 
            title="Tapsilog"
            description="Beef tapa with garlic rice and fried egg"
            image="🍳"
            href="/filipino/tapsilog"
            cookingTime={20}
            difficulty="Easy"
            servings={2}
            rating={4.3}
          />
          <FoodCard 
            title="Longganisa"
            description="Sweet Filipino sausage with garlic rice"
            image="🌭"
            href="/filipino/longganisa"
            cookingTime={15}
            difficulty="Easy"
            servings={2}
            rating={4.2}
          />
          <FoodCard 
            title="Tocino"
            description="Sweet cured pork with garlic rice"
            image="🥩"
            href="/filipino/tocino"
            cookingTime={15}
            difficulty="Easy"
            servings={2}
            rating={4.1}
          />
          <FoodCard 
            title="Chicken Tinola"
            description="Ginger chicken soup with green papaya"
            image="🍲"
            href="/filipino/chicken-tinola"
            cookingTime={60}
            difficulty="Medium"
            servings={6}
            rating={4.4}
          />
          <FoodCard 
            title="Beef Caldereta"
            description="Spicy beef stew with tomato sauce"
            image="🥘"
            href="/filipino/beef-caldereta"
            cookingTime={120}
            difficulty="Hard"
            servings={6}
            rating={4.6}
          />
          <FoodCard 
            title="Pancit Bihon"
            description="Rice noodles with vegetables and meat"
            image="🍝"
            href="/filipino/pancit-bihon"
            cookingTime={30}
            difficulty="Medium"
            servings={4}
            rating={4.3}
          />
          <FoodCard 
            title="Lumpia"
            description="Fresh spring rolls with vegetables"
            image="🥬"
            href="/filipino/lumpia"
            cookingTime={45}
            difficulty="Medium"
            servings={4}
            rating={4.5}
          />
          <FoodCard 
            title="Sisig"
            description="Sizzling pork dish with onions and chili"
            image="🔥"
            href="/filipino/sisig"
            cookingTime={40}
            difficulty="Medium"
            servings={4}
            rating={4.7}
          />
          <FoodCard 
            title="Bulalo"
            description="Beef marrow soup with corn and vegetables"
            image="🍖"
            href="/filipino/bulalo"
            cookingTime={180}
            difficulty="Hard"
            servings={8}
            rating={4.8}
          />
          <FoodCard 
            title="Bicol Express"
            description="Spicy pork with coconut milk and chili"
            image="🌶️"
            href="/filipino/bicol-express"
            cookingTime={60}
            difficulty="Medium"
            servings={4}
            rating={4.4}
          />
          <FoodCard 
            title="Dinuguan"
            description="Pork blood stew with vinegar"
            image="🩸"
            href="/filipino/dinuguan"
            cookingTime={90}
            difficulty="Hard"
            servings={6}
            rating={4.2}
          />
          <FoodCard 
            title="Pancit Malabon"
            description="Thick rice noodles with seafood"
            image="🦐"
            href="/filipino/pancit-malabon"
            cookingTime={35}
            difficulty="Medium"
            servings={4}
            rating={4.5}
          />
          <FoodCard 
            title="Kare-Kareng Pata"
            description="Peanut stew with pork hock"
            image="🍖"
            href="/filipino/kare-kareng-pata"
            cookingTime={150}
            difficulty="Hard"
            servings={6}
            rating={4.6}
          />
          <FoodCard 
            title="Chicken Arroz Caldo"
            description="Chicken rice porridge with ginger"
            image="🍚"
            href="/filipino/chicken-arroz-caldo"
            cookingTime={50}
            difficulty="Medium"
            servings={4}
            rating={4.3}
          />
          <FoodCard 
            title="Ginisang Monggo"
            description="Mung bean soup with vegetables"
            image="🫘"
            href="/filipino/ginisang-monggo"
            cookingTime={80}
            difficulty="Easy"
            servings={6}
            rating={4.1}
          />
          <FoodCard 
            title="Pancit Palabok"
            description="Rice noodles with shrimp sauce"
            image="🍜"
            href="/filipino/pancit-palabok"
            cookingTime={40}
            difficulty="Medium"
            servings={4}
            rating={4.4}
          />
          <FoodCard 
            title="Chicken Inasal"
            description="Grilled chicken marinated in calamansi"
            image="🍗"
            href="/filipino/chicken-inasal"
            cookingTime={60}
            difficulty="Medium"
            servings={4}
            rating={4.7}
          />
          <FoodCard 
            title="Beef Mechado"
            description="Beef stew with tomato sauce and vegetables"
            image="🥩"
            href="/filipino/beef-mechado"
            cookingTime={120}
            difficulty="Hard"
            servings={6}
            rating={4.5}
          />
          <FoodCard 
            title="Pancit Sotanghon"
            description="Glass noodles with chicken and vegetables"
            image="🍜"
            href="/filipino/pancit-sotanghon"
            cookingTime={30}
            difficulty="Easy"
            servings={4}
            rating={4.2}
          />
          <FoodCard 
            title="Chicken Afritada"
            description="Chicken stew with tomato sauce and potatoes"
            image="🍗"
            href="/filipino/chicken-afritada"
            cookingTime={60}
            difficulty="Medium"
            servings={4}
            rating={4.3}
          />
          <FoodCard 
            title="Beef Tapa"
            description="Cured beef strips with garlic rice"
            image="🥩"
            href="/filipino/beef-tapa"
            cookingTime={20}
            difficulty="Easy"
            servings={2}
            rating={4.1}
          />
          <FoodCard 
            title="Pancit Luglug"
            description="Thick rice noodles with shrimp sauce"
            image="🍜"
            href="/filipino/pancit-luglug"
            cookingTime={35}
            difficulty="Medium"
            servings={4}
            rating={4.3}
          />
          <FoodCard 
            title="Chicken Menudo"
            description="Chicken stew with tomato sauce and vegetables"
            image="🍗"
            href="/filipino/chicken-menudo"
            cookingTime={60}
            difficulty="Medium"
            servings={4}
            rating={4.2}
          />
          <FoodCard 
            title="Beef Nilaga"
            description="Boiled beef with vegetables"
            image="🥩"
            href="/filipino/beef-nilaga"
            cookingTime={120}
            difficulty="Medium"
            servings={6}
            rating={4.4}
          />
          <FoodCard 
            title="Pancit Canton Guisado"
            description="Stir-fried egg noodles with vegetables"
            image="🍜"
            href="/filipino/pancit-canton-guisado"
            cookingTime={25}
            difficulty="Easy"
            servings={4}
            rating={4.1}
          />
          <FoodCard 
            title="Chicken Sopas"
            description="Chicken macaroni soup with milk"
            image="🍲"
            href="/filipino/chicken-sopas"
            cookingTime={45}
            difficulty="Easy"
            servings={6}
            rating={4.3}
          />
          <FoodCard 
            title="Beef Pochero"
            description="Beef stew with banana and vegetables"
            image="🥩"
            href="/filipino/beef-pochero"
            cookingTime={120}
            difficulty="Hard"
            servings={6}
            rating={4.5}
          />
          <FoodCard 
            title="Pancit Habhab"
            description="Stir-fried rice noodles from Quezon"
            image="🍜"
            href="/filipino/pancit-habhab"
            cookingTime={30}
            difficulty="Medium"
            servings={4}
            rating={4.2}
          />
          <FoodCard 
            title="Chicken Pastel"
            description="Chicken pie with vegetables and cream"
            image="🥧"
            href="/filipino/chicken-pastel"
            cookingTime={90}
            difficulty="Hard"
            servings={4}
            rating={4.4}
          />
          <FoodCard 
            title="Beef Estofado"
            description="Beef stew with sweet sauce and vegetables"
            image="🥩"
            href="/filipino/beef-estofado"
            cookingTime={120}
            difficulty="Hard"
            servings={6}
            rating={4.3}
          />
          <FoodCard 
            title="Pancit Molo"
            description="Dumpling soup with ground pork"
            image="🥟"
            href="/filipino/pancit-molo"
            cookingTime={60}
            difficulty="Medium"
            servings={4}
            rating={4.2}
          />
          <FoodCard 
            title="Chicken Relleno"
            description="Stuffed chicken with ground pork"
            image="🍗"
            href="/filipino/chicken-relleno"
            cookingTime={120}
            difficulty="Hard"
            servings={4}
            rating={4.6}
          />
          <FoodCard 
            title="Beef Morcon"
            description="Stuffed beef roll with vegetables"
            image="🥩"
            href="/filipino/beef-morcon"
            cookingTime={150}
            difficulty="Hard"
            servings={4}
            rating={4.5}
          />
          <FoodCard 
            title="Pancit Batil Patung"
            description="Egg noodles with carabao meat from Tuguegarao"
            image="🍜"
            href="/filipino/pancit-batil-patung"
            cookingTime={45}
            difficulty="Medium"
            servings={4}
            rating={4.4}
          />
        </div>
      </div>
    </main>
  )
} 