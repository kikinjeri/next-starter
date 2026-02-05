"use client";

import { useState } from "react";
import { generateDishCaption } from "@/lib/generateDishCaption";

export default function CaptionForm({ dish, restaurant }) {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const result = await generateDishCaption(dish, restaurant);
      setCaption(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGenerate}
        className="btn-primary"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Caption"}
      </button>

      {caption && (
        <textarea
          className="w-full h-40 border rounded p-3 bg-[rgba(255,255,255,0.03)]"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      )}
    </div>
  );
}
