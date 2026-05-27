'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, ArrowUp, Phone, X, Loader2, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { generateWhatsAppUrl, cn } from '@/lib/utils'
import { CALLBACK_REASONS, WHATSAPP_NUMBER } from '@/constants'
import axios from 'axios'

const callbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  reason: z.string().min(1, 'Please select a reason'),
})

type CallbackForm = z.infer<typeof callbackSchema>

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showCallback, setShowCallback] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CallbackForm>({
    resolver: zodResolver(callbackSchema),
  })

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const onSubmit = async (data: CallbackForm) => {
    setIsSubmitting(true)
    try {
      await axios.post('/api/callback', data)
      setSubmitted(true)
      reset()
      setTimeout(() => { setSubmitted(false); setShowCallback(false) }, 3000)
    } catch {
      alert('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Fixed actions */}
      <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3">
        {/* Scroll to top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="w-11 h-11 bg-background border border-border rounded-xl shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 text-foreground" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Callback button */}
        <motion.button
          onClick={() => setShowCallback(true)}
          className="flex items-center gap-2 px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg shadow-brand-500/30 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Phone className="h-4 w-4" />
          <span className="text-sm font-semibold">Request Callback</span>
        </motion.button>

        {/* WhatsApp */}
        <motion.a
          href={generateWhatsAppUrl('Hi! I found your website and I\'m interested in your refurbished laptops. Can you help me?')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-2xl shadow-lg shadow-green-500/30 flex items-center justify-center transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-7 w-7" />
        </motion.a>
      </div>

      {/* Callback Modal */}
      <AnimatePresence>
        {showCallback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowCallback(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-background rounded-2xl shadow-2xl w-full max-w-md p-6 border border-border"
              onClick={e => e.stopPropagation()}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Callback Requested!</h3>
                  <p className="text-muted-foreground">We'll call you back within 30 minutes during business hours.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Request a Callback</h3>
                      <p className="text-sm text-muted-foreground">We'll call you back shortly</p>
                    </div>
                    <button onClick={() => setShowCallback(false)} className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <X className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Your Name *</label>
                      <input
                        {...register('name')}
                        className={cn(
                          'w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary',
                          errors.name ? 'border-red-400' : 'border-border'
                        )}
                        placeholder="Enter your name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Mobile Number *</label>
                      <input
                        {...register('mobile')}
                        className={cn(
                          'w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary',
                          errors.mobile ? 'border-red-400' : 'border-border'
                        )}
                        placeholder="10-digit mobile number"
                      />
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Reason *</label>
                      <select
                        {...register('reason')}
                        className={cn(
                          'w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary',
                          errors.reason ? 'border-red-400' : 'border-border'
                        )}
                      >
                        <option value="">Select reason</option>
                        {CALLBACK_REASONS.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</>
                      ) : (
                        <><Phone className="h-4 w-4" /> Request Callback</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
