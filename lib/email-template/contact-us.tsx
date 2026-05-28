interface DataTypes {
  email: string
  message: string
  mobile: string
  name: string
  subject: string
}

export const ContactUsEmailTemplate = (data:DataTypes) => {
  return (`
    <html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI', 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.10);">
        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:36px 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <div style="display:inline-block;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:8px 16px;margin-bottom:20px;">
                    <span style="color:#93c5fd;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Admin Notification</span>
                  </div>
                  <table cellpadding="0" cellspacing="0" border="0"><tr>
                    <td style="width:60px;vertical-align:middle;">
                      <div style="width:48px;height:48px;background:rgba(59,130,246,0.2);border:1px solid rgba(59,130,246,0.4);border-radius:12px;text-align:center;line-height:48px;font-size:22px;">✉️</div>
                    </td>
                    <td style="vertical-align:middle;">
                      <h1 style="margin:0 0 4px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">New Contact Message</h1>
                      <p style="margin:0;color:#93c5fd;font-size:13px;">Someone reached out via the Contact Us form</p>
                    </td>
                  </tr></table>
                </td>
                <td valign="top" align="right">
                  <span style="display:inline-block;background:#f59e0b;color:#fff;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;padding:5px 12px;border-radius:20px;">Contact</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- TIMESTAMP -->
        <tr>
          <td style="background:#0f172a;padding:10px 40px;border-bottom:1px solid #1e293b;">
            <p style="margin:0;color:#475569;font-size:12px;">📅 &nbsp;Received on <strong style="color:#94a3b8;">${new Date()}</strong></p>
          </td>
        </tr>
        <!-- BODY -->
        <tr><td style="padding:36px 40px 28px;">
      <p style="margin:20px 0 6px;font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;">Subject</p>
  <div style="height:2px;background:linear-gradient(90deg,#3b82f6,transparent);margin-bottom:14px;border-radius:2px;"></div>
      <div style="padding:14px 20px;background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:10px;border-left:3px solid #f59e0b;margin-bottom:16px;">
        <span style="font-size:15px;font-weight:700;color:#92400e;">${data.subject}</span>
      </div>
      <p style="margin:20px 0 6px;font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;">Sender Details</p>
  <div style="height:2px;background:linear-gradient(90deg,#3b82f6,transparent);margin-bottom:14px;border-radius:2px;"></div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
    <tr><td style="padding:12px 16px;background:#f8fafc;border-radius:8px;border-left:3px solid #e2e8f0;">
      <span style="display:block;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Name</span>
      <span style="display:block;font-size:15px;font-weight:500;color:#0f172a;word-break:break-word;">${data.name}</span>
    </td></tr>
  </table>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
    <tr><td style="padding:12px 16px;background:#eff6ff;border-radius:8px;border-left:3px solid #3b82f6;">
      <span style="display:block;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Email</span>
      <span style="display:block;font-size:15px;font-weight:500;color:#0f172a;word-break:break-word;">${data.email}</span>
    </td></tr>
  </table>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
    <tr><td style="padding:12px 16px;background:#f8fafc;border-radius:8px;border-left:3px solid #e2e8f0;">
      <span style="display:block;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Mobile</span>
      <span style="display:block;font-size:15px;font-weight:500;color:#0f172a;word-break:break-word;">${data.mobile}</span>
    </td></tr>
  </table>
      <p style="margin:20px 0 6px;font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;">Message</p>
  <div style="height:2px;background:linear-gradient(90deg,#3b82f6,transparent);margin-bottom:14px;border-radius:2px;"></div>
      <div style="padding:20px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;margin-bottom:16px;">
        <p style="margin:0;font-size:14px;color:#334155;line-height:1.8;">${data.message}</p>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;">
        <p style="margin:0;font-size:13px;color:#166534;">💬 Reply to <strong>rathod173ram@gmail.com</strong> or call <strong>8459556244</strong> to respond.</p>
      </div></td></tr>
        <!-- FOOTER -->
        <tr>
          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;border-radius:0 0 16px 16px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
              <td>
                <p style="margin:0 0 4px;color:#64748b;font-size:12px;">This is an automated notification from your website's form submission system.</p>
                <p style="margin:0;color:#94a3b8;font-size:11px;">Please do not reply to this email. Log in to your admin panel to manage this submission.</p>
              </td>
              <td align="right" valign="middle">
                <div style="width:36px;height:36px;background:linear-gradient(135deg,#0f172a,#1e3a5f);border-radius:8px;text-align:center;line-height:36px;font-size:16px;">💻</div>
              </td>
            </tr></table>
          </td>
        </tr>
      </table>
      <p style="margin:20px 0 0;color:#94a3b8;font-size:11px;text-align:center;">© 2026 Your Computer Store &nbsp;·&nbsp; All rights reserved</p>
    </td></tr>
  </table>
</body>
</html>
  `)}



