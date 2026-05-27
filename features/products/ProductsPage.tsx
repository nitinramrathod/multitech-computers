'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Grid, List, SlidersHorizontal, X, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/products/ProductCard'
import products from '@/data/products'
import { Product, ProductFilters } from '@/types'
import { BRANDS, RAM_OPTIONS, CONDITION_OPTIONS } from '@/constants'
import { cn, formatPrice } from '@/lib/utils'

const CATEGORIES = ['Laptops', 'Desktops', 'Gaming PCs', 'Accessories', 'Laptop Parts', 'Monitors']
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'discount', label: 'Highest Discount' },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filtered, setFiltered] = useState<Product[]>(products)
  const [filters, setFilters] = useState<ProductFilters>({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: [],
    ram: [],
    condition: [],
    sortBy: 'newest',
    minPrice: 0,
    maxPrice: 150000,
  })
  const [page, setPage] = useState(1)
  const PER_PAGE = 12

  const applyFilters = useCallback(() => {
    let result = [...products]
    if (filters.search) result = result.filter(p => p.name.toLowerCase().includes(filters.search!.toLowerCase()) || p.brand.toLowerCase().includes(filters.search!.toLowerCase()))
    if (filters.category) result = result.filter(p => p.category === filters.category)
    if (filters.brand?.length) result = result.filter(p => filters.brand!.includes(p.brand))
    if (filters.ram?.length) result = result.filter(p => filters.ram!.some(r => p.specs.ram?.includes(r)))
    if (filters.condition?.length) result = result.filter(p => filters.condition!.includes(p.condition))
    result = result.filter(p => p.currentPrice >= (filters.minPrice || 0) && p.currentPrice <= (filters.maxPrice || 999999))
    switch (filters.sortBy) {
      case 'price-asc': result.sort((a, b) => a.currentPrice - b.currentPrice); break
      case 'price-desc': result.sort((a, b) => b.currentPrice - a.currentPrice); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'discount': result.sort((a, b) => b.discount - a.discount); break
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    setFiltered(result)
    setPage(1)
  }, [filters])

  useEffect(() => { applyFilters() }, [applyFilters])

  const toggleArray = (key: 'brand' | 'ram' | 'condition', val: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key]?.includes(val) ? prev[key]!.filter(v => v !== val) : [...(prev[key] || []), val]
    }))
  }

  const clearFilters = () => setFilters({ search: '', category: '', brand: [], ram: [], condition: [], sortBy: 'newest', minPrice: 0, maxPrice: 150000 })

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const hasActiveFilters = filters.category || (filters.brand?.length) || (filters.ram?.length) || (filters.condition?.length) || filters.search

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={filters.search || ''}
            onChange={e => setFilters(p => ({ ...p, search: e.target.value }))}
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary"
          />
        </div>
      </div>
      {/* Category */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Category</label>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" name="category" checked={filters.category === cat} onChange={() => setFilters(p => ({ ...p, category: p.category === cat ? '' : cat }))}
                className="accent-primary" />
              <span className={cn('text-sm transition-colors', filters.category === cat ? 'text-primary font-semibold' : 'text-muted-foreground group-hover:text-foreground')}>{cat}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Brand */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Brand</label>
        <div className="flex flex-wrap gap-2">
          {BRANDS.slice(0, 8).map(brand => (
            <button key={brand} onClick={() => toggleArray('brand', brand)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium border transition-all', filters.brand?.includes(brand) ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-primary/40')}>
              {brand}
            </button>
          ))}
        </div>
      </div>
      {/* RAM */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">RAM</label>
        <div className="flex flex-wrap gap-2">
          {RAM_OPTIONS.map(r => (
            <button key={r} onClick={() => toggleArray('ram', r)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium border transition-all', filters.ram?.includes(r) ? 'bg-primary text-white border-primary' : 'border-border text-muted-foreground hover:border-primary/40')}>
              {r}
            </button>
          ))}
        </div>
      </div>
      {/* Condition */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">Condition</label>
        <div className="space-y-2">
          {CONDITION_OPTIONS.map(c => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={filters.condition?.includes(c)} onChange={() => toggleArray('condition', c)} className="accent-primary" />
              <span className="text-sm text-muted-foreground">{c}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">Price Range</label>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={filters.minPrice || ''} onChange={e => setFilters(p => ({ ...p, minPrice: +e.target.value }))}
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary" />
          <input type="number" placeholder="Max" value={filters.maxPrice || ''} onChange={e => setFilters(p => ({ ...p, maxPrice: +e.target.value }))}
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary" />
        </div>
      </div>
      {hasActiveFilters && (
        <button onClick={clearFilters} className="w-full py-2.5 border border-red-300 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          Clear All Filters
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-950 to-slate-900 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Refurbished Products</h1>
          <p className="text-blue-200/70">Certified quality devices at unbeatable prices.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-foreground flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Filters</h3>
                {hasActiveFilters && <button onClick={clearFilters} className="text-xs text-red-500 hover:underline">Clear all</button>}
              </div>
              <FilterPanel />
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                  {hasActiveFilters && <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">!</span>}
                </button>
                <span className="text-sm text-muted-foreground">{filtered.length} products</span>
              </div>
              <div className="flex items-center gap-3">
                <select value={filters.sortBy} onChange={e => setFilters(p => ({ ...p, sortBy: e.target.value as any }))}
                  className="px-3 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary">
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <div className="flex border border-border rounded-xl overflow-hidden">
                  <button onClick={() => setView('grid')} className={cn('p-2.5', view === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted')}><Grid className="h-4 w-4" /></button>
                  <button onClick={() => setView('list')} className={cn('p-2.5', view === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted')}><List className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.category && <span className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{filters.category}<button onClick={() => setFilters(p => ({ ...p, category: '' }))}><X className="h-3 w-3" /></button></span>}
                {filters.brand?.map(b => <span key={b} className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{b}<button onClick={() => toggleArray('brand', b)}><X className="h-3 w-3" /></button></span>)}
              </div>
            )}

            {/* Grid/List */}
            {paginated.length > 0 ? (
              <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-4'}>
                {paginated.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <ProductCard product={product} view={view} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters or search query.</p>
                <button onClick={clearFilters} className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90">Clear Filters</button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 rounded-xl border border-border text-sm disabled:opacity-40 hover:bg-muted">Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} className={cn('w-10 h-10 rounded-xl text-sm font-semibold', p === page ? 'bg-primary text-white' : 'border border-border hover:bg-muted')}>{p}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 rounded-xl border border-border text-sm disabled:opacity-40 hover:bg-muted">Next</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background shadow-2xl overflow-y-auto p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="h-5 w-5" /></button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  )
}
