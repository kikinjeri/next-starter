import { NextResponse } from "next/server";
import { getRestaurantBySlug } from "@/lib/supabase/restaurants";
import { getBskyAgent } from "@/lib/bsky/client";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    const restaurant = await getRestaurantBySlug(slug);

    const agent = await getBskyAgent();

    const text = `🍽️ Ottawa Spotlight: ${restaurant.name}\n\n${restaurant.description ?? ""}`;

    const result = await agent.post({ text });

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
