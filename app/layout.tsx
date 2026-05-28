import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/theme-provider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/shared/FloatingActions'
import { Toaster } from '@/components/ui/toaster'
import '@/app/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MultiTech Computers | Refurbished Laptops & PC Repairs in Jalna',
    template: '%s | MultiTech Computers'
  },
  description: 'Your trusted destination for certified refurbished laptops, desktops, laptop repairs, and PC upgrades in Jalna, Maharashtra. Quality guaranteed, prices unbeatable.',
  keywords: ['refurbished laptops', 'laptop repair', 'Jalna', 'Maharashtra', 'PC upgrades', 'used laptops', 'second hand laptops', 'MultiTech'],
  authors: [{ name: 'MultiTech Computers', url: 'https://multitechcomputers.in' }],
  creator: 'MultiTech Computers',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://multitechcomputers.in',
    siteName: 'MultiTech Computers',
    title: 'MultiTech Computers | Refurbished Laptops & PC Repairs',
    description: 'Certified refurbished laptops, desktops, laptop repairs, and PC upgrades in Jalna, Maharashtra.',
    images: [{ url: 'https://multitechcomputers.in/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MultiTech Computers | Refurbished Laptops & PC Repairs',
    description: 'Certified refurbished laptops, desktops, laptop repairs, and PC upgrades in Jalna, Maharashtra.',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://multitechcomputers.in'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="multitech-theme">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingActions />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
