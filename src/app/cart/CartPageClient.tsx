"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartItemRow from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function CartPageClient() {
  const items = useCartStore((s) => s.items);

  return (
    <main className="pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-deep-ocean tracking-tight mb-12">
            Your Cart
          </h1>
        </AnimatedSection>

        {items.length === 0 ? (
          <AnimatedSection>
            <div className="text-center py-20">
              <ShoppingBag
                className="text-sand-medium mx-auto mb-6"
                size={64}
                strokeWidth={1}
              />
              <h2 className="font-display text-2xl text-deep-ocean mb-4">
                Your cart is empty
              </h2>
              <p className="text-drift-gray font-body mb-8">
                Looks like you haven&apos;t added any gear yet.
              </p>
              <Link href="/shop">
                <Button>Continue Shopping &rarr;</Button>
              </Link>
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </AnimatedSection>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <AnimatedSection delay={0.2}>
                <CartSummary />
              </AnimatedSection>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
