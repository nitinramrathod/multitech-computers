'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Star, Truck, Zap, ChevronDown } from 'lucide-react'
import { generateWhatsAppUrl } from '@/lib/utils'

const floatingStats = [
  { value: '500+', label: 'Happy Customers' },
  { value: '1000+', label: 'Devices Sold' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '6 Mo', label: 'Warranty' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-800/10 rounded-full blur-3xl" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm mb-6 backdrop-blur-sm"
          >
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            <span>Jalna&apos;s Most Trusted Refurbished Computer Store</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            Premium Laptops.{' '}
            <span className="bg-gradient-to-r from-brand-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
              Unbeatable Prices.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-blue-200/80 mb-8 leading-relaxed max-w-2xl"
          >
            Buy certified refurbished Dell, HP, Lenovo & Apple laptops at up to 60% off. 
            Every device comes with warranty, quality certification, and expert support from 
            MultiTech Computers, Ambad, Jalna.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              href="/products"
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl font-bold text-base shadow-xl shadow-brand-500/30 transition-all hover:scale-105"
            >
              Shop Laptops
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={generateWhatsAppUrl("Hi! I'm interested in buying a refurbished laptop. Can you help me find the right one?")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-base backdrop-blur-sm transition-all hover:scale-105"
            >
              WhatsApp Us
            </a>
            <Link
              href="/services"
              className="flex items-center gap-2 px-6 py-3.5 border border-orange-500/40 hover:border-orange-400 text-orange-300 hover:text-orange-200 rounded-xl font-bold text-base transition-all"
            >
              Repair Services
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {floatingStats.map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm text-center">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-blue-300/80 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust badges row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 mt-12"
        >
          {[
            { icon: Shield, text: '6 Month Warranty' },
            { icon: Star, text: 'Quality Certified' },
            { icon: Truck, text: 'Fast Delivery' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-blue-300/70 text-sm">
              <Icon className="h-4 w-4 text-orange-400" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 animate-bounce">
        <span className="text-xs">Scroll</span>
        <ChevronDown className="h-4 w-4" />
      </div>
    </section>
  )
}
