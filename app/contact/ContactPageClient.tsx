'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, MessageCircle, Loader2, CheckCircle, Send } from 'lucide-react'
import axios from 'axios'
import { cn } from '@/lib/utils'
import { CONTACT_PHONE, CONTACT_EMAIL, ADDRESS, WORKING_HOURS } from '@/constants'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type FormData = z.infer<typeof schema>

const contactInfo = [
  { icon: Phone, title: 'Phone', value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE}`, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
  { icon: Mail, title: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
  { icon: MessageCircle, title: 'WhatsApp', value: 'Chat with us now', href: 'https://wa.me/918459556244', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
  { icon: MapPin, title: 'Address', value: ADDRESS, href: '#map', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
]

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('/api/contact', data)
      setSubmitted(true)
      reset()
    } catch {
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-brand-950 to-slate-900 py-16 px-4 text-white text-center">
        <h1 className="text-4xl font-black mb-3">Contact Us</h1>
        <p className="text-blue-200/70 max-w-xl mx-auto">
          Visit our store in Jalna or reach out through any channel. We&apos;re always happy to help.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info cards */}
          <div className="space-y-4">
            {contactInfo.map(item => (
              <a
                key={item.title}
                href={item.href}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{item.title}</p>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Hours */}
            <div className="p-5 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">Business Hours</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mon – Fri</span>
                  <span className="font-medium text-foreground">{WORKING_HOURS.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium text-foreground">{WORKING_HOURS.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium text-red-500">{WORKING_HOURS.sunday}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                      <input
                        {...register('name')}
                        className={cn('w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary', errors.name ? 'border-red-400' : 'border-border')}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Mobile Number *</label>
                      <input
                        {...register('mobile')}
                        className={cn('w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary', errors.mobile ? 'border-red-400' : 'border-border')}
                        placeholder="10-digit mobile number"
                      />
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                    <input
                      {...register('email')}
                      type="email"
                      className={cn('w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary', errors.email ? 'border-red-400' : 'border-border')}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                    <input
                      {...register('subject')}
                      className={cn('w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary', errors.subject ? 'border-red-400' : 'border-border')}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className={cn('w-full px-4 py-3 rounded-xl border bg-background text-foreground text-sm outline-none transition-colors focus:border-primary resize-none', errors.message ? 'border-red-400' : 'border-border')}
                      placeholder="Describe your query in detail..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="h-4 w-4" /> Send Message</>
                    )}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    We typically respond within 24 hours. For urgent queries, please call us directly.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Map */}
        <div id="map" className="mt-12 h-80 rounded-2xl overflow-hidden border border-border shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30326!2d75.8!3d19.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bda387e!2sJalna!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MultiTech Computers Location - Jalna"
          />
        </div>
      </div>
    </div>
  )
}
