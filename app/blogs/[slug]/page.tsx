import { notFound } from 'next/navigation'
import { blogs } from '@/data'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = blogs.find(b => b.slug === params.slug)
  if (!blog) return { title: 'Not Found' }
  return { title: blog.title, description: blog.excerpt, openGraph: { images: [{ url: blog.coverImage }] } }
}

export async function generateStaticParams() {
  return blogs.map(b => ({ slug: b.slug }))
}

export default function BlogDetailPage({ params }: Props) {
  const blog = blogs.find(b => b.slug === params.slug)
  if (!blog) notFound()
  const related = blogs.filter(b => b.id !== blog.id && b.category === blog.category).slice(0, 3)
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/blogs" className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 text-sm"><ArrowLeft className="h-4 w-4"/>Back to Blog</Link>
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-lg">{blog.category}</span>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground mt-4 mb-4">{blog.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4"/>{formatDate(blog.publishedAt)}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4"/>{blog.readTime} min read</span>
          <span>By {blog.author.name}</span>
        </div>
        <img src={blog.coverImage} alt={blog.title} className="w-full aspect-video object-cover rounded-2xl mb-8" />
        <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: blog.content }} />
        <div className="flex flex-wrap gap-2 mt-8">
          {blog.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground"><Tag className="h-3 w-3"/>#{tag}</span>
          ))}
        </div>
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-foreground mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map(b => (
                <Link key={b.id} href={`/blogs/${b.slug}`} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                  <img src={b.coverImage} alt={b.title} className="w-full aspect-video object-cover" />
                  <div className="p-4"><h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">{b.title}</h3></div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
