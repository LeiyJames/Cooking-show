import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import ServiceWorkerRegistration from './components/ServiceWorkerRegistration'
import { TimerProvider } from './components/TimerContext'
import ConditionalFooter from './components/ConditionalFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '🍳 Cooking Show',
  description: 'A beautiful cooking show app with recipe management',
  manifest: '/manifest.json',
  themeColor: '#eab308',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Cooking Show'
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cooking Show" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#eab308" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-cooking-50 to-warm-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300`}>
        <TimerProvider>
          {children}
        </TimerProvider>
        <ConditionalFooter />
        <BackToTop />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
} 