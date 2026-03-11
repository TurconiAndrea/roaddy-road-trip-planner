"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTripStore } from "@/store/tripStore";
import { geocodeSearch } from "@/lib/geocoding";
import type { TripMeta, GeocodingResult } from "@/types/trip";

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `@keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }`;
  if (!document.head.querySelector("[data-spin]")) {
    style.setAttribute("data-spin", "");
    document.head.appendChild(style);
  }
}

const FEATURES = [
  {
    icon:  "🗺️",
    title: "Visualize Your Route Instantly",
    desc:  "See your entire trip on an interactive map. As you add stops, the route updates automatically.",
  },
  {
    icon:  "📍",
    title: "Add Destinations in Seconds",
    desc:  "Search for cities, landmarks, or addresses and quickly add them to your itinerary.",
  },
  {
    icon:  "🗓️",
    title: "Organize Stops by Day",
    desc:  "Structure your road trip day by day so your journey stays clear and manageable.",
  },
  {
    icon:  "↕️",
    title: "Drag, Drop, and Reorder",
    desc:  "Easily rearrange stops to adjust your route until it feels just right.",
  },
  {
    icon:  "💾",
    title: "Saves Automatically",
    desc:  "Your plans are stored locally in your browser, so you can come back anytime.",
  },
  {
    icon:  "📱",
    title: "Plan Anywhere",
    desc:  "A responsive design means the planner works just as smoothly on your phone.",
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
    if (!title.trim())       { setError("Please give your trip a name.");       return; }
    if (!startCity.trim())   { setError("Please enter a starting city.");       return; }
    if (!startDate)          { setError("Please select a start date.");         return; }
    if (!endDate)            { setError("Please select an end date.");          return; }
    if (endDate < startDate) { setError("End date must be after start date.");  return; }

    const start = new Date(startDate);
    const end   = new Date(endDate);
    const days  = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);

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
        style={{
          position:     "fixed",
          bottom:       24,
          right:        24,
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
          width={150}
          height={42}
          style={{ display: "block" }}
        />
      </a>

      {/* ── Navbar ── */}
      <nav style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "0 48px",
        height:         64,
        borderBottom:   "1px solid #F3F4F6",
        background:     "#fff",
        position:       "sticky",
        top:            0,
        zIndex:         100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/icon0.svg" alt="Roaddy" width={28} height={28} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>Roaddy</span>
        </div>
        <button
          onClick={() => document.getElementById("start-form")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background:   "#EA580C",
            color:        "#fff",
            border:       "none",
            borderRadius: 8,
            padding:      "8px 20px",
            fontWeight:   600,
            fontSize:     14,
            cursor:       "pointer",
          }}
        >
          Start Planning
        </button>
      </nav>

      {/* ── Hero: title + image ── */}
      <section style={{
        padding:    "96px 64px",
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
              🚗 Free forever · No account needed
            </div>

            <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
              Plan your perfect road trip{" "}
              <span style={{ color: "#EA580C" }}>with ease</span>
            </h1>

            <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.7, marginBottom: 24 }}>
              Turn a list of destinations into a clear, visual journey. Add stops, organize
              by day, and instantly see your route on an interactive map. No spreadsheets required.
            </p>

            <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
              {["No credit card required", "Free forever plan"].map(t => (
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
                  style={{ display: "block" }}
                />
              </a>
            </div>
          </div>

          {/* Right: map preview */}
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
              alt="Roaddy map preview"
              width={520}
              height={360}
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
                <div style={{ fontSize: 11, color: "#6B7280" }}>Total Distance</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>1,240 miles</div>
                <div style={{ height: 3, width: 72, background: "#EA580C", borderRadius: 2, marginTop: 3 }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Start Planning form ── */}
      <section id="start-form" style={{ padding: "96px 64px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#EA580C", fontWeight: 600, fontSize: 14, marginBottom: 8, textAlign: "center" }}>GET STARTED</p>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 800, textAlign: "center", marginBottom: 48 }}>
            Start Planning Your Trip
          </h2>

          <div style={{
            background:   "#fff",
            borderRadius: 16,
            boxShadow:    "0 4px 32px rgba(0,0,0,0.08)",
            padding:      "40px 48px",
            maxWidth:     640,
            margin:       "0 auto",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={labelStyle}>
                  🚗 Trip name
                  <input
                    style={inputStyle}
                    placeholder="e.g. Pacific Coast Highway"
                    value={title}
                    onChange={e => { setTitle(e.target.value); setError(""); }}
                  />
                </label>

                <label style={labelStyle}>
                  📍 Starting city
                  <div style={{ position: "relative" }}>
                    <input
                      style={{ ...inputStyle, paddingRight: cityLoading ? 36 : 12 }}
                      placeholder="e.g. San Francisco, CA"
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

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={labelStyle}>
                  📅 Start date
                  <input
                    type="date"
                    style={inputStyle}
                    value={startDate}
                    onChange={e => { setStartDate(e.target.value); setError(""); }}
                  />
                </label>
                <label style={labelStyle}>
                  📅 End date
                  <input
                    type="date"
                    style={inputStyle}
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
                Start Planning →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ padding: "96px 64px", background: "#fff", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ color: "#EA580C", fontWeight: 600, fontSize: 14, marginBottom: 8 }}>HOW IT WORKS</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, marginBottom: 16 }}>
            Design your journey, step by step
          </h2>
          <p style={{ color: "#6B7280", maxWidth: 560, margin: "0 auto 56px", lineHeight: 1.7 }}>
            Planning a road trip should be exciting, not complicated. Roaddy gives you a clean
            workspace where you can build your itinerary exactly the way you imagine it.
          </p>

          <div style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap:                 24,
          }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} style={{
                background:   "#F9FAFB",
                borderRadius: 14,
                padding:      "32px 28px",
                textAlign:    "left",
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        background: "#EA580C",
        padding:    "96px 64px",
        textAlign:  "center",
        color:      "#fff",
      }}>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, marginBottom: 16 }}>
          Your next adventure begins here
        </h2>
        <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
          Enter a few details about your journey and in seconds you'll be inside the
          planner with your trip ready to go.
        </p>
        <button
          onClick={() => document.getElementById("start-form")?.scrollIntoView({ behavior: "smooth" })}
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
          Start Planning for Free →
        </button>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        background:     "#111827",
        color:          "#9CA3AF",
        padding:        "32px 48px",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        flexWrap:       "wrap",
        gap:            12,
        fontSize:       13,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/icon0.svg" alt="Roaddy" width={20} height={20} />
          <span style={{ color: "#fff", fontWeight: 600 }}>Roaddy</span>
        </div>
        <span>© {new Date().getFullYear()} Roaddy. MIT License.</span>
      </footer>

    </div>
  );
}
