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
    <div className="card space-y-6">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="btn btn-primary w-full justify-center"
      >
        {loading ? "Generating..." : "Generate Flyer-Style Caption"}
      </button>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Caption Preview
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full h-48 p-4 rounded-lg border border-[var(--border)] bg-[rgba(0,0,0,0.4)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          placeholder="Your flyer-style caption will appear here..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigator.clipboard.writeText(caption)}
          className="btn btn-secondary flex-1 justify-center"
        >
          Copy Caption
        </button>

        <button
          onClick={handleSaveDraft}
          disabled={saving}
          className="btn btn-primary flex-1 justify-center"
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handlePostBluesky}
          disabled={!caption}
          className="btn btn-bluesky flex-1 justify-center"
        >
          Post to Bluesky
        </button>
        <button
          onClick={handlePostFacebook}
          disabled={!caption}
          className="btn btn-facebook flex-1 justify-center"
        >
          Post to Facebook (stub)
        </button>
        <button
          onClick={handlePostInstagram}
          disabled={!caption}
          className="btn btn-instagram flex-1 justify-center"
        >
          Post to Instagram (stub)
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Schedule Reminder
        </label>
        <input
          type="datetime-local"
          value={scheduledFor}
          onChange={(e) => setScheduledFor(e.target.value)}
          className="w-full p-3 rounded-lg border border-[var(--border)] bg-[rgba(0,0,0,0.4)] text-[var(--foreground)]"
        />
        <button
          onClick={handleSchedule}
          disabled={!scheduledFor || !caption}
          className="btn btn-primary w-full justify-center mt-3"
        >
          Schedule Post
        </button>
      </div>
    </div>
  );
}
