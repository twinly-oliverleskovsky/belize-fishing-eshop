"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Button from "@/components/ui/Button";

const COOKIE_KEY = "belize-fishing-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Small delay for better UX — don't flash immediately
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-deep-ocean rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 border border-white/10">
            {/* Icon + Text */}
            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 rounded-full bg-sun-gold/20 flex items-center justify-center shrink-0">
                <Cookie size={20} className="text-sun-gold" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-body font-semibold text-white text-sm mb-1">
                  We value your privacy
                </h3>
                <p className="text-white/60 text-sm font-body leading-relaxed">
                  We use cookies to enhance your browsing experience, remember your cart,
                  and understand how you use our site. You can manage your preferences anytime.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="text-white/60 hover:text-white text-sm font-body font-medium transition-colors cursor-pointer px-4 py-2"
              >
                Decline
              </button>
              <Button size="sm" onClick={handleAccept}>
                Accept All
              </Button>
            </div>

            {/* Close */}
            <button
              onClick={handleDecline}
              className="absolute top-3 right-3 sm:hidden text-white/40 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
