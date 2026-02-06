"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

export default function SelectClient({ dishes, restaurants }) {
  const [dishSearch, setDishSearch] = useState("");
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [category, setCategory] = useState("");

  // Fixed category order
  const CATEGORY_ORDER = ["breakfast", "lunch", "dinner", "dessert", "drinks"];

  // Normalize categories
  const normalize = (cat) => cat?.toLowerCase().trim() || "other";

  // Build lookup map
  const restaurantMap = useMemo(
    () => new Map(restaurants.map((r) => [r.id, r.name])),
    [restaurants],
  );

  // Filtering logic
  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      const restaurantName = restaurantMap.get(d.restaurant_id) || "";

      const matchesDish =
        d.name.toLowerCase().includes(dishSearch.toLowerCase()) ||
        d.description?.toLowerCase().includes(dishSearch.toLowerCase());

      const matchesRestaurant = restaurantName
        .toLowerCase()
        .includes(restaurantSearch.toLowerCase());

      const matchesCategory = category
        ? normalize(d.category) === category
        : true;

      return matchesDish && matchesRestaurant && matchesCategory;
    });
  }, [dishes, dishSearch, restaurantSearch, category, restaurantMap]);

  // Sort dishes by category order
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const catA = normalize(a.category);
      const catB = normalize(b.category);

      const indexA = CATEGORY_ORDER.indexOf(catA);
      const indexB = CATEGORY_ORDER.indexOf(catB);

      if (indexA !== indexB) return indexA - indexB;

      return a.name.localeCompare(b.name);
    });
  }, [filtered]);

  // Group by restaurant AFTER sorting
  const grouped = useMemo(() => {
    const groups = {};
    sorted.forEach((dish) => {
      const rId = dish.restaurant_id;
      if (!groups[rId]) groups[rId] = [];
      groups[rId].push(dish);
    });
    return groups;
  }, [sorted]);

  return (
    <div className="space-y-10 p-6">
      {/* Ottawa-Eats top-right */}
      <div className="flex justify-end">
        <h1 className="text-4xl font-bold text-white">Ottawa‑Eats</h1>
      </div>

      {/* Search Bars + Category Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Dishes */}
        <input
          type="text"
          placeholder="Search dishes..."
          value={dishSearch}
          onChange={(e) => setDishSearch(e.target.value)}
          className="w-full md:w-1/3 p-3 rounded bg-white/10 border border-white/20 text-white"
        />

        {/* Search Restaurants */}
        <input
          type="text"
          placeholder="Search restaurants..."
          value={restaurantSearch}
          onChange={(e) => setRestaurantSearch(e.target.value)}
          className="w-full md:w-1/3 p-3 rounded bg-white/10 border border-white/20 text-white"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-1/3 p-3 rounded bg-white/10 border border-white/20 text-white"
        >
          <option value="">All Categories</option>
          {CATEGORY_ORDER.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Restaurant Sections */}
      {Object.entries(grouped).map(([restaurantId, items]) => (
        <div key={restaurantId} className="space-y-4">
          {/* Restaurant Name */}
          <h2 className="text-2xl font-semibold text-white">
            {restaurantMap.get(restaurantId)}
          </h2>

          {/* Dish Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((dish) => (
              <Link
                key={dish.id}
                href={`/create-post?dishId=${dish.id}&restaurantId=${dish.restaurant_id}`}
                className="p-6 rounded-xl border border-white/20 bg-white/20 hover:bg-white/30 transition space-y-3"
              >
                {/* Dish Image */}
                {dish.image_url && (
                  <img
                    src={dish.image_url}
                    alt={dish.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                )}

                {/* Dish Name + Price */}
                <h3 className="text-lg font-medium text-white">
                  {dish.name}
                  {dish.price !== null && (
                    <span className="text-white/70">
                      {" "}
                      — ${dish.price.toFixed(2)}
                    </span>
                  )}
                </h3>

                {/* Category */}
                {dish.category && (
                  <h4 className="text-white/60 text-sm">
                    {normalize(dish.category)}
                  </h4>
                )}

                {/* Description */}
                {dish.description && (
                  <p className="font-semibold text-white">{dish.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
