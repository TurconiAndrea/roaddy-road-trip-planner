import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Trip Planner | Roaddy",
  description: "Plan your road trip itinerary on an interactive map.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
