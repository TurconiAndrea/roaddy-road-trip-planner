"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTripStore, selectHydrated, selectTrip } from "@/store/tripStore";
import LandingPage from "@/components/landing/LandingPage";

export default function HomePage() {
  const router   = useRouter();
  const hydrated = useTripStore(selectHydrated);
  const trip     = useTripStore(selectTrip);

  useEffect(() => {
    if (!hydrated) return;
    if (trip.meta.title && trip.meta.startDate) {
      router.replace("/planner");
    }
  }, [hydrated, trip, router]);

  return <LandingPage />;
}
