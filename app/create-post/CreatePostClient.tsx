// app/create-post/CreatePostClient.tsx
"use client";

import { useState, useMemo } from "react";
import type { Restaurant, Dish } from "@/types";

type Props = {
  restaurant: Restaurant;
  dish: Dish;
};

const communityPrompts = [
  "What’s your favorite coffee shop?",
  "Who makes your favorite poutine?",
  "What’s your favorite place to get shawarma?",
  "What’s your favorite takeout?",
  "Share your favorite restaurant dishes in the Ottawa Restaurants feed to help others discover great spots and support local business!",
  "What’s your favorite dessert place?",
  "Where can I grab a bite to eat and connect to Wi‑Fi?",
];

export function CreatePostClient({ restaurant, dish }: Props) {
  const [copied, setCopied] = useState(false);
  const [posting, setPosting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [scheduledAt, setScheduledAt] = useState<string>("");

  const randomPrompt = useMemo(
    () => communityPrompts[Math.floor(Math.random() * communityPrompts.length)],
    [],
  );

  const dietaryLabels = dish.dietary_labels?.length
    ? dish.dietary_labels.join(", ")
    : null;

  const caption = `
📍 ${restaurant.name}, ${restaurant.neighbourhood} — ${restaurant.address} • ${restaurant.phone} • ${restaurant.website}
🍽️ ${dish.name} — ${dish.price} • ${dish.category}${dietaryLabels ? ` • ${dietaryLabels}` : ""}
#ottawa #ottawa-eats #ottawa-restaurants
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const postPayload = {
    restaurant_id: restaurant.id,
    dish_id: dish.id,
    caption,
    handle: "ottawa-eats",
    feed: "ottawa-restaurants",
  };

  // -----------------------------
  // POST TO BLUESKY
  // -----------------------------
  const postToBluesky = async () => {
    try {
      setPosting(true);
      const res = await fetch("/api/post-to-bsky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload),
      });
      if (!res.ok) throw new Error("Failed to post");
    } finally {
      setPosting(false);
    }
  };

  // -----------------------------
  // SAVE DRAFT
  // -----------------------------
  const saveDraft = async () => {
    try {
      setSavingDraft(true);
      const res = await fetch("/api/drafts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload),
      });
      if (!res.ok) throw new Error("Failed to save draft");
    } finally {
      setSavingDraft(false);
    }
  };

  // -----------------------------
  // SCHEDULE POST
  // -----------------------------
  const schedulePost = async () => {
    if (!scheduledAt) return;
    try {
      setScheduling(true);
      const res = await fetch("/api/scheduled-posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...postPayload, scheduled_at: scheduledAt }),
      });
      if (!res.ok) throw new Error("Failed to schedule");
    } finally {
      setScheduling(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {dish.image_url && (
        <img
          src={dish.image_url}
          alt={dish.name}
          className="w-full rounded-lg shadow-md"
        />
      )}

      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        <p className="text-gray-600">{restaurant.neighbourhood}</p>
        <p className="text-gray-600">{restaurant.address}</p>
        <p className="text-gray-600">{restaurant.phone}</p>
        <a
          href={restaurant.website}
          target="_blank"
          className="text-blue-600 underline"
        >
          {restaurant.website}
        </a>
      </div>

      <div className="space-y-1">
        <h2 className="text-xl font-semibold">{dish.name}</h2>
        <p className="text-gray-700">
          {dish.category} • {dish.price}
          {dietaryLabels && <> • {dietaryLabels}</>}
        </p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-line text-sm">
        {caption}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm"
        >
          {copied ? "Copied!" : "Copy Caption"}
        </button>

        <button
          onClick={postToBluesky}
          disabled={posting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 text-sm disabled:opacity-60"
        >
          {posting ? "Posting…" : "Post to Bluesky"}
        </button>

        <button
          onClick={saveDraft}
          disabled={savingDraft}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm disabled:opacity-60"
        >
          {savingDraft ? "Saving…" : "Save as Draft"}
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-gray-700">
          Schedule post (ISO datetime)
        </label>
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm w-full"
        />
        <button
          onClick={schedulePost}
          disabled={scheduling || !scheduledAt}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 text-sm disabled:opacity-60"
        >
          {scheduling ? "Scheduling…" : "Schedule Post"}
        </button>
      </div>

      <div className="text-gray-700 text-sm italic pt-4">{randomPrompt}</div>
    </div>
  );
}
