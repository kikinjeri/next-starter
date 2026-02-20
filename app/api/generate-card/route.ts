import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateRestaurantCardHTML } from "@/lib/generators/restaurantCard";

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

  // Fetch menu items
  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", id);

  // Fetch specials
  const { data: specials } = await supabase
    .from("specials")
    .select("*")
    .eq("restaurant_id", id)
    .single();

  // Generate the card HTML (semantic, accessible, brand-colored)
  const cardHTML = generateRestaurantCardHTML(
    restaurant,
    menuItems || [],
    specials || undefined
  );

  // Return a full HTML document that loads styles.css
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <!-- Load ONLY the restaurant-card stylesheet -->
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
