import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us | MultiTech Computers - Jalna',
  description: 'Contact MultiTech Computers in Jalna, Maharashtra. Get help with laptop purchases, repairs, upgrades and more. Phone, WhatsApp, Email or visit us.',
}

export default function ContactPage() {
  return <ContactPageClient />
}
