"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter }
  from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTripStore, selectTrip } from "@/store/tripStore";
import { useLanguageStore } from "@/store/languageStore";
import type { StopCategory } from "@/types/trip";

const CATEGORIES: StopCategory[] = [
  "", "Sightseeing", "Food", "Nature",
  "Hotel", "Museum", "Beach", "Shopping", "Other",
];

const CATEGORY_LABELS_IT: Record<string, string> = {
  "": "Nessuna",
  "Sightseeing": "Monumenti / Attrazioni",
  "Food": "Cibo & Ristoranti",
  "Nature": "Natura",
  "Hotel": "Hotel / Alloggio",
  "Museum": "Museo",
  "Beach": "Spiaggia",
  "Shopping": "Shopping",
  "Other": "Altro"
};

interface Props {
  stopId:  string | null;
  onClose: () => void;
}

export default function EditStopModal({ stopId, onClose }: Props) {
  const trip     = useTripStore(selectTrip);
  const editStop = useTripStore(s => s.editStop);
  const lang     = useLanguageStore(s => s.lang);
  const isIt     = lang === "it";

  const stop = stopId ? trip.stops.find(s => s.id === stopId) : null;

  const [name,     setName]     = useState("");
  const [day,      setDay]      = useState(1);
  const [category, setCategory] = useState<StopCategory>("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    if (stop) {
      setName(stop.name);
      setDay(stop.day);
      setCategory(stop.category);
      setDuration(stop.duration);
    }
  }, [stop]);

  const handleSave = () => {
    if (!stopId) return;
    editStop(stopId, { name, day, category, duration });
    onClose();
  };

  return (
    <Dialog open={!!stopId} onOpenChange={open => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isIt ? "Modifica Tappa" : "Edit Stop"}</DialogTitle>
        </DialogHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "4px 0" }}>
          <div className="modal-field">
            <label className="form-label">{isIt ? "Nome" : "Name"}</label>
            <input className="form-input" value={name}
                   onChange={e => setName(e.target.value)} />
          </div>
          <div className="modal-field">
            <label className="form-label">{isIt ? "Giorno" : "Day"}</label>
            <input type="number" min={1} className="form-input" value={day}
                   onChange={e => setDay(parseInt(e.target.value) || 1)} />
          </div>
          <div className="modal-field">
            <label className="form-label">{isIt ? "Categoria" : "Category"}</label>
            <select className="form-input" value={category}
                    onChange={e => setCategory(e.target.value as StopCategory)}>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {isIt ? (CATEGORY_LABELS_IT[c] || c) : (c || "None")}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-field">
            <label className="form-label">{isIt ? "Durata" : "Duration"}</label>
            <input className="form-input" value={duration}
                   placeholder={isIt ? "es. 2h 30m" : "e.g. 2h 30m"}
                   onChange={e => setDuration(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{isIt ? "Annulla" : "Cancel"}</Button>
          <Button onClick={handleSave}
                  style={{ background: "var(--accent)", color: "white" }}>
            {isIt ? "Salva" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
