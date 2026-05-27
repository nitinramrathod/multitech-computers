import type { Metadata } from 'next'
import { testimonials } from '@/data'
import { Star, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials | MultiTech Computers',
  description: 'Read what our happy customers say about MultiTech Computers. 500+ satisfied customers in Jalna, Maharashtra.',
}

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-brand-950 to-slate-900 py-16 px-4 text-white text-center">
        <h1 className="text-4xl font-black mb-3">Customer Reviews</h1>
        <p className="text-blue-200/70 max-w-xl mx-auto">Don't take our word for it — hear from our 500+ happy customers.</p>
        <div className="flex justify-center gap-8 mt-8">
          {[['4.8', 'Average Rating'], ['500+', 'Happy Customers'], ['99%', 'Satisfaction Rate']].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-black">{v}</div>
              <div className="text-sm text-blue-300/70">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="p-6 rounded-2xl border border-border bg-card hover:shadow-xl transition-all">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`} />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-orange-500 flex items-center justify-center text-white font-bold">{t.name[0]}</div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                {t.isVerified && <span title="Verified Purchase"><CheckCircle className="h-4 w-4 text-emerald-500 ml-auto" /></span>}
              </div>
              {t.productBought && (
                <div className="mt-3 px-3 py-1.5 bg-primary/5 rounded-lg">
                  <p className="text-xs text-primary font-medium">✓ {t.productBought}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
