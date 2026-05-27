import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { CONTACT_PHONE, CONTACT_EMAIL, ADDRESS } from '@/constants'

export default function ContactCTA() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Phone, title: 'Call Us', value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE}`, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
            { icon: Mail, title: 'Email Us', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
            { icon: MessageCircle, title: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919876543210', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
            { icon: MapPin, title: 'Visit Store', value: 'Ambad, Jalna', href: '/contact', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' },
          ].map(item => (
            <a key={item.title} href={item.href} className="group flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-xl hover:border-primary/30 transition-all">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">{item.title}</p>
                <p className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
