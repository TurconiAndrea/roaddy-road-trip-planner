import { notFound } from "next/navigation";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import GuideDetailTemplate from "@/components/guides/GuideDetailTemplate";
import { getGuideBySlug, TRAVEL_GUIDES } from "@/data/guidesData";

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

export default async function GuidePage({ params }: GuidePageProps) {
  const resolvedParams = await params;
  const guide = getGuideBySlug(resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <GuideDetailTemplate guide={guide} />
      </main>
      <Footer />
    </div>
  );
}
