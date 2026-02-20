import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateRestaurantCardHTML } from "@/lib/generators/restaurantCard";
import { lookupWebsiteFree } from "@/lib/web/lookupWebsite";

// Validate website URLs so broken links don't appear
function validateWebsite(url?: string | null): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    // Must be https
    if (parsed.protocol !== "https:") return null;

    // Must have a real domain
    if (!parsed.hostname.includes(".")) return null;

    return parsed.toString();
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing restaurant id" },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch restaurant
  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .single();

  if (restaurantError || !restaurant) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 }
    );
  }

  // ----------------------------------------
  // WEBSITE + PHONE LOOKUP (FREE)
  // ----------------------------------------

  // WEBSITE + PHONE LOOKUP (FREE)
const lookup = await lookupWebsiteFree(restaurant.name, restaurant.address);

// Fallback website validation
const validatedStoredWebsite = validateWebsite(restaurant.website);

restaurant.website = lookup.website || validatedStoredWebsite || null;
restaurant.phone = lookup.phone || restaurant.phone || null;


  const validatedStoredWebsite = validateWebsite(restaurant.website);

  restaurant.website = lookup.website || validatedStoredWebsite || null;
  restaurant.phone = lookup.phone || restaurant.phone || null;

  // ----------------------------------------
  // GOOGLE MAPS LINK (NO API KEY REQUIRED)
  // ----------------------------------------

  if (restaurant.address) {
    restaurant.google_maps_url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      restaurant.address
    )}`;
  } else {
    restaurant.google_maps_url = null;
  }

  // ----------------------------------------
  // FETCH MENU + SPECIALS
  // ----------------------------------------

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", id);

  const { data: specials } = await supabase
    .from("specials")
    .select("*")
    .eq("restaurant_id", id)
    .single();

  // ----------------------------------------
  // GENERATE CARD HTML
  // ----------------------------------------

  const cardHTML = generateRestaurantCardHTML(
    restaurant,
    menuItems || [],
    specials || undefined
  );

  // ----------------------------------------
  // RETURN FULL HTML DOCUMENT
  // ----------------------------------------

  return new NextResponse(
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles/styles.css" />
        <title>${restaurant.name} — Menu Card</title>
      </head>

      <body>
        ${cardHTML}
      </body>
    </html>
    `,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    }
  );
}
