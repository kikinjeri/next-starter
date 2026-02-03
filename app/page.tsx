import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf6ef] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-[#7a1f1f] mb-4">
          Mahal Tanjore Social Studio
        </h1>
        <p className="text-gray-700 mb-8">
          Generate flyer-style social posts for Bluesky, Facebook, and
          Instagram.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/create-post"
            className="inline-block bg-[#7a1f1f] text-white px-4 py-3 rounded-lg font-semibold"
          >
            Create Post
          </Link>
          <Link
            href="/posts"
            className="inline-block bg-[#c49a6c] text-white px-4 py-3 rounded-lg font-semibold"
          >
            View Drafts & Scheduled Posts
          </Link>
        </div>
      </div>
    </main>
  );
}
