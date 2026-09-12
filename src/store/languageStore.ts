"use client";

import { create } from "zustand";

export type Language = "en" | "it";

interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
  initLang: () => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  lang: "en",
  setLang: (lang: Language) => {
    set({ lang });
    if (typeof window !== "undefined") {
      localStorage.setItem("roaddy_lang", lang);
    }
  },
  initLang: () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("roaddy_lang") as Language | null;
    if (stored === "en" || stored === "it") {
      set({ lang: stored });
      return;
    }
    const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
    if (browserLang.toLowerCase().startsWith("it")) {
      set({ lang: "it" });
    } else {
      set({ lang: "en" });
    }
  },
}));
