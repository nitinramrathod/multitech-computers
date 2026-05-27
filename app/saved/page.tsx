'use client'
import Link from 'next/link'
import { Bookmark, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSavedProductsStore } from '@/store'
import ProductCard from '@/components/products/ProductCard'

export default function SavedPage() {
  const { savedProducts, clearAll } = useSavedProductsStore()

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-brand-950 to-slate-900 py-12 px-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <Bookmark className="h-7 w-7 text-primary" />
              Saved Products
            </h1>
            <p className="text-blue-200/70 mt-1">{savedProducts.length} item{savedProducts.length !== 1 ? 's' : ''} saved</p>
          </div>
          {savedProducts.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-400 text-white rounded-xl text-sm font-semibold transition-all"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {savedProducts.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-black text-foreground mb-3">No saved products yet</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              Browse our collection and click the bookmark icon to save products you're interested in.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <ShoppingBag className="h-4 w-4" /> Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence>
                {savedProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                Continue Shopping <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
