import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import GuideDetailTemplate from "@/components/guides/GuideDetailTemplate";
import { getGuideBySlug, TRAVEL_GUIDES } from "@/data/guidesData";
import { getAbsoluteUrl, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return TRAVEL_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = getGuideBySlug(resolvedParams.slug);

  if (!guide) {
    return {
      title: "Guide Not Found | Roaddy",
    };
  }

  const title = typeof guide.title === "string" ? guide.title : guide.title.en;
  const subtitle = typeof guide.subtitle === "string" ? guide.subtitle : guide.subtitle.en;
  const pageTitle = `${title}: ${subtitle} (${guide.durationDays} Days Itinerary) | Roaddy`;

  const description =
    guide.overviewText?.en?.join(" ") ||
    `Detailed ${guide.durationDays}-day road trip itinerary covering ${guide.distanceKm} km across ${guide.country.en}. Day-by-day stops, map, and recommendations.`;

  const canonicalUrl = getAbsoluteUrl(`/guides/${guide.slug}`);
  const ogImageUrl = guide.heroImage ? getAbsoluteUrl(guide.heroImage) : getAbsoluteUrl("/og-image.png");

  return {
    title: pageTitle,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: description,
      url: canonicalUrl,
      type: "article",
      siteName: "Roaddy",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
      images: [ogImageUrl],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const resolvedParams = await params;
  const guide = getGuideBySlug(resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  const title = typeof guide.title === "string" ? guide.title : guide.title.en;
  const articleSchema = generateArticleSchema(guide);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Travel Guides", item: "/guides" },
    { name: title, item: `/guides/${guide.slug}` },
  ]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main id="main-content" style={{ flex: 1 }}>
        <GuideDetailTemplate guide={guide} />
      </main>
      <Footer />
    </div>
  );
}
