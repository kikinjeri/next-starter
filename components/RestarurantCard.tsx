type Restaurant = {
  name: string;
  neighbourhood: string;
  price_range: string;
  vibe: string | null;
  website: string | null;
  description: string | null;
  primary_color: string;
  secondary_color: string;
  text_color: string;
};

type MenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: string | null;
};

type Props = {
  restaurant: Restaurant;
  menuItems: MenuItem[];
};

export function RestaurantCard({ restaurant, menuItems }: Props) {
  const spotlightItems = menuItems.slice(0, 5);

  return (
    <div
      className="w-full max-w-xl rounded-2xl p-6 shadow-lg"
      style={{
        backgroundColor: restaurant.primary_color,
        color: restaurant.text_color,
      }}
    >
      {/* Header */}
      <div className="flex flex-col gap-1 mb-4">
        <h1 className="text-2xl font-semibold">{restaurant.name}</h1>
        <p className="text-sm opacity-90">
          {restaurant.neighbourhood} • {restaurant.price_range}
        </p>
        {restaurant.vibe && (
          <p className="text-sm opacity-80">Vibe: {restaurant.vibe}</p>
        )}
        {restaurant.website && (
          <a
            href={restaurant.website}
            className="text-sm underline"
            style={{ color: restaurant.secondary_color }}
          >
            {restaurant.website.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>

      {/* Description */}
      {restaurant.description && (
        <p className="text-sm mb-4 opacity-90">{restaurant.description}</p>
      )}

      {/* Menu items */}
      <div
        className="rounded-xl p-4"
        style={{
          backgroundColor: restaurant.secondary_color,
          color: "#111827",
        }}
      >
        <h2 className="text-sm font-semibold mb-2">What to try:</h2>
        <ul className="space-y-1">
          {spotlightItems.map((item) => (
            <li key={item.id} className="text-sm">
              <span className="font-medium">{item.name}</span>
              {item.price && <span> • ${item.price}</span>}
              {item.description && (
                <span className="block text-xs text-gray-700">
                  {item.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
