import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Ottawa Eats Social Bot",
  description: "Automated restaurant posting powered by Supabase + Bluesky",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
