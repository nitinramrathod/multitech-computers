'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, BookmarkCheck, MessageSquare, Star, Shield, Zap, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { Product } from '@/types'
import { formatPrice, getConditionColor, getGradeColor, cn } from '@/lib/utils'
import { useSavedProductsStore } from '@/store'
import EnquiryModal from '@/components/products/EnquiryModal'

interface ProductCardProps {
  product: Product
  view?: 'grid' | 'list'
}

export default function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { addProduct, removeProduct, isProductSaved } = useSavedProductsStore()
  const saved = isProductSaved(product.id)

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    saved ? removeProduct(product.id) : addProduct(product)
  }

  if (view === 'list') {
    return (
      <>
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-card border border-border rounded-2xl overflow-hidden flex gap-4 p-4 hover:shadow-xl transition-all duration-300 hover:border-primary/30"
        >
          <div className="relative w-32 h-24 sm:w-40 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-muted">
            {product.images[0] && !imageError ? (
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" onError={() => setImageError(true)} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Zap className="h-8 w-8 opacity-30" />
              </div>
            )}
            {product.discount > 0 && (
              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-md">
                -{product.discount}%
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className={cn('text-xs px-2 py-0.5 rounded-md font-medium', getConditionColor(product.condition))}>
                  {product.condition}
                </span>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-foreground mt-1 hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                <p className="text-xs text-muted-foreground">{product.brand} • {product.grade}</p>
              </div>
              <button onClick={toggleSave} className={cn('p-1.5 rounded-lg shrink-0 transition-colors', saved ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/10')}>
                {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center gap-1 mt-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn('h-3 w-3', i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted')} />
              ))}
              <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
            </div>

            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">{product.shortDescription}</p>

            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-lg font-bold text-foreground">{formatPrice(product.currentPrice)}</span>
                {product.originalPrice > product.currentPrice && (
                  <span className="text-xs text-muted-foreground line-through ml-2">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.preventDefault(); setShowEnquiry(true) }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="h-3 w-3" />
                  Enquire
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        <EnquiryModal product={product} isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} />
      </>
    )
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          {product.images[0] && !imageError ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Zap className="h-12 w-12 text-muted-foreground opacity-20" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.discount > 0 && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-md">
                -{product.discount}% OFF
              </span>
            )}
            {product.isNewArrival && (
              <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md">New</span>
            )}
            {product.isTopSelling && (
              <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg shadow-md">🔥 Hot</span>
            )}
          </div>

          {/* Actions overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={toggleSave}
              className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-colors',
                saved ? 'bg-primary text-white' : 'bg-white/90 text-gray-700 hover:bg-primary hover:text-white'
              )}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </button>
            <Link href={`/products/${product.id}`} className="w-8 h-8 rounded-lg bg-white/90 text-gray-700 hover:bg-primary hover:text-white flex items-center justify-center shadow-lg transition-colors">
              <Eye className="h-4 w-4" />
            </Link>
          </div>

          {/* Condition badge */}
          <div className="absolute bottom-3 left-3">
            <span className={cn('text-xs px-2 py-1 rounded-lg font-semibold backdrop-blur-sm', getConditionColor(product.condition))}>
              {product.condition}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium">{product.brand} • {product.grade}</p>
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-foreground mt-0.5 hover:text-primary transition-colors line-clamp-2 text-sm leading-snug">
                  {product.name}
                </h3>
              </Link>
            </div>
          </div>

          {/* Specs preview */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.specs.ram && (
              <span className="text-[10px] px-2 py-1 bg-muted rounded-md text-muted-foreground font-medium">{product.specs.ram}</span>
            )}
            {product.specs.storage && (
              <span className="text-[10px] px-2 py-1 bg-muted rounded-md text-muted-foreground font-medium">{product.specs.storage}</span>
            )}
            {product.specs.processor && (
              <span className="text-[10px] px-2 py-1 bg-muted rounded-md text-muted-foreground font-medium line-clamp-1 max-w-[100px]">{product.specs.processor}</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={cn('h-3.5 w-3.5', i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted')} />
            ))}
            <span className="text-xs text-muted-foreground ml-1">{product.rating} ({product.reviewCount})</span>
          </div>

          {/* Warranty */}
          <div className="flex items-center gap-1.5 mb-3">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{product.warranty} Warranty</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xl font-bold text-foreground">{formatPrice(product.currentPrice)}</span>
              {product.originalPrice > product.currentPrice && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="text-xs text-emerald-600 font-semibold">Save {formatPrice(product.originalPrice - product.currentPrice)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowEnquiry(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Enquire Now
            </button>
            <button
              onClick={toggleSave}
              className={cn(
                'px-3 py-2.5 rounded-xl border transition-colors',
                saved ? 'bg-primary/10 border-primary text-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              )}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.div>

      <EnquiryModal product={product} isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} />
    </>
  )
}
