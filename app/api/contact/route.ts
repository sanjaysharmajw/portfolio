import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { first, last, email, subject, message } = await req.json();

    if (!first || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "sanjaysharmajw@gmail.com",
      replyTo: email,
      subject: subject || `New message from ${first} ${last}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#0C0C0B;color:#F0EFEB;border-radius:12px;">
          <h2 style="font-size:1.4rem;font-weight:800;margin-bottom:24px;color:#BCFF47;">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;color:#888;font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;width:100px;">From</td><td style="padding:10px 0;font-weight:600;">${first} ${last}</td></tr>
            <tr><td style="padding:10px 0;color:#888;font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;">Email</td><td style="padding:10px 0;"><a href="mailto:${email}" style="color:#BCFF47;">${email}</a></td></tr>
            <tr><td style="padding:10px 0;color:#888;font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;">Subject</td><td style="padding:10px 0;">${subject || "—"}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,.08);margin:20px 0;"/>
          <p style="font-size:.95rem;line-height:1.8;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
