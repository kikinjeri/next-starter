"use client";

import { useState, useMemo } from "react";

export default function RestaurantsDashboard({ restaurants }) {
  const [query, setQuery] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [category, setCategory] = useState("");

  const neighborhoods = [
    ...new Set(restaurants.map((r) => r.neighbourhood).filter(Boolean)),
  ];
  const categories = [
    ...new Set(restaurants.flatMap((r) => r.categories || [])),
  ];

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const q = query.toLowerCase();

      const matchesQuery =
        r.name.toLowerCase().includes(q) ||
        r.neighbourhood?.toLowerCase().includes(q) ||
        r.categories?.join(" ").toLowerCase().includes(q);

      const matchesNeighborhood =
        !neighborhood || r.neighbourhood === neighborhood;

      const matchesCategory =
        !category || (r.categories || []).includes(category);

      return matchesQuery && matchesNeighborhood && matchesCategory;
    });
  }, [query, neighborhood, category, restaurants]);

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      <h1 className="text-4xl font-bold text-[var(--accent)]">
        Restaurant Dashboard
      </h1>

      <input
        type="text"
        placeholder="Search by name, neighborhood, or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg shadow-sm"
      />

      <div className="flex gap-4">
        <select
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Neighborhoods</option>
          {neighborhoods.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {filtered.map((restaurant) => (
          <div
            key={restaurant.id}
            className="p-6 rounded-xl shadow-lg border bg-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-[var(--accent)]">
                {restaurant.name}
              </h2>
              <p className="text-sm text-gray-600">
                {restaurant.neighbourhood}
              </p>

              {restaurant.categories?.length > 0 && (
                <p className="text-xs mt-1 text-gray-500">
                  {restaurant.categories.join(", ")}
                </p>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <a
                href={`/api/generate-card?id=${restaurant.id}`}
                target="_blank"
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Preview
              </a>

              <button
                onClick={async () => {
                  await fetch("/api/bsky/post-restaurant", {
                    method: "POST",
                    body: JSON.stringify({ id: restaurant.id }),
                  });
                  alert("Posted to Bluesky!");
                }}
                className="px-3 py-1 bg-sky-600 text-white rounded text-sm"
              >
                Post
              </button>

              <a
                href={`/restaurants/${restaurant.id}`}
                className="px-3 py-1 bg-gray-200 rounded text-sm"
              >
                Edit
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
