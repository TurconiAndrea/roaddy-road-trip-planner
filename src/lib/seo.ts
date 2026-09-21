import { TravelGuide } from "@/types/guide";

export const DEFAULT_SITE_URL = "https://roaddytravel.vercel.app";

/**
 * Returns the base site URL without a trailing slash.
 */
export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl = envUrl && envUrl.trim() !== "" ? envUrl : DEFAULT_SITE_URL;
  return baseUrl.replace(/\/+$/, "");
}

/**
 * Returns an absolute URL for a relative path.
 */
export function getAbsoluteUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${cleanPath}`;
}

/**
 * JSON-LD Schema: Organization
 */
export function generateOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Roaddy",
    url: siteUrl,
    logo: getAbsoluteUrl("/icon0.svg"),
    description: "Plan your perfect road trip with an interactive map, stops organization, and curated travel guides.",
  };
}

/**
 * JSON-LD Schema: WebSite
 */
export function generateWebSiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Roaddy",
    url: siteUrl,
    inLanguage: "en",
  };
}

/**
 * JSON-LD Schema: WebApplication
 */
export function generateWebApplicationSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Roaddy — Road Trip Planner",
    url: siteUrl,
    applicationCategory: "TravelApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Free interactive road trip planner. Add stops, organize your itinerary by day, and visualize your route on a map without registering an account.",
  };
}

/**
 * JSON-LD Schema: FAQPage
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * JSON-LD Schema: BreadcrumbList
 */
export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: getAbsoluteUrl(crumb.item),
    })),
  };
}

/**
 * JSON-LD Schema: Article for Travel Guides
 */
export function generateArticleSchema(guide: TravelGuide) {
  const guideUrl = getAbsoluteUrl(`/guides/${guide.slug}`);
  const title = typeof guide.title === "string" ? guide.title : guide.title.en;
  const description =
    guide.overviewText?.en?.join(" ") ||
    `${title} road trip itinerary across ${guide.country.en}. ${guide.durationDays} days and ${guide.distanceKm} km.`;
  const imageUrl = guide.heroImage ? getAbsoluteUrl(guide.heroImage) : getAbsoluteUrl("/og-image.png");

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${title} - ${guide.subtitle.en}`,
    description: description,
    url: guideUrl,
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: "Roaddy Editorial Team",
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "Roaddy",
      url: getSiteUrl(),
      logo: {
        "@type": "ImageObject",
        url: getAbsoluteUrl("/icon0.svg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": guideUrl,
    },
  };
}
