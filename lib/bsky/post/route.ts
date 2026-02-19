import { NextResponse } from "next/server";
import { getBskyAgent } from "@/lib/bsky/client";

export async function POST() {
  try {
    const agent = await getBskyAgent();

    const result = await agent.post({
      text: "Hello from Ottawa Eats! 🍁",
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
