"use client";

import { useState, useEffect, useRef } from "react";
import Sortable from "sortablejs";
import { useTripStore, selectRouteData } from "@/store/tripStore";
import { dayColor, routeColor, formatTripDate, formatDuration } from "@/lib/utils";
import type { Stop } from "@/types/trip";
import StopItem      from "./StopItem";
import StopConnector from "./StopConnector";

interface Props {
  day:         number;
  stops:       Stop[];
  globalStart: number;
  onEdit:      (id: string) => void;
}

export default function DayCard({ day, stops, globalStart, onEdit }: Props) {
  const routeData  = useTripStore(selectRouteData);
  const deleteStop = useTripStore(s => s.deleteStop);
  const reorderStops = useTripStore(s => s.reorderStops);
  const startDate  = useTripStore(s => s.trip.meta.startDate);

  const [collapsed, setCollapsed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const color     = dayColor(day);
  const routeCol  = routeColor(day);
  const distKm    = routeData.distancesByDay[day];
  const durSec    = routeData.durationsByDay[day];
  const dateLabel = formatTripDate(startDate, day - 1);

  useEffect(() => {
    if (!listRef.current) return;
    const sortable = Sortable.create(listRef.current, {
      animation:  150,
      handle:     ".stop-drag",
      ghostClass: "sortable-ghost",
      onEnd: () => {
        if (!listRef.current) return;
        const ids = Array.from(listRef.current.querySelectorAll("[data-stop-id]"))
          .map(el => el.getAttribute("data-stop-id"))
          .filter(Boolean) as string[];
        reorderStops(day, ids);
      },
    });
    return () => sortable.destroy();
  }, [day, reorderStops]);

  return (
    <div className={`day-card${collapsed ? " day-card--collapsed" : ""}`}>

      <div className="day-header" onClick={() => setCollapsed(c => !c)}>
        <div className="day-badge" style={{ background: color }}>{day}</div>
        <div className="day-header-info">
          <div className="day-title">
            <div className="day-color-bar" style={{ background: routeCol }} />
            Day {day}
          </div>
          <div className="day-subtitle">
            {dateLabel && <><span>{dateLabel}</span><span>·</span></>}
            <span>{stops.length} stop{stops.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
        <div className="day-header-right">
          {distKm != null && <span className="day-km">{distKm.toFixed(0)} km</span>}
          {durSec != null && <span className="day-km">{formatDuration(durSec)}</span>}
          <span className="day-chevron">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </div>
      </div>

      <div className="day-body">
        <div className="stop-list" ref={listRef}>
          {stops.map((stop, i) => (
            <div key={stop.id} data-stop-id={stop.id}>
              <StopItem
                stop={stop}
                globalIndex={globalStart + i}
                onEdit={onEdit}
                onDelete={deleteStop}
              />
              {i < stops.length - 1 && (
                <StopConnector
                  fromStop={stop}
                  toStop={stops[i + 1]}
                  segments={routeData.segmentsByDay[day]}
                  segmentIndex={i}
                />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
