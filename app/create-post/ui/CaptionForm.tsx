"use client";

import { useState } from "react";
import {
  generateCaption,
  saveDraft,
  schedulePost,
  postToBluesky,
  postToFacebook,
  postToInstagram,
} from "../../actions";

export default function CaptionForm({ dish }: { dish: any }) {
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [scheduledFor, setScheduledFor] = useState("");

  async function handleGenerate() {
    setLoading(true);
    const result = await generateCaption({
      caption: "",
      dish: dish.name,
      category: dish.category,
    });
    setCaption(result || "");
    setLoading(false);
  }

  async function handleSaveDraft() {
    setSaving(true);
    await saveDraft({ dishId: dish.id, caption });
    setSaving(false);
    alert("Draft saved!");
  }

  async function handleSchedule() {
    setSaving(true);
    await schedulePost({ dishId: dish.id, caption, scheduledFor });
    setSaving(false);
    alert("Post scheduled!");
  }

  async function handlePostBluesky() {
    if (!caption) return alert("Caption is empty.");
    await postToBluesky(caption);
    alert("Posted to Bluesky!");
  }

  async function handlePostFacebook() {
    if (!caption) return alert("Caption is empty.");
    await postToFacebook(caption);
    alert("(Stub) Would post to Facebook.");
  }

  async function handlePostInstagram() {
    if (!caption) return alert("Caption is empty.");
    await postToInstagram(caption);
    alert("(Stub) Would post to Instagram.");
  }

  return (
    <div>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-[#7a1f1f] text-white py-3 rounded-lg font-semibold hover:bg-[#5e1717] transition"
      >
        {loading ? "Generating..." : "Generate Flyer-Style Caption"}
      </button>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-[#7a1f1f] mb-2">
          Caption Preview
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full h-48 p-4 border border-[#e8dcc2] rounded-lg bg-[#fffdf8] focus:ring-[#7a1f1f]"
          placeholder="Your flyer-style caption will appear here..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={() => navigator.clipboard.writeText(caption)}
          className="flex-1 bg-[#7a1f1f] text-white py-3 rounded-lg font-semibold hover:bg-[#5e1717] transition"
        >
          Copy Caption
        </button>

        <button
          onClick={handleSaveDraft}
          disabled={saving}
          className="flex-1 bg-[#c49a6c] text-white py-3 rounded-lg font-semibold hover:bg-[#a67f55] transition"
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <button
          onClick={handlePostBluesky}
          disabled={!caption}
          className="flex-1 bg-[#1e90ff] text-white py-3 rounded-lg font-semibold hover:bg-[#187bcd] transition"
        >
          Post to Bluesky
        </button>
        <button
          onClick={handlePostFacebook}
          disabled={!caption}
          className="flex-1 bg-[#1877f2] text-white py-3 rounded-lg font-semibold hover:bg-[#145ec4] transition"
        >
          Post to Facebook (stub)
        </button>
        <button
          onClick={handlePostInstagram}
          disabled={!caption}
          className="flex-1 bg-[#e1306c] text-white py-3 rounded-lg font-semibold hover:bg-[#b82455] transition"
        >
          Post to Instagram (stub)
        </button>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-semibold text-[#7a1f1f] mb-2">
          Schedule Reminder
        </label>
        <input
          type="datetime-local"
          value={scheduledFor}
          onChange={(e) => setScheduledFor(e.target.value)}
          className="w-full p-3 border border-[#e8dcc2] rounded-lg bg-[#fffdf8]"
        />
        <button
          onClick={handleSchedule}
          disabled={!scheduledFor || !caption}
          className="w-full mt-3 bg-[#7a1f1f] text-white py-3 rounded-lg font-semibold hover:bg-[#5e1717] transition"
        >
          Schedule Post
        </button>
      </div>
    </div>
  );
}
