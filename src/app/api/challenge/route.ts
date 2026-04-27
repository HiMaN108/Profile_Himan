import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { idea, email, difficulty } = await req.json();

    // Use environment variables for security
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "him2000.maurya@gmail.com",
      subject: `[MISSION INTEL] New Challenge from ${email}`,
      text: `
MISSION INTEL RECEIVED
===============================
SENDER: ${email}
OPERATIONAL LEVEL: ${difficulty.toUpperCase()}

MISSION BRIEF:
${idea}

===============================
RESPOND TO MISSION:
ACCEPT: ${baseUrl}/api/challenge/respond?status=accepted&email=${email}&difficulty=${difficulty}
DECLINE: ${baseUrl}/api/challenge/respond?status=declined&email=${email}
      `,
      html: `
        <div style="font-family: monospace; background: #0f1923; color: #ece8e1; padding: 30px; border: 1px solid #ff465533;">
          <h2 style="color: #ff4655; margin-top: 0; letter-spacing: 2px;">// MISSION_INTEL_RECEIVED</h2>
          <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 4px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>SENDER:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong>LEVEL:</strong> ${difficulty.toUpperCase()}</p>
          </div>
          <p style="white-space: pre-wrap; line-height: 1.6; color: #808080; border-left: 2px solid #ff4655; padding-left: 20px;">${idea}</p>
          
          <div style="margin-top: 40px; display: flex; gap: 10px;">
            <a href="${baseUrl}/api/challenge/respond?status=accepted&email=${email}&difficulty=${difficulty}" 
               style="background: #ff4655; color: white; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 2px; text-transform: uppercase; font-size: 12px;">
               Accept Challenge
            </a>
            <a href="${baseUrl}/api/challenge/respond?status=declined&email=${email}" 
               style="background: #ffffff10; color: #808080; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 2px; text-transform: uppercase; font-size: 12px; margin-left: 10px; border: 1px solid #ffffff20;">
               Decline
            </a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Transmission Error:", error);
    return NextResponse.json({ error: "Signal interference. Transmission failed." }, { status: 500 });
  }
}
