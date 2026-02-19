import { getSupabaseServer } from "./client";

export async function getRestaurantBySlug(slug: string) {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

