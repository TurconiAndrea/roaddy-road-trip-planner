declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Track custom user events in GA4 safely without sending personal data.
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, string | number | boolean> = {}
) {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", eventName, eventParams);
  }
}

/**
 * Predefined non-PII events for Roaddy
 */
export const AnalyticsEvents = {
  startPlanningClick: () => trackEvent("start_planning_click"),
  createTrip: (daysCount: number) => trackEvent("create_trip", { days_count: daysCount }),
  addStop: (category?: string) => trackEvent("add_stop", { category: category || "general" }),
  saveTrip: () => trackEvent("save_trip"),
};
