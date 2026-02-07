// app/create-post/page.tsx
export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";
import CreatePostClient from "./CreatePostClient";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

type PageProps = {
  searchParams: {
    restaurantId?: string;
    dishId?: string;
  };
};

export default async function CreatePostPage({ searchParams }: PageProps) {
  const restaurantId = searchParams.restaurantId;
  const dishId = searchParams.dishId;

  if (!restaurantId || !dishId) {
    return <div className="p-6">Missing restaurantId or dishId.</div>;
  }

  // Fetch restaurant
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id, name, neighbourhood, address, phone, website")
    .eq("id", restaurantId)
    .single();

  // Fetch dish
  const { data: dish } = await supabase
    .from("menu_items")
    .select("id, name, price, category, dietary_labels, image_url")
    .eq("id", dishId)
    .single();

  if (!restaurant || !dish) {
    return <div className="p-6">Restaurant or dish not found.</div>;
  }

  return (
    <CreatePostClient
      restaurant={{
        id: restaurant.id,
        name: restaurant.name,
        neighbourhood: restaurant.neighbourhood,
        address: restaurant.address,
        phone: restaurant.phone,
        website: restaurant.website,
      }}
      dish={{
        id: dish.id,
        name: dish.name,
        price: dish.price,
        category: dish.category,
        dietary_labels: dish.dietary_labels,
        image_url: dish.image_url,
      }}
    />
  );
}
