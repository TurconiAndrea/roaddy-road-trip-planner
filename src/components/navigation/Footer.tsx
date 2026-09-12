"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        color: "#9CA3AF",
        padding: "48px 24px 32px",
        fontSize: 14,
        borderTop: "1px solid #1F2937",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: 360 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  background: "#EA580C",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src="/icon0.svg" alt="Roaddy" width={20} height={20} />
              </div>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em" }}>
                Roaddy
              </span>
            </div>
            <p style={{ color: "#9CA3AF", lineHeight: 1.6, fontSize: 13 }}>
              Il tuo compagno ideale per pianificare road trip indimenticabili. Mappe interattive,
              guide editoriali curate nei minimi dettagli e itinerari pronti da vivere.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Esplora</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                <li>
                  <Link href="/planner" style={{ color: "#9CA3AF", textDecoration: "none" }}>
                    Trip Planner
                  </Link>
                </li>
                <li>
                  <Link href="/guides" style={{ color: "#9CA3AF", textDecoration: "none" }}>
                    Travel Guides
                  </Link>
                </li>
                <li>
                  <Link href="/guides/usa-west-coast-18-days" style={{ color: "#9CA3AF", textDecoration: "none" }}>
                    USA West Coast 18 Giorni
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Roaddy</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                <li>
                  <a
                    href="https://ko-fi.com/andreaturconi"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#9CA3AF", textDecoration: "none" }}
                  >
                    Offrici un caffè ☕
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.producthunt.com/products/roaddy-road-trip-planner"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#9CA3AF", textDecoration: "none" }}
                  >
                    Product Hunt
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #1F2937",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
          }}
        >
          <span>© {new Date().getFullYear()} Roaddy. Tutti i diritti riservati.</span>
          <span>Made with ❤️ for road trippers everywhere.</span>
        </div>
      </div>
    </footer>
  );
}
