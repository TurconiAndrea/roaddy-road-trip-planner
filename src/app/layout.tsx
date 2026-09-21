import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getSiteUrl } from "@/lib/seo";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Free Road Trip Planner | Plan Stops and Build Your Itinerary | Roaddy",
    template: "%s | Roaddy",
  },
  description:
    "Plan road trips with an interactive map. Add stops, organize your itinerary by day, and build a clear route for free—no account required.",
  keywords: [
    "road trip planner",
    "itinerary planner",
    "multi stop route planner",
    "trip planner free",
    "map road trip",
  ],
  authors: [{ name: "Roaddy" }],
  creator: "Roaddy",
  publisher: "Roaddy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Roaddy",
    title: "Free Road Trip Planner | Plan Stops and Build Your Itinerary | Roaddy",
    description:
      "Plan road trips with an interactive map. Add stops, organize your itinerary by day, and build a clear route for free—no account required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roaddy Road Trip Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Road Trip Planner | Plan Stops and Build Your Itinerary | Roaddy",
    description:
      "Plan road trips with an interactive map. Add stops, organize your itinerary by day, and build a clear route for free—no account required.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "apple-mobile-web-app-title": "Roaddy",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
