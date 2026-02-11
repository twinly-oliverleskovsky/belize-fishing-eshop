import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductGrid from "@/components/shop/ProductGrid";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our complete collection of premium fishing equipment curated for Caribbean waters. Rods, reels, lures, accessories and boats.",
  openGraph: {
    title: "Shop | Belize Fishing",
    description:
      "Browse our complete collection of premium fishing equipment curated for Caribbean waters.",
    url: "/shop",
    type: "website",
  },
};

export default function ShopPage() {
  return (
    <main className="pt-28 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-deep-ocean dark:text-dark-text tracking-tight mb-4">
            Our Collection
          </h1>
          <p className="text-drift-gray dark:text-dark-text-secondary font-body text-lg max-w-lg mx-auto">
            Everything you need for Caribbean waters
          </p>
        </AnimatedSection>

        <ProductGrid />
      </div>
    </main>
  );
}
