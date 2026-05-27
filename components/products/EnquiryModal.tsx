'use client'

import { useState } from 'react'
import { X, Loader2, CheckCircle, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Product, EnquiryFormData } from '@/types'
import { cn } from '@/lib/utils'
import { useEnquiriesStore } from '@/store'
import axios from 'axios'

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  message: z.string().optional(),
})

type EnquiryFormValues = z.infer<typeof enquirySchema>

interface EnquiryModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function EnquiryModal({ product, isOpen, onClose }: EnquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { addEnquiry } = useEnquiriesStore()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
  })

  const onSubmit = async (data: EnquiryFormValues) => {
    setIsSubmitting(true)
    try {
      const enquiryData: EnquiryFormData = {
        productName: product.name,
        productCode: product.productCode,
        name: data.name,
        mobile: data.mobile,
        email: data.email || '',
        message: data.message || '',
      }

      await axios.post('/api/enquiry', enquiryData)
      addEnquiry(product, enquiryData)
      setSubmitted(true)
      reset()
      setTimeout(() => {
        setSubmitted(false)
        onClose()
      }, 3000)
    } catch {
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-background rounded-2xl shadow-2xl w-full max-w-md border border-border overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {submitted ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2">Enquiry Submitted!</h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for your interest in <strong>{product.name}</strong>. 
                  Our team will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-orange-500/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Product Enquiry</h3>
                      <p className="text-xs text-muted-foreground">{product.productCode}</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Product info */}
                <div className="px-6 py-3 bg-muted/50 border-b border-border">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand} • {product.condition} • {product.warranty} Warranty</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Your Name *</label>
                      <input
                        {...register('name')}
                        className={cn(
                          'w-full px-3 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary',
                          errors.name ? 'border-red-400' : 'border-border'
                        )}
                        placeholder="Enter your name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Mobile Number *</label>
                      <input
                        {...register('mobile')}
                        className={cn(
                          'w-full px-3 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary',
                          errors.mobile ? 'border-red-400' : 'border-border'
                        )}
                        placeholder="10-digit number"
                      />
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email (Optional)</label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message (Optional)</label>
                    <textarea
                      {...register('message')}
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary resize-none"
                      placeholder="Any specific requirements or questions?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                    ) : (
                      <><MessageSquare className="h-4 w-4" /> Submit Enquiry</>
                    )}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    We'll contact you within 24 hours. Your data is safe with us.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
