import Link from 'next/link'
import { Laptop, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Linkedin, Send } from 'lucide-react'
import { SITE_NAME, CONTACT_PHONE, CONTACT_EMAIL, ADDRESS, SOCIAL_LINKS, FOOTER_QUICK_LINKS, FOOTER_SERVICES, WORKING_HOURS } from '@/constants'

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      {/* Newsletter strip */}
      <div className="bg-gradient-to-r from-brand-800 to-brand-700 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Stay Updated with Latest Deals</h3>
            <p className="text-blue-200 text-sm">Get exclusive offers on refurbished laptops & tech news.</p>
          </div>
          <form className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-300 outline-none focus:border-white/50 text-sm w-full sm:w-64"
            />
            <button type="submit" className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 rounded-xl text-sm font-semibold transition-colors shrink-0">
              <Send className="h-4 w-4" />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-orange-400 flex items-center justify-center">
                <Laptop className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg leading-tight">MultiTech</div>
                <div className="text-[10px] text-blue-400 leading-none">COMPUTERS</div>
              </div>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">
              Your trusted destination for certified refurbished laptops, PC repairs, and upgrades in Jalna, Maharashtra.
            </p>
            <div className="space-y-2">
              <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-orange-400" />
                {CONTACT_PHONE}
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-orange-400" />
                {CONTACT_EMAIL}
              </a>
              <div className="flex items-start gap-2 text-sm text-blue-200">
                <MapPin className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                {ADDRESS}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {[
                { href: SOCIAL_LINKS.facebook, icon: Facebook },
                { href: SOCIAL_LINKS.instagram, icon: Instagram },
                { href: SOCIAL_LINKS.twitter, icon: Twitter },
                { href: SOCIAL_LINKS.youtube, icon: Youtube },
              ].map(({ href, icon: Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-blue-300">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_QUICK_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition-colors hover:translate-x-1 inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-blue-300">Our Services</h4>
            <ul className="space-y-2">
              {FOOTER_SERVICES.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-blue-200 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-blue-300">Business Hours</h4>
            <div className="space-y-2 text-sm text-blue-200">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-white font-medium">{WORKING_HOURS.weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white font-medium">{WORKING_HOURS.saturday}</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-red-400 font-medium">{WORKING_HOURS.sunday}</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-blue-300 mb-1">Need emergency support?</p>
              <a href={`tel:${CONTACT_PHONE}`} className="text-orange-400 font-bold text-sm hover:text-orange-300 transition-colors">
                {CONTACT_PHONE}
              </a>
              <p className="text-xs text-blue-400 mt-1">We're here to help!</p>
            </div>
            {/* Brands */}
            <div className="mt-5">
              <p className="text-xs text-blue-400 mb-2">Brands we service:</p>
              <div className="flex flex-wrap gap-1">
                {['Dell', 'HP', 'Lenovo', 'Apple', 'ASUS', 'Acer'].map(b => (
                  <span key={b} className="text-xs px-2 py-1 bg-white/5 rounded-md text-blue-200">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-400">
          <p>© {new Date().getFullYear()} MultiTech Computers. All rights reserved. | Owner: Adv. Pavan Rathod</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
