import Link from "next/link";
import { Anchor } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-sand-medium dark:bg-dark-card flex items-center justify-center mx-auto mb-8">
          <Anchor
            size={36}
            strokeWidth={1.5}
            className="text-tropical-teal"
          />
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-deep-ocean dark:text-dark-text tracking-tight mb-4">
          404
        </h1>
        <h2 className="font-display text-xl md:text-2xl font-semibold text-deep-ocean dark:text-dark-text mb-4">
          Page Not Found
        </h2>
        <p className="text-drift-gray dark:text-dark-text-secondary font-body mb-8 leading-relaxed">
          Looks like this page drifted out to sea. The page you&apos;re looking
          for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-tropical-teal text-white font-semibold hover:bg-tropical-teal/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-tropical-teal text-tropical-teal font-semibold hover:bg-tropical-teal hover:text-white transition-colors"
          >
            Browse Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
