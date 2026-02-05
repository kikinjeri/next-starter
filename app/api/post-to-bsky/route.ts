// app/api/post-to-bsky/route.ts
import { NextResponse } from "next/server";
import { BskyAgent } from "@atproto/api";

export async function POST(req: Request) {
  try {
    const { caption } = await req.json();

    const agent = new BskyAgent({
      service: "https://bsky.social",
    });

    await agent.login({
      identifier: process.env.BSKY_HANDLE!,
      password: process.env.BSKY_PASSWORD!,
    });

    await agent.post({ text: caption });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Bluesky post error:", err);
    return NextResponse.json({ success: false, error: "Failed to post" });
  }
}
