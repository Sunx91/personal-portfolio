import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sunath Sandul | Launching Soon",
  description:
    "Personal portfolio of Sunath Sandul — Launching Soon. Stay tuned!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
