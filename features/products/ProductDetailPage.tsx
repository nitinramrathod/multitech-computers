'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bookmark, BookmarkCheck, MessageSquare, Shield, Star, CheckCircle, ChevronRight, Package, Cpu, HardDrive, Monitor, Battery, Zap } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice, getConditionColor, getGradeColor, cn } from '@/lib/utils'
import { useSavedProductsStore, useRecentlyViewedStore } from '@/store'
import ProductCard from '@/components/products/ProductCard'
import EnquiryModal from '@/components/products/EnquiryModal'
import { useEffect } from 'react'

interface Props {
  product: Product
  allProducts: Product[]
}

export default function ProductDetailPage({ product, allProducts }: Props) {
  const [activeImage, setActiveImage] = useState(0)
  const [showEnquiry, setShowEnquiry] = useState(false)
  const { addProduct, removeProduct, isProductSaved } = useSavedProductsStore()
  const { addProduct: addRecent } = useRecentlyViewedStore()
  const saved = isProductSaved(product.id)

  useEffect(() => { addRecent(product) }, [product.id])

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const recentlyViewed = allProducts.filter(p => p.id !== product.id).slice(0, 4)

  const specs = [
    { icon: Cpu, label: 'Processor', value: product.specs.processor },
    { icon: Zap, label: 'RAM', value: product.specs.ram },
    { icon: HardDrive, label: 'Storage', value: product.specs.storage },
    { icon: Monitor, label: 'Display', value: product.specs.display },
    { icon: Package, label: 'Graphics', value: product.specs.graphics },
    { icon: Battery, label: 'Battery', value: product.specs.battery },
  ].filter(s => s.value)

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/products?category=${product.category}`} className="hover:text-primary">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-3 border border-border">
              {product.images[activeImage] ? (
                <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
              )}
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white font-bold rounded-xl text-sm shadow-lg">-{product.discount}% OFF</span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={cn('relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all', i === activeImage ? 'border-primary' : 'border-border hover:border-primary/40')}>
                    <Image src={img} alt={`Image ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={cn('text-xs px-2 py-1 rounded-lg font-semibold', getConditionColor(product.condition))}>{product.condition}</span>
              <span className={cn('text-xs px-2 py-1 rounded-lg font-semibold', getGradeColor(product.grade))}>{product.grade}</span>
              {product.isNewArrival && <span className="text-xs px-2 py-1 rounded-lg font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">New Arrival</span>}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-2">{product.name}</h1>
            <p className="text-sm text-muted-foreground mb-1">{product.brand} • Code: {product.productCode}</p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn('h-4 w-4', i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted')} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-black text-foreground">{formatPrice(product.currentPrice)}</div>
              {product.originalPrice > product.currentPrice && (
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-sm font-bold text-emerald-600">You save {formatPrice(product.originalPrice - product.currentPrice)}</span>
                </div>
              )}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.shortDescription}</p>

            {/* Warranty & Battery */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{product.warranty} Warranty</span>
              </div>
              {product.batteryHealth && (
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <Battery className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">Battery: {product.batteryHealth}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button onClick={() => setShowEnquiry(true)} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all text-base">
                <MessageSquare className="h-5 w-5" /> Enquire Now
              </button>
              <button onClick={() => saved ? removeProduct(product.id) : addProduct(product)}
                className={cn('px-4 py-3.5 rounded-xl border-2 transition-all font-semibold', saved ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary')}>
                {saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
              </button>
            </div>

            {/* Quick specs */}
            <div className="bg-muted/50 rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-4">Key Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specs.map(s => (
                  <div key={s.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <s.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                      <p className="text-sm font-semibold text-foreground">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Details, Refurbishment, Reviews */}
        <DetailTabs product={product} />

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-foreground mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <EnquiryModal product={product} isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} />
    </div>
  )
}

function DetailTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState('description')
  const tabs = ['description', 'specifications', 'refurbishment', 'reviews']

  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <div className="flex border-b border-border bg-muted/30 overflow-x-auto">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={cn('px-5 py-3.5 text-sm font-semibold capitalize whitespace-nowrap transition-colors', tab === t ? 'text-primary border-b-2 border-primary bg-background' : 'text-muted-foreground hover:text-foreground')}>
            {t}
          </button>
        ))}
      </div>
      <div className="p-6">
        {tab === 'description' && <p className="text-muted-foreground leading-relaxed">{product.description}</p>}
        {tab === 'specifications' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(product.specs).map(([key, val]) => val ? (
              <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground capitalize">{key}</span>
                <span className="text-sm font-semibold text-foreground text-right max-w-[60%]">{Array.isArray(val) ? val.join(', ') : val}</span>
              </div>
            ) : null)}
          </div>
        )}
        {tab === 'refurbishment' && (
          <div>
            <p className="text-muted-foreground mb-4">This device has been professionally refurbished according to our strict quality standards:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.refurbishmentDetails.map((d, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{d}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl">
              <p className="text-sm font-semibold text-primary">🏆 {product.qualityCertification}</p>
            </div>
          </div>
        )}
        {tab === 'reviews' && (
          <div>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map(r => (
                  <div key={r.id} className="p-4 border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">{r.name[0]}</div>
                      <div>
                        <span className="font-semibold text-sm text-foreground">{r.name}</span>
                        {r.verified && <span className="ml-2 text-xs text-emerald-600 font-medium">✓ Verified</span>}
                      </div>
                      <div className="ml-auto flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={cn('h-3 w-3', i < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted')} />)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
