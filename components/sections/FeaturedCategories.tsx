'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Laptop, Monitor, Gamepad2, Mouse, Cpu, Tv, ArrowRight } from 'lucide-react'

const cats = [
  { name: 'Laptops', slug: 'Laptops', icon: Laptop, count: 45, color: 'from-blue-600 to-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Desktops', slug: 'Desktops', icon: Monitor, count: 18, color: 'from-purple-600 to-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { name: 'Gaming PCs', slug: 'Gaming PCs', icon: Gamepad2, count: 12, color: 'from-red-600 to-orange-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { name: 'Accessories', slug: 'Accessories', icon: Mouse, count: 67, color: 'from-emerald-600 to-teal-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { name: 'Laptop Parts', slug: 'Laptop Parts', icon: Cpu, count: 89, color: 'from-orange-600 to-amber-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { name: 'Monitors', slug: 'Monitors', icon: Tv, count: 23, color: 'from-slate-600 to-slate-500', bg: 'bg-slate-50 dark:bg-slate-900/20' },
]

export default function FeaturedCategories() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-widest"
          >Browse by Category</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-foreground mt-2"
          >
            Find What You Need
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {cats.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center group-hover:scale-110 transition-transform bg-gradient-to-br ${cat.color}`}>
                  <cat.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.count}+ items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
