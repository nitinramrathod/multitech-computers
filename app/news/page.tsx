import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Calendar, Tag } from 'lucide-react'
import { newsItems } from '@/data'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Tech News | MultiTech Computers',
  description: 'Latest technology news, laptop releases, software updates and industry trends from MultiTech Computers.',
}

const categories = ['All', 'Market News', 'Hardware', 'Software', 'Buying Guide']

export default function NewsPage() {
  const trending = newsItems.filter(n => n.isTrending)
  const all = newsItems

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-brand-950 to-slate-900 py-16 px-4 text-white text-center">
        <h1 className="text-4xl font-black mb-3">Tech News</h1>
        <p className="text-blue-200/70 max-w-xl mx-auto">
          Stay updated with the latest technology news, hardware releases, and industry trends.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Trending */}
        {trending.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <h2 className="text-2xl font-black text-foreground">Trending Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trending.slice(0, 2).map(item => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all"
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-md">
                        🔥 Trending
                      </span>
                      <span className="text-xs text-white/70">{item.category}</span>
                    </div>
                    <h3 className="text-lg font-black text-white group-hover:text-orange-300 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/60 mt-1">{formatDate(item.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All News */}
        <div>
          <h2 className="text-2xl font-black text-foreground mb-6">All Tech News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {all.map(item => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-md text-muted-foreground font-medium">
                      {item.category}
                    </span>
                    {item.isTrending && (
                      <span className="flex items-center gap-0.5 text-xs text-orange-500 font-semibold">
                        <TrendingUp className="h-3 w-3" /> Hot
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item.publishedAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tags cloud */}
        <div className="mt-14 p-8 bg-muted/30 rounded-2xl border border-border">
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" /> Popular Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {['india', 'refurbished', 'windows', 'intel', 'laptops', 'budget', '2024', 'hardware', 'upgrade', 'microsoft', 'market', 'growth'].map(tag => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs bg-background border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
