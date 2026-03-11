import { clsx, type ClassValue } from "clsx";
import { twMerge }               from "tailwind-merge";
import { format, addDays, differenceInCalendarDays } from "date-fns";
import type { Stop } from "@/types/trip";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DAY_COLORS = [
  "#3B82F6","#10B981","#F59E0B","#8B5CF6","#EF4444",
  "#06B6D4","#F97316","#EC4899","#14B8A6","#A855F7",
];
const ROUTE_COLORS = [
  "#60A5FA","#34D399","#FBBF24","#A78BFA","#F87171",
  "#22D3EE","#FB923C","#F472B6","#2DD4BF","#C084FC",
];
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const stopLabel  = (i: number) =>
  i < 26 ? LETTERS[i] : LETTERS[Math.floor(i / 26) - 1] + LETTERS[i % 26];

export const dayColor   = (d: number) => DAY_COLORS[(d - 1)  % DAY_COLORS.length];
export const routeColor = (d: number) => ROUTE_COLORS[(d - 1) % ROUTE_COLORS.length];

export function formatDuration(seconds: number): string {
  if (!seconds) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
}

export function formatTripDate(dateStr: string, dayOffset = 0): string {
  if (!dateStr) return "";
  return format(addDays(new Date(dateStr), dayOffset), "EEE, MMM d");
}

export function calcTripDays(start: string, end: string): number {
  if (!start || !end) return 0;
  return differenceInCalendarDays(new Date(end), new Date(start)) + 1;
}

export function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R    = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a    = Math.sin(dLat / 2) ** 2
             + Math.cos(lat1 * Math.PI / 180)
             * Math.cos(lat2 * Math.PI / 180)
             * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function groupStopsByDay(stops: Stop[]): Record<number, Stop[]> {
  const groups: Record<number, Stop[]> = {};
  stops.forEach(s => {
    if (!groups[s.day]) groups[s.day] = [];
    groups[s.day].push(s);
  });
  Object.values(groups).forEach(arr =>
    arr.sort((a, b) => a.order - b.order)
  );
  return groups;
}
