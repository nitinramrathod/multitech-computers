import type { Metadata } from 'next'
import { Shield, Award, Users, Clock, CheckCircle, Target, Eye, Heart } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | MultiTech Computers - Jalna',
  description: 'Learn about MultiTech Computers, founded by Adv. Pavan Rathod. Your trusted source for refurbished laptops and computer repairs in Jalna, Maharashtra.',
}

const timeline = [
  { year: '2013', title: 'Foundation', desc: 'MultiTech Computers founded by Adv. Pavan Rathod in Jalna, Maharashtra.' },
  { year: '2015', title: 'Repair Services', desc: 'Expanded to full-service laptop and desktop repair center.' },
  { year: '2018', title: '500+ Customers', desc: 'Reached milestone of 500 happy customers across Jalna district.' },
  { year: '2020', title: 'Online Presence', desc: 'Launched online operations to serve customers across Maharashtra.' },
  { year: '2022', title: 'Refurbishment Lab', desc: 'Opened dedicated refurbishment lab with 50-point quality process.' },
  { year: '2024', title: 'Premium Website', desc: 'Launched new website for better customer experience and wider reach.' },
]

const values = [
  { icon: Shield, title: 'Quality First', desc: 'Every product undergoes rigorous testing before reaching our customers.', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
  { icon: Heart, title: 'Customer Care', desc: 'We build lasting relationships, not just transactions.', color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
  { icon: Target, title: 'Transparency', desc: 'Honest pricing, clear warranty terms, and genuine product descriptions.', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: CheckCircle, title: 'Integrity', desc: 'We stand behind every product and service we provide.', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-950 to-slate-900 py-20 px-4 text-white text-center">
        <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">Our Story</span>
        <h1 className="text-4xl sm:text-5xl font-black mt-3 mb-4">About MultiTech Computers</h1>
        <p className="text-blue-200/70 text-lg max-w-2xl mx-auto">Jalna&apos;s most trusted destination for refurbished electronics and computer repair services, founded on the principles of quality, trust and affordability.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Owner intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Meet the Founder</span>
            <h2 className="text-3xl font-black text-foreground mt-2 mb-4">Adv. Pavan Rathod</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">With over a decade of experience in the IT industry, Adv. Pavan Rathod founded MultiTech Computers with a simple but powerful vision: to make premium technology accessible to everyone in Jalna and surrounding areas.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">As an advocate by profession, Pavan brings the same commitment to fairness, transparency, and client service to his technology business. He noticed that many students, small businesses, and individuals in Jalna needed quality computers but couldn&apos;t afford new devices at market rates.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">This inspired him to create a certified refurbishment process that ensures every device sold meets the highest quality standards, while remaining affordable for the community he serves.</p>
            <div className="flex flex-wrap gap-4">
              <div className="text-center px-4">
                <div className="text-2xl font-black text-primary">10+</div>
                <div className="text-xs text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-black text-orange-500">500+</div>
                <div className="text-xs text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center px-4">
                <div className="text-2xl font-black text-emerald-600">1000+</div>
                <div className="text-xs text-muted-foreground">Devices Sold</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-10 text-white text-center">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-black mx-auto mb-4">P</div>
            <h3 className="text-2xl font-black mb-1">Adv. Pavan Rathod</h3>
            <p className="text-blue-200 mb-6">Founder & Owner</p>
            <div className="space-y-3 text-left">
              {['Advocate & Entrepreneur', 'IT Industry Expert (10+ years)', 'Certified Refurbishment Specialist', 'Community Leader, Jalna'].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-blue-100">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
            <Target className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-black text-foreground mb-3">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">To make premium technology accessible and affordable for every student, professional, and business in Jalna district by providing certified refurbished devices with honest pricing, genuine warranties, and expert after-sales support.</p>
          </div>
          <div className="p-8 rounded-2xl bg-orange-500/5 border border-orange-500/20">
            <Eye className="h-8 w-8 text-orange-500 mb-4" />
            <h3 className="text-xl font-black text-foreground mb-3">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">To become Maharashtra&apos;s most trusted refurbished computer retailer, known for uncompromising quality standards, transparent business practices, and a positive impact on reducing electronic waste in our community.</p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-foreground text-center mb-10">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(v => (
              <div key={v.title} className="p-6 rounded-2xl border border-border bg-card text-center hover:shadow-xl transition-all">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${v.color}`}>
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Refurbished */}
        <div className="bg-muted/30 rounded-3xl p-8 sm:p-12 mb-20">
          <h2 className="text-3xl font-black text-foreground mb-4">Why We Champion Refurbished Electronics</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Electronic waste (e-waste) is one of the fastest-growing environmental challenges. By refurbishing and reselling devices that would otherwise end up in landfills, we&apos;re doing our part for the environment.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">But sustainability isn&apos;t our only motivation. We&apos;ve seen firsthand how a quality refurbished laptop can change a student&apos;s educational journey, help a small business grow, or give a professional the tools they need to succeed — all at a price that respects their budget.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { stat: '60%', label: 'Average savings vs new', icon: '💰' },
              { stat: '50pts', label: 'Quality check points', icon: '✅' },
              { stat: '6 Mo', label: 'Warranty on all products', icon: '🛡️' },
            ].map(item => (
              <div key={item.label} className="text-center p-4 bg-background rounded-xl border border-border">
                <div className="text-3xl mb-1">{item.icon}</div>
                <div className="text-2xl font-black text-primary">{item.stat}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-foreground text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div key={item.year} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background mt-1" />
                  <div className={`pl-12 sm:pl-0 sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all">
                      <span className="text-sm font-black text-primary">{item.year}</span>
                      <h3 className="font-bold text-foreground mt-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-brand-600 to-brand-700 rounded-3xl p-10 text-white">
          <h2 className="text-3xl font-black mb-3">Experience the MultiTech Difference</h2>
          <p className="text-blue-200 mb-8">Visit us in Jalna or browse our online store to find your perfect refurbished device.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="px-8 py-3.5 bg-white text-brand-700 rounded-xl font-bold hover:bg-orange-50 transition-all">Shop Now</Link>
            <Link href="/contact" className="px-8 py-3.5 bg-white/10 border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
