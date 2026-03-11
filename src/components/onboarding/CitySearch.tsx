"use client";

import { useState, useRef, useCallback } from "react";
import { geocodeSearch } from "@/lib/geocoding";
import type { GeocodingResult } from "@/types/trip";

interface Props {
  onSelect: (result: GeocodingResult) => void;
}

export default function CitySearch({ onSelect }: Props) {
  const [value,       setValue]       = useState("");
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([]);
  const [loading,     setLoading]     = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (timer.current) clearTimeout(timer.current);
    if (val.length < 3) { setSuggestions([]); return; }
    setLoading(true);
    timer.current = setTimeout(async () => {
      try   { setSuggestions(await geocodeSearch(val)); }
      catch { setSuggestions([]); }
      finally { setLoading(false); }
    }, 350);
  }, []);

  const handleSelect = (res: GeocodingResult) => {
    setValue(res.display_name.split(",")[0].trim());
    setSuggestions([]);
    onSelect(res);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="search-bar">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          value={value}
          onChange={handleInput}
          onBlur={() => setTimeout(() => setSuggestions([]), 200)}
          placeholder="Search for a city..."
          className="search-input"
          autoComplete="off"
        />
        {loading && <div className="spinner" />}
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions-list" style={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 4px)", zIndex: 9999 }}>
          {suggestions.slice(0, 6).map((res, i) => (
            <div key={i} className="suggestion-item" onMouseDown={() => handleSelect(res)}>
              <span className="suggestion-pin">📍</span>
              <span>{res.display_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
