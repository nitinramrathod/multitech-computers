'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  { q: 'What is a refurbished laptop?', a: 'A refurbished laptop is a previously owned device that has been professionally cleaned, tested, repaired if necessary, and restored to like-new working condition. At MultiTech, every refurbished device passes our 50-point quality inspection.' },
  { q: 'Do refurbished laptops come with warranty?', a: 'Yes! All refurbished laptops sold at MultiTech Computers come with a 3 to 6-month warranty covering hardware defects. We also offer extended warranty options.' },
  { q: 'How much can I save buying refurbished?', a: 'You can typically save 40-60% compared to buying a brand new laptop of the same model and specifications. This makes premium business laptops like Dell Latitude and HP EliteBook very affordable.' },
  { q: 'Do you offer laptop repair services?', a: 'Yes! We offer comprehensive laptop and desktop repair services including screen replacement, keyboard repair, motherboard repair, battery replacement, OS installation, virus removal, and more. Starting from just ₹299.' },
  { q: 'Can I upgrade my existing laptop\'s RAM or SSD?', a: 'Absolutely! We offer RAM and SSD upgrade services for most laptop and desktop models. Upgrading to an SSD can make your existing laptop 5x faster. We also handle data migration.' },
  { q: 'Do you offer Annual Maintenance Contracts (AMC)?', a: 'Yes, we offer AMC services for businesses and individuals. AMC includes quarterly preventive maintenance, priority support, discounted repair rates, and more. Starting at ₹2,999 per year.' },
  { q: 'Where are you located?', a: 'MultiTech Computers is located at Shop No. 5, Ambad Road, Jalna, Maharashtra 431203. We\'re open Monday to Friday 9AM-8PM and Saturday 9AM-6PM.' },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="section-padding bg-background">
      <div className="max-w-3xl mx-auto container-padding">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-2xl bg-card overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown className={cn('h-5 w-5 text-muted-foreground shrink-0 transition-transform', open === i && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
