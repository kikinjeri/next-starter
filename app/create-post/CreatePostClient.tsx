"use client";

import { useState, useMemo } from "react";
import { PostCard } from "@/components/PostCard";

type Restaurant = {
  id: string;
  name: string;
  neighbourhood: string;
  address: string;
  phone: string | null;
  website: string | null;
};

type Dish = {
  id: string;
  name: string;
  price: number | null;
  mealType: string | null;
  description: string | null;
};

type Props = {
  restaurant: Restaurant;
  dish: Dish;
};

export default function CreatePostClient({ restaurant, dish }: Props) {
  const [baseCaption, setBaseCaption] = useState<string>(
    dish.description || "",
  );
  const [isPosting, setIsPosting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const finalCaption = useMemo(() => {
    const lines: string[] = [];

    if (baseCaption.trim()) {
      lines.push(baseCaption.trim());
      lines.push("");
    }

    lines.push(`Try this restaurant in ${restaurant.neighbourhood}`);

    lines.push("");
    lines.push(`📍 ${restaurant.name}`);
    if (restaurant.address) lines.push(restaurant.address);
    if (restaurant.phone) lines.push(restaurant.phone);
    if (restaurant.website) lines.push(restaurant.website);
    if (restaurant.address) {
      const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
        restaurant.address,
      )}`;
      lines.push(`Directions: ${mapsUrl}`);
    }

    lines.push("");
    lines.push(
      "What are your favourite neighbourhood restaurants? Share them with us and we’ll feature them on this feed.",
    );

    lines.push("");
    lines.push("Created independently by @ottawa-eats.");
    lines.push("Not affiliated with the restaurant.");

    return lines.join("\n");
  }, [baseCaption, restaurant]);

  async function handlePost() {
    try {
      setIsPosting(true);
      setStatus(null);

      const res = await fetch("/api/post-to-bsky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption: finalCaption }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("Posted to Bluesky successfully.");
      } else {
        setStatus("Failed to post to Bluesky.");
      }
    } catch (e) {
      setStatus("Error posting to Bluesky.");
    } finally {
      setIsPosting(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(finalCaption);
    setStatus("Caption copied to clipboard.");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-2">Create Post</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Base caption (you can edit this)
        </label>
        <textarea
          className="w-full border rounded-md p-2 text-sm min-h-[140px]"
          value={baseCaption}
          onChange={(e) => setBaseCaption(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-medium">Preview</h2>
        <PostCard caption={finalCaption} />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 text-sm rounded-md border bg-white hover:bg-gray-50"
        >
          Copy caption
        </button>
        <button
          type="button"
          onClick={handlePost}
          disabled={isPosting}
          className="px-4 py-2 text-sm rounded-md bg-black text-white disabled:opacity-60"
        >
          {isPosting ? "Posting…" : "Post to Bluesky"}
        </button>
      </div>

      {status && <p className="text-sm text-gray-700">{status}</p>}
    </div>
  );
}
