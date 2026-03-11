"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTripStore, selectTrip, selectShowConn } from "@/store/tripStore";
import { groupStopsByDay, stopLabel, routeColor, haversineKm } from "@/lib/utils";
import type { RouteSegment, ConnectionDistance } from "@/types/trip";
import MapToolbar from "./MapToolbar";
import RouteCard  from "./RouteCard";

export default function MapView() {
  const mapDivRef          = useRef<HTMLDivElement>(null);
  const mapRef             = useRef<any>(null);
  const LRef               = useRef<any>(null);
  const markersRef         = useRef<any>(null);
  const connectionsRef     = useRef<any>(null);
  const routingControlsRef = useRef<Record<number, any>>({});

  const trip            = useTripStore(selectTrip);
  const showConnections = useTripStore(selectShowConn);
  const setRouteData    = useTripStore(s => s.setRouteData);
  const setConnDist     = useTripStore(s => s.setConnectionDistances);
  const toggleConn      = useTripStore(s => s.toggleConnections);

  const tripRef            = useRef(trip);
  const showConnectionsRef = useRef(showConnections);
  const setRouteDataRef    = useRef(setRouteData);
  const setConnDistRef     = useRef(setConnDist);

  useEffect(() => { tripRef.current = trip; }, [trip]);
  useEffect(() => { showConnectionsRef.current = showConnections; }, [showConnections]);

  const updateMarkers = useCallback(() => {
    const L = LRef.current, map = mapRef.current, markers = markersRef.current;
    if (!L || !map || !markers) return;
    markers.clearLayers();
    const stops = tripRef.current.stops;
    if (!stops.length) return;
    const groups = groupStopsByDay(stops);
    const all: any[] = [];
    let gi = 0;
    Object.keys(groups).map(Number).sort((a, b) => a - b)
      .forEach(d => groups[d].forEach((s: any) => {
        const icon = L.divIcon({
          className: "",
          html: `<div class="roaddy-marker" style="background:${routeColor(s.day)}">${stopLabel(gi++)}</div>`,
          iconSize: [32, 32], iconAnchor: [16, 16], popupAnchor: [0, -20],
        });
        all.push(
          L.marker([s.lat, s.lng], { icon }).addTo(markers)
           .bindPopup(`<strong>${s.name}</strong><br/>Day ${s.day}`)
        );
      }));
    if (all.length) map.fitBounds(L.featureGroup(all).getBounds(), { padding: [48, 48] });
  }, []);

  const updateRouting = useCallback(() => {
    const L = LRef.current, map = mapRef.current;
    if (!L || !map) return;
    Object.values(routingControlsRef.current).forEach(c => { try { map.removeControl(c); } catch {} });
    routingControlsRef.current = {};
    const groups = groupStopsByDay(tripRef.current.stops);
    const days   = Object.keys(groups).map(Number).sort((a, b) => a - b).filter(d => groups[d].length >= 2);
    if (!days.length) { setRouteDataRef.current({ distancesByDay: {}, durationsByDay: {}, segmentsByDay: {} }); return; }
    const LR = L as any;
    const distances: Record<number, number> = {};
    const durations: Record<number, number> = {};
    const segments:  Record<number, RouteSegment[]> = {};
    let pending = days.length;
    days.forEach(day => {
      const ctrl = LR.Routing.control({
        waypoints: groups[day].map((s: any) => L.latLng(s.lat, s.lng)),
        lineOptions: { styles: [{ color: routeColor(day), weight: 4, opacity: 0.85 }] },
        draggableWaypoints: false, addWaypoints: false,
        fitSelectedRoutes: false, routeWhileDragging: false, show: false,
        router: LR.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
      }).addTo(map);
      ctrl.on("routesfound", (e: any) => {
        const r = e.routes?.[0];
        if (r) {
          distances[day] = r.summary.totalDistance / 1000;
          durations[day] = r.summary.totalTime;
          segments[day]  = (r.legs || []).map((l: any) => ({
            distance: l.summary?.totalDistance ?? 0,
            duration: l.summary?.totalTime     ?? 0,
          }));
        }
        if (--pending <= 0) setRouteDataRef.current({ distancesByDay: distances, durationsByDay: durations, segmentsByDay: segments });
      });
      routingControlsRef.current[day] = ctrl;
    });
  }, []);

  const updateConnections = useCallback(() => {
    const L = LRef.current, layer = connectionsRef.current;
    if (!L || !layer) return;
    try { layer.clearLayers(); } catch { return; }
    const groups = groupStopsByDay(tripRef.current.stops);
    const days   = Object.keys(groups).map(Number).sort((a, b) => a - b);
    const conns: ConnectionDistance[] = [];
    for (let i = 0; i < days.length - 1; i++) {
      const last  = [...groups[days[i]]].sort((a, b) => a.order - b.order).at(-1)!;
      const first = [...groups[days[i + 1]]].sort((a, b) => a.order - b.order)[0];
      if (!last || !first) continue;
      const distKm = haversineKm(last.lat, last.lng, first.lat, first.lng);
      conns.push({ dayA: days[i], dayB: days[i + 1], distKm, lastStop: last, firstStop: first });
      if (showConnectionsRef.current)
        L.polyline([[last.lat, last.lng], [first.lat, first.lng]], {
          color: "#FF006E", weight: 2.5, opacity: 0.85, dashArray: "8,6"
        }).bindTooltip(`Day ${days[i]} → Day ${days[i+1]}  ~${distKm.toFixed(1)} km`,
          { sticky: true, className: "connection-tooltip" }).addTo(layer);
    }
    setConnDistRef.current(conns);
  }, []);

  // ── Init map ONCE ──
  useEffect(() => {
    if (mapRef.current || !mapDivRef.current) return;

    import("leaflet").then(({ default: L }) => {
      if (mapRef.current || !mapDivRef.current) return;

      // LRM must be required AFTER leaflet is loaded — it patches L
      require("leaflet-routing-machine");

      // Fix broken default icons
      const proto = L.Icon.Default.prototype as any;
      delete proto._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      LRef.current = L;

      const map = L.map(mapDivRef.current!, {
        center:      [48, 12],
        zoom:        5,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom:     19,
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      markersRef.current     = L.layerGroup().addTo(map);
      connectionsRef.current = L.layerGroup().addTo(map);
      mapRef.current         = map;

      if (tripRef.current.meta.startCity) {
        map.setView(
          [tripRef.current.meta.startCity.lat, tripRef.current.meta.startCity.lng],
          8
        );
      }

      setTimeout(() => {
        map.invalidateSize();
        updateMarkers();
        updateRouting();
        updateConnections();
      }, 300);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── React to stops changes ──
  useEffect(() => {
    if (!mapRef.current || !LRef.current) return;
    updateMarkers();
    updateRouting();
    updateConnections();
  }, [trip.stops, updateMarkers, updateRouting, updateConnections]);

  // ── React to connection toggle ──
  useEffect(() => {
    if (!mapRef.current || !LRef.current) return;
    updateConnections();
  }, [showConnections, updateConnections]);

  const handleFit = useCallback(() => {
    const L = LRef.current, map = mapRef.current;
    if (!L || !map || !trip.stops.length) return;
    map.fitBounds(
      L.latLngBounds(trip.stops.map((s: any) => L.latLng(s.lat, s.lng))),
      { padding: [48, 48] }
    );
  }, [trip.stops]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div
        ref={mapDivRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
      <MapToolbar onFit={handleFit} onToggleConnections={toggleConn} />
      <RouteCard />
    </div>
  );
}
