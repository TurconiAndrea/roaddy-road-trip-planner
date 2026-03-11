import type { Trip } from "@/types/trip";

const KEY = "roaddy_trip_v1";

export const EMPTY_TRIP: Trip = {
  meta: {
    title:     "",
    startDate: "",
    endDate:   "",
    days:      0,
    startCity: null,
  },
  stops: [],
};

export function loadTrip(): Trip {
  if (typeof window === "undefined") return EMPTY_TRIP;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY_TRIP;
    return JSON.parse(raw) as Trip;
  } catch {
    return EMPTY_TRIP;
  }
}

export function saveTrip(trip: Trip): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(trip));
  } catch (e) {
    console.warn("Could not save trip:", e);
  }
}

export function clearTrip(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function isTripSetup(trip: Trip): boolean {
  return !!(
    trip.meta.title &&
    trip.meta.startDate &&
    trip.meta.endDate
  );
}
