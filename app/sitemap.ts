import { MetadataRoute } from 'next'
import products from '@/data/products'
import { blogs, newsItems } from '@/data'

const BASE_URL = 'https://multitechcomputers.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE_URL}/testimonials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE_URL}/products/${p.id}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogs.map(b => ({
    url: `${BASE_URL}/blogs/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const newsRoutes: MetadataRoute.Sitemap = newsItems.map(n => ({
    url: `${BASE_URL}/news/${n.slug}`,
    lastModified: new Date(n.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...productRoutes, ...blogRoutes, ...newsRoutes]
}
