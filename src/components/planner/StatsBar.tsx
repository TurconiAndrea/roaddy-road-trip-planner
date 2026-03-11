"use client";

import { useTripStore, selectTrip, selectRouteData } from "@/store/tripStore";

export default function StatsBar() {
  const trip      = useTripStore(selectTrip);
  const routeData = useTripStore(selectRouteData);

  const totalKm    = Object.values(routeData.distancesByDay).reduce((a, b) => a + b, 0);
  const totalSec   = Object.values(routeData.durationsByDay).reduce((a, b) => a + b, 0);
  const totalStops = trip.stops.length;

  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const driveTime = totalSec > 0 ? (h > 0 ? `${h}h ${m}m` : `${m}m`) : "0 hrs";

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-label">Distance</span>
        <span className="stat-value">{totalKm > 0 ? `${totalKm.toFixed(0)} km` : "0 km"}</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-label">Drive Time</span>
        <span className="stat-value">{driveTime}</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-label">Stops</span>
        <span className="stat-value">{totalStops}</span>
      </div>
    </div>
  );
}
