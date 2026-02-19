import { createClient } from '@supabase/supabase-js';

export function getSupabaseServer() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

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
