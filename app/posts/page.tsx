"use client";

import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { updatePost, markAsPosted } from "../actions";

export default function PostsPage({ searchParams }) {
  const tab = searchParams?.tab || "drafts";

  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editCaption, setEditCaption] = useState("");

  async function loadPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*, menu_items(name)")
      .order("created_at", { ascending: false });

    setPosts(data || []);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const filtered =
    tab === "drafts"
      ? posts.filter((p) => p.status === "draft")
      : tab === "scheduled"
        ? posts.filter((p) => p.status === "scheduled")
        : posts.filter((p) => p.status === "posted");

  async function handleSaveEdit(id) {
    await updatePost({ id, caption: editCaption });
    setEditingId(null);
    loadPosts();
  }

  async function handleMarkPosted(id) {
    await markAsPosted(id);
    loadPosts();
  }

  return (
    <div className="min-h-screen bg-[#faf6ef] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <a href="/posts?tab=drafts" className="tab">
            Drafts
          </a>
          <a href="/posts?tab=scheduled" className="tab">
            Scheduled
          </a>
          <a href="/posts?tab=posted" className="tab">
            Posted
          </a>
        </div>

        <h1 className="text-3xl font-serif text-[#7a1f1f] mb-6">
          {tab === "drafts"
            ? "Drafts"
            : tab === "scheduled"
              ? "Scheduled Posts"
              : "Published Posts"}
        </h1>

        {filtered.length === 0 && (
          <p className="text-gray-600 italic">No posts found.</p>
        )}

        <div className="space-y-4">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-white border border-[#e8dcc2] rounded-lg shadow-sm"
            >
              <div className="font-semibold text-[#7a1f1f]">
                {post.menu_items?.name}
              </div>

              {/* If editing */}
              {editingId === post.id ? (
                <>
                  <textarea
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="w-full h-40 p-3 border border-[#e8dcc2] rounded-lg bg-[#fffdf8] mt-2"
                  />

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleSaveEdit(post.id)}
                      className="bg-[#7a1f1f] text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-gray-700 mt-1 whitespace-pre-line">
                    {post.caption?.slice(0, 200)}…
                  </div>

                  {post.scheduled_for && (
                    <div className="mt-2 text-sm text-[#7a1f1f] font-medium">
                      Scheduled: {new Date(post.scheduled_for).toLocaleString()}
                    </div>
                  )}

                  <div className="mt-2 text-xs text-gray-500">
                    Created: {new Date(post.created_at).toLocaleString()}
                  </div>

                  {/* Edit button */}
                  {post.status === "draft" && (
                    <button
                      onClick={() => {
                        setEditingId(post.id);
                        setEditCaption(post.caption);
                      }}
                      className="mt-3 text-sm text-[#7a1f1f] underline"
                    >
                      Edit Draft
                    </button>
                  )}

                  {/* Mark as posted */}
                  {post.status !== "posted" && (
                    <button
                      onClick={() => handleMarkPosted(post.id)}
                      className="mt-3 ml-4 text-sm text-white bg-[#7a1f1f] px-3 py-1 rounded"
                    >
                      Mark as Posted
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
