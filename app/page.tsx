import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-16">
      {/* Header */}
      <header className="header text-center">
        <h1 className="text-4xl font-bold text-[var(--accent)]">
          Ottawa Restaurants
        </h1>
        <p className="text-[var(--muted)] mt-2 text-lg">
          Automated restaurant posting powered by Supabase + Bluesky
        </p>
      </header>

      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h2 className="section-title">Your Social Automation Hub</h2>
        <p className="max-w-2xl mx-auto text-[var(--muted)] text-lg leading-relaxed">
          Manage restaurants, generate beautiful HTML cards, and publish
          directly to Bluesky. Designed for speed, clarity, and a clean
          Bluesky‑inspired aesthetic.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Link href="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link href="/restaurants" className="btn btn-secondary">
            View Restaurants
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card">
          <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">
            Supabase Integration
          </h3>
          <p className="text-[var(--muted)]">
            Pull restaurant data, menus, and specials directly from your
            database.
          </p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">
            Bluesky Posting
          </h3>
          <p className="text-[var(--muted)]">
            Publish posts, images, and restaurant cards to @ottawa-eats with one
            click.
          </p>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">
            HTML Card Generator
          </h3>
          <p className="text-[var(--muted)]">
            Create beautiful, branded restaurant cards ready for Bluesky.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-center">
        I ❤️  Ottawa — Powered by Supabase +
        Next.js + Bluesky
      </footer>
    </main>
  );
}
