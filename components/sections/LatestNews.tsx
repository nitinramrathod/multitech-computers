'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight } from 'lucide-react'
import { newsItems } from '@/data'
import { formatDate } from '@/lib/utils'

export default function LatestNews() {
  const latest = newsItems.slice(0, 4)
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Stay Updated</span>
            <h2 className="text-3xl font-black text-foreground mt-1">Tech News</h2>
          </div>
          <Link href="/news" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">View All <ArrowRight className="h-4 w-4"/></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {latest.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Link href={`/news/${item.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all h-full">
                <div className="aspect-video bg-muted overflow-hidden">
                  <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-md text-muted-foreground font-medium">{item.category}</span>
                    {item.isTrending && <span className="flex items-center gap-1 text-xs text-orange-500 font-semibold"><TrendingUp className="h-3 w-3"/>Trending</span>}
                  </div>
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-3">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2">{formatDate(item.publishedAt)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
