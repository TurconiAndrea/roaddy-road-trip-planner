import type { Metadata } from "next";
import HomeClientWrapper from "@/components/landing/HomeClientWrapper";
import {
  getAbsoluteUrl,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebApplicationSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Free Road Trip Planner | Plan Stops & Build Your Itinerary | Roaddy",
  description:
    "Plan road trips with an interactive map. Add stops, organize your itinerary by day, and build a clear route for free—no account required.",
  alternates: {
    canonical: getAbsoluteUrl("/"),
  },
  openGraph: {
    title: "Free Road Trip Planner | Plan Stops & Build Your Itinerary | Roaddy",
    description:
      "Plan road trips with an interactive map. Add stops, organize your itinerary by day, and build a clear route for free—no account required.",
    url: getAbsoluteUrl("/"),
    type: "website",
    siteName: "Roaddy",
    images: [
      {
        url: getAbsoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Roaddy Road Trip Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Road Trip Planner | Plan Stops & Build Your Itinerary | Roaddy",
    description:
      "Plan road trips with an interactive map. Add stops, organize your itinerary by day, and build a clear route for free—no account required.",
    images: [getAbsoluteUrl("/og-image.png")],
  },
};

export default function HomePage() {
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const webAppSchema = generateWebApplicationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <HomeClientWrapper />
    </>
  );
}
