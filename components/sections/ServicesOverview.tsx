'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Laptop, Monitor, HardDrive, Cpu, Settings, Shield, Database, Building2, Wrench, ArrowRight } from 'lucide-react'

const services = [
  { icon: Laptop, title: 'Laptop Repair', desc: 'Screen, keyboard, motherboard & more.', from: '₹499', href: '/services#laptop-repair', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
  { icon: Monitor, title: 'Desktop Repair', desc: 'Full desktop servicing & repair.', from: '₹399', href: '/services#desktop-repair', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
  { icon: HardDrive, title: 'SSD Upgrade', desc: 'Speed up with SSD + data migration.', from: '₹299', href: '/services#ssd-upgrade', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: Cpu, title: 'RAM Upgrade', desc: 'More RAM = better multitasking.', from: '₹199', href: '/services#ram-upgrade', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
  { icon: Settings, title: 'OS Installation', desc: 'Genuine Windows with all drivers.', from: '₹499', href: '/services#os-installation', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20' },
  { icon: Shield, title: 'Virus Removal', desc: 'Full malware cleanup & protection.', from: '₹399', href: '/services#virus-removal', color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
  { icon: Database, title: 'Data Recovery', desc: 'Recover lost files from any drive.', from: '₹999', href: '/services#data-recovery', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' },
  { icon: Building2, title: 'AMC Service', desc: 'Annual contracts for businesses.', from: '₹2,999/yr', href: '/services#amc-service', color: 'text-teal-600 bg-teal-50 dark:bg-teal-900/20' },
]

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Professional Repair Services</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Expert computer repair and upgrade services in Jalna. Fast, reliable, and affordable.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link href={s.href} className="group flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
                  <span className="text-sm font-bold text-primary">From {s.from}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
