"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Phone } from "lucide-react";

export default function CartSummary() {
  const totalPrice = useCartStore((s) => s.totalPrice());

  return (
    <div className="bg-sand-medium dark:bg-dark-card rounded-2xl p-6 lg:p-8 sticky top-28">
      <h3 className="font-body text-lg font-semibold text-deep-ocean dark:text-dark-text uppercase tracking-wider mb-6">
        Order Summary
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between font-body text-drift-gray dark:text-dark-text-secondary">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between font-body text-drift-gray dark:text-dark-text-secondary">
          <span>Shipping</span>
          <span className="text-tropical-teal font-medium">Free consultation</span>
        </div>
      </div>

      <div className="border-t border-sun-gold/30 pt-4 mb-6">
        <div className="flex justify-between">
          <span className="font-body font-semibold text-deep-ocean dark:text-dark-text text-lg">Total</span>
          <span className="font-body font-bold text-sun-gold text-xl">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      <Link href="/checkout">
        <Button fullWidth size="lg">
          Proceed to Order &rarr;
        </Button>
      </Link>

      <div className="mt-4 flex items-center justify-center gap-2 text-drift-gray dark:text-dark-text-secondary text-sm font-body">
        <Phone size={14} strokeWidth={1.5} />
        <span>Questions? Call +501-226-1234</span>
      </div>
    </div>
  );
}
