'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Link from 'next/link'
import { testimonials } from '@/data'

export default function TestimonialsSection() {
  const shown = testimonials.slice(0, 3)
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">What Customers Say</span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Trusted by Hundreds</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shown.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card hover:shadow-xl transition-all">
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.comment}</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`h-3.5 w-3.5 ${idx < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">{t.name[0]}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
              {t.productBought && <p className="text-xs text-primary mt-3 font-medium">Bought: {t.productBought}</p>}
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/testimonials" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">View All Reviews</Link>
        </div>
      </div>
    </section>
  )
}
