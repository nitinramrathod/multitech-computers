import { NextResponse } from 'next/server'
import { newsItems } from '@/data'

export async function GET() {
  await new Promise(r => setTimeout(r, 100))
  return NextResponse.json({ success: true, data: newsItems, total: newsItems.length })
}
