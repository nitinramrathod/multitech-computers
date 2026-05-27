import { NextResponse } from 'next/server'
import { categories } from '@/data'

export async function GET() {
  return NextResponse.json({ success: true, data: categories, total: categories.length })
}
