"use client";

import { useState } from "react";
import Image from "next/image";
import ComingSoonDialog from "@/components/planner/ComingSoonDialog";

export default function Topbar() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonName, setComingSoonName] = useState("");

  return (
    <>
      <header className="topbar">

        <div className="topbar-logo">
          <Image src="/icon0.svg" alt="Roaddy" width={28} height={28} />
          <span className="logo-text">Roaddy</span>
        </div>

        {/* Nav */}
        <nav className="topbar-nav">
          {[
            { icon: "📍", label: "Current Trip", active: true  },
            { icon: "🗂",  label: "My Trips",     active: false },
            { icon: "🔭", label: "Explore",       active: false },
          ].map(({ icon, label, active }) => (
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
              setComingSoonName("User Accounts");
              setComingSoonOpen(true);
            }}
          >
            <div className="user-info">
              <span className="user-name">Miles Wanderer</span>
              <span className="user-role">Road Tripper</span>
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
