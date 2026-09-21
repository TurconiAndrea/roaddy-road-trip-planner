"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import GuidesHero from "@/components/guides/GuidesHero";
import GuideCard from "@/components/guides/GuideCard";
import { TRAVEL_GUIDES, getFeaturedGuide } from "@/data/guidesData";
import { useLanguageStore } from "@/store/languageStore";

export default function GuidesClientPage() {
  const lang = useLanguageStore((s) => s.lang);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const featuredGuide = getFeaturedGuide();
  const otherGuides = TRAVEL_GUIDES.filter((g) => !g.featured);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F9FAFB" }}>
      <Navbar />

      <main id="main-content" style={{ flex: 1 }}>
        {/* Hero Section */}
        <GuidesHero isMobile={isMobile} />

        {/* Section: Travel Guides Catalog */}
        <section
          style={{
            padding: isMobile ? "48px 20px" : "80px 48px",
            maxWidth: 1150,
            margin: "0 auto",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#EA580C",
                letterSpacing: "0.05em",
                marginBottom: 6,
              }}
            >
              📖 {lang === "it" ? "CATALOGO GUIDA" : "GUIDE CATALOG"}
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "#111827" }}>
              {lang === "it" ? "Le nostre guide" : "Travel Guides"}
            </h2>
            <p style={{ fontSize: 16, color: "#6B7280", marginTop: 6 }}>
              {lang === "it"
                ? "Scopri gli itinerari stradali più affascinanti al mondo curati dal team di Roaddy."
                : "Discover the world's most epic road trip routes curated by the Roaddy team."}
            </p>
          </div>

          {/* Featured Guide (USA West Coast 18 Days) */}
          <div style={{ marginBottom: 56 }}>
            <GuideCard guide={featuredGuide} isMobile={isMobile} />
          </div>

          {/* Upcoming / Other Guides Grid */}
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 20 }}>
              {lang === "it" ? "Prossimi itinerari in arrivo" : "Upcoming Road Trips"}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {otherGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
