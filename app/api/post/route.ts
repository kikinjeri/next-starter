// app/api/bsky/post/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { caption } = body;

  const identifier = process.env.BLUESKY_IDENTIFIER!;
  const password = process.env.BLUESKY_PASSWORD!;
  const service = process.env.BLUESKY_SERVICE_URL || "https://bsky.social";

  // Minimal ATProto client via fetch
  const sessionRes = await fetch(`${service}/xrpc/com.atproto.server.createSession`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password })
  });

  if (!sessionRes.ok) {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }

  const session = await sessionRes.json();

  const postRes = await fetch(`${service}/xrpc/com.atproto.repo.createRecord`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessJwt}`
    },
    body: JSON.stringify({
      repo: session.did,
      collection: "app.bsky.feed.post",
      record: {
        $type: "app.bsky.feed.post",
        text: caption,
        createdAt: new Date().toISOString()
      }
    })
  });

  if (!postRes.ok) {
    return NextResponse.json({ error: "Post failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
