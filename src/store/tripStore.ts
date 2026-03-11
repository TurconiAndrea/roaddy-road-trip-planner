"use client";

import { create }   from "zustand";
import { persist }  from "zustand/middleware";
import type {
  Trip, Stop, TripMeta,
  RouteSegment, ConnectionDistance
} from "@/types/trip";

// ── Types ──────────────────────────────────────────────────
interface RouteData {
  distancesByDay: Record<number, number>;
  durationsByDay: Record<number, number>;
  segmentsByDay:  Record<number, RouteSegment[]>;
}

interface TripState {
  trip:                Trip;
  routeData:           RouteData;
  connectionDistances: ConnectionDistance[];
  showConnections:     boolean;
  _hydrated:           boolean;

  // Trip
  createTrip:   (meta: TripMeta, firstStop: Stop) => void;
  updateMeta:   (meta: Partial<TripMeta>) => void;
  resetTrip:    () => void;
  setHydrated:  () => void;

  // Stops
  addStop:      (stop: Omit<Stop, "id" | "order">) => void;
  deleteStop:   (id: string) => void;
  editStop:     (id: string, props: Partial<Stop>) => void;
  reorderStops: (day: number, orderedIds: string[]) => void;

  // Map
  setRouteData:           (data: RouteData) => void;
  setConnectionDistances: (c: ConnectionDistance[]) => void;
  toggleConnections:      () => void;
}

// ── Helpers ────────────────────────────────────────────────
const EMPTY_TRIP: Trip = {
  meta:  { title: "", startDate: "", endDate: "", days: 0, startCity: null },
  stops: [],
};

const EMPTY_ROUTE: RouteData = {
  distancesByDay: {},
  durationsByDay: {},
  segmentsByDay:  {},
};

function uid() {
  return `s_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function nextOrder(stops: Stop[], day: number): number {
  const same = stops.filter(s => s.day === day);
  return same.length === 0 ? 1 : Math.max(...same.map(s => s.order)) + 1;
}

function sorted(stops: Stop[]): Stop[] {
  return [...stops].sort((a, b) =>
    a.day !== b.day ? a.day - b.day : a.order - b.order
  );
}

// ── Store ──────────────────────────────────────────────────
export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      trip:                EMPTY_TRIP,
      routeData:           EMPTY_ROUTE,
      connectionDistances: [],
      showConnections:     false,
      _hydrated:           false,

      setHydrated: () => set({ _hydrated: true }),

      createTrip: (meta, firstStop) =>
        set({ trip: { meta, stops: [firstStop] } }),

      updateMeta: (partial) =>
        set(s => ({ trip: { ...s.trip, meta: { ...s.trip.meta, ...partial } } })),

      resetTrip: () =>
        set({ trip: EMPTY_TRIP, routeData: EMPTY_ROUTE, connectionDistances: [] }),

      addStop: (stopData) => {
        const { trip } = get();
        const stop: Stop = {
          ...stopData,
          id:    uid(),
          order: nextOrder(trip.stops, stopData.day),
        };
        set({ trip: { ...trip, stops: sorted([...trip.stops, stop]) } });
      },

      deleteStop: (id) => {
        const { trip } = get();
        const target = trip.stops.find(s => s.id === id);
        if (!target) return;
        const stops = trip.stops.filter(s => s.id !== id);
        stops
          .filter(s => s.day === target.day)
          .sort((a, b) => a.order - b.order)
          .forEach((s, i) => { s.order = i + 1; });
        set({ trip: { ...trip, stops: sorted(stops) } });
      },

      editStop: (id, props) => {
        const { trip } = get();
        const stops = trip.stops.map(s => {
          if (s.id !== id) return s;
          const updated = { ...s, ...props };
          if (props.day && props.day !== s.day) {
            updated.order = nextOrder(
              trip.stops.filter(x => x.id !== id),
              props.day
            );
          }
          return updated;
        });
        set({ trip: { ...trip, stops: sorted(stops) } });
      },

      reorderStops: (day, orderedIds) => {
        const { trip } = get();
        const stops = trip.stops.map(s => {
          if (s.day !== day) return s;
          const idx = orderedIds.indexOf(s.id);
          return idx >= 0 ? { ...s, order: idx + 1 } : s;
        });
        set({ trip: { ...trip, stops: sorted(stops) } });
      },

      setRouteData:           (routeData)           => set({ routeData }),
      setConnectionDistances: (connectionDistances) => set({ connectionDistances }),
      toggleConnections:      ()                    => set(s => ({ showConnections: !s.showConnections })),
    }),
    {
      name:    "roaddy_trip_v1",
      version: 1,
      // Only persist trip data — not ephemeral map state
      partialize: (s) => ({ trip: s.trip }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

// Selector helpers — use these in components for clean code
export const selectTrip       = (s: TripState) => s.trip;
export const selectHydrated   = (s: TripState) => s._hydrated;
export const selectRouteData  = (s: TripState) => s.routeData;
export const selectConnections = (s: TripState) => s.connectionDistances;
export const selectShowConn   = (s: TripState) => s.showConnections;
