"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguageStore, Language } from "@/store/languageStore";

export default function Navbar() {
  const pathname = usePathname();
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  const initLang = useLanguageStore((s) => s.initLang);

  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initLang();
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [initLang]);

  // Determine current active section
  const isHomeOrPlanner = pathname === "/" || pathname === "/planner" || pathname.startsWith("/planner/");
  const isGuidesSection = pathname.startsWith("/guides");

  // Links list: filter out the link corresponding to the current section
  const navLinks = [
    { label: "Planner", href: "/planner", hideIfActive: isHomeOrPlanner },
    { label: lang === "it" ? "Guide di Viaggio" : "Travel Guides", href: "/guides", hideIfActive: isGuidesSection },
  ].filter((link) => !link.hideIfActive);

  const toggleLanguage = () => {
    setLang(lang === "en" ? "it" : "en");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 500,
        background: "rgba(255, 255, 255, 0.94)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #F3F4F6",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "0 20px" : "0 48px",
        transition: "all 0.2s ease",
      }}
    >
      {/* Brand / Logo */}
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          color: "#111827",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: "#FFF7ED",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #FFEDD5",
          }}
        >
          <Image src="/icon0.svg" alt="Roaddy Logo" width={22} height={22} />
        </div>
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em" }}>
          Roaddy
        </span>
      </Link>

      {/* Desktop Nav Links (Only showing links for other sections) */}
      {!isMobile ? (
        <nav style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                color: "#4B5563",
                background: "transparent",
                textDecoration: "none",
                transition: "all 0.15s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}

      {/* Action Buttons & Language Selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Language Selector Button */}
        <button
          onClick={toggleLanguage}
          aria-label="Select language"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 20,
            border: "1px solid #E5E7EB",
            background: "#F9FAFB",
            fontSize: 13,
            fontWeight: 700,
            color: "#374151",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <span>🌐</span>
          <span style={{ color: lang === "en" ? "#EA580C" : "#9CA3AF" }}>EN</span>
          <span style={{ color: "#D1D5DB" }}>|</span>
          <span style={{ color: lang === "it" ? "#EA580C" : "#9CA3AF" }}>IT</span>
        </button>

        {/* Action CTA */}
        <Link
          href="/planner"
          style={{
            background: "#EA580C",
            color: "#fff",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(234, 88, 12, 0.25)",
            transition: "background 0.15s ease",
          }}
        >
          {isMobile
            ? lang === "it"
              ? "Pianifica"
              : "Plan"
            : lang === "it"
            ? "Inizia a Pianificare"
            : "Start Planning"}
        </Link>

        {/* Mobile Menu Toggle */}
        {isMobile && navLinks.length > 0 && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              padding: "6px 10px",
              fontSize: 18,
              background: "none",
              border: "1px solid #E5E7EB",
              borderRadius: 8,
              cursor: "pointer",
              color: "#374151",
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {isMobile && mobileMenuOpen && navLinks.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                color: "#374151",
                background: "#F9FAFB",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
