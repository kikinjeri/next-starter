import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  // Use the public anon key — safe for client-side and API routes
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Query the restaurants table
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .order("name");

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  // Return JSON
  return NextResponse.json(data);
}
