"use server";

import { supabase, supabaseAdmin } from "../supabase";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// Flyer-style, menu-aware caption
export async function generateCaption({
  caption,
  dish,
  category,
}: {
  caption: string;
  dish: string;
  category: string;
}) {
  const prompt = `
You are creating a FLYER-STYLE social media message for a South Indian restaurant called "Mahal-Tanjore" in Ottawa.

Goals:
- Make it look and read like a promotional flyer in text form.
- Use short punchy lines, spacing, and emphasis.
- Highlight the DISH and CATEGORY clearly.
- Mention Mahal-Tanjore by name.
- Mention it's a South Indian restaurant in Ottawa.
- Add 2–4 relevant emojis.
- Add 3–6 hashtags including #ubereats and #doordash.
- If a base caption is provided, rewrite and upgrade it into a flyer-style layout.
- If no caption is provided, create one from scratch.

ALWAYS append this footer:

📍 108 Third Ave, Ottawa, ON K1S 2J8
📞 +1 613-695-1969
Order online: https://mahal-tanjore.square.site/s/order

Dish: ${dish}
Category: ${category}
User caption: "${caption}"
`;

  const response = await client.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  return response.choices[0].message.content;
}

// Save draft
export async function saveDraft({ dishId, caption }: { dishId: string; caption: string }) {
  return await supabaseAdmin.from("posts").insert({
    dish_id: dishId,
    caption,
    status: "draft",
  });
}

// Schedule post
export async function schedulePost({
  dishId,
  caption,
  scheduledFor,
}: {
  dishId: string;
  caption: string;
  scheduledFor: string;
}) {
  return await supabaseAdmin.from("posts").insert({
    dish_id: dishId,
    caption,
    scheduled_for: scheduledFor,
    status: "scheduled",
  });
}

// Update post
export async function updatePost({ id, caption }: { id: string; caption: string }) {
  return await supabaseAdmin.from("posts").update({ caption }).eq("id", id);
}

// Mark as posted
export async function markAsPosted(id: string) {
  return await supabaseAdmin.from("posts").update({ status: "posted" }).eq("id", id);
}

// Post to Bluesky (text only)
export async function postToBluesky(caption: string) {
  const username = process.env.BLUESKY_USERNAME!;
  const password = process.env.BLUESKY_APP_PASSWORD!;

  const loginRes = await fetch(
    "https://bsky.social/xrpc/com.atproto.server.createSession",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: username, password }),
    }
  );

  const loginData = await loginRes.json();
  if (!loginRes.ok) throw new Error("Failed to authenticate with Bluesky");

  const accessJwt = loginData.accessJwt;
  const did = loginData.did;

  const postRes = await fetch(
    "https://bsky.social/xrpc/com.atproto.repo.createRecord",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessJwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repo: did,
        collection: "app.bsky.feed.post",
        record: {
          $type: "app.bsky.feed.post",
          text: caption,
          createdAt: new Date().toISOString(),
        },
      }),
    }
  );

  if (!postRes.ok) throw new Error("Failed to post to Bluesky");
  return await postRes.json();
}

// Stubs for future Facebook / Instagram integrations
export async function postToFacebook(_caption: string) {
  console.log("TODO: implement Facebook posting");
}

export async function postToInstagram(_caption: string) {
  console.log("TODO: implement Instagram posting");
}
