"use client";

import { useEffect }  from "react";
import { useRouter }  from "next/navigation";
import dynamic        from "next/dynamic";
import { useTripStore, selectHydrated, selectTrip } from "@/store/tripStore";
import Topbar  from "@/components/planner/Topbar";
import Sidebar from "@/components/planner/Sidebar";

const MapView = dynamic(() => import("@/components/map/MapView"), {
  ssr: false,
  loading: () => (
    <div style={{
      flex: 1, display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f0f4f8",
      fontSize: 14, color: "#6B7280",
    }}>
      Loading map...
    </div>
  ),
});

export default function PlannerPage() {
  const router   = useRouter();
  const hydrated = useTripStore(selectHydrated);
  const trip     = useTripStore(selectTrip);

  useEffect(() => {
    if (!hydrated) return;
    if (!trip.meta.title || !trip.meta.startDate) {
      router.replace("/");
    }
  }, [hydrated, trip, router]);

  if (!hydrated) return null;

  return (
    <div style={{
      display:        "flex",
      flexDirection:  "column",
      height:         "100vh",
      overflow:       "hidden",
      position:       "fixed",
      top:            0,
      left:           0,
      right:          0,
      bottom:         0,
    }}>
      <Topbar />
      <div style={{
        display:    "flex",
        flex:       1,
        overflow:   "hidden",
        paddingTop: "60px",
        height:     "calc(100vh - 60px)",
      }}>
        <Sidebar />
        <main style={{
          flex:     1,
          position: "relative",
          height:   "100%",
          overflow: "hidden",
        }}>
          <MapView />
        </main>
      </div>
    </div>
  );
}
