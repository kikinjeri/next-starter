import { supabase } from "../../supabase";
import CaptionForm from "./ui/CaptionForm";

export const metadata = {
  title: "Create Post | Mahal Tanjore Social Studio",
  description: "Generate flyer-style, menu-aware social posts.",
};

export default async function CreatePostPage({
  searchParams,
}: {
  searchParams: { dishId?: string };
}) {
  const dishId = searchParams?.dishId;

  const { data: dish } = await supabase
    .from("menu_items")
    .select("*")
    .eq("id", dishId)
    .single();

  if (!dish) {
    return (
      <div className="p-6 text-center text-red-600">
        Dish not found. Provide a valid dishId in the URL.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6ef] p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-[#e8dcc2]">
        <h1 className="text-3xl font-serif text-[#7a1f1f] mb-6">
          Create Post for {dish.name}
        </h1>

        <div className="mb-6 p-4 bg-[#fff8e6] border border-[#e8dcc2] rounded-lg">
          <h2 className="text-xl font-semibold text-[#7a1f1f]">{dish.name}</h2>
          <p className="text-sm text-gray-700">{dish.category}</p>
          {dish.description && (
            <p className="mt-2 text-gray-800">{dish.description}</p>
          )}
          {dish.price && (
            <p className="mt-2 font-semibold text-[#7a1f1f]">
              Price: ${dish.price}
            </p>
          )}
        </div>

        <CaptionForm dish={dish} />
      </div>
    </div>
  );
}
