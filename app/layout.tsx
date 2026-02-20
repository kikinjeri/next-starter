import "./globals.css";
import "./styles/dashboard.css";

export const metadata = {
  title: "Ottawa Menus",
  description: "Restaurant dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
