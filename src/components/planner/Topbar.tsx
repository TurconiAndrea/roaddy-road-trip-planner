"use client";

import { useState } from "react";
import Image from "next/image";
import ComingSoonDialog from "@/components/planner/ComingSoonDialog";
import { useLanguageStore } from "@/store/languageStore";

export default function Topbar() {
  const lang = useLanguageStore((s) => s.lang);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonName, setComingSoonName] = useState("");

  const navItems = [
    { icon: "📍", label: lang === "it" ? "Viaggio Attuale" : "Current Trip", active: true },
    { icon: "🗂", label: lang === "it" ? "I Miei Viaggi" : "My Trips", active: false },
    { icon: "🔭", label: lang === "it" ? "Esplora" : "Explore", active: false },
  ];

  return (
    <>
      <header className="topbar">
        <div className="topbar-logo">
          <Image src="/icon0.svg" alt="Roaddy" width={28} height={28} />
          <span className="logo-text">Roaddy</span>
        </div>

        {/* Nav */}
        <nav className="topbar-nav">
          {navItems.map(({ icon, label, active }) => (
            <button
              key={label}
              className={`nav-tab${active ? " nav-tab--active" : ""}`}
              onClick={() => {
                if (!active) {
                  setComingSoonName(label);
                  setComingSoonOpen(true);
                }
              }}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="topbar-right">
          <div
            className="user-profile"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setComingSoonName(lang === "it" ? "Account Utente" : "User Accounts");
              setComingSoonOpen(true);
            }}
          >
            <div className="user-info">
              <span className="user-name">Miles Wanderer</span>
              <span className="user-role">{lang === "it" ? "Viaggiatore" : "Road Tripper"}</span>
            </div>
            <div className="user-avatar">MW</div>
          </div>
        </div>
      </header>

      <ComingSoonDialog
        open={comingSoonOpen}
        feature={comingSoonName}
        onClose={() => setComingSoonOpen(false)}
      />
    </>
  );
}
