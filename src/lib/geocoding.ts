import type { GeocodingResult } from "@/types/trip";

export async function geocodeSearch(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 3) return [];
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=0&limit=8&q=${encodeURIComponent(query.trim())}`;
  const res = await fetch(url, {
    headers: { "Accept-Language": "en", "User-Agent": "RoaddyPlanner/2.0" },
  });
  if (!res.ok) throw new Error("Geocoding failed");
  return res.json();
}
