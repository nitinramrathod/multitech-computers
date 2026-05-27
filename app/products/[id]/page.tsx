import { notFound } from 'next/navigation'
import products from '@/data/products'
import ProductDetailPage from '@/features/products/ProductDetailPage'
import type { Metadata } from 'next'

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find(p => p.id === params.id || p.slug === params.id)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} - Refurbished | MultiTech Computers`,
    description: product.shortDescription,
    openGraph: { images: [{ url: product.images[0] }] }
  }
}

export async function generateStaticParams() {
  return products.map(p => ({ id: p.id }))
}

export default function Page({ params }: Props) {
  const product = products.find(p => p.id === params.id || p.slug === params.id)
  if (!product) notFound()
  return <ProductDetailPage product={product} allProducts={products} />
}
