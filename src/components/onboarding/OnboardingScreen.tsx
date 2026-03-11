"use client";

import { useState, useEffect } from "react";
import { useRouter }            from "next/navigation";
import { format, differenceInCalendarDays } from "date-fns";
import { useTripStore }         from "@/store/tripStore";
import CitySearch               from "./CitySearch";
import type { GeocodingResult, TripMeta, Stop } from "@/types/trip";

export default function OnboardingScreen() {
  const router     = useRouter();
  const createTrip = useTripStore(s => s.createTrip);

  const [tripName,  setTripName]  = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate,   setEndDate]   = useState("");
  const [city,      setCity]      = useState<GeocodingResult | null>(null);
  const [error,     setError]     = useState("");
  const [preview,   setPreview]   = useState<{ days: number; range: string } | null>(null);

  useEffect(() => {
    if (!startDate || !endDate) { setPreview(null); return; }
    const s = new Date(startDate), e = new Date(endDate);
    if (e < s) { setPreview(null); return; }
    const days = differenceInCalendarDays(e, s) + 1;
    setPreview({ days, range: `${format(s, "EEE, MMM d")} → ${format(e, "EEE, MMM d")}` });
  }, [startDate, endDate]);

  const handleCreate = () => {
    setError("");
    if (!city)                                       { setError("Please select a start city."); return; }
    if (!startDate)                                  { setError("Please select a start date."); return; }
    if (!endDate)                                    { setError("Please select an end date."); return; }
    if (new Date(endDate) < new Date(startDate))     { setError("End date must be after start date."); return; }

    const cityName = city.display_name.split(",")[0].trim();
    const days     = differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1;

    const meta: TripMeta = {
      title:     tripName.trim() || `${cityName} Road Trip`,
      startDate, endDate, days,
      startCity: { name: cityName, lat: parseFloat(city.lat), lng: parseFloat(city.lon) },
    };

    const firstStop: Stop = {
      id:       `s_start_${Date.now()}`,
      name:     `${cityName} (Start)`,
      lat:      parseFloat(city.lat),
      lng:      parseFloat(city.lon),
      day: 1, order: 1, category: "", duration: "",
    };

    createTrip(meta, firstStop);
    router.push("/planner");
  };

  return (
    <div className="onboarding-screen">
      <div className="onboarding-card">

        <div className="onboarding-logo">
          <div className="onboarding-logo-icon">🧭</div>
          <span className="onboarding-logo-text">Roaddy</span>
        </div>

        <div className="onboarding-header">
          <h1 className="onboarding-title">Plan Your Road Trip</h1>
          <p className="onboarding-subtitle">Set up your trip details to get started</p>
        </div>

        <div className="onboarding-field">
          <label className="form-label">Trip Name</label>
          <input
            className="form-input"
            value={tripName}
            onChange={e => setTripName(e.target.value)}
            placeholder="e.g. Italian Summer Roadtrip"
          />
        </div>

        <div className="onboarding-field">
          <label className="form-label">Start City</label>
          <CitySearch onSelect={setCity} />
          {city && (
            <p style={{ fontSize: 12, color: "var(--green)", fontWeight: 500, marginTop: 4 }}>
              ✓ {city.display_name.split(",")[0].trim()} selected
            </p>
          )}
        </div>

        <div className="onboarding-field onboarding-field--row">
          <div className="onboarding-subfield">
            <label className="form-label">Start Date</label>
            <input type="date" className="form-input" value={startDate}
                   onChange={e => setStartDate(e.target.value)} />
          </div>
          <div className="onboarding-subfield">
            <label className="form-label">End Date</label>
            <input type="date" className="form-input" value={endDate}
                   onChange={e => setEndDate(e.target.value)} />
          </div>
        </div>

        {preview && (
          <div className="duration-preview">
            <span className="duration-preview-icon">🗺️</span>
            <div className="duration-preview-text">
              <span className="duration-preview-days">{preview.days} day trip</span>
              <span className="duration-preview-range">{preview.range}</span>
            </div>
          </div>
        )}

        {error && <div className="ob-error">⚠️ {error}</div>}

        <button className="btn btn--primary btn--full btn--lg" onClick={handleCreate}>
          + Create Trip
        </button>

      </div>
    </div>
  );
}
