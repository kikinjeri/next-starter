// app/create-post/select/page.tsx
import { createServerSupabase } from "@/lib/supabase/server";
import SelectClient from "./SelectClient";

export default async function SelectDishPage() {
  const supabase = createServerSupabase();

  const { data: dishes } = await supabase
    .from("menu_items")
    .select("id, name, price, category, description, image_url, restaurant_id")
    .order("name");

  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("id, name")
    .order("name");

  return <SelectClient dishes={dishes ?? []} restaurants={restaurants ?? []} />;
}
