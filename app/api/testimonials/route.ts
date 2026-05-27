import { NextResponse } from 'next/server'
import { testimonials } from '@/data'

export async function GET() {
  await new Promise(r => setTimeout(r, 100))
  return NextResponse.json({ success: true, data: testimonials, total: testimonials.length })
}
