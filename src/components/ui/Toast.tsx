"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertCircle, Info } from "lucide-react";
import { useToastStore } from "@/store/toastStore";

const icons = {
  success: Check,
  error: AlertCircle,
  info: Info,
};

const colors = {
  success: "bg-tropical-teal",
  error: "bg-coral-accent",
  info: "bg-midnight-blue",
};

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`${colors[toast.type]} text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 font-body text-sm`}
            >
              <Icon size={18} strokeWidth={2} className="shrink-0" />
              <span className="flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Close"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
