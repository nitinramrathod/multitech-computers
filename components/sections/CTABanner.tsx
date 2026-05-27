'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Tag } from 'lucide-react'
import { generateWhatsAppUrl } from '@/lib/utils'

export default function CTABanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-600 via-brand-700 to-brand-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 50%)' }} />
      <div className="relative max-w-4xl mx-auto container-padding text-center text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-6 border border-white/20">
            <Tag className="h-4 w-4 text-orange-300" />
            Limited Time Offer - Up to 60% Off
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">Ready to Save Big on Your Next Laptop?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">Browse hundreds of certified refurbished laptops from Dell, HP, Lenovo & more. All with warranty and quality guarantee.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="flex items-center gap-2 px-8 py-4 bg-white text-brand-700 rounded-xl font-bold text-base hover:bg-orange-50 transition-all shadow-xl">
              Shop Now <ArrowRight className="h-5 w-5" />
            </Link>
            <a href={generateWhatsAppUrl("Hi! I want to enquire about refurbished laptops.")} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white rounded-xl font-bold text-base hover:bg-white/20 transition-all">
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
