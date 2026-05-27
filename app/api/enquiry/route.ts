import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productName, productCode, name, mobile, email, message, type } = body

    // In production, use Resend to send email
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({...})

    // Simulate email sending
    await new Promise(r => setTimeout(r, 500))

    console.log('Enquiry received:', { productName, productCode, name, mobile, email, message, type })

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully! We will contact you within 24 hours.',
    })
  } catch (error) {
    console.error('Enquiry error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    )
  }
}
