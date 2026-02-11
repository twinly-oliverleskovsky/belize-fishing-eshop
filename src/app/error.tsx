"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-coral-accent/10 dark:bg-coral-accent/20 flex items-center justify-center mx-auto mb-8">
          <AlertTriangle
            size={36}
            strokeWidth={1.5}
            className="text-coral-accent"
          />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-deep-ocean dark:text-dark-text tracking-tight mb-4">
          Something Went Wrong
        </h1>
        <p className="text-drift-gray dark:text-dark-text-secondary font-body mb-8 leading-relaxed">
          We encountered an unexpected error. Please try again, or head back to
          the homepage if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-tropical-teal text-white font-semibold hover:bg-tropical-teal/90 transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-tropical-teal text-tropical-teal font-semibold hover:bg-tropical-teal hover:text-white transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </main>
  );
}
