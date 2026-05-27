import { NextResponse } from 'next/server'
import { services } from '@/data'

export async function GET() {
  return NextResponse.json({ success: true, data: services, total: services.length })
}
