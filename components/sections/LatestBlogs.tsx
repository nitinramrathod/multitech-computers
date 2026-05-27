'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { blogs } from '@/data'
import { formatDate } from '@/lib/utils'

export default function LatestBlogs() {
  const latest = blogs.slice(0, 3)
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">From the Blog</span>
            <h2 className="text-3xl font-black text-foreground mt-1">Latest Articles</h2>
          </div>
          <Link href="/blogs" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">View All <ArrowRight className="h-4 w-4"/></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((blog, i) => (
            <motion.div key={blog.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={`/blogs/${blog.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-semibold rounded-lg">{blog.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Clock className="h-3 w-3"/>{blog.readTime} min read • {formatDate(blog.publishedAt)}
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{blog.excerpt}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
