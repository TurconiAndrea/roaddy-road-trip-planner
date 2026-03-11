"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTripStore, selectTrip, selectShowConn } from "@/store/tripStore";
import ConfirmDialog from "@/components/planner/ConfirmDialog";
import type { Trip } from "@/types/trip";

interface Props {
  onFit:               () => void;
  onToggleConnections: () => void;
}

interface ToolButtonProps {
  title:    string;
  label:    string;
  color?:   string;
  hoverBg?: string;
  hoverShadow?: string;
  onClick:  () => void;
  children: React.ReactNode;
}

function ToolButton({ title, label, color = "#6B7280", hoverBg = "#fff", hoverShadow, onClick, children }: ToolButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative", width: 40, height: 40 }}>
      <button
        title={title}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        style={{
          position:       "absolute",
          right:          0,
          top:            0,
          height:         40,
          width:          hovered ? Math.max(40, label.length * 8 + 64) : 40,
          borderRadius:   hovered ? 20 : 10,
          background:     hovered ? hoverBg : "#fff",
          border:         "none",
          boxShadow:      hovered
            ? (hoverShadow || "0 4px 16px rgba(0,0,0,0.15)")
            : "0 2px 8px rgba(0,0,0,0.12)",
          cursor:         "pointer",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "flex-end",
          paddingRight:   12,
          gap:            8,
          color:          hovered ? "#fff" : color,
          overflow:       "hidden",
          whiteSpace:     "nowrap",
          transition:     "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          zIndex:         hovered ? 10 : 1,
        }}
      >
        <span style={{
          fontSize:   13,
          fontWeight: 600,
          opacity:    hovered ? 1 : 0,
          transform:  hovered ? "translateX(0)" : "translateX(8px)",
          transition: "opacity 0.15s ease 0.05s, transform 0.15s ease 0.05s",
          pointerEvents: "none",
        }}>
          {label}
        </span>
        <span style={{
          flexShrink:  0,
          display:     "flex",
          alignItems:  "center",
          transform:   hovered ? "scale(1.15)" : "scale(1)",
          transition:  "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}>
          {children}
        </span>
      </button>
    </div>
  );
}

export default function MapToolbar({ onFit, onToggleConnections }: Props) {
  const router          = useRouter();
  const trip            = useTripStore(selectTrip);
  const showConnections = useTripStore(selectShowConn);
  const resetTrip       = useTripStore(s => s.resetTrip);
  const importRef       = useRef<HTMLInputElement>(null);
  const [resetOpen, setResetOpen] = useState(false);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(trip, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement("a"), {
      href: url, download: `${trip.meta.title || "roaddy-trip"}.json`,
    });
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as Trip;
        if (!parsed?.meta || !Array.isArray(parsed?.stops)) {
          alert("Invalid trip file."); return;
        }
        localStorage.setItem("roaddy_trip_v1", JSON.stringify({ state: { trip: parsed }, version: 1 }));
        window.location.reload();
      } catch { alert("Could not parse file."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const dividerStyle: React.CSSProperties = {
    width: 24, height: 1, background: "#E5E7EB", margin: "2px 8px 2px auto",
  };

  const icon = (d: string | React.ReactNode) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  );

  return (
    <>
      <div style={{
        position:      "absolute",
        top:           16,
        right:         16,
        zIndex:        1000,
        display:       "flex",
        flexDirection: "column",
        gap:           6,
        alignItems:    "flex-end",
      }}>

        <ToolButton title="Fit map to stops" label="Fit to stops"
                    hoverBg="#3B82F6" hoverShadow="0 4px 16px rgba(59,130,246,0.4)"
                    onClick={onFit}>
          {icon(<><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></>)}
        </ToolButton>

        <ToolButton
          title="Toggle day connections" label="Toggle connections"
          color={showConnections ? "#EF4444" : "#6B7280"}
          hoverBg={showConnections ? "#EF4444" : "#6B7280"}
          hoverShadow={showConnections ? "0 4px 16px rgba(239,68,68,0.4)" : "0 4px 16px rgba(0,0,0,0.15)"}
          onClick={onToggleConnections}
        >
          {icon(<><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>)}
        </ToolButton>

        <div style={dividerStyle} />

        <ToolButton title="Import trip" label="Import trip"
                    hoverBg="#6B7280" onClick={() => importRef.current?.click()}>
          {icon(<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>)}
          <input ref={importRef} type="file" accept="application/json"
                 onChange={handleImport} style={{ display: "none" }} />
        </ToolButton>

        <ToolButton title="Export trip" label="Export trip"
                    hoverBg="#6B7280" onClick={handleExport}>
          {icon(<><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>)}
        </ToolButton>

        <ToolButton title="Reset trip" label="Reset trip"
                    color="#EF4444" hoverBg="#EF4444"
                    hoverShadow="0 4px 16px rgba(239,68,68,0.4)"
                    onClick={() => setResetOpen(true)}>
          {icon(<><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></>)}
        </ToolButton>

        <div style={dividerStyle} />

        <ToolButton title="Buy me a coffee" label="Buy me a coffee"
                    color="#FBBF24" hoverBg="#FBBF24"
                    hoverShadow="0 4px 16px rgba(251,191,36,0.5)"
                    onClick={() => window.open("https://ko-fi.com/andreaturconi", "_blank")}>
          {icon(<><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>)}
        </ToolButton>

      </div>

      <ConfirmDialog
        open={resetOpen}
        title="Reset Trip"
        message="This will delete all stops and start over. This action cannot be undone."
        onConfirm={() => { resetTrip(); router.replace("/"); }}
        onClose={() => setResetOpen(false)}
      />
    </>
  );
}
