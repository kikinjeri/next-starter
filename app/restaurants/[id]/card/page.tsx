import { createClient } from "@supabase/supabase-js";
import { generateRestaurantCardHTML } from "@/lib/generators/restaurantCard";
import { lookupWebsiteFree } from "@/lib/web/lookupWebsite";

function validateWebsite(url?: string | null): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (!parsed.hostname.includes(".")) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export default async function RestaurantCardPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Fetch restaurant
  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .single();

  if (!restaurant) {
    return <div>Restaurant not found.</div>;
  }

  // Website + phone lookup
  const lookup = await lookupWebsiteFree(restaurant.name, restaurant.address);

  const validatedStoredWebsite = validateWebsite(restaurant.website);
  const validatedLookupWebsite = validateWebsite(lookup.website);

  restaurant.website = validatedLookupWebsite || validatedStoredWebsite || null;
  restaurant.phone = lookup.phone || restaurant.phone || null;

  // Google Maps link
  restaurant.google_maps_url = restaurant.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        restaurant.address,
      )}`
    : null;

  // Menu + specials
  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", id);

  const { data: specials } = await supabase
    .from("specials")
    .select("*")
    .eq("restaurant_id", id)
    .single();

  // Generate card HTML
  const cardHTML = generateRestaurantCardHTML(
    restaurant,
    menuItems || [],
    specials || undefined,
  );

  return (
    <html>
      <head>
        <link rel="stylesheet" href="/styles/styles.css" />
        <title>{restaurant.name} — Menu Card</title>
      </head>
      <body dangerouslySetInnerHTML={{ __html: cardHTML }} />
    </html>
  );
}
