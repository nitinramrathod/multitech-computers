'use client'
import Link from 'next/link'
import Image from 'next/image'
import { MessageSquare, Trash2, ShoppingBag, ExternalLink, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEnquiriesStore } from '@/store'
import { formatPrice } from '@/lib/utils'

export default function EnquiredPage() {
  const { enquiries, clearAll } = useEnquiriesStore()

  const formatTime = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-brand-950 to-slate-900 py-12 px-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3">
              <MessageSquare className="h-7 w-7 text-orange-400" />
              My Enquiries
            </h1>
            <p className="text-blue-200/70 mt-1">{enquiries.length} enquir{enquiries.length !== 1 ? 'ies' : 'y'} submitted</p>
          </div>
          {enquiries.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-400 text-white rounded-xl text-sm font-semibold transition-all"
            >
              <Trash2 className="h-4 w-4" /> Clear All
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {enquiries.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-black text-foreground mb-3">No enquiries yet</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              When you enquire about a product, it will appear here so you can track your requests.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <ShoppingBag className="h-4 w-4" /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-sm text-emerald-700 dark:text-emerald-400">
              ✅ All enquiries have been sent to our team. We will contact you within 24 hours on the mobile number you provided.
            </div>

            <AnimatePresence>
              {enquiries.map((enq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <div className="flex items-start gap-4 p-5">
                    {/* Product image */}
                    <div className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                      {enq.product.images[0] && (
                        <Image
                          src={enq.product.images[0]}
                          alt={enq.product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/products/${enq.product.id}`}
                            className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm sm:text-base"
                          >
                            {enq.product.name}
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {enq.product.brand} • Code: {enq.product.productCode}
                          </p>
                        </div>
                        <span className="text-base font-black text-primary shrink-0">
                          {formatPrice(enq.product.currentPrice)}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <div className="bg-muted/50 rounded-lg px-3 py-1.5">
                          <span className="text-muted-foreground">Name: </span>
                          <span className="font-medium text-foreground">{enq.data.name}</span>
                        </div>
                        <div className="bg-muted/50 rounded-lg px-3 py-1.5">
                          <span className="text-muted-foreground">Mobile: </span>
                          <span className="font-medium text-foreground">{enq.data.mobile}</span>
                        </div>
                        {enq.data.email && (
                          <div className="bg-muted/50 rounded-lg px-3 py-1.5 col-span-2 sm:col-span-1">
                            <span className="text-muted-foreground">Email: </span>
                            <span className="font-medium text-foreground">{enq.data.email}</span>
                          </div>
                        )}
                      </div>

                      {enq.data.message && (
                        <p className="mt-2 text-xs text-muted-foreground bg-muted/30 rounded-lg px-3 py-1.5">
                          Message: {enq.data.message}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Submitted: {formatTime(enq.enquiredAt)}
                        <span className="ml-auto px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-full font-medium">
                          ✓ Sent
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
