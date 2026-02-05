// components/PostCard.tsx
"use client";

export function PostCard({ caption }: { caption: string }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm max-w-xl">
      <p className="whitespace-pre-line text-[15px] leading-relaxed">
        {caption}
      </p>
    </div>
  );
}
