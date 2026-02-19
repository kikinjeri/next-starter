import { NextResponse } from "next/server";
import { getBskyAgent } from "@/lib/bsky/client";
import { getRestaurantBySlug } from "@/lib/supabase/restaurants";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    const restaurant = await getRestaurantBySlug(slug);
    if (!restaurant) {
      return NextResponse.json(
        { success: false, error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const agent = await getBskyAgent();

    const text = `🍽️ Ottawa Eats Spotlight: ${restaurant.name}\n\n${restaurant.description ?? ""}`;

    const result = await agent.post({ text });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
