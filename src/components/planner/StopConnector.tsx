"use client";

import { formatDuration } from "@/lib/utils";
import type { RouteSegment, Stop } from "@/types/trip";

interface Props {
  fromStop:     Stop;
  toStop:       Stop;
  segments?:    RouteSegment[];
  segmentIndex: number;
}

export default function StopConnector({ segments, segmentIndex }: Props) {
  const seg = segments?.[segmentIndex];

  return (
    <div className="stop-connector">
      <svg width="10" height="20" viewBox="0 0 10 20" fill="none">
        <line x1="5" y1="0" x2="5" y2="20"
              stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="3,3"/>
      </svg>
      {seg ? (
        <span style={{ fontSize: 11, color: "var(--text-4)" }}>
          {(seg.distance / 1000).toFixed(1)} km · {formatDuration(seg.duration)}
        </span>
      ) : (
        <span style={{ fontSize: 11, color: "var(--text-4)" }}>···</span>
      )}
    </div>
  );
}
