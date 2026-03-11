"use client";

import { stopLabel, dayColor } from "@/lib/utils";
import type { Stop } from "@/types/trip";

interface Props {
  stop:        Stop;
  globalIndex: number;
  onEdit:      (id: string) => void;
  onDelete:    (id: string) => void;
}

export default function StopItem({ stop, globalIndex, onEdit, onDelete }: Props) {
  const color = dayColor(stop.day);
  const label = stopLabel(globalIndex);

  return (
    <div className="stop-item">
      <div className="stop-drag">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9"  cy="5"  r="1.2"/><circle cx="15" cy="5"  r="1.2"/>
          <circle cx="9"  cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/>
          <circle cx="9"  cy="19" r="1.2"/><circle cx="15" cy="19" r="1.2"/>
        </svg>
      </div>

      <div className="stop-marker" style={{ borderColor: color, color }}>
        {label}
      </div>

      <div className="stop-content">
        <div className="stop-name">{stop.name}</div>
        <div className="stop-location">
          {stop.lat.toFixed(3)}, {stop.lng.toFixed(3)}
        </div>
        {(stop.category || stop.duration) && (
          <div className="stop-tags">
            {stop.category && (
              <span className="stop-tag stop-tag--category">{stop.category}</span>
            )}
            {stop.duration && (
              <span className="stop-tag stop-tag--duration">{stop.duration}</span>
            )}
          </div>
        )}
      </div>

      <div className="stop-actions">
        <button className="edit-btn" onClick={() => onEdit(stop.id)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button className="delete-btn" onClick={() => onDelete(stop.id)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
