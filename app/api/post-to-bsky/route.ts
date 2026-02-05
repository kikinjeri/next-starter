import { NextRequest, NextResponse } from "next/server";
import { generateCaption } from "@/lib/generateCaption";
import { getBskyAgent, uploadImage, createPoll, postToBsky } from "@/lib/bsky";

export async function POST(req: NextRequest) {
  try {
    const { restaurant, menuItems, poll, imageBase64 } = await req.json();

    if (!restaurant || !Array.isArray(menuItems)) {
      return NextResponse.json(
        { ok: false, error: "restaurant and menuItems are required" },
        { status: 400 }
      );
    }

    const caption = generateCaption(restaurant, menuItems);

    const agent = await getBskyAgent();

    let embed = undefined;

    // Handle image upload
    if (imageBase64) {
      const buffer = Buffer.from(imageBase64, "base64");
      embed = await uploadImage(agent, buffer, `Photo from ${restaurant}`);
    }

    // Handle poll
    if (poll) {
      const pollUri = await createPoll(agent, poll);

      embed = {
        $type: "app.bsky.embed.recordWithMedia",
        record: {
          $type: "app.bsky.embed.record",
          record: pollUri,
        },
        media: embed ?? undefined,
      };
    }

    // Post to Bluesky
    const result = await postToBsky({ text: caption, embed });

    return NextResponse.json({ ok: true, caption, result });
  } catch (err) {
    console.error("POST /api/post-to-bsky error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to post to Bluesky" },
      { status: 500 }
    );
  }
}
