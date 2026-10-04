"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTripStore } from "@/store/tripStore";
import { geocodeSearch } from "@/lib/geocoding";
import type { TripMeta, GeocodingResult } from "@/types/trip";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { useLanguageStore } from "@/store/languageStore";
import { AnalyticsEvents } from "@/lib/analytics";

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
  `;
  if (!document.head.querySelector("[data-spin]")) {
    style.setAttribute("data-spin", "");
    document.head.appendChild(style);
  }
}

const FEATURES = [
  {
    icon: "🗺️",
    title: {
      en: "Visualize Your Route Instantly",
      it: "Visualizza il Percorso all'Istante",
    },
    desc: {
      en: "See your entire trip on an interactive map. As you add stops, the route updates automatically.",
      it: "Vedi l'intero viaggio su una mappa interattiva. Mentre aggiungi tappe, il percorso si aggiorna automaticamente.",
    },
  },
  {
    icon: "📍",
    title: {
      en: "Add Destinations in Seconds",
      it: "Aggiungi Destinazioni in Pochi Secondi",
    },
    desc: {
      en: "Search for cities, landmarks, or addresses and quickly add them to your itinerary.",
      it: "Cerca città, attrazioni o indirizzi e aggiungili rapidamente al tuo itinerario.",
    },
  },
  {
    icon: "🗓️",
    title: {
      en: "Organize Stops by Day",
      it: "Organizza le Tappe Giorno per Giorno",
    },
    desc: {
      en: "Structure your road trip day by day so your journey stays clear and manageable.",
      it: "Struttura il tuo viaggio giorno per giorno così la tua avventura resta chiara e ben organizzata.",
    },
  },
  {
    icon: "↕️",
    title: {
      en: "Drag, Drop, and Reorder",
      it: "Trascina, Rilascia e Riordina",
    },
    desc: {
      en: "Easily rearrange stops to adjust your route until it feels just right.",
      it: "Riorganizza facilmente le tappe per regolare il percorso fino a quando non è perfetto.",
    },
  },
  {
    icon: "💾",
    title: {
      en: "Saves Automatically",
      it: "Salvataggio Automatico",
    },
    desc: {
      en: "Your plans are stored locally in your browser, so you can come back anytime.",
      it: "I tuoi piani sono salvati localmente nel tuo browser, così puoi tornare in qualsiasi momento.",
    },
  },
  {
    icon: "📱",
    title: {
      en: "Plan Anywhere",
      it: "Pianifica Ovunque",
    },
    desc: {
      en: "A responsive design means the planner works just as smoothly on your phone.",
      it: "Il design responsive fa sì che il planner funzioni al meglio anche sul tuo smartphone.",
    },
  },
];

const HOMEPAGE_FAQS = [
  {
    question: {
      en: "Is Roaddy completely free to use?",
      it: "Roaddy è completamente gratuito?",
    },
    answer: {
      en: "Yes, Roaddy is 100% free to use and requires no credit card or account registration to plan your trips.",
      it: "Sì, Roaddy è gratuito al 100% e non richiede alcuna carta di credito o registrazione di un account per pianificare i tuoi viaggi.",
    },
  },
  {
    question: {
      en: "Do I need an account to plan a road trip?",
      it: "Serve un account per pianificare un viaggio?",
    },
    answer: {
      en: "No account is required. You can start creating your trip itinerary right away, and your progress is saved locally in your web browser.",
      it: "Nessun account richiesto. Puoi iniziare a creare il tuo itinerario subito e i tuoi progressi vengono salvati nel tuo browser.",
    },
  },
  {
    question: {
      en: "How does Roaddy help plan multi-stop road trips?",
      it: "Come aiuta Roaddy a pianificare viaggi a più tappe?",
    },
    answer: {
      en: "Roaddy provides an interactive map where you can search destinations, add intermediate stops, organize your trip day by day, and reorder stops easily.",
      it: "Roaddy offre una mappa interattiva in cui cercare destinazioni, aggiungere tappe intermedie, organizzare il viaggio giorno per giorno e riordinare i punti facilmente.",
    },
  },
  {
    question: {
      en: "Does Roaddy provide curated travel guides?",
      it: "Roaddy include guide di viaggio curate?",
    },
    answer: {
      en: "Yes, Roaddy includes editorial travel guides with detailed day-by-day itineraries, driving distances, national park highlights, and practical tips.",
      it: "Sì, Roaddy include guide editoriali dettagliate giorno per giorno con distanze di guida, consigli sui parchi nazionali e consigli pratici.",
    },
  },
];

const labelStyle: React.CSSProperties = {
  display:       "flex",
  flexDirection: "column",
  gap:           6,
  fontSize:      14,
  fontWeight:    600,
  color:         "#374151",
};

const inputStyle: React.CSSProperties = {
  border:       "1.5px solid #E5E7EB",
  borderRadius: 8,
  padding:      "10px 12px",
  fontSize:     14,
  outline:      "none",
  color:        "#111827",
  background:   "#fff",
  width:        "100%",
  boxSizing:    "border-box",
};

export default function LandingPage() {
  const router     = useRouter();
  const createTrip = useTripStore(s => s.createTrip);
  const lang       = useLanguageStore(s => s.lang);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [title,           setTitle]           = useState("");
  const [startCity,       setStartCity]       = useState("");
  const [startCityResult, setStartCityResult] = useState<GeocodingResult | null>(null);
  const [citySuggestions, setCitySuggestions] = useState<GeocodingResult[]>([]);
  const [cityLoading,     setCityLoading]     = useState(false);
  const [startDate,       setStartDate]       = useState("");
  const [endDate,         setEndDate]         = useState("");
  const [error,           setError]           = useState("");
  const cityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setStartCity(val);
    setStartCityResult(null);
    setError("");
    if (cityTimer.current) clearTimeout(cityTimer.current);
    if (val.length < 3) { setCitySuggestions([]); return; }
    setCityLoading(true);
    cityTimer.current = setTimeout(async () => {
      try   { setCitySuggestions(await geocodeSearch(val)); }
      catch { setCitySuggestions([]); }
      finally { setCityLoading(false); }
    }, 350);
  };

  const handleCitySelect = (res: GeocodingResult) => {
    setStartCity(res.display_name.split(",")[0].trim());
    setStartCityResult(res);
    setCitySuggestions([]);
  };

  const handleStart = () => {
    if (!title.trim()) {
      setError(lang === "it" ? "Inserisci un nome per il tuo viaggio." : "Please give your trip a name.");
      return;
    }
    if (!startCity.trim()) {
      setError(lang === "it" ? "Inserisci una città di partenza." : "Please enter a starting city.");
      return;
    }
    if (!startDate) {
      setError(lang === "it" ? "Seleziona una data di inizio." : "Please select a start date.");
      return;
    }
    if (!endDate) {
      setError(lang === "it" ? "Seleziona una data di fine." : "Please select an end date.");
      return;
    }
    if (endDate < startDate) {
      setError(lang === "it" ? "La data di fine deve essere successiva alla data di inizio." : "End date must be after start date.");
      return;
    }

    const start = new Date(startDate);
    const end   = new Date(endDate);
    const days  = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);

    AnalyticsEvents.createTrip(days);

    const meta: TripMeta = {
      title:     title.trim(),
      startCity: startCityResult
        ? { name: startCity.trim(), lat: parseFloat(startCityResult.lat), lng: parseFloat(startCityResult.lon) }
        : { name: startCity.trim(), lat: 0, lng: 0 },
      startDate,
      endDate,
      days,
    };

    createTrip(meta, {
      id:       `s_${Date.now()}`,
      name:     startCity.trim(),
      lat:      startCityResult ? parseFloat(startCityResult.lat) : 0,
      lng:      startCityResult ? parseFloat(startCityResult.lon) : 0,
      day:      1,
      order:    1,
      category: "",
      duration: "",
    });

    router.push("/planner");
  };

  return (
    <div style={{ fontFamily: "var(--font-sans, sans-serif)", color: "#111827" }}>

      {/* ── Floating Buy Me a Coffee ── */}
      <a
        href="https://ko-fi.com/andreaturconi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Support Roaddy on Ko-fi"
        style={{
          position:     "fixed",
          bottom:       isMobile ? 16 : 24,
          right:        isMobile ? 16 : 24,
          zIndex:       1000,
          boxShadow:    "0 4px 20px rgba(0,0,0,0.15)",
          borderRadius: 12,
          overflow:     "hidden",
          display:      "block",
          transition:   "transform 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          width={isMobile ? 120 : 150}
          height={isMobile ? 34 : 42}
          style={{ display: "block" }}
        />
      </a>

      {/* ── Navbar ── */}
      <Navbar />

      <main id="main-content">
        {/* ── Hero: title + image ── */}
        <section style={{
          padding:    isMobile ? "48px 20px" : "96px 64px",
          background: "linear-gradient(160deg, #FFF7ED 0%, #fff 60%)",
        }}>
          <div style={{
            display:        "flex",
            alignItems:     "flex-start",
            justifyContent: "center",
            gap:            48,
            flexWrap:       "wrap",
            maxWidth:       1100,
            margin:         "0 auto",
          }}>

            {/* Left: text */}
            <div style={{ flex: "1 1 340px", maxWidth: 520 }}>
              <div style={{
                display:      "inline-flex",
                alignItems:   "center",
                gap:          6,
                background:   "#FFF7ED",
                color:        "#EA580C",
                borderRadius: 20,
                padding:      "4px 14px",
                fontSize:     13,
                fontWeight:   600,
                marginBottom: 24,
              }}>
                {lang === "it" ? "🚗 Gratis per sempre · Nessun account richiesto" : "🚗 Free forever · No account needed"}
              </div>

              <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
                {lang === "it" ? "Pianifica il tuo road trip perfetto " : "Plan your perfect road trip "}
                <span style={{ color: "#EA580C" }}>
                  {lang === "it" ? "in totale semplicità" : "with ease"}
                </span>
              </h1>

              <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.7, marginBottom: 24 }}>
                {lang === "it"
                  ? "Trasforma una lista di destinazioni in un viaggio chiaro e visivo. Aggiungi tappe, organizza giorno per giorno e visualizza all'istante il tuo percorso su una mappa interattiva. Senza fogli di calcolo."
                  : "Turn a list of destinations into a clear, visual journey. Add stops, organize by day, and instantly see your route on an interactive map. No spreadsheets required."}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
                {[
                  lang === "it" ? "Nessuna carta di credito richiesta" : "No credit card required",
                  lang === "it" ? "Piano gratuito per sempre" : "Free forever plan",
                ].map(t => (
                  <span key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6B7280" }}>
                    <span style={{
                      width:          18,
                      height:         18,
                      borderRadius:   "50%",
                      background:     "#EA580C",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      color:          "#fff",
                      fontSize:       11,
                      flexShrink:     0,
                    }}>✓</span>
                    {t}
                  </span>
                ))}
              </div>

              {/* ── Product Hunt Badge ── */}
              <div style={{ marginTop: 8 }}>
                <a
                  href="https://www.producthunt.com/products/roaddy-road-trip-planner?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-roaddy-road-trip-planner"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Roaddy — Road Trip Planner - Plan and visualize multi-day road trips on a map | Product Hunt"
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1095348&theme=light&t=1773236644583"
                    width={250}
                    height={54}
                    style={{ display: "block", maxWidth: "100%" }}
                  />
                </a>
              </div>
            </div>

            {/* Right: map preview — hidden on mobile */}
            {!isMobile && (
              <div style={{
                flex:         "1 1 340px",
                maxWidth:     520,
                borderRadius: 20,
                overflow:     "hidden",
                boxShadow:    "0 8px 48px rgba(0,0,0,0.10)",
                border:       "1px solid #E5E7EB",
                background:   "#F9FAFB",
                position:     "relative",
              }}>
                <Image
                  src="/landing-preview.png"
                  alt="Roaddy interactive road trip map preview showing route visualization and stops"
                  width={520}
                  height={360}
                  priority
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div style={{
                  position:     "absolute",
                  bottom:       16,
                  right:        16,
                  background:   "#fff",
                  borderRadius: 14,
                  padding:      "10px 14px",
                  boxShadow:    "0 4px 16px rgba(0,0,0,0.12)",
                  display:      "flex",
                  alignItems:   "center",
                  gap:          10,
                }}>
                  <div style={{
                    width:          32,
                    height:         32,
                    borderRadius:   8,
                    background:     "#FFF7ED",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       16,
                  }}>🛣️</div>
                  <div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>
                      {lang === "it" ? "Distanza Totale" : "Total Distance"}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>
                      {lang === "it" ? "1.240 km" : "1,240 miles"}
                    </div>
                    <div style={{ height: 3, width: 72, background: "#EA580C", borderRadius: 2, marginTop: 3 }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Start Planning form ── */}
        <section id="start-form" style={{ padding: isMobile ? "48px 20px" : "96px 64px", background: "#F9FAFB" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ color: "#EA580C", fontWeight: 600, fontSize: 14, marginBottom: 8, textAlign: "center" }}>
              {lang === "it" ? "INIZIA ORA" : "GET STARTED"}
            </p>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
              {lang === "it" ? "Inizia a Pianificare il Tuo Viaggio" : "Start Planning Your Trip"}
            </h2>

            <div style={{
              background:   "#fff",
              borderRadius: 16,
              boxShadow:    "0 4px 32px rgba(0,0,0,0.08)",
              padding:      isMobile ? "24px 20px" : "40px 48px",
              maxWidth:     640,
              margin:       "0 auto",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                {/* Trip name + Starting city — stack on mobile */}
                <div style={{
                  display:             "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap:                 12,
                }}>
                  <label style={labelStyle}>
                    {lang === "it" ? "🚗 Nome del viaggio" : "🚗 Trip name"}
                    <input
                      style={inputStyle}
                      placeholder={lang === "it" ? "es. Tour della California" : "e.g. Pacific Coast Highway"}
                      value={title}
                      onChange={e => { setTitle(e.target.value); setError(""); }}
                    />
                  </label>

                  <label style={labelStyle}>
                    {lang === "it" ? "📍 Città di partenza" : "📍 Starting city"}
                    <div style={{ position: "relative" }}>
                      <input
                        style={{ ...inputStyle, paddingRight: cityLoading ? 36 : 12 }}
                        placeholder={lang === "it" ? "es. San Francisco" : "e.g. San Francisco, CA"}
                        value={startCity}
                        onChange={handleCityInput}
                        onBlur={() => setTimeout(() => setCitySuggestions([]), 200)}
                        autoComplete="off"
                      />
                      {cityLoading && (
                        <div style={{
                          position:     "absolute",
                          right:        10,
                          top:          "50%",
                          transform:    "translateY(-50%)",
                          width:        14,
                          height:       14,
                          border:       "2px solid #E5E7EB",
                          borderTop:    "2px solid #EA580C",
                          borderRadius: "50%",
                          animation:    "spin 0.6s linear infinite",
                        }} />
                      )}
                      {citySuggestions.length > 0 && (
                        <div style={{
                          position:     "absolute",
                          top:          "calc(100% + 4px)",
                          left:         0,
                          right:        0,
                          background:   "#fff",
                          border:       "1px solid #E5E7EB",
                          borderRadius: 10,
                          boxShadow:    "0 4px 16px rgba(0,0,0,0.10)",
                          zIndex:       9999,
                          overflow:     "hidden",
                        }}>
                          {citySuggestions.slice(0, 6).map((res, i) => (
                            <div
                              key={i}
                              onMouseDown={() => handleCitySelect(res)}
                              style={{
                                padding:      "10px 14px",
                                fontSize:     13,
                                cursor:       "pointer",
                                display:      "flex",
                                alignItems:   "center",
                                gap:          8,
                                borderBottom: i < 5 ? "1px solid #F3F4F6" : "none",
                              }}
                              onMouseEnter={e => (e.currentTarget.style.background = "#FFF7ED")}
                              onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                            >
                              <span>📍</span>
                              <span style={{ color: "#374151" }}>{res.display_name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Start date + End date — stack on mobile */}
                <div style={{
                  display:             "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap:                 12,
                }}>
                  <label style={labelStyle}>
                    {lang === "it" ? "📅 Data di inizio" : "📅 Start date"}
                    <input
                      type="date"
                      style={Object.assign({}, inputStyle, { width: "100%" })}
                      value={startDate}
                      onChange={e => { setStartDate(e.target.value); setError(""); }}
                    />
                  </label>
                  <label style={labelStyle}>
                    {lang === "it" ? "📅 Data di fine" : "📅 End date"}
                    <input
                      type="date"
                      style={Object.assign({}, inputStyle, { width: "100%" })}
                      value={endDate}
                      onChange={e => { setEndDate(e.target.value); setError(""); }}
                    />
                  </label>
                </div>

                {error && (
                  <p style={{ color: "#EF4444", fontSize: 13, margin: 0 }}>{error}</p>
                )}

                <button
                  onClick={handleStart}
                  style={{
                    background:   "#EA580C",
                    color:        "#fff",
                    border:       "none",
                    borderRadius: 10,
                    padding:      "13px",
                    fontWeight:   700,
                    fontSize:     15,
                    cursor:       "pointer",
                    transition:   "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#C2410C")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#EA580C")}
                >
                  {lang === "it" ? "Inizia a Pianificare →" : "Start Planning →"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={{ padding: isMobile ? "48px 20px" : "96px 64px", background: "#fff", textAlign: "center" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ color: "#EA580C", fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
              {lang === "it" ? "COME FUNZIONA" : "HOW IT WORKS"}
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, marginBottom: 16 }}>
              {lang === "it" ? "Disegna il tuo viaggio, passo dopo passo" : "Design your journey, step by step"}
            </h2>
            <p style={{ color: "#6B7280", maxWidth: 560, margin: "0 auto 56px", lineHeight: 1.7 }}>
              {lang === "it"
                ? "Pianificare un road trip dev'essere emozionante, non complicato. Roaddy ti offre uno spazio pulito dove puoi costruire il tuo itinerario esattamente come lo immagini."
                : "Planning a road trip should be exciting, not complicated. Roaddy gives you a clean workspace where you can build your itinerary exactly the way you imagine it."}
            </p>

            <div style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap:                 24,
            }}>
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title.en} style={{
                  background:   "#F9FAFB",
                  borderRadius: 14,
                  padding:      "32px 28px",
                  textAlign:    "left",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{title[lang]}</h3>
                  <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section (Semantic & Visually Accessible) ── */}
        <section style={{ padding: isMobile ? "48px 20px" : "80px 64px", background: "#F9FAFB", borderTop: "1px solid #E5E7EB" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <p style={{ color: "#EA580C", fontWeight: 600, fontSize: 14, marginBottom: 8, textAlign: "center" }}>
              {lang === "it" ? "DOMANDE FREQUENTI" : "FREQUENTLY ASKED QUESTIONS"}
            </p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, textAlign: "center", marginBottom: 40 }}>
              {lang === "it" ? "Tutto quello che devi sapere su Roaddy" : "Everything you need to know about Roaddy"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {HOMEPAGE_FAQS.map((faq) => (
                <div
                  key={faq.question.en}
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: "24px 28px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  }}
                >
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
                    {faq.question[lang]}
                  </h3>
                  <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.6, margin: 0 }}>
                    {faq.answer[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          background: "#EA580C",
          padding:    isMobile ? "48px 20px" : "96px 64px",
          textAlign:  "center",
          color:      "#fff",
        }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, marginBottom: 16 }}>
            {lang === "it" ? "La tua prossima avventura inizia qui" : "Your next adventure begins here"}
          </h2>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
            {lang === "it"
              ? "Inserisci pochi dettagli sul tuo viaggio e in pochi secondi sarai nel planner con il tuo itinerario pronto."
              : "Enter a few details about your journey and in seconds you'll be inside the planner with your trip ready to go."}
          </p>
          <button
            onClick={() => {
              AnalyticsEvents.startPlanningClick();
              document.getElementById("start-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              background:   "#fff",
              color:        "#EA580C",
              border:       "none",
              borderRadius: 10,
              padding:      "14px 32px",
              fontWeight:   700,
              fontSize:     16,
              cursor:       "pointer",
            }}
          >
            {lang === "it" ? "Inizia a Pianificare Gratis →" : "Start Planning for Free →"}
          </button>
        </section>

        {/* ── Travel Guides Featured Teaser Section ── */}
        <section style={{ padding: isMobile ? "48px 20px" : "96px 64px", background: "#FFF7ED", borderTop: "1px solid #FFEDD5" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: 48,
            }}>
              <div style={{ flex: "1 1 500px" }}>
                <span style={{
                  background: "#EA580C",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 800,
                  padding: "6px 14px",
                  borderRadius: 20,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}>
                  📖 {lang === "it" ? "GUIDE DI VIAGGIO" : "TRAVEL GUIDES"}
                </span>
                <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 16, lineHeight: 1.2 }}>
                  {lang === "it"
                    ? "Scopri le nostre guide Road Trip editoriali"
                    : "Discover our editorial Road Trip guides"}
                </h2>
                <p style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7, marginBottom: 24 }}>
                  {lang === "it"
                    ? "Abbiamo racchiuso i migliori itinerari on the road in guide dettagliate giorno per giorno, con consigli sugli alloggi provati, tappe panoramiche e mappe pronte."
                    : "We've distilled the world's finest road trip routes into day-by-day travel guides with tested accommodation tips, scenic overlooks, and ready-to-use maps."}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  <Link
                    href="/guides/usa-west-coast-18-days"
                    style={{
                      background: "#EA580C",
                      color: "#fff",
                      borderRadius: 10,
                      padding: "12px 24px",
                      fontWeight: 700,
                      fontSize: 15,
                      textDecoration: "none",
                      boxShadow: "0 4px 16px rgba(234, 88, 12, 0.25)",
                    }}
                  >
                    🇺🇸 {lang === "it" ? "Guida USA West Coast (18 Giorni) →" : "USA West Coast Guide (18 Days) →"}
                  </Link>
                  <Link
                    href="/guides"
                    style={{
                      background: "#fff",
                      color: "#374151",
                      border: "1px solid #E5E7EB",
                      borderRadius: 10,
                      padding: "12px 20px",
                      fontWeight: 600,
                      fontSize: 15,
                      textDecoration: "none",
                    }}
                  >
                    {lang === "it" ? "Tutte le Guide" : "All Travel Guides"}
                  </Link>
                </div>
              </div>

              <div style={{
                flex: "1 1 400px",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
                border: "1px solid #E5E7EB",
                position: "relative",
                height: 320,
                width: "100%",
              }}>
                <Image
                  src="/guides/usa-west-coast.png"
                  alt="USA West Coast Road Trip itinerary preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(17,24,39,0.85) 100%)",
                }} />
                <div style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  right: 20,
                  color: "#fff",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#F97316" }}>
                    {lang === "it" ? "GUIDA IN EVIDENZA" : "FEATURED GUIDE"}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>USA on the Road: 18 {lang === "it" ? "Giorni" : "Days"}</div>
                  <div style={{ fontSize: 13, opacity: 0.9 }}>California, National Parks & Wild West · 4,160 km</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <Footer />

    </div>
  );
}
