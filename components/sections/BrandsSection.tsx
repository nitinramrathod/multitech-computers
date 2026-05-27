'use client'
import { motion } from 'framer-motion'
import { BRANDS } from '@/constants'

export default function BrandsSection() {
  return (
    <section className="py-12 bg-muted/30 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto container-padding">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Brands We Buy, Sell & Service</p>
        <div className="flex flex-wrap justify-center gap-4">
          {BRANDS.map((brand, i) => (
            <motion.div key={brand} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="px-6 py-3 rounded-xl bg-card border border-border font-bold text-muted-foreground hover:text-primary hover:border-primary/30 transition-all cursor-default">
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
