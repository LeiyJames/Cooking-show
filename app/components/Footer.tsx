'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Beer, X } from 'lucide-react'

export default function Footer() {
  const [showQR, setShowQR] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <>
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Made with 💖 - Leigh
            </motion.p>
            
            <motion.button
              onClick={() => setShowQR(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Beer className="w-4 h-4" />
              Buy me beer 🍺
            </motion.button>
          </div>
        </div>
      </footer>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  Buy Leigh a Beer! 🍺
                </h3>
                <button
                  onClick={() => setShowQR(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
                             <div className="text-center">
                 <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
                   <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                     {!imageError ? (
                       <img 
                         src="/gcash.jpg" 
                         alt="GCash QR Code" 
                         className="w-44 h-44 object-contain rounded-lg"
                         onError={() => setImageError(true)}
                       />
                     ) : (
                       <div className="w-44 h-44 flex-col items-center justify-center text-gray-500 dark:text-gray-400 flex">
                         <div className="text-4xl mb-2">📱</div>
                         <p className="text-sm text-center">GCash QR Code</p>
                         <p className="text-xs mt-1 text-center">Please add gcash.jpg to public folder</p>
                       </div>
                     )}
                   </div>
                 </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  Scan this QR code with your GCash app to send Leigh a beer! 🍻
                </p>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
                    💡 Tip: Any amount is appreciated! Even ₱20 helps keep the code flowing! ☕
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 