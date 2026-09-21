import type { Metadata } from "next";
import HomeClientWrapper from "@/components/landing/HomeClientWrapper";
import {
  getAbsoluteUrl,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebApplicationSchema,
  generateFAQSchema,
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

const HOMEPAGE_FAQS = [
  {
    question: "Is Roaddy completely free to use?",
    answer: "Yes, Roaddy is 100% free to use and requires no credit card or account registration to plan your trips.",
  },
  {
    question: "Do I need an account to plan a road trip?",
    answer: "No account is required. You can start creating your trip itinerary right away, and your progress is saved locally in your web browser.",
  },
  {
    question: "How does Roaddy help plan multi-stop road trips?",
    answer: "Roaddy provides an interactive map where you can search destinations, add intermediate stops, organize your trip day by day, and reorder stops easily.",
  },
  {
    question: "Does Roaddy provide curated travel guides?",
    answer: "Yes, Roaddy includes editorial travel guides with detailed day-by-day itineraries, driving distances, national park highlights, and practical tips.",
  },
];

export default function HomePage() {
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const webAppSchema = generateWebApplicationSchema();
  const faqSchema = generateFAQSchema(HOMEPAGE_FAQS);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClientWrapper />
    </>
  );
}
