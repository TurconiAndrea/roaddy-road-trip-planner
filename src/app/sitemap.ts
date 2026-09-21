import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/lib/seo";
import { TRAVEL_GUIDES } from "@/data/guidesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: getAbsoluteUrl("/"),
      lastModified: new Date(),
    },
    {
      url: getAbsoluteUrl("/guides"),
      lastModified: new Date(),
    },
  ];

  const guideRoutes = TRAVEL_GUIDES.map((guide) => ({
    url: getAbsoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(),
  }));

  return [...routes, ...guideRoutes];
}
