type Restaurant = {
  name: string;
  description?: string | null;
  address?: string | null;
  email?: string | null;
  phone?: string | null;
  neighbourhood?: string | null;
  website?: string | null;
  google_maps_url?: string | null;
  delivery_platforms?: string[] | null;

  primary_color?: string | null;
  secondary_color?: string | null;
  text_color?: string | null;
};

type MenuItem = {
  name: string;
  description?: string | null;
  price?: string | null;
  category?: string | null;
  is_alcohol?: boolean | null;
  tags?: string[] | null;
};

type Specials = {
  text?: string | null;
};

export function generateRestaurantCardHTML(
  restaurant: Restaurant,
  menuItems: MenuItem[],
  specials?: Specials
) {
  const safe = (v?: string | null) => v ?? "";

  const primary = restaurant.primary_color || "#0a1a2f";
  const secondary = restaurant.secondary_color || "#f5c26b";
  const text = restaurant.text_color || "#ffffff";

  // Group menu items
  const nonAlcohol = menuItems.filter((i) => !i.is_alcohol);
  const alcohol = menuItems.filter((i) => i.is_alcohol);

  const grouped: Record<string, MenuItem[]> = {};
  for (const item of nonAlcohol) {
    const cat = item.category ?? "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }

  const renderItem = (item: MenuItem) => {
    const tags =
      item.tags && item.tags.length
        ? `<ul class="item-tags">${item.tags
            .map((t) => `<li class="tag">${t}</li>`)
            .join("")}</ul>`
        : "";

    return `
      <li class="menu-item">
        <div class="item-header">
          <span class="dish">${safe(item.name)}</span>
          ${
            item.price
              ? `<span class="price">$${safe(item.price)}</span>`
              : ""
          }
        </div>
        ${
          item.description
            ? `<p class="item-description">${safe(item.description)}</p>`
            : ""
        }
        ${tags}
      </li>
    `;
  };

  const groupedHTML = Object.entries(grouped)
    .map(
      ([category, items]) => `
      <section class="menu-category">
        <h3 class="category-title">${category}</h3>
        <ul class="category-list">
          ${items.map(renderItem).join("")}
        </ul>
      </section>
    `
    )
    .join("");

  const alcoholHTML =
    alcohol.length > 0
      ? `
      <section class="menu-category alcohol-section">
        <h3 class="category-title">Alcohol</h3>
        <ul class="category-list">
          ${alcohol.map(renderItem).join("")}
        </ul>
      </section>
    `
      : "";

  const deliveryHTML =
    restaurant.delivery_platforms?.length
      ? `
      <section class="info-section">
        <p><strong>Delivery:</strong> ${restaurant.delivery_platforms.join(
          ", "
        )}</p>
      </section>
    `
      : "";

  return `
<article class="restaurant-card" style="
  --primary:${primary};
  --secondary:${secondary};
  --text:${text};
">
  <header class="card-header">
    <h1>${safe(restaurant.name)}</h1>
    <p class="neighbourhood">${safe(restaurant.neighbourhood)}</p>
  </header>

  <section class="description-section">
    <p class="description">${safe(restaurant.description)}</p>
  </section>

  <section class="info-section">
    <p><strong>Address:</strong> ${safe(restaurant.address)}</p>
    ${
      restaurant.phone
        ? `<p><strong>Phone:</strong> ${safe(restaurant.phone)}</p>`
        : ""
    }
    ${
      restaurant.website
        ? `<p><strong>Website:</strong> <a href="${safe(
            restaurant.website
          )}" rel="noopener noreferrer">Visit Website</a></p>`
        : ""
    }
    ${
      restaurant.google_maps_url
        ? `<p><strong>Google Maps:</strong> <a href="${restaurant.google_maps_url}" rel="noopener noreferrer">Open in Maps</a></p>`
        : ""
    }
    ${deliveryHTML}
  </section>

  <section class="menu-section">
    <h2>Menu</h2>
    ${groupedHTML}
    ${alcoholHTML}
  </section>

  ${
    specials?.text
      ? `
      <section class="specials-section">
        <h2>Specials</h2>
        <p>${safe(specials.text)}</p>
      </section>
    `
      : ""
  }

  <footer class="card-footer">
    Ottawa Eats Together
  </footer>
</article>
`.trim();
}

