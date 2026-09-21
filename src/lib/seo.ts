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
 * Homepage returns siteUrl + "/". Subpaths return siteUrl + "/path" without trailing slash.
 */
export function getAbsoluteUrl(path: string = ""): string {
  if (path === "/" || path === "") {
    return `${getSiteUrl()}/`;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${cleanPath.replace(/\/+$/, "")}`;
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
  };
}

/**
 * JSON-LD Schema: BreadcrumbList
 * Matches the visible HTML breadcrumbs on /guides and /guides/[slug].
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
