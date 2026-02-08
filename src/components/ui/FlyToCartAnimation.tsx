"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useUIStore, FlyingItem } from "@/store/uiStore";

function FlyingDot({ item, onComplete }: { item: FlyingItem; onComplete: () => void }) {
  const [target, setTarget] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Find the cart icon in the DOM
    const cartIcon = document.querySelector("[data-cart-icon]");
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect();
      setTarget({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
  }, []);

  if (target.x === 0 && target.y === 0) return null;

  const deltaX = target.x - item.startX;
  const deltaY = target.y - item.startY;

  return (
    <motion.div
      initial={{
        x: item.startX - 16,
        y: item.startY - 16,
        scale: 1,
        opacity: 1,
      }}
      animate={{
        x: target.x - 16,
        y: target.y - 16,
        scale: [1, 1.3, 0.4],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        x: {
          duration: 0.7,
          ease: "easeIn",
        },
        y: {
          duration: 0.7,
          // Create an arc by using custom bezier
          ease: [0.5, -0.5, 0.7, 1],
        },
      }}
      onAnimationComplete={onComplete}
      className="fixed z-[100] pointer-events-none"
      style={{ top: 0, left: 0 }}
    >
      <div className="w-8 h-8 rounded-full bg-tropical-teal shadow-lg flex items-center justify-center">
        <ShoppingBag size={14} className="text-white" strokeWidth={2} />
      </div>
    </motion.div>
  );
}

export default function FlyToCartAnimation() {
  const flyingItems = useUIStore((s) => s.flyingItems);
  const removeFlyingItem = useUIStore((s) => s.removeFlyingItem);

  return (
    <AnimatePresence>
      {flyingItems.map((item) => (
        <FlyingDot
          key={item.id}
          item={item}
          onComplete={() => removeFlyingItem(item.id)}
        />
      ))}
    </AnimatePresence>
  );
}
