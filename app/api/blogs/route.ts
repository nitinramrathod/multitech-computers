import { NextRequest, NextResponse } from 'next/server'
import { blogs, newsItems, testimonials, services, categories } from '@/data'

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const featured = searchParams.get('featured') === 'true'

  await new Promise(r => setTimeout(r, 100))

  return NextResponse.json({
    success: true,
    data: blogs,
    total: blogs.length,
  })
}
