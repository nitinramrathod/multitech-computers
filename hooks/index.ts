import { useState, useEffect, useCallback } from 'react'
import { Product, ProductFilters } from '@/types'
import axios from 'axios'

// ============ useProducts ============
export function useProducts(initialFilters?: ProductFilters) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || {})

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.set('search', filters.search)
      if (filters.category) params.set('category', filters.category)
      if (filters.sortBy) params.set('sortBy', filters.sortBy)
      if (filters.minPrice) params.set('minPrice', String(filters.minPrice))
      if (filters.maxPrice) params.set('maxPrice', String(filters.maxPrice))
      filters.brand?.forEach(b => params.append('brand', b))
      filters.ram?.forEach(r => params.append('ram', r))
      filters.condition?.forEach(c => params.append('condition', c))

      const res = await axios.get(`/api/products?${params.toString()}`)
      setProducts(res.data.data)
      setTotal(res.data.total)
      setTotalPages(res.data.totalPages || 1)
    } catch (err) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [filters])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  return { products, loading, error, total, totalPages, filters, setFilters, refetch: fetchProducts }
}

// ============ useProduct (single) ============
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const res = await axios.get('/api/products')
        const found = res.data.data.find((p: Product) => p.id === id || p.slug === id)
        setProduct(found || null)
      } catch {
        setError('Product not found')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  return { product, loading, error }
}

// ============ useBlogs ============
export function useBlogs() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get('/api/blogs')
      .then(res => setBlogs(res.data.data))
      .catch(() => setError('Failed to load blogs'))
      .finally(() => setLoading(false))
  }, [])

  return { blogs, loading, error }
}

// ============ useNews ============
export function useNews() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get('/api/news')
      .then(res => setNews(res.data.data))
      .catch(() => setError('Failed to load news'))
      .finally(() => setLoading(false))
  }, [])

  return { news, loading, error }
}

// ============ useTestimonials ============
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios.get('/api/testimonials')
      .then(res => setTestimonials(res.data.data))
      .catch(() => setError('Failed to load testimonials'))
      .finally(() => setLoading(false))
  }, [])

  return { testimonials, loading, error }
}

// ============ useSavedProducts ============
export { useSavedProductsStore as useSavedProducts } from '@/store'

// ============ useEnquiries ============
export { useEnquiriesStore as useEnquiries } from '@/store'
