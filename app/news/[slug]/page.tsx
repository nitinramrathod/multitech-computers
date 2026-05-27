import { notFound } from 'next/navigation'
import Link from 'next/link'
import { newsItems } from '@/data'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Tag, Calendar, TrendingUp, Eye } from 'lucide-react'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = newsItems.find(n => n.slug === params.slug)
  if (!item) return { title: 'Not Found' }
  return {
    title: `${item.title} | MultiTech Tech News`,
    description: item.excerpt,
    openGraph: { images: [{ url: item.coverImage }] },
  }
}

export async function generateStaticParams() {
  return newsItems.map(n => ({ slug: n.slug }))
}

export default function NewsDetailPage({ params }: Props) {
  const item = newsItems.find(n => n.slug === params.slug)
  if (!item) notFound()

  const related = newsItems
    .filter(n => n.id !== item.id && n.category === item.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Tech News
        </Link>

        {/* Category + trending badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-lg">
            {item.category}
          </span>
          {item.isTrending && (
            <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 text-sm font-semibold rounded-lg">
              <TrendingUp className="h-3.5 w-3.5" /> Trending
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4 leading-tight">
          {item.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {formatDate(item.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" /> {item.views.toLocaleString()} views
          </span>
          <span>Source: {item.source}</span>
        </div>

        {/* Cover image */}
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full aspect-video object-cover rounded-2xl mb-8 border border-border"
        />

        {/* Content */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Tag className="h-4 w-4" /> Tags:
          </span>
          {item.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-foreground mb-6">Related News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(n => (
                <Link
                  key={n.id}
                  href={`/news/${n.slug}`}
                  className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all"
                >
                  <img
                    src={n.coverImage}
                    alt={n.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {n.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(n.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
