"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItemRow({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex items-center gap-4 py-6 border-b border-sand-medium dark:border-dark-border">
      {/* Image */}
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-sand-medium dark:bg-dark-border shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-body font-semibold text-deep-ocean dark:text-dark-text text-sm md:text-base truncate">
          {item.name}
        </h3>
        <p className="text-sun-gold font-body font-bold text-sm mt-1">
          {formatPrice(item.price)}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center border border-sand-medium dark:border-dark-border rounded-lg">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center text-drift-gray hover:text-deep-ocean transition-colors cursor-pointer"
          aria-label="Decrease quantity"
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <span className="w-8 text-center font-body text-sm font-semibold text-deep-ocean dark:text-dark-text">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center text-drift-gray hover:text-deep-ocean transition-colors cursor-pointer"
          aria-label="Increase quantity"
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Line Total */}
      <p className="font-body font-bold text-deep-ocean dark:text-dark-text text-sm md:text-base w-20 text-right hidden sm:block">
        {formatPrice(item.price * item.quantity)}
      </p>

      {/* Remove */}
      <button
        onClick={() => removeItem(item.id)}
        className="text-drift-gray hover:text-coral-accent transition-colors cursor-pointer"
        aria-label="Remove item"
      >
        <X size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}
