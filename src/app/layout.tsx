'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { WalletStore } from './stores/wallets'
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ECDSA Node Cryptography',
  description: 'A project for creating ECDSA entrcypted test wallets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <Provider store={WalletStore}>
      <body className={inter.className}>
      
        {
          
      children
      }
      <Toaster />
      </body>
      </Provider>
    </html>
    
  )
}
