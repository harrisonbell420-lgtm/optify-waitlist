import { render } from "@react-email/render";

import WelcomeTemplate from "../../../emails";

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export async function POST(request: NextRequest, response: NextResponse) {
  // Initialize clients inside the function, not at module level
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(2, "1 m"),
  });
  const ip = request.ip ?? "127.0.0.1";

  const result = await ratelimit.limit(ip);

  if (!result.success) {
    return Response.json(
      {
        error: "Too many requests!!",
      },
      {
        status: 429,
      },
    );
  }

  const { email, firstname } = await request.json();

  console.log("Attempting to send email to:", email);
  console.log("From name:", firstname);

  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Optify <onboarding@resend.dev>",
    to: [email],
    subject: "Welcome to Optify - You're on the Waitlist!",
    html:  await render(WelcomeTemplate({ userFirstname: firstname })),
  });

  console.log("Resend response:", { data, error });

  // const { data, error } = { data: true, error: null }

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(error, { status: 400 });
  }

  if (!data) {
    console.error("No data returned from Resend");
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }

  console.log("Email sent successfully:", data);
  return NextResponse.json({ message: "Email sent successfully" });
}
