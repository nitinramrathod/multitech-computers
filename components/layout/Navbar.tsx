'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  Menu, X, Sun, Moon, Laptop, Heart, MessageSquare, Search,
  ChevronDown, Phone, Bookmark, ShoppingBag
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE_NAME, CONTACT_PHONE } from '@/constants'
import { useSavedProductsStore, useEnquiriesStore } from '@/store'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const savedCount = useSavedProductsStore(state => state.savedProducts.length)
  const enquiryCount = useEnquiriesStore(state => state.enquiries.length)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-900 text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>🏪 Shop No. 5, Ambad Road, Jalna, Maharashtra</span>
          <div className="flex items-center gap-4">
            <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-1 hover:text-orange-300 transition-colors">
              <Phone className="h-3 w-3" />
              {CONTACT_PHONE}
            </a>
            <span className="text-white/40">|</span>
            <span>Mon-Sat: 9AM - 8PM</span>
          </div>
        </div>
      </div>

      <nav className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border'
          : 'bg-background border-b border-border'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Laptop className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg leading-tight text-foreground">MultiTech</div>
                <div className="text-[10px] text-muted-foreground leading-none">COMPUTERS</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Saved */}
              <Link href="/saved" className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all" aria-label="Saved products">
                <Bookmark className="h-5 w-5" />
                {savedCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Enquired */}
              <Link href="/enquired" className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all" aria-label="Enquired products">
                <MessageSquare className="h-5 w-5" />
                {enquiryCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {enquiryCount}
                  </span>
                )}
              </Link>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}

              {/* CTA */}
              <Link
                href="/products"
                className="hidden sm:flex items-center gap-2 ml-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Now
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-all ml-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border bg-background overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      pathname === link.href
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link href="/products" className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold">
                    <ShoppingBag className="h-4 w-4" />
                    Shop Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-background rounded-2xl shadow-2xl w-full max-w-2xl p-4"
              onClick={e => e.stopPropagation()}
            >
              <form onSubmit={handleSearch}>
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search laptops, desktops, accessories..."
                    className="flex-1 text-lg bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                  />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </form>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['Dell Laptop', 'HP EliteBook', 'ThinkPad', 'SSD Upgrade', 'Gaming PC'].map(term => (
                    <button
                      key={term}
                      onClick={() => { setSearchQuery(term); window.location.href = `/products?search=${term}`; setIsSearchOpen(false) }}
                      className="px-3 py-1.5 text-xs bg-muted rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
