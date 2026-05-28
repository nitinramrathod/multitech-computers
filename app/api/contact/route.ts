import { NextResponse } from "next/server";
import resend from "@/lib/resend";
import { ContactUsEmailTemplate } from "@/lib/email-template/contact-us";

const mailTo:string = process.env.RESEND_MAIL_TO || "";
const mailFrom:string = process.env.RESEND_FROM_EMAIL|| "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
 
    const template = ContactUsEmailTemplate(body);
    const subject = "New contact us form submission"; 

    const { data, error } = await resend.emails.send({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      html: template,
    });

    if (error) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json({ success: true, message: 'Contact us submitted! We will contact you shortly.' })

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong", logs: error },
      { status: 500 }
    );
  }
}





