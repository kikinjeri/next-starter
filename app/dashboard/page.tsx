import { createClient } from "@supabase/supabase-js";
import RestaurantsDashboard from "../restaurants/RestaurantsDashboard";

export default async function Page() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data: restaurants } = await supabase.from("restaurants").select("*");

  return <RestaurantsDashboard restaurants={restaurants || []} />;
}
