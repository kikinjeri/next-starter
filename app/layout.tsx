import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Ottawa Eats Social Bot",
  description: "Automated restaurant posting powered by Supabase + Bluesky",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <header>
      
      </header>
      <body>{children}</body>
      <footer className="footer text-center mt-16 py-6 text-[var(--card-muted)]">
        I ❤️ Ottawa!
      </footer>
    </html>
  );
}
