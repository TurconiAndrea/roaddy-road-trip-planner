export type StopCategory =
  | "" | "Sightseeing" | "Food" | "Nature"
  | "Hotel" | "Museum" | "Beach" | "Shopping" | "Other";

export interface Stop {
  id:       string;
  name:     string;
  lat:      number;
  lng:      number;
  day:      number;
  order:    number;
  category: StopCategory;
  duration: string;
}

export interface StartCity {
  name: string;
  lat:  number;
  lng:  number;
}

export interface TripMeta {
  title:     string;
  startDate: string;
  endDate:   string;
  days:      number;
  startCity: StartCity | null;
}

export interface Trip {
  meta:  TripMeta;
  stops: Stop[];
}

export interface RouteSegment {
  distance: number;
  duration: number;
}

export interface ConnectionDistance {
  dayA:       number;
  dayB:       number;
  distKm:     number;
  lastStop:   Stop;
  firstStop:  Stop;
}

export interface GeocodingResult {
  display_name: string;
  lat:          string;
  lon:          string;
}
