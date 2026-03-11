import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title:       "Roaddy — Road Trip Planner",
  description: "Plan your perfect road trip",
  other: {
    "apple-mobile-web-app-title": "Roaddy",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
