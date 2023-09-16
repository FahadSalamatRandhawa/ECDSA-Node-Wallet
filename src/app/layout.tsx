'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { WalletStore } from './stores/wallets'
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ['latin'] })

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
