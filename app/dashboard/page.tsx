import RestaurantsDashboard from "../restaurants/RestaurantsDashboard";

export default async function DashboardPage() {
  // Fetch restaurants from your API route
  const res = await fetch("http://localhost:3000/api/restaurants", {
    cache: "no-store",
  });

  const restaurants = await res.json();

  return <RestaurantsDashboard restaurants={restaurants} />;
}
