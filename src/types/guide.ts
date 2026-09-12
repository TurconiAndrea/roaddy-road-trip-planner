export interface LocalizedString {
  en: string;
  it: string;
}

export interface LocalizedArray {
  en: string[];
  it: string[];
}

export interface ItineraryDay {
  dayNumber: number;
  title: LocalizedString;
  subtitle: LocalizedString;
  location: string;
  narrative: LocalizedString;
  highlights: LocalizedArray;
  icon?: string;
}

export interface GuideHighlight {
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  image?: string;
  icon?: string;
  tag?: LocalizedString;
}

export interface GuideIncludedFeature {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface TravelGuide {
  id: string;
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  tagline: LocalizedString;
  featured: boolean;
  isUpcoming?: boolean;
  country: LocalizedString;
  countryFlag: string;
  region: LocalizedString;
  durationDays: number;
  distanceKm: number;
  statesCount: number;
  statesList: string[];
  heroImage: string;
  overviewText: LocalizedArray;
  highlightsList: LocalizedArray;
  stopsPreview: string[];
  keyHighlights: GuideHighlight[];
  itinerary: ItineraryDay[];
  whyThisTrip: {
    progression: string;
    description: LocalizedString;
  };
  fullGuideFeatures: GuideIncludedFeature[];
  priceEur?: number;
  originalPriceEur?: number;
}
