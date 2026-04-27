import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const status = searchParams.get("status");
  const difficulty = searchParams.get("difficulty");

  if (!email || !status) {
    return new Response("Missing parameters", { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const isAccepted = status === "accepted";
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: isAccepted ? "CHALLENGE ACCEPTED // Himanshu Maurya" : "MISSION DECLINED // Himanshu Maurya",
      text: isAccepted 
        ? `Hello, I have reviewed your ${difficulty} tier challenge and have decided to take it on. Expect a tactical briefing or solution prototype soon.`
        : `Thank you for the mission brief. Due to current deployment schedules, I cannot accept this challenge at this time.`,
      html: `
        <div style="font-family: monospace; background: #0f1923; color: #ece8e1; padding: 30px; border: 1px solid ${isAccepted ? "#00f2ff" : "#ff4655"}33;">
          <h2 style="color: ${isAccepted ? "#00f2ff" : "#ff4655"}; margin-top: 0; letter-spacing: 2px;">// ${isAccepted ? "CHALLENGE_ACCEPTED" : "MISSION_DECLINED"}</h2>
          <p style="line-height: 1.6; color: #ece8e1;">${isAccepted 
            ? `I have reviewed your <b>${difficulty?.toUpperCase()}</b> tier challenge and have decided to take it on. I am currently decrypting the intel and will reach out with a tactical solution shortly.`
            : `Thank you for the mission brief. Due to current deployment schedules and ongoing operations, I cannot accept this specific challenge at this time.`
          }</p>
          <hr style="border: 0; border-top: 1px solid #ffffff10; margin: 20px 0;" />
          <p style="font-size: 0.8rem; color: #808080;">- Himanshu Maurya (Protocol Agent)</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(`
      <body style="background: #0f1923; color: white; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
        <div style="text-align: center; border: 1px solid #ffffff20; padding: 40px; border-radius: 4px; background: rgba(0,0,0,0.3);">
          <h1 style="color: ${isAccepted ? "#00f2ff" : "#ff4655"}; letter-spacing: 4px;">TRANSMISSION SENT</h1>
          <p style="margin-top: 20px; color: #808080;">You have <b>${status.toUpperCase()}</b> the challenge from:</p>
          <p style="font-size: 1.2rem; color: #ece8e1;">${email}</p>
          <div style="margin-top: 40px;">
            <a href="/" style="color: white; text-decoration: none; border: 1px solid white; padding: 12px 25px; text-transform: uppercase; font-size: 12px; font-weight: bold; letter-spacing: 2px;">Return to Command</a>
          </div>
        </div>
      </body>
    `, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Response Error:", error);
    return new Response("Critical Failure: Failed to send response transmission.", { status: 500 });
  }
}
