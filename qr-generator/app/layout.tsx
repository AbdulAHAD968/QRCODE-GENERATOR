import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { registerServiceWorker } from '../lib/utils/pwa'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QR Code Generator - Free & Customizable',
  description:
    'Create custom QR codes for free. No signup required. Generate QR codes for URLs, text, WiFi, contacts, and more.',
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Client-side PWA registration
  if (typeof window !== 'undefined') {
    registerServiceWorker()
  }

  return (
    <html lang="en" className="h-full">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/qr-code.png" sizes="any" />
        <link rel="icon" type="image/png" href="/qr-code.png" />

        {/* Share / Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/qr-code.png" />
        <link rel="manifest" href="/manifest.json" />

        <meta name="theme-color" content="#3b82f6" />
      </head>

      <body
        className={`${inter.className} h-full bg-gray-50 dark:bg-gray-900`}
      >
        {children}
        {/* Removed <PWAPrompt /> to prevent "Download the App" nag */}
      </body>
    </html>
  )
}
