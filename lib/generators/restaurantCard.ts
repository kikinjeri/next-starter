// lib/generators/restaurantCard.ts

type Restaurant = {
  name: string;
  description?: string | null;
  address?: string | null;
  email?: string | null;
  neighborhood?: string | null;
  website_url?: string | null;
};

type MenuItem = {
  name: string;
  price?: string | null;
};

type Specials = {
  text?: string | null;
};

export function generateRestaurantCardHTML(
  restaurant: Restaurant,
  menuItems: MenuItem[],
  specials?: Specials
) {
  const safe = (value?: string | null) => value ?? "";

  const menuList = menuItems
    .map(
      (item) =>
        `<li><span class="dish">${safe(item.name)}</span>${
          item.price ? ` — <span class="price">${item.price}</span>` : ""
        }</li>`
    )
    .join("");

  const specialsBlock = specials?.text
    ? `<div class="specials-section">
         <h2>Specials</h2>
         <p>${safe(specials.text)}</p>
       </div>`
    : "";

  const websiteBlock = restaurant.website_url
    ? `<p><strong>Website:</strong> <a href="${safe(
        restaurant.website_url
      )}">Visit Website</a></p>`
    : "";

  return `
<div class="restaurant-card">
  <div class="card-header">
    <h1>${safe(restaurant.name)}</h1>
    <p class="neighborhood">${safe(restaurant.neighborhood)}</p>
  </div>

  <div class="card-body">
    <p class="description">${safe(restaurant.description)}</p>

    <div class="info-section">
      <p><strong>Address:</strong> ${safe(restaurant.address)}</p>
      <p><strong>Email:</strong> ${safe(restaurant.email)}</p>
      ${websiteBlock}
    </div>

    <div class="menu-section">
      <h2>Menu Highlights</h2>
      <ul>
        ${menuList}
      </ul>
    </div>

    ${specialsBlock}

    <div class="image-slot"></div>

    <div class="card-footer">
      I ❤️ Ottawa — <span class="footer-handle">@ottawa-menus</span>
    </div>
  </div>
</div>
`.trim();
}
