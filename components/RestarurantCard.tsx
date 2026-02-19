// components/RestaurantCard.tsx
export default function RestaurantCard({ restaurant }) {
  return (
    <article className="border rounded-lg p-4 shadow-sm bg-white">
      <header className="flex items-center gap-3">
        {restaurant.logo_url && (
          <img
            src={restaurant.logo_url}
            alt={`${restaurant.name} logo`}
            className="w-12 h-12 rounded object-cover"
          />
        )}

        <div>
          <h2 className="text-xl font-semibold">{restaurant.name}</h2>
          {restaurant.neighbourhood && (
            <p className="text-sm text-gray-600">{restaurant.neighbourhood}</p>
          )}
        </div>
      </header>

      {restaurant.description && (
        <p className="mt-3 text-gray-700">{restaurant.description}</p>
      )}

      <ul className="mt-3 text-sm text-gray-800 space-y-1">
        {restaurant.address && (
          <li>
            <strong>Address:</strong> {restaurant.address}
          </li>
        )}
        {restaurant.phone && (
          <li>
            <strong>Phone:</strong> {restaurant.phone}
          </li>
        )}
        {restaurant.website && (
          <li>
            <strong>Website:</strong>{" "}
            <a
              href={restaurant.website}
              rel="nofollow"
              className="text-blue-600 underline"
            >
              {restaurant.website}
            </a>
          </li>
        )}
      </ul>

      {restaurant.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 rounded-full border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
