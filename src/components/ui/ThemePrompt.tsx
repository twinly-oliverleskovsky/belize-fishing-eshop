"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import Button from "@/components/ui/Button";

export default function ThemePrompt() {
  const theme = useUIStore((s) => s.theme);
  const themeConfirmed = useUIStore((s) => s.themeConfirmed);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const confirmTheme = useUIStore((s) => s.confirmTheme);
  const initTheme = useUIStore((s) => s.initTheme);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  // Show prompt after short delay if theme not yet confirmed
  useEffect(() => {
    if (!themeConfirmed) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [themeConfirmed]);

  const handleConfirm = () => {
    confirmTheme();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && !themeConfirmed && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] bg-black/30 backdrop-blur-sm"
          />

          {/* Prompt card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[96] w-[calc(100%-2rem)] max-w-md"
          >
            <div className="bg-shell-white dark:bg-dark-surface rounded-2xl shadow-2xl border border-sand-medium/60 dark:border-dark-border/60 overflow-hidden">
              {/* Header with icon */}
              <div className="px-6 pt-6 pb-4 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sun-gold/20 to-tropical-teal/20 dark:from-sun-gold/10 dark:to-tropical-teal/10 flex items-center justify-center mx-auto mb-4">
                  <Monitor size={24} className="text-tropical-teal" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl font-bold text-deep-ocean dark:text-dark-text mb-1">
                  Choose Your Look
                </h3>
                <p className="text-drift-gray dark:text-dark-text-secondary font-body text-sm">
                  Which mode do you prefer?
                </p>
              </div>

              {/* Theme toggle area */}
              <div className="px-6 pb-4">
                <div className="flex items-center justify-center gap-3">
                  {/* Light option */}
                  <button
                    onClick={() => theme === "dark" && toggleTheme()}
                    className={`flex-1 flex flex-col items-center gap-2 py-4 px-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      theme === "light"
                        ? "bg-sun-gold/15 border-2 border-sun-gold shadow-sm"
                        : "bg-sand-medium/40 dark:bg-dark-card border-2 border-transparent hover:border-sand-medium dark:hover:border-dark-border"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        theme === "light"
                          ? "bg-sun-gold text-white"
                          : "bg-sand-medium dark:bg-dark-border text-drift-gray dark:text-dark-text-secondary"
                      }`}
                    >
                      <Sun size={20} strokeWidth={1.5} />
                    </div>
                    <span
                      className={`font-body text-sm font-semibold ${
                        theme === "light"
                          ? "text-deep-ocean dark:text-dark-text"
                          : "text-drift-gray dark:text-dark-text-secondary"
                      }`}
                    >
                      Light
                    </span>
                  </button>

                  {/* Dark option */}
                  <button
                    onClick={() => theme === "light" && toggleTheme()}
                    className={`flex-1 flex flex-col items-center gap-2 py-4 px-3 rounded-xl cursor-pointer transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-tropical-teal/15 border-2 border-tropical-teal shadow-sm"
                        : "bg-sand-medium/40 dark:bg-dark-card border-2 border-transparent hover:border-sand-medium dark:hover:border-dark-border"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        theme === "dark"
                          ? "bg-tropical-teal text-white"
                          : "bg-sand-medium dark:bg-dark-border text-drift-gray dark:text-dark-text-secondary"
                      }`}
                    >
                      <Moon size={20} strokeWidth={1.5} />
                    </div>
                    <span
                      className={`font-body text-sm font-semibold ${
                        theme === "dark"
                          ? "text-deep-ocean dark:text-dark-text"
                          : "text-drift-gray dark:text-dark-text-secondary"
                      }`}
                    >
                      Dark
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm button */}
              <div className="px-6 pb-6">
                <Button fullWidth onClick={handleConfirm}>
                  OK, Looks Good!
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
