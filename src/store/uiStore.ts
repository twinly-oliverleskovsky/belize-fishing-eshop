"use client";

import { create } from "zustand";

export interface FlyingItem {
  id: string;
  startX: number;
  startY: number;
}

export type Theme = "light" | "dark";

interface UIStore {
  // Cart drawer
  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  // Fly-to-cart animation
  flyingItems: FlyingItem[];
  triggerFlyToCart: (startX: number, startY: number) => void;
  removeFlyingItem: (id: string) => void;

  // Theme
  theme: Theme;
  themeConfirmed: boolean;
  toggleTheme: () => void;
  confirmTheme: () => void;
  initTheme: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  // Cart drawer
  cartDrawerOpen: false,
  openCartDrawer: () => set({ cartDrawerOpen: true }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),

  // Fly-to-cart
  flyingItems: [],
  triggerFlyToCart: (startX, startY) => {
    const id = `fly-${Date.now()}`;
    set({ flyingItems: [...get().flyingItems, { id, startX, startY }] });
  },
  removeFlyingItem: (id) => {
    set({ flyingItems: get().flyingItems.filter((f) => f.id !== id) });
  },

  // Theme
  theme: "light",
  themeConfirmed: false,
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    set({ theme: next });
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  },
  confirmTheme: () => {
    set({ themeConfirmed: true });
    if (typeof window !== "undefined") {
      localStorage.setItem("belize-fishing-theme", get().theme);
      localStorage.setItem("belize-fishing-theme-confirmed", "true");
    }
  },
  initTheme: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("belize-fishing-theme") as Theme | null;
      const confirmed = localStorage.getItem("belize-fishing-theme-confirmed") === "true";
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = saved ?? (prefersDark ? "dark" : "light");
      set({ theme, themeConfirmed: confirmed });
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  },
}));
