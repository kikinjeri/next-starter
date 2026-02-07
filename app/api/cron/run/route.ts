import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // 1. Fetch posts that are due
    const { data: duePosts, error } = await supabase
      .from("scheduled_posts")
      .select("*")
      .eq("posted", false)
      .lte("scheduled_at", new Date().toISOString());

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!duePosts || duePosts.length === 0) {
      return NextResponse.json({ ok: true, message: "No posts due" });
    }

    const identifier = process.env.BLUESKY_IDENTIFIER!;
    const password = process.env.BLUESKY_PASSWORD!;
    const service = process.env.BLUESKY_SERVICE_URL || "https://bsky.social";

    // 2. Create Bluesky session
    const sessionRes = await fetch(
      `${service}/xrpc/com.atproto.server.createSession`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      }
    );

    if (!sessionRes.ok) {
      return NextResponse.json(
        { error: "Failed to authenticate with Bluesky" },
        { status: 500 }
      );
    }

    const session = await sessionRes.json();

    // 3. Post each due item
    for (const post of duePosts) {
      await fetch(`${service}/xrpc/com.atproto.repo.createRecord`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessJwt}`,
        },
        body: JSON.stringify({
          repo: session.did,
          collection: "app.bsky.feed.post",
          record: {
            $type: "app.bsky.feed.post",
            text: post.caption,
            createdAt: new Date().toISOString(),
          },
        }),
      });

      // 4. Mark as posted
      await supabase
        .from("scheduled_posts")
        .update({ posted: true })
        .eq("id", post.id);
    }

    return NextResponse.json({
      ok: true,
      posted: duePosts.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
