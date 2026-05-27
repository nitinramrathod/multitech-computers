import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/saved', '/enquired'],
      },
    ],
    sitemap: 'https://multitechcomputers.in/sitemap.xml',
    host: 'https://multitechcomputers.in',
  }
}
