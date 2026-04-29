import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message, subject } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: 'Courier New', Courier, monospace; background-color: #111; color: #fff; padding: 40px; border: 1px solid #333;">
        <div style="border-left: 4px solid #ff4655; padding-left: 20px; margin-bottom: 30px;">
          <h2 style="color: #ff4655; margin: 0; text-transform: uppercase; letter-spacing: 2px;">Incoming Transmission</h2>
          <p style="color: #888; font-size: 12px; margin-top: 5px; text-transform: uppercase;">Source: Portfolio Connection Hub</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888; width: 100px; text-transform: uppercase; font-size: 12px;">Codename</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888; text-transform: uppercase; font-size: 12px;">Return Link</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #333;"><a href="mailto:${email}" style="color: #00e5ff; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #333; color: #888; text-transform: uppercase; font-size: 12px;">Subject</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #333;">${subject || "Mission Proposal"}</td>
          </tr>
        </table>

        <div style="background-color: #000; padding: 20px; border: 1px solid #333; border-radius: 2px;">
          <p style="color: #888; font-size: 12px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; border-bottom: 1px solid #333; padding-bottom: 10px;">Intel / Payload</p>
          <div style="line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>

        <div style="margin-top: 40px; font-size: 10px; color: #555; text-transform: uppercase; text-align: center;">
          <p>End of transmission // Encrypted Channel</p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `[UPLINK] ${subject || "Mission Proposal"} // ${name}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
