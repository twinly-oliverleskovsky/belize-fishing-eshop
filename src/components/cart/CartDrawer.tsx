"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const isOpen = useUIStore((s) => s.cartDrawerOpen);
  const close = useUIStore((s) => s.closeCartDrawer);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-deep-ocean/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 z-[80] h-full w-full max-w-md bg-shell-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand-medium">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} strokeWidth={1.5} className="text-deep-ocean" />
                <h2 className="font-display text-xl font-bold text-deep-ocean">
                  Cart
                </h2>
                {totalItems > 0 && (
                  <span className="bg-tropical-teal text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={close}
                className="w-9 h-9 rounded-full hover:bg-sand-medium flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} className="text-drift-gray" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag
                    className="text-sand-medium mx-auto mb-4"
                    size={48}
                    strokeWidth={1}
                  />
                  <p className="font-body text-drift-gray text-sm">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <div className="space-y-0">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 py-4 border-b border-sand-medium/60 last:border-b-0"
                    >
                      {/* Image */}
                      <Link
                        href={`/shop/${item.slug}`}
                        onClick={close}
                        className="relative w-16 h-16 rounded-lg overflow-hidden bg-sand-medium shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={close}
                          className="font-body text-sm font-semibold text-deep-ocean truncate block hover:text-tropical-teal transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sun-gold font-body font-bold text-sm mt-0.5">
                          {formatPrice(item.price)}
                        </p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-sand-medium rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-drift-gray hover:text-deep-ocean transition-colors cursor-pointer"
                              aria-label="Decrease"
                            >
                              <Minus size={12} strokeWidth={2} />
                            </button>
                            <span className="w-7 text-center font-body text-xs font-semibold text-deep-ocean">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-drift-gray hover:text-deep-ocean transition-colors cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus size={12} strokeWidth={2} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-drift-gray hover:text-coral-accent transition-colors cursor-pointer ml-auto"
                            aria-label="Remove"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>

                      {/* Line total */}
                      <p className="font-body text-sm font-bold text-deep-ocean shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-sand-medium px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body font-semibold text-deep-ocean">
                    Subtotal
                  </span>
                  <span className="font-body font-bold text-sun-gold text-lg">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <Link href="/cart" onClick={close}>
                  <Button fullWidth variant="outline" className="mb-3">
                    View Full Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={close}>
                  <Button fullWidth>
                    Checkout &rarr;
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
