import { NextResponse } from "next/server";
import { postToBsky } from "@/lib/bsky";

export async function GET() {
  const text = "Automated daily post!";
  await postToBsky({ text });

  return NextResponse.json({ ok: true });
}
