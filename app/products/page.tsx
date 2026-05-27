import { Metadata } from 'next'
import { Suspense } from 'react'
import ProductsPage from '@/features/products/ProductsPage'

export const metadata: Metadata = {
  title: 'Buy Refurbished Laptops & Computers in Jalna',
  description: 'Shop certified refurbished laptops, desktops, gaming PCs and accessories. Dell, HP, Lenovo at up to 60% off. Warranty included. MultiTech Computers, Jalna.',
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <ProductsPage />
    </Suspense>
  )
}
