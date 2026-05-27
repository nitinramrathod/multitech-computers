import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await new Promise(r => setTimeout(r, 500))
    console.log('Contact form:', body)
    return NextResponse.json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 })
  }
}
