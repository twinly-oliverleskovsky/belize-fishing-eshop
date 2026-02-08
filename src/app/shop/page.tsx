import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductGrid from "@/components/shop/ProductGrid";

export const metadata: Metadata = {
  title: "Shop | Belize Fishing",
  description:
    "Browse our complete collection of premium fishing equipment curated for Caribbean waters. Rods, reels, lures, accessories and boats.",
};

export default function ShopPage() {
  return (
    <main className="pt-28 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-deep-ocean tracking-tight mb-4">
            Our Collection
          </h1>
          <p className="text-drift-gray font-body text-lg max-w-lg mx-auto">
            Everything you need for Caribbean waters
          </p>
        </AnimatedSection>

        <ProductGrid />
      </div>
    </main>
  );
}
