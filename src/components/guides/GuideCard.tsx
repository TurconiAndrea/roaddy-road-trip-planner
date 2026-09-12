"use client";

import Link from "next/link";
import Image from "next/image";
import { TravelGuide } from "@/types/guide";
import { useLanguageStore } from "@/store/languageStore";

interface GuideCardProps {
  guide: TravelGuide;
  isMobile?: boolean;
}

export default function GuideCard({ guide, isMobile = false }: GuideCardProps) {
  const lang = useLanguageStore((s) => s.lang);

  const titleStr = guide.title[lang];
  const subtitleStr = guide.subtitle[lang];
  const taglineStr = guide.tagline[lang];
  const countryStr = guide.country[lang];
  const regionStr = guide.region[lang];
  const highlightsArr = guide.highlightsList[lang];

  if (guide.featured) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          border: "1px solid #E5E7EB",
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
          overflow: "hidden",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          position: "relative",
        }}
      >
        {/* Left Visual Image Container */}
        <div
          style={{
            flex: isMobile ? "0 0 260px" : "1 1 50%",
            position: "relative",
            minHeight: isMobile ? 260 : 380,
            overflow: "hidden",
          }}
        >
          <Image
            src={guide.heroImage}
            alt={titleStr}
            fill
            style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Featured Badge */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              background: "#EA580C",
              color: "#fff",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: 20,
              boxShadow: "0 4px 12px rgba(234, 88, 12, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>🔥</span> {lang === "it" ? "Guida in Evidenza" : "Featured Road Trip"}
          </div>

          {/* Location Badge */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#fff",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ fontSize: 24 }}>{guide.countryFlag}</span>
            <div>
              <div style={{ fontSize: 12, opacity: 0.9, fontWeight: 600 }}>{regionStr}</div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{titleStr}</div>
            </div>
          </div>
        </div>

        {/* Right Content Details */}
        <div
          style={{
            flex: isMobile ? "1 1 auto" : "1 1 50%",
            padding: isMobile ? "24px 20px" : "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#EA580C", marginBottom: 6 }}>
              {countryStr.toUpperCase()} · {guide.statesCount} {lang === "it" ? "STATI" : "STATES"}
            </div>

            <h2
              style={{
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 800,
                color: "#111827",
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              {titleStr}: {subtitleStr}
            </h2>

            <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.6, marginBottom: 24 }}>
              {taglineStr}
            </p>

            {/* Quick Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 12,
                background: "#F9FAFB",
                padding: "16px",
                borderRadius: 14,
                border: "1px solid #F3F4F6",
                marginBottom: 24,
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600 }}>
                  {lang === "it" ? "DURATA" : "DURATION"}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>
                  {guide.durationDays} {lang === "it" ? "Giorni" : "Days"}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600 }}>
                  {lang === "it" ? "DISTANZA" : "DISTANCE"}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>
                  {guide.distanceKm.toLocaleString()} km
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 600 }}>
                  {lang === "it" ? "STATI" : "STATES"}
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>
                  {guide.statesCount} {lang === "it" ? "Stati" : "States"}
                </div>
              </div>
            </div>

            {/* Key Stops preview tags */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 10 }}>
                {lang === "it" ? "TAPPE PRINCIPALI" : "KEY STOPS"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {highlightsArr.slice(0, 7).map((stop) => (
                  <span
                    key={stop}
                    style={{
                      background: "#FFF7ED",
                      color: "#C2410C",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 8,
                    }}
                  >
                    📍 {stop}
                  </span>
                ))}
                {highlightsArr.length > 7 && (
                  <span
                    style={{
                      background: "#F3F4F6",
                      color: "#6B7280",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 8,
                    }}
                  >
                    +{highlightsArr.length - 7} {lang === "it" ? "altre" : "more"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action CTA Button */}
          <Link
            href={`/guides/${guide.slug}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "#EA580C",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              padding: "14px 28px",
              borderRadius: 12,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(234, 88, 12, 0.25)",
              transition: "all 0.15s ease",
            }}
          >
            {lang === "it" ? "Esplora la Guida Completa →" : "Explore Full Travel Guide →"}
          </Link>
        </div>
      </div>
    );
  }

  // Standard or Upcoming Card
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: guide.isUpcoming ? 0.85 : 1,
      }}
    >
      <div style={{ position: "relative", height: 180, width: "100%", background: "#F3F4F6" }}>
        <Image
          src={guide.heroImage}
          alt={titleStr}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {guide.isUpcoming && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(17, 24, 39, 0.4)",
              backdropFilter: "blur(2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                background: "#111827",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: 20,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              🔒 {lang === "it" ? "In Arrivo" : "Coming Soon"}
            </span>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(255,255,255,0.9)",
            borderRadius: 8,
            padding: "4px 8px",
            fontSize: 12,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {guide.countryFlag} {countryStr}
        </div>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, color: "#6B7280", fontWeight: 600, marginBottom: 4 }}>
            {guide.durationDays} {lang === "it" ? "GIORNI" : "DAYS"} · {guide.distanceKm} KM
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111827", marginBottom: 6 }}>
            {titleStr}
          </h3>
          <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.5, marginBottom: 16 }}>
            {subtitleStr}
          </p>
        </div>

        {guide.isUpcoming ? (
          <button
            disabled
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              background: "#F3F4F6",
              color: "#9CA3AF",
              fontWeight: 600,
              fontSize: 14,
              cursor: "not-allowed",
              border: "none",
            }}
          >
            {lang === "it" ? "Prossimamente" : "Coming Soon"}
          </button>
        ) : (
          <Link
            href={`/guides/${guide.slug}`}
            style={{
              display: "block",
              textAlign: "center",
              padding: "10px",
              borderRadius: 8,
              background: "#FFF7ED",
              color: "#EA580C",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            {lang === "it" ? "Vedi Guida →" : "View Guide →"}
          </Link>
        )}
      </div>
    </div>
  );
}
