# 🍳 Cooking Show - Filipino Recipes

A beautiful, modern cooking app built with Next.js 14, featuring authentic Filipino recipes with step-by-step instructions, interactive timers, and advanced cooking features.

## ✨ Features

### 🍽️ Recipe Collection
- **42 Authentic Filipino Dishes** including Adobo, Sinigang, Kare-Kare, Lechon Kawali, Pancit Canton, Halo-Halo, and many more
- **Complete Recipe Data** with ingredients, step-by-step instructions, cooking tips, and nutrition information
- **Visual Recipe Cards** with cooking time, difficulty level, servings, and ratings
- **Detailed Nutrition Info** including calories, protein, carbs, fat, fiber, sodium, and sugar per serving

### ⏰ Advanced Timer Features
- **Large Digital Countdown Timer** with beautiful animations
- **Timer Presets** - Quick-set buttons (5min, 10min, 15min)
- **Recommended Cooking Times** automatically set for each dish
- **Manual Time Input** for custom durations
- **Screen Wake Lock** - Keeps screen on during cooking
- **Haptic Feedback** - Vibrates when timer finishes
- **Background Notifications** - Alerts when timer completes
- **State Persistence** - Timer continues running after page refresh

### 🧮 Smart Cooking Tools
- **Ingredient Calculator** - Scale recipes up/down based on servings
- **Cooking Progress Tracker** - Visual progress bar for multi-step recipes
- **Touch Gestures** - Swipe between recipe steps on mobile
- **Step-by-Step Instructions** with estimated timing for each step
- **Expandable Recipe Sections** - Ingredients, Steps, Tips, and Notes

### 📱 Progressive Web App (PWA)
- **Installable as Native App** on mobile and desktop
- **Offline Mode** - Cache recipes for offline use
- **Service Worker** for background functionality
- **App Manifest** with proper icons and metadata
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

### 🎨 Modern UI/UX
- **Dark/Light Mode Toggle** with smooth transitions
- **Framer Motion Animations** for smooth interactions
- **Tailwind CSS** for beautiful, responsive design
- **Micro-interactions** and hover effects
- **Landscape Mode Support** for better tablet experience
- **Back to Top Button** for easy navigation
- **Sticky Header** with theme toggle

### 💾 Data Persistence
- **localStorage Integration** - Saves timer state, cooking progress, and ingredient calculator
- **Unique Storage Keys** per dish to prevent conflicts
- **Debounced Saves** to optimize performance
- **Error Handling** for corrupted data
- **State Restoration** on page refresh

### 🍳 Cooking Features
- **Nutrition Information** with detailed breakdown
- **Cooking Progress Visualization** with step completion tracking
- **Ingredient Scaling** with real-time calculations
- **Recipe Notes** - Editable notes saved per dish
- **Cooking Tips** for each recipe
- **Difficulty Levels** (Easy, Medium, Hard)
- **Serving Adjustments** with automatic ingredient scaling

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cooking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PWA**: Service Worker + Manifest
- **State Management**: React Hooks + localStorage
- **Deployment**: Vercel-ready

## 📱 PWA Features

The app is fully installable as a Progressive Web App:

- **Add to Home Screen** on mobile devices
- **Offline Functionality** with cached recipes
- **Native App Experience** with splash screen
- **Background Sync** for timer functionality
- **Push Notifications** for timer alerts

## 🍽️ Available Dishes

### Popular Filipino Dishes (42 Total)

**Main Dishes:**
- Adobo (Chicken/Pork)
- Sinigang (Sour Tamarind Soup)
- Kare-Kare (Peanut Stew)
- Lechon Kawali (Crispy Fried Pork)
- Sisig (Sizzling Pork)
- Bulalo (Beef Marrow Soup)
- Bicol Express (Spicy Pork)
- Dinuguan (Pork Blood Stew)

**Noodle Dishes:**
- Pancit Canton (Stir-fried Noodles)
- Pancit Bihon (Rice Noodles)
- Pancit Malabon (Thick Rice Noodles)
- Pancit Palabok (Rice Noodles with Shrimp Sauce)
- Pancit Sotanghon (Glass Noodles)
- Pancit Luglug (Thick Rice Noodles)
- Pancit Canton Guisado (Stir-fried Egg Noodles)
- Pancit Habhab (Rice Noodles from Quezon)
- Pancit Molo (Dumpling Soup)
- Pancit Batil Patung (Egg Noodles with Carabao Meat)

**Breakfast Dishes:**
- Tapsilog (Beef Tapa with Rice)
- Longganisa (Sweet Filipino Sausage)
- Tocino (Sweet Cured Pork)
- Beef Tapa (Cured Beef Strips)

**Soup Dishes:**
- Chicken Tinola (Ginger Chicken Soup)
- Chicken Arroz Caldo (Chicken Rice Porridge)
- Ginisang Monggo (Mung Bean Soup)
- Chicken Sopas (Chicken Macaroni Soup)
- Beef Nilaga (Boiled Beef with Vegetables)

**Stew Dishes:**
- Beef Caldereta (Spicy Beef Stew)
- Beef Mechado (Beef Stew with Tomato Sauce)
- Chicken Afritada (Chicken Stew)
- Chicken Menudo (Chicken Stew)
- Beef Pochero (Beef Stew with Banana)
- Beef Estofado (Beef Stew with Sweet Sauce)

**Special Dishes:**
- Chicken Inasal (Grilled Chicken)
- Kare-Kareng Pata (Peanut Stew with Pork Hock)
- Chicken Pastel (Chicken Pie)
- Chicken Relleno (Stuffed Chicken)
- Beef Morcon (Stuffed Beef Roll)

**Desserts:**
- Halo-Halo (Mixed Dessert with Shaved Ice)

## 🎯 Key Features in Detail

### Timer System
- **Persistent Timer**: Continues running after page refresh
- **Dish-Specific Storage**: Each dish maintains its own timer state
- **Visual Feedback**: Pulse animation when timer is running
- **Finish Animation**: Celebration modal when timer completes
- **Quick Presets**: 5, 10, 15-minute quick-set buttons

### Cooking Progress
- **Visual Progress Bar**: Shows completion percentage
- **Step Tracking**: Mark individual steps as complete
- **Expandable Steps**: Click to see detailed instructions
- **Progress Persistence**: Saves progress across sessions
- **Reset Functionality**: Clear progress and start over

### Ingredient Calculator
- **Dynamic Scaling**: Adjust servings and ingredients scale automatically
- **Real-time Updates**: See changes immediately
- **Original Servings**: Reset to original recipe amounts
- **Persistent Settings**: Remembers your serving adjustments

### Nutrition Information
- **Detailed Breakdown**: Calories, protein, carbs, fat, fiber, sodium, sugar
- **Per Serving**: Accurate nutrition per serving
- **Visual Indicators**: Color-coded nutrition values
- **Health Tips**: Guidance on nutrition information

## 🔧 Advanced Features

### Touch Gestures
- **Swipe Navigation**: Swipe left/right between recipe steps
- **Mobile Optimized**: Perfect for touch devices
- **Visual Indicators**: Shows swipe direction

### Screen Wake Lock
- **Keeps Screen On**: Prevents screen timeout during cooking
- **Visual Indicator**: Shows when wake lock is active
- **Automatic Management**: Activates with timer, deactivates when stopped

### Haptic Feedback
- **Vibration Alerts**: Notifies when timer finishes
- **Mobile Support**: Works on devices with vibration capability
- **User-Friendly**: Gentle vibration pattern

### Offline Support
- **Cached Recipes**: Access recipes without internet
- **Service Worker**: Handles offline functionality
- **Progressive Enhancement**: Works offline after first visit

## 🎨 Design System

### Color Palette
- **Cooking Theme**: Warm, food-inspired colors
- **Dark Mode**: Comfortable dark theme
- **Accessibility**: High contrast ratios
- **Responsive**: Adapts to all screen sizes

### Animations
- **Smooth Transitions**: Framer Motion powered
- **Micro-interactions**: Hover effects and feedback
- **Loading States**: Beautiful loading animations
- **Page Transitions**: Smooth navigation

## 📊 Performance

- **Optimized Images**: Next.js Image optimization
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components load when needed
- **PWA Caching**: Efficient offline storage
- **Debounced Saves**: Optimized localStorage writes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Filipino Cuisine**: Authentic recipes and cooking techniques
- **Next.js Team**: Amazing React framework
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Beautiful animations
- **Lucide React**: Beautiful icons

---

**Made with love💖 - Leigh**

A beautiful cooking show app that brings authentic Filipino recipes to life with modern web technology and user experience design. 