import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Provider } from './Provider'
import { useSession } from 'next-auth/react'
import { NavBar } from '@/components/common'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={inter.className}>
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
