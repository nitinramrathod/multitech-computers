'use client'
import { Shield, CheckCircle, Truck, Headphones, Award, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'

const badges = [
  { icon: Shield, title: '6-Month Warranty', desc: 'On all refurbished products', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
  { icon: CheckCircle, title: 'Quality Tested', desc: '50-point inspection', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Same day in Jalna', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
  { icon: Headphones, title: 'Expert Support', desc: '10+ years experience', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
  { icon: Award, title: 'Genuine Parts', desc: 'OEM parts only', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '7-day return policy', color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
]

export default function TrustBadges() {
  return (
    <section className="py-8 border-y border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center text-center gap-2 p-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${b.color}`}>
                <b.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">{b.title}</p>
                <p className="text-[10px] text-muted-foreground">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
