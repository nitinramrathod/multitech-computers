'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import products from '@/data/products'

const tabs = ['Featured', 'New Arrivals', 'Top Selling', 'Best Deals']

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('Featured')

  const filtered = products.filter(p => {
    if (activeTab === 'Featured') return p.isFeatured
    if (activeTab === 'New Arrivals') return p.isNewArrival
    if (activeTab === 'Top Selling') return p.isTopSelling
    if (activeTab === 'Best Deals') return p.discount >= 40
    return true
  }).slice(0, 8)

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Our Products</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-1">Refurbished Deals</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all shrink-0">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No products in this category yet.</div>
        )}
      </div>
    </section>
  )
}
