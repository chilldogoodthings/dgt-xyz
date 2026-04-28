import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | do good things", // This automatically adds your brand to sub-page titles
    default: "do good things", // This is the default title of your site
  },
  description: "A concise description of your site for SEO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* This renders either your (main) or (bare) layout */}
        {children}
      </body>
    </html>
  );
}
