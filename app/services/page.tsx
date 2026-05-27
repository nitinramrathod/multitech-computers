import type { Metadata } from 'next'
import { services } from '@/data'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Laptop, Monitor, HardDrive, Cpu, Settings, Shield, Database, Building2, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Computer Repair & Upgrade Services | MultiTech Computers Jalna',
  description: 'Professional laptop repair, desktop repair, SSD upgrade, RAM upgrade, virus removal, data recovery, AMC and more in Jalna, Maharashtra.',
}

const iconMap: Record<string, any> = { Laptop, Monitor, HardDrive, Cpu, Settings, Shield, Database, Building2, Wrench }

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-brand-950 to-slate-900 py-16 px-4 text-white text-center">
        <h1 className="text-4xl font-black mb-3">Professional Services</h1>
        <p className="text-blue-200/70 max-w-xl mx-auto">Expert laptop repair, PC upgrades, and computer maintenance services in Jalna, Maharashtra.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => {
            const Icon = iconMap[service.icon] || Laptop
            return (
              <div key={service.id} id={service.slug} className={`relative p-7 rounded-2xl border bg-card hover:shadow-2xl transition-all ${service.isPopular ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-border'}`}>
                {service.isPopular && <span className="absolute -top-3 left-6 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">Popular</span>}
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-black text-foreground mb-2">{service.title}</h2>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
                <div className="space-y-2 mb-5">
                  {service.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="text-sm text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="text-xl font-black text-primary">{service.startingPrice}</p>
                    {service.duration && <p className="text-xs text-muted-foreground">{service.duration}</p>}
                  </div>
                  <Link href="/contact" className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all">
                    Book Now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-10 text-white text-center">
          <h2 className="text-3xl font-black mb-3">Not Sure What Service You Need?</h2>
          <p className="text-blue-200 mb-8">Talk to our experts and get a free diagnosis. We&apos;ll recommend the right solution for your needs and budget.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-3.5 bg-white text-brand-700 rounded-xl font-bold hover:bg-orange-50 transition-all">Contact Us</Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-white/10 border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all">WhatsApp Now</a>
          </div>
        </div>
      </div>
    </div>
  )
}
