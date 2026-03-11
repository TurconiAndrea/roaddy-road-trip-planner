"use client";

import { useTripStore, selectRouteData, selectConnections } from "@/store/tripStore";
import { formatDuration } from "@/lib/utils";

export default function RouteCard() {
  const routeData   = useTripStore(selectRouteData);
  const connections = useTripStore(selectConnections);

  const totalKm  = Object.values(routeData.distancesByDay).reduce((a, b) => a + b, 0);
  const totalSec = Object.values(routeData.durationsByDay).reduce((a, b) => a + b, 0);
  const connKm   = connections.reduce((a, c) => a + c.distKm, 0);
  const grandKm  = totalKm + connKm;

  if (!totalKm && !connKm) return null;

  const pct = grandKm > 0 ? Math.min((totalKm / grandKm) * 100, 100) : 0;

  return (
    <div className="route-card">
      <div className="route-card-dist">
        <span className="route-card-km">{grandKm.toFixed(0)} km</span>
        <span className="route-card-sublabel">Total distance</span>
      </div>
      <div className="route-card-divider" />
      <div className="route-card-time-row">
        <div className="route-card-time-left">
          <span>🚗</span>
          <span className="route-card-time">{formatDuration(totalSec)}</span>
        </div>
        <span className="route-card-sublabel">Est. time by car</span>
      </div>
      <div className="route-card-bar">
        <div className="route-card-progress" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
