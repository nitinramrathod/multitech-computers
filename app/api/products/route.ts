import { NextRequest, NextResponse } from 'next/server'
import products from '@/data/products'
import { ProductFilters } from '@/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '12')
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const brand = searchParams.getAll('brand')
  const minPrice = parseInt(searchParams.get('minPrice') || '0')
  const maxPrice = parseInt(searchParams.get('maxPrice') || '999999')
  const ram = searchParams.getAll('ram')
  const condition = searchParams.getAll('condition')
  const sortBy = searchParams.get('sortBy') || 'newest'
  const featured = searchParams.get('featured') === 'true'
  const newArrival = searchParams.get('newArrival') === 'true'
  const topSelling = searchParams.get('topSelling') === 'true'

  let filtered = [...products]

  // Apply filters
  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    )
  }

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }

  if (brand.length > 0) {
    filtered = filtered.filter(p => brand.includes(p.brand))
  }

  if (ram.length > 0) {
    filtered = filtered.filter(p => ram.some(r => p.specs.ram?.includes(r)))
  }

  if (condition.length > 0) {
    filtered = filtered.filter(p => condition.includes(p.condition))
  }

  filtered = filtered.filter(p => p.currentPrice >= minPrice && p.currentPrice <= maxPrice)

  if (featured) filtered = filtered.filter(p => p.isFeatured)
  if (newArrival) filtered = filtered.filter(p => p.isNewArrival)
  if (topSelling) filtered = filtered.filter(p => p.isTopSelling)

  // Sort
  switch (sortBy) {
    case 'price-asc': filtered.sort((a, b) => a.currentPrice - b.currentPrice); break
    case 'price-desc': filtered.sort((a, b) => b.currentPrice - a.currentPrice); break
    case 'rating': filtered.sort((a, b) => b.rating - a.rating); break
    case 'discount': filtered.sort((a, b) => b.discount - a.discount); break
    case 'newest': filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
  }

  const total = filtered.length
  const startIndex = (page - 1) * limit
  const paginated = filtered.slice(startIndex, startIndex + limit)

  // Simulate API delay
  await new Promise(r => setTimeout(r, 100))

  return NextResponse.json({
    success: true,
    data: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  })
}
