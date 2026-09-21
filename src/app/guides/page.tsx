import type { Metadata } from "next";
import GuidesClientPage from "@/components/guides/GuidesClientPage";
import { getAbsoluteUrl, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Curated Travel Guides & Road Trip Itineraries | Roaddy",
  description:
    "Discover editorial day-by-day travel guides for iconic road trips. Complete itineraries with driving distances, national park tips, and accommodation recommendations.",
  alternates: {
    canonical: getAbsoluteUrl("/guides"),
  },
  openGraph: {
    title: "Curated Travel Guides & Road Trip Itineraries | Roaddy",
    description:
      "Discover editorial day-by-day travel guides for iconic road trips. Complete itineraries with driving distances, national park tips, and accommodation recommendations.",
    url: getAbsoluteUrl("/guides"),
    type: "website",
    siteName: "Roaddy",
    images: [
      {
        url: getAbsoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Roaddy Travel Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curated Travel Guides & Road Trip Itineraries | Roaddy",
    description:
      "Discover editorial day-by-day travel guides for iconic road trips. Complete itineraries with driving distances, national park tips, and accommodation recommendations.",
    images: [getAbsoluteUrl("/og-image.png")],
  },
};

export default function TravelGuidesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Travel Guides", item: "/guides" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GuidesClientPage />
    </>
  );
}
