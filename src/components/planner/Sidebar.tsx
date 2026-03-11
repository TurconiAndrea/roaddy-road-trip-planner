"use client";

import { useState } from "react";
import { format }   from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter }
  from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTripStore, selectTrip, selectHydrated } from "@/store/tripStore";
import { groupStopsByDay } from "@/lib/utils";
import SearchBar     from "./SearchBar";
import DayCard       from "./DayCard";
import StatsBar      from "./StatsBar";
import EditStopModal from "./EditStopModal";
import type { GeocodingResult, StopCategory } from "@/types/trip";

const CATEGORIES: StopCategory[] = [
  "", "Sightseeing", "Food", "Nature",
  "Hotel", "Museum", "Beach", "Shopping", "Other",
];

export default function Sidebar() {
  const trip      = useTripStore(selectTrip);
  const hydrated  = useTripStore(selectHydrated);
  const addStop   = useTripStore(s => s.addStop);
  const updateMeta = useTripStore(s => s.updateMeta);

  const [selectedLocation, setSelectedLocation] = useState<GeocodingResult | null>(null);
  const [stopName,  setStopName]  = useState("");
  const [stopDay,   setStopDay]   = useState(1);
  const [stopCat,   setStopCat]   = useState<StopCategory>("");
  const [stopDur,   setStopDur]   = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [tripModalOpen, setTripModalOpen] = useState(false);
  const [modalName,     setModalName]     = useState("");
  const [modalStart,    setModalStart]    = useState("");
  const [modalEnd,      setModalEnd]      = useState("");

  const groups = groupStopsByDay(trip.stops);
  const days   = Object.keys(groups).map(Number).sort((a, b) => a - b);

  const dateRangeText = trip.meta.startDate && trip.meta.endDate
    ? `${format(new Date(trip.meta.startDate), "EEE, MMM d")} – ${format(new Date(trip.meta.endDate), "EEE, MMM d")}`
    : "Set dates";

  const daysText = (() => {
    const n = trip.meta.days || days.length;
    return `${n} Day${n !== 1 ? "s" : ""}`;
  })();

  const handleLocationSelected = (res: GeocodingResult) => {
    setSelectedLocation(res);
    setStopName(res.display_name.split(",")[0].trim());
  };

  const handleAddStop = () => {
    if (!selectedLocation) return;
    addStop({
      name:     stopName || selectedLocation.display_name.split(",")[0].trim(),
      lat:      parseFloat(selectedLocation.lat),
      lng:      parseFloat(selectedLocation.lon),
      day:      stopDay,
      category: stopCat,
      duration: stopDur,
    });
    setSelectedLocation(null);
    setStopName(""); setStopCat(""); setStopDur("");
  };

  const openTripModal = () => {
    setModalName(trip.meta.title);
    setModalStart(trip.meta.startDate);
    setModalEnd(trip.meta.endDate);
    setTripModalOpen(true);
  };

  const saveTripModal = () => {
    updateMeta({ title: modalName, startDate: modalStart, endDate: modalEnd });
    setTripModalOpen(false);
  };

  let globalIdx = 0;

  return (
    <>
      <aside className="sidebar">

        {/* Trip Header */}
        <div className="trip-header">
          <div className="trip-header-top">
            <div>
              <h1 className="trip-title">
                {trip.meta.title || "My Road Trip"}
              </h1>
              <button className="trip-meta" onClick={openTripModal}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8"  y1="2" x2="8"  y2="6"/>
                  <line x1="3"  y1="10" x2="21" y2="10"/>
                </svg>
                <span>{dateRangeText}</span>
                <span className="meta-sep">•</span>
                <span>{daysText}</span>
              </button>
            </div>
            <button className="icon-btn" onClick={openTripModal}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <SearchBar onLocationSelected={handleLocationSelected} />

        {/* Add Stop Panel */}
        {selectedLocation && (
          <div className="add-stop-panel">
            <p className="add-stop-label">
              📍 {selectedLocation.display_name.split(",")[0].trim()}
            </p>
            <div className="form-row">
              <input value={stopName} onChange={e => setStopName(e.target.value)}
                     placeholder="Stop name" className="form-input" />
            </div>
            <div className="form-row form-row--split">
              <div className="form-field">
                <label className="form-label">Day</label>
                <input type="number" min={1} value={stopDay} className="form-input"
                       onChange={e => setStopDay(parseInt(e.target.value) || 1)} />
              </div>
              <div className="form-field">
                <label className="form-label">Category</label>
                <select value={stopCat} className="form-input"
                        onChange={e => setStopCat(e.target.value as StopCategory)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c || "None"}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Duration</label>
                <input value={stopDur} onChange={e => setStopDur(e.target.value)}
                       placeholder="1h 30m" className="form-input" />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn--ghost"
                      onClick={() => setSelectedLocation(null)}>Cancel</button>
              <button className="btn btn--primary"
                      onClick={handleAddStop}>Add Stop</button>
            </div>
          </div>
        )}

        {/* Itinerary */}
        <div className="itinerary-wrap">
          {!hydrated || days.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🗺️</div>
              <p className="empty-title">
                {!hydrated ? "Loading trip..." : "No stops yet"}
              </p>
              {hydrated && (
                <p className="empty-subtitle">
                  Search for a destination above<br />to add your first stop.
                </p>
              )}
            </div>
          ) : (
            days.map(day => {
              const stops = groups[day];
              const start = globalIdx;
              globalIdx  += stops.length;
              return (
                <DayCard key={day} day={day} stops={stops}
                         globalStart={start} onEdit={setEditingId} />
              );
            })
          )}
        </div>

        <StatsBar />
      </aside>

      <EditStopModal stopId={editingId} onClose={() => setEditingId(null)} />

      {/* Edit Trip Modal */}
      <Dialog open={tripModalOpen} onOpenChange={setTripModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Trip Details</DialogTitle>
          </DialogHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "4px 0" }}>
            <div className="modal-field">
              <label className="form-label">Trip Name</label>
              <input className="form-input" value={modalName}
                     onChange={e => setModalName(e.target.value)}
                     placeholder="e.g. California Coast" />
            </div>
            <div className="modal-field">
              <label className="form-label">Start Date</label>
              <input type="date" className="form-input" value={modalStart}
                     onChange={e => setModalStart(e.target.value)} />
            </div>
            <div className="modal-field">
              <label className="form-label">End Date</label>
              <input type="date" className="form-input" value={modalEnd}
                     onChange={e => setModalEnd(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTripModalOpen(false)}>Cancel</Button>
            <Button onClick={saveTripModal}
                    style={{ background: "var(--accent)", color: "white" }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
