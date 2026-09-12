"use client";

import { useLanguageStore } from "@/store/languageStore";

interface GuidesHeroProps {
  isMobile?: boolean;
}

export default function GuidesHero({ isMobile = false }: GuidesHeroProps) {
  const lang = useLanguageStore((s) => s.lang);

  const t = {
    badge: lang === "it" ? "ROADDY TRAVEL GUIDES" : "ROADDY TRAVEL GUIDES",
    titleStart: lang === "it" ? "Guide editoriali per i tuoi " : "Editorial guides for your ",
    titleHighlight: lang === "it" ? "Road Trip più leggendari" : "most epic Road Trips",
    subtitle:
      lang === "it"
        ? "Itinerari testati sulla strada, curati giorno per giorno con percorsi ottimali, consigli sugli alloggi, soste panoramiche e tappe imperdibili. Pronte da esplorare o caricare direttamente nel tuo planner."
        : "Road-tested itineraries, curated day by day with optimal routes, tested accommodation tips, scenic overlooks, and must-see stops. Ready to explore or load straight into your planner.",
    pills: [
      {
        icon: "📍",
        text: lang === "it" ? "Itinerari testati km per km" : "Itineraries tested km by km",
      },
      {
        icon: "🗺️",
        text: lang === "it" ? "Integrazione nativa con Trip Planner" : "Native Trip Planner integration",
      },
      {
        icon: "📖",
        text: lang === "it" ? "Formato editoriale e visuale premium" : "Premium visual editorial format",
      },
    ],
  };

  return (
    <section
      style={{
        padding: isMobile ? "48px 20px 36px" : "80px 48px 64px",
        background: "linear-gradient(165deg, #FFF7ED 0%, #FFFFFF 65%, #F9FAFB 100%)",
        borderBottom: "1px solid #F3F4F6",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Editorial Pill Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#FFF7ED",
            border: "1px solid #FFEDD5",
            color: "#EA580C",
            borderRadius: 20,
            padding: "6px 16px",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 20,
            boxShadow: "0 2px 8px rgba(234, 88, 12, 0.08)",
          }}
        >
          <span>🛣️</span>
          <span>{t.badge}</span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 54px)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            color: "#111827",
            maxWidth: 820,
            marginBottom: 20,
          }}
        >
          {t.titleStart}
          <span style={{ color: "#EA580C" }}>{t.titleHighlight}</span>
        </h1>

        {/* Subtitle / Intro */}
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 19px)",
            color: "#4B5563",
            lineHeight: 1.65,
            maxWidth: 680,
            marginBottom: 36,
          }}
        >
          {t.subtitle}
        </p>

        {/* Feature Pill Indicators */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: isMobile ? 12 : 24,
            marginBottom: 16,
          }}
        >
          {t.pills.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: 600,
                color: "#374151",
                boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
