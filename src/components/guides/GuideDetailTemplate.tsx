"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TravelGuide } from "@/types/guide";
import { useTripStore } from "@/store/tripStore";
import { useLanguageStore } from "@/store/languageStore";
import { TripMeta } from "@/types/trip";

interface GuideDetailTemplateProps {
  guide: TravelGuide;
}

export default function GuideDetailTemplate({ guide }: GuideDetailTemplateProps) {
  const router = useRouter();
  const createTrip = useTripStore((s) => s.createTrip);
  const lang = useLanguageStore((s) => s.lang);

  const [isMobile, setIsMobile] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const titleStr = guide.title[lang];
  const subtitleStr = guide.subtitle[lang];
  const taglineStr = guide.tagline[lang];
  const countryStr = guide.country[lang];
  const regionStr = guide.region[lang];
  const overviewArr = guide.overviewText[lang];
  const highlightsArr = guide.highlightsList[lang];

  // Filter itinerary days by search query
  const filteredItinerary = guide.itinerary.filter((day) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    const dayTitle = day.title[lang].toLowerCase();
    const daySubtitle = day.subtitle[lang].toLowerCase();
    const dayLocation = day.location.toLowerCase();
    const dayNarrative = day.narrative[lang].toLowerCase();
    return (
      dayTitle.includes(q) ||
      daySubtitle.includes(q) ||
      dayLocation.includes(q) ||
      dayNarrative.includes(q)
    );
  });

  // Action to load itinerary into Roaddy Planner
  const handleLoadIntoPlanner = () => {
    const today = new Date();
    const startDateStr = today.toISOString().split("T")[0];
    const endDateObj = new Date(today);
    endDateObj.setDate(today.getDate() + guide.durationDays);
    const endDateStr = endDateObj.toISOString().split("T")[0];

    const meta: TripMeta = {
      title: `${titleStr} - ${guide.durationDays} Days`,
      startCity: { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
      startDate: startDateStr,
      endDate: endDateStr,
      days: guide.durationDays,
    };

    createTrip(meta, {
      id: `stop_la_${Date.now()}`,
      name: "Los Angeles, CA",
      lat: 34.0522,
      lng: -118.2437,
      day: 1,
      order: 1,
      category: "",
      duration: "Day 1",
    });

    router.push("/planner");
  };

  return (
    <div style={{ color: "#111827", background: "#F9FAFB" }}>
      {/* ── HERO SECTION ── */}
      <section
        style={{
          position: "relative",
          background: "#111827",
          color: "#fff",
          padding: isMobile ? "48px 20px 64px" : "80px 48px 96px",
          overflow: "hidden",
        }}
      >
        {/* Background Image with Overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.38 }}>
          <Image
            src={guide.heroImage}
            alt={titleStr}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(17,24,39,0.5) 0%, #111827 95%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              fontSize: 13,
              color: "#9CA3AF",
              marginBottom: 24,
            }}
          >
            <ol style={{ display: "flex", alignItems: "center", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
              <li>
                <Link href="/" style={{ color: "#9CA3AF", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/guides" style={{ color: "#9CA3AF", textDecoration: "none" }}>
                  {lang === "it" ? "Guide di Viaggio" : "Travel Guides"}
                </Link>
              </li>
              <li>/</li>
              <li aria-current="page" style={{ color: "#FFF", fontWeight: 600 }}>
                {titleStr}
              </li>
            </ol>
          </nav>

          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            <span
              style={{
                background: "#EA580C",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: 20,
              }}
            >
              {guide.countryFlag} {lang === "it" ? "GUIDA UFFICIALE" : "OFFICIAL TRAVEL GUIDE"}
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                padding: "6px 14px",
                borderRadius: 20,
                backdropFilter: "blur(4px)",
              }}
            >
              {regionStr}
            </span>
          </div>

          {/* Title & Tagline */}
          <h1
            style={{
              fontSize: "clamp(34px, 5.5vw, 62px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 16,
              maxWidth: 900,
            }}
          >
            {guide.countryFlag} {titleStr.toUpperCase()}
          </h1>
          <p
            style={{
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "#F97316",
              fontWeight: 700,
              marginBottom: 20,
              lineHeight: 1.25,
            }}
          >
            {subtitleStr}
          </p>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "#D1D5DB",
              maxWidth: 720,
              lineHeight: 1.6,
              marginBottom: 36,
            }}
          >
            {taglineStr}
          </p>

          {/* Quick Stats Banner */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: 16,
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 16,
              padding: "20px 24px",
              maxWidth: 800,
              marginBottom: 36,
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>
                {lang === "it" ? "DURATA" : "DURATION"}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
                {guide.durationDays} {lang === "it" ? "Giorni" : "Days"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>
                {lang === "it" ? "DISTANZA" : "DISTANCE"}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
                {guide.distanceKm.toLocaleString()} km
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>
                {lang === "it" ? "STATI ATTRAVERSATI" : "STATES VISITED"}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
                {guide.statesCount} {lang === "it" ? "Stati" : "States"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600 }}>
                {lang === "it" ? "TAPPE ICONICHE" : "ICONIC STOPS"}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
                13+ {lang === "it" ? "Tappe" : "Stops"}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <a
              href="#guida-completa"
              style={{
                background: "#EA580C",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                padding: "14px 28px",
                borderRadius: 12,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(234, 88, 12, 0.4)",
              }}
            >
              📖 {lang === "it" ? "Scopri la Guida Completa" : "Get Full Travel Guide"}
            </a>
            <button
              onClick={handleLoadIntoPlanner}
              style={{
                background: "#fff",
                color: "#111827",
                fontWeight: 700,
                fontSize: 16,
                padding: "14px 28px",
                borderRadius: 12,
                cursor: "pointer",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>🗺️</span> {lang === "it" ? "Carica nel Trip Planner" : "Load into Trip Planner"}
            </button>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW SECTION ── */}
      <section style={{ padding: isMobile ? "48px 20px" : "80px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#EA580C",
                  letterSpacing: "0.05em",
                  marginBottom: 10,
                }}
              >
                🗺️ {lang === "it" ? "IL VIAGGIO IN BREVE" : "TRIP OVERVIEW"}
              </div>
              <h2
                style={{
                  fontSize: "clamp(26px, 3.5vw, 38px)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: 20,
                }}
              >
                {lang === "it"
                  ? "Un road trip da cartolina che cambia vista ogni giorno"
                  : "A postcard road trip that changes scenery every single day"}
              </h2>
              {overviewArr.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: 16,
                    color: "#4B5563",
                    lineHeight: 1.7,
                    marginBottom: 16,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Visual Route Highlights Flow */}
            <div
              style={{
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: 20,
                padding: "28px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, color: "#111827" }}>
                📍 {lang === "it" ? "Le Tappe Principali del Percorso" : "Key Route Stops"}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {highlightsArr.map((stop, idx) => (
                  <div
                    key={stop}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background:
                          idx === 0 || idx === highlightsArr.length - 1 ? "#EA580C" : "#FFF7ED",
                        color:
                          idx === 0 || idx === highlightsArr.length - 1 ? "#fff" : "#EA580C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <span>{stop}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: "1px dashed #E5E7EB",
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                🌴 California · 🎰 Nevada · 🏜️ Utah · 🏔️ Arizona
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS VISUAL GRID ── */}
      <section style={{ padding: isMobile ? "48px 20px" : "80px 48px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#EA580C", marginBottom: 8 }}>
              ✨ {lang === "it" ? "HIGHLIGHTS IMPERDIBILI" : "MUST-SEE HIGHLIGHTS"}
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, marginBottom: 16 }}>
              {lang === "it"
                ? "I luoghi simbolo del West Americano"
                : "Iconic sights of the American West"}
            </h2>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.6 }}>
              {lang === "it"
                ? "Dalla costa del Pacifico ai grandi canyon dello Utah, ecco le esperienze chiave di questo itinerario."
                : "From the Pacific highway cliffs to the red canyons of Utah, here are the key highlights of this journey."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {guide.keyHighlights.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  border: "1px solid #E5E7EB",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {item.image && (
                  <div style={{ position: "relative", height: 200, width: "100%" }}>
                    <Image
                      src={item.image}
                      alt={item.title[lang]}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    {item.tag && (
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: "#EA580C",
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {item.tag[lang]}
                      </div>
                    )}
                  </div>
                )}
                <div
                  style={{
                    padding: "24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ fontSize: 13, color: "#EA580C", fontWeight: 700, marginBottom: 4 }}>
                    {item.subtitle[lang]}
                  </div>
                  <h3
                    style={{ fontSize: 19, fontWeight: 800, marginBottom: 10, color: "#111827" }}
                  >
                    {item.title[lang]}
                  </h3>
                  <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: 0 }}>
                    {item.description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DAY BY DAY ITINERARY ── */}
      <section style={{ padding: isMobile ? "48px 20px" : "80px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 40px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#EA580C", marginBottom: 8 }}>
              🧭 {lang === "it" ? "ITINERARIO DI VIAGGIO" : "DAY BY DAY ITINERARY"}
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, marginBottom: 16 }}>
              {guide.durationDays}{" "}
              {lang === "it" ? "Giorni on the Road: Giorno per Giorno" : "Days on the Road: Day by Day"}
            </h2>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.6 }}>
              {lang === "it"
                ? "Esplora ogni singola giornata del viaggio. Clicca su ciascun giorno per scoprire il racconto e i momenti salienti."
                : "Explore each day of the journey. Click any day to read the story and key highlights."}
            </p>
          </div>

          {/* Search/Filter Bar for Days */}
          <div style={{ maxWidth: 440, margin: "0 auto 36px" }}>
            <input
              type="text"
              placeholder={
                lang === "it"
                  ? "🔍 Cerca una tappa (es. San Francisco, Monument Valley, Yosemite)..."
                  : "🔍 Search a stop (e.g. San Francisco, Monument Valley, Yosemite)..."
              }
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 18px",
                borderRadius: 12,
                border: "1.5px solid #E5E7EB",
                fontSize: 14,
                outline: "none",
                background: "#F9FAFB",
              }}
            />
          </div>

          {/* Days Accordion / List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredItinerary.map((day) => {
              const isOpen = activeDay === day.dayNumber;
              const dayTitle = day.title[lang];
              const daySubtitle = day.subtitle[lang];
              const dayNarrative = day.narrative[lang];
              const dayHighlightsArr = day.highlights[lang];

              return (
                <div
                  key={day.dayNumber}
                  style={{
                    background: isOpen ? "#FFF7ED" : "#fff",
                    border: isOpen ? "1.5px solid #FFEDD5" : "1px solid #E5E7EB",
                    borderRadius: 16,
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                    boxShadow: isOpen
                      ? "0 4px 20px rgba(234, 88, 12, 0.08)"
                      : "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  {/* Day Header Bar */}
                  <div
                    onClick={() => setActiveDay(isOpen ? null : day.dayNumber)}
                    style={{
                      padding: "20px 24px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      userSelect: "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      {/* Day Number Pill (ONLY THE NUMBER, NO "GIORNO"/"DAY" WORD) */}
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          background: isOpen ? "#EA580C" : "#F3F4F6",
                          color: isOpen ? "#fff" : "#111827",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 800,
                          fontSize: 20,
                          flexShrink: 0,
                          boxShadow: isOpen ? "0 4px 12px rgba(234, 88, 12, 0.25)" : "none",
                        }}
                      >
                        {day.dayNumber}
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#EA580C",
                            marginBottom: 2,
                          }}
                        >
                          {day.icon || "📍"} {day.location}
                        </div>
                        <h3
                          style={{
                            fontSize: 18,
                            fontWeight: 800,
                            color: "#111827",
                            margin: 0,
                          }}
                        >
                          {dayTitle} —{" "}
                          <span style={{ color: "#4B5563", fontWeight: 600 }}>
                            {daySubtitle}
                          </span>
                        </h3>
                      </div>
                    </div>

                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: isOpen ? "#FFE4E6" : "#F3F4F6",
                        color: isOpen ? "#EA580C" : "#6B7280",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </div>
                  </div>

                  {/* Day Content Body */}
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 24px 24px 88px",
                        marginTop: -4,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 15,
                          color: "#374151",
                          lineHeight: 1.7,
                          marginBottom: 16,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {dayNarrative}
                      </p>

                      {/* Day Highlights Tags */}
                      {dayHighlightsArr && dayHighlightsArr.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {dayHighlightsArr.map((h, i) => (
                            <span
                              key={i}
                              style={{
                                background: "#fff",
                                border: "1px solid #FFEDD5",
                                color: "#C2410C",
                                fontSize: 12,
                                fontWeight: 600,
                                padding: "4px 10px",
                                borderRadius: 8,
                              }}
                            >
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY THIS TRIP SHOWCASE ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
          color: "#fff",
          padding: isMobile ? "48px 20px" : "80px 48px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#F97316",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            🔥 {lang === "it" ? "PERCHÉ QUESTO VIAGGIO?" : "WHY THIS ROAD TRIP?"}
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 800, marginBottom: 24 }}>
            {lang === "it"
              ? "Un'esperienza che racchiude l'anima dell'America on the road"
              : "An experience capturing the heart of the American open highway"}
          </h2>
          <div
            style={{
              fontSize: "clamp(16px, 2.2vw, 22px)",
              fontWeight: 700,
              color: "#FFEDD5",
              background: "rgba(255,255,255,0.06)",
              padding: "16px 24px",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 24,
            }}
          >
            {guide.whyThisTrip.progression}
          </div>
          <p
            style={{
              fontSize: 17,
              color: "#D1D5DB",
              lineHeight: 1.7,
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            {guide.whyThisTrip.description[lang]}
          </p>
        </div>
      </section>

      {/* ── COMMERCIAL TEASER & FULL GUIDE CTA ── */}
      <section
        id="guida-completa"
        style={{
          padding: isMobile ? "56px 20px" : "96px 48px",
          background: "#FFF7ED",
          borderTop: "1px solid #FFEDD5",
        }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <span
              style={{
                background: "#EA580C",
                color: "#fff",
                fontSize: 12,
                fontWeight: 800,
                padding: "6px 14px",
                borderRadius: 20,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              📖 {lang === "it" ? "LA GUIDA COMPLETA" : "THE FULL TRAVEL GUIDE"}
            </span>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                marginTop: 16,
                marginBottom: 16,
                color: "#111827",
              }}
            >
              {lang === "it"
                ? "Vuoi fare questo viaggio davvero?"
                : "Ready to take this road trip for real?"}
            </h2>
            <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.6 }}>
              {lang === "it"
                ? "Quello che hai visto finora è solo l'itinerario. La guida completa contiene tutte le informazioni operative per organizzare il road trip senza perdere tempo in ricerche sul web."
                : "What you see here is just the itinerary teaser. The complete travel guide contains all practical details to plan your road trip without spending weeks searching online."}
            </p>
          </div>

          {/* Included Features Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
              marginBottom: 48,
            }}
          >
            {guide.fullGuideFeatures.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "24px",
                  border: "1px solid #FED7AA",
                  boxShadow: "0 2px 12px rgba(234, 88, 12, 0.05)",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{feat.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, color: "#111827" }}>
                  {feat.title[lang]}
                </h3>
                <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.5, margin: 0 }}>
                  {feat.description[lang]}
                </p>
              </div>
            ))}
          </div>

          {/* Purchase Offer Box with Updated Pricing (€2.99 / €19.99) */}
          <div
            style={{
              background: "#111827",
              color: "#fff",
              borderRadius: 24,
              padding: isMobile ? "32px 20px" : "48px 56px",
              textAlign: "center",
              boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            <div style={{ fontSize: 14, color: "#F97316", fontWeight: 700, marginBottom: 8 }}>
              🇺🇸 {lang === "it" ? "LA STRADA È GIÀ TRACCIATA" : "THE ROAD IS READY"}
            </div>
            <h3 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, marginBottom: 12 }}>
              {lang === "it" ? "Manca solo una cosa: partire." : "Only one thing missing: hitting the road."}
            </h3>
            <p style={{ fontSize: 15, color: "#9CA3AF", marginBottom: 28 }}>
              {lang === "it"
                ? "Scarica subito la guida completa in PDF con mappe GPX interattive e contatti alloggi."
                : "Download the complete PDF travel guide with interactive GPX maps and tested stay recommendations."}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              {guide.priceEur && (
                <span style={{ fontSize: 40, fontWeight: 800, color: "#fff" }}>
                  €{guide.priceEur.toFixed(2)}
                </span>
              )}
              {guide.originalPriceEur && (
                <span
                  style={{
                    fontSize: 20,
                    color: "#6B7280",
                    textDecoration: "line-through",
                    fontWeight: 600,
                  }}
                >
                  €{guide.originalPriceEur.toFixed(2)}
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 14,
                justifyContent: "center",
              }}
            >
              <button
                onClick={() =>
                  alert(
                    lang === "it"
                      ? "Grazie per l'interesse! Il link di acquisto diretto verrà attivato a breve."
                      : "Thank you for your interest! The direct purchase link will be active shortly."
                  )
                }
                style={{
                  background: "#EA580C",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 17,
                  padding: "16px 36px",
                  borderRadius: 12,
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(234, 88, 12, 0.4)",
                  transition: "background 0.15s ease",
                }}
              >
                {lang === "it" ? "ACQUISTA LA GUIDA →" : "BUY FULL GUIDE →"}
              </button>

              <button
                onClick={handleLoadIntoPlanner}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "16px 28px",
                  borderRadius: 12,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                🗺️ {lang === "it" ? "Apri nel Planner Gratuito" : "Open in Free Planner"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
