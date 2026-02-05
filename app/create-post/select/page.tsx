// app/create-post/select/page.tsx
import { createServerSupabase } from "@/lib/supabase/server";
import Link from "next/link";

export default async function SelectDishPage() {
  const supabase = createServerSupabase();

  // Load dishes
  const { data: dishes, error: dishesError } = await supabase
    .from("menu_items")
    .select("id, name, price, category, description, image_url, restaurant_id")
    .order("name");

  if (dishesError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load dishes: {dishesError.message}
      </div>
    );
  }

  // Load restaurants
  const { data: restaurants, error: restaurantsError } = await supabase
    .from("restaurants")
    .select("id, name");

  if (restaurantsError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load restaurants: {restaurantsError.message}
      </div>
    );
  }

  // Build lookup map
  const restaurantMap = new Map(restaurants.map((r) => [r.id, r.name]));

  // Group dishes by restaurant
  const grouped = dishes.reduce(
    (acc, dish) => {
      const rId = dish.restaurant_id;
      if (!acc[rId]) acc[rId] = [];
      acc[rId].push(dish);
      return acc;
    },
    {} as Record<string, typeof dishes>,
  );

  return (
    <div className="space-y-10 p-6">
      {/* Back to Home */}
      <Link href="/" className="text-white underline">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-white">Select a Dish</h1>

      {/* Search + Filter UI */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search dishes..."
          className="w-full md:w-1/2 p-2 rounded bg-white/10 border border-white/20 text-white"
        />

        <select className="w-full md:w-1/3 p-2 rounded bg-white/10 border border-white/20 text-white">
          <option value="">All Categories</option>
          {[...new Set(dishes.map((d) => d.category).filter(Boolean))].map(
            (cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ),
          )}
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
                  <h4 className="text-white/60 text-sm">{dish.category}</h4>
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
