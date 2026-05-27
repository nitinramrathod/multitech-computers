import type { Metadata } from 'next'
import { blogs } from '@/data'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog - Tech Tips & Buying Guides | MultiTech Computers',
  description: 'Expert articles on laptop buying guides, repair tips, upgrade advice, and tech news from MultiTech Computers, Jalna.',
}

export default function BlogsPage() {
  const featured = blogs.filter(b => b.isFeatured)
  const rest = blogs.filter(b => !b.isFeatured)
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-brand-950 to-slate-900 py-16 px-4 text-white text-center">
        <h1 className="text-4xl font-black mb-3">Tech Blog</h1>
        <p className="text-blue-200/70 max-w-xl mx-auto">Buying guides, repair tips, upgrade advice, and tech news from our experts.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {featured.length > 0 && (
          <div className="mb-14">
            <h2 className="text-2xl font-black text-foreground mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map(blog => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">{blog.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3"/>{blog.readTime} min</span>
                    </div>
                    <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors mb-2">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-muted-foreground">{formatDate(blog.publishedAt)} • {blog.author.name}</span>
                      <span className="text-primary flex items-center gap-1 text-sm font-semibold">Read <ArrowRight className="h-3.5 w-3.5"/></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <h2 className="text-2xl font-black text-foreground mb-6">All Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map(blog => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all">
              <div className="aspect-video overflow-hidden bg-muted">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground font-medium">{blog.category}</span>
                <h3 className="font-bold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{blog.excerpt}</p>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3"/>{blog.readTime} min • {formatDate(blog.publishedAt)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
