import type { Restaurant, MenuItem } from '@/types';

export function generateCaption(restaurant: Restaurant, menuItems: MenuItem[]) {
  const spotlight = menuItems.slice(0, 5);

  const website =
    restaurant.website ?? 'No website available (call or visit in person!)';

  const itemsBlock = spotlight
    .map((item) => `• ${item.name}${item.price ? ` — $${item.price}` : ''}`)
    .join('\n');

  return `
🍽️ ${restaurant.name} — ${restaurant.neighbourhood}
💵 Price Range: ${restaurant.price_range}
🌟 Vibe: ${restaurant.vibe ?? 'Not specified'}
🔗 Website: ${website}

What to try:
${itemsBlock}

Why we love it:
${restaurant.description ?? ''}

#OttawaEats #OttawaFood #OttawaRestaurants
`.trim();
}
