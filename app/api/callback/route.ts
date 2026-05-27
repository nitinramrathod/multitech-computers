import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await new Promise(r => setTimeout(r, 500))
    console.log('Callback request:', body)
    return NextResponse.json({ success: true, message: 'Callback request received! We will call you shortly.' })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed. Please try again.' }, { status: 500 })
  }
}
