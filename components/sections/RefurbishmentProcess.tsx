'use client'
import { motion } from 'framer-motion'
import { Package, Scan, Wrench, Sparkles, Download, Award, ArrowRight } from 'lucide-react'

const steps = [
  { step: 1, icon: Package, title: 'Collection & Inspection', desc: 'Devices collected from certified sources and undergo initial physical & functional inspection.', color: 'bg-blue-600' },
  { step: 2, icon: Scan, title: 'Deep Diagnostics', desc: '50-point diagnostic check covering every component from CPU performance to display quality.', color: 'bg-purple-600' },
  { step: 3, icon: Wrench, title: 'Repair & Replace', desc: 'Faulty components repaired or replaced with genuine OEM parts only.', color: 'bg-orange-600' },
  { step: 4, icon: Sparkles, title: 'Deep Cleaning', desc: 'Professional cleaning inside and out, including thermal paste replacement and fan servicing.', color: 'bg-emerald-600' },
  { step: 5, icon: Download, title: 'Fresh OS Install', desc: 'Clean OS installation with all drivers and genuine license activation.', color: 'bg-yellow-600' },
  { step: 6, icon: Award, title: 'Quality Certification', desc: 'Final quality check and certification. Only certified devices receive the MultiTech seal.', color: 'bg-red-600' },
]

export default function RefurbishmentProcess() {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">How We Do It</span>
          <h2 className="text-3xl sm:text-4xl font-black mt-2">Our Refurbishment Process</h2>
          <p className="text-blue-200/70 mt-3 max-w-xl mx-auto">Every device goes through our rigorous 6-step process before reaching you.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shrink-0`}>
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-3xl font-black text-white/10">0{s.step}</span>
              </div>
              <h3 className="font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-blue-200/70 leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
