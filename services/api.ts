import axios from 'axios'
import { Product, Blog, NewsItem, Testimonial, Service, ProductFilters, ApiResponse } from '@/types'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// ============ Products ============
export const productService = {
  getAll: async (filters?: ProductFilters & { page?: number; limit?: number }) => {
    const params = new URLSearchParams()
    if (filters?.search) params.set('search', filters.search)
    if (filters?.category) params.set('category', filters.category)
    if (filters?.sortBy) params.set('sortBy', filters.sortBy)
    if (filters?.page) params.set('page', String(filters.page))
    if (filters?.limit) params.set('limit', String(filters.limit))
    if (filters?.minPrice) params.set('minPrice', String(filters.minPrice))
    if (filters?.maxPrice) params.set('maxPrice', String(filters.maxPrice))
    filters?.brand?.forEach(b => params.append('brand', b))
    filters?.ram?.forEach(r => params.append('ram', r))
    filters?.condition?.forEach(c => params.append('condition', c))
    const res = await api.get(`/products?${params.toString()}`)
    return res.data
  },
  getFeatured: () => api.get('/products?featured=true').then(r => r.data),
  getNewArrivals: () => api.get('/products?newArrival=true').then(r => r.data),
  getTopSelling: () => api.get('/products?topSelling=true').then(r => r.data),
}

// ============ Blogs ============
export const blogService = {
  getAll: () => api.get('/blogs').then(r => r.data),
}

// ============ News ============
export const newsService = {
  getAll: () => api.get('/news').then(r => r.data),
}

// ============ Testimonials ============
export const testimonialService = {
  getAll: () => api.get('/testimonials').then(r => r.data),
}

// ============ Services ============
export const serviceApi = {
  getAll: () => api.get('/services').then(r => r.data),
}

// ============ Enquiry ============
export const enquiryService = {
  submit: (data: any) => api.post('/enquiry', data).then(r => r.data),
}

// ============ Contact ============
export const contactService = {
  submit: (data: any) => api.post('/contact', data).then(r => r.data),
}

// ============ Callback ============
export const callbackService = {
  submit: (data: any) => api.post('/callback', data).then(r => r.data),
}

export default api
