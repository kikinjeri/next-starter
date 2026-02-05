"use client";

import { useRef } from "react";
import { toPng } from "html-to-image";
import { RestaurantCard } from "./RestaurantCard";

export function RestaurantCardExportable({ restaurant, menuItems }: any) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleDownload = async () => {
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current);
    const link = document.createElement("a");
    link.download = `${restaurant.slug}-card.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="space-y-4">
      <div ref={ref}>
        <RestaurantCard restaurant={restaurant} menuItems={menuItems} />
      </div>
      <button
        onClick={handleDownload}
        className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm"
      >
        Download as image
      </button>
    </div>
  );
}
