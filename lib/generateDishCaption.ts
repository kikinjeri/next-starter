import Groq from "groq-sdk";
import type { MenuItem, Restaurant } from "@/types";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateDishCaption(
  dish: MenuItem,
  restaurant: Restaurant
) {
  const prompt = `
Create a short, appetizing social media caption for a single restaurant dish.

Restaurant: ${restaurant.name}
Neighbourhood: ${restaurant.neighbourhood ?? "N/A"}
Dish: ${dish.name}
Category: ${dish.category ?? "N/A"}
Description: ${dish.description ?? "No description provided"}
Price: ${dish.price ? `$${dish.price}` : "N/A"}

Tone: warm, inviting, community-focused.
Keep it concise. Avoid hashtags unless they feel natural.
`;

  const response = await client.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content.trim();
}
