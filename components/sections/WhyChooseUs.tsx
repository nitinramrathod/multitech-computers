'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Star, DollarSign, Headphones, Award, Clock, CheckCircle } from 'lucide-react'

const reasons = [
  { icon: Shield, title: 'Certified Warranty', desc: 'Every refurbished device comes with 3-6 months warranty covering hardware defects.', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
  { icon: CheckCircle, title: '50-Point Quality Check', desc: 'Rigorous testing process covering every component before any device is sold.', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: DollarSign, title: 'Unbeatable Pricing', desc: 'Save up to 60% compared to new devices. Best value for money in Jalna.', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
  { icon: Headphones, title: 'Expert Support', desc: 'Over 10 years of experience. Our team is always ready to assist you.', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
  { icon: Award, title: 'Genuine OEM Parts', desc: 'We use only original manufacturer parts for all repairs and replacements.', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Same-day service for most repairs. Quick delivery within Jalna & surrounding areas.', color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Why MultiTech?</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2 mb-4">
              Jalna&apos;s Most Trusted Computer Store
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Founded by Adv. Pavan Rathod, MultiTech Computers has been serving the Jalna district with premium refurbished electronics and professional repair services. Our commitment to quality and customer satisfaction sets us apart.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="text-center">
                <div className="text-3xl font-black text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-orange-500">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-600">1000+</div>
                <div className="text-sm text-muted-foreground">Devices Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-purple-600">4.8★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Learn Our Story
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${r.color}`}>
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
