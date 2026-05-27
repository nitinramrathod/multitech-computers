// ============ PRODUCT TYPES ============
export type ProductCondition = 'Excellent' | 'Good' | 'Fair' | 'Like New'
export type RefurbishedGrade = 'Grade A+' | 'Grade A' | 'Grade B' | 'Grade C'
export type ProductCategory = 'Laptops' | 'Desktops' | 'Gaming PCs' | 'Accessories' | 'Laptop Parts' | 'Monitors' | 'Networking'

export interface ProductSpec {
  processor: string
  ram: string
  storage: string
  display?: string
  graphics?: string
  battery?: string
  os?: string
  ports?: string[]
  weight?: string
}

export interface UpgradeOption {
  name: string
  options: string[]
  priceRange: string
}

export interface ProductReview {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  avatar?: string
  verified: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: ProductCategory
  condition: ProductCondition
  grade: RefurbishedGrade
  images: string[]
  originalPrice: number
  currentPrice: number
  discount: number
  rating: number
  reviewCount: number
  inStock: boolean
  isNewArrival: boolean
  isFeatured: boolean
  isTopSelling: boolean
  warranty: string
  batteryHealth?: string
  specs: ProductSpec
  upgradeOptions?: UpgradeOption[]
  refurbishmentDetails: string[]
  qualityCertification: string
  description: string
  shortDescription: string
  tags: string[]
  reviews?: ProductReview[]
  productCode: string
  createdAt: string
}

// ============ BLOG TYPES ============
export interface BlogAuthor {
  name: string
  role: string
  avatar?: string
  bio?: string
}

export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  author: BlogAuthor
  category: string
  tags: string[]
  readTime: number
  publishedAt: string
  updatedAt?: string
  isFeatured: boolean
  views: number
}

// ============ NEWS TYPES ============
export interface NewsItem {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  source: string
  publishedAt: string
  isTrending: boolean
  views: number
}

// ============ TESTIMONIAL TYPES ============
export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  productBought?: string
  date: string
  avatar?: string
  isVerified: boolean
}

// ============ SERVICE TYPES ============
export interface Service {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  features: string[]
  startingPrice?: string
  duration?: string
  isPopular: boolean
}

// ============ CATEGORY TYPES ============
export interface Category {
  id: string
  name: ProductCategory
  slug: string
  description: string
  icon: string
  productCount: number
  image: string
}

// ============ ENQUIRY TYPES ============
export interface EnquiryFormData {
  productName: string
  productCode: string
  name: string
  mobile: string
  email?: string
  message?: string
}

export interface CallbackFormData {
  name: string
  mobile: string
  reason: string
}

export interface ContactFormData {
  name: string
  mobile: string
  email: string
  subject: string
  message: string
}

// ============ FILTER TYPES ============
export interface ProductFilters {
  search?: string
  category?: string
  brand?: string[]
  minPrice?: number
  maxPrice?: number
  ram?: string[]
  storage?: string[]
  processor?: string[]
  condition?: string[]
  grade?: string[]
  minDiscount?: number
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'discount'
}

// ============ API RESPONSE TYPES ============
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  total?: number
  page?: number
  limit?: number
}

export interface PaginationParams {
  page?: number
  limit?: number
}

// ============ SAVED/ENQUIRED TYPES ============
export interface SavedProduct {
  id: string
  productId: string
  savedAt: string
}

export interface EnquiredProduct {
  id: string
  productId: string
  enquiryData: EnquiryFormData
  enquiredAt: string
}
