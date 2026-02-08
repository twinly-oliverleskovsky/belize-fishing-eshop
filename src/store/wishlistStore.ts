"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WishlistItem } from "@/types";

interface WishlistStore {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) => {
        const exists = get().items.find((i) => i.id === item.id);
        if (exists) {
          set({ items: get().items.filter((i) => i.id !== item.id) });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      isInWishlist: (id) => get().items.some((i) => i.id === id),
    }),
    { name: "belize-fishing-wishlist" }
  )
);
