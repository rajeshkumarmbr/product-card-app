import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Card App",
  description: "Modern product card showcase with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
