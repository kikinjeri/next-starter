"use client";

import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SelectDishForm({ restaurants }) {
  const router = useRouter();
  const [restaurantId, setRestaurantId] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (!restaurantId) return;

    const loadMenuItems = async () => {
      const { data } = await supabaseBrowser
        .from("menu_items")
        .select("id, name")
        .eq("restaurant_id", restaurantId)
        .order("name");

      setMenuItems(data ?? []);
    };

    loadMenuItems();
  }, [restaurantId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dishId = e.target.dish.value;

    // ⭐ FIXED: include BOTH dishId and restaurantId
    if (dishId && restaurantId) {
      router.push(`/create-post?dishId=${dishId}&restaurantId=${restaurantId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium">Restaurant</label>
        <select
          className="mt-1 w-full border rounded p-2"
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {restaurantId && (
        <div>
          <label className="block text-sm font-medium">Dish</label>
          <select name="dish" className="mt-1 w-full border rounded p-2">
            <option value="">Select a dish</option>
            {menuItems.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {restaurantId && (
        <button type="submit" className="btn-primary w-full mt-4">
          Continue
        </button>
      )}
    </form>
  );
}
