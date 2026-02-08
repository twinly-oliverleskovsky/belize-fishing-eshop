"use client";

import { create } from "zustand";

export interface FlyingItem {
  id: string;
  startX: number;
  startY: number;
}

interface UIStore {
  // Cart drawer
  cartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;

  // Fly-to-cart animation
  flyingItems: FlyingItem[];
  triggerFlyToCart: (startX: number, startY: number) => void;
  removeFlyingItem: (id: string) => void;
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
}));
