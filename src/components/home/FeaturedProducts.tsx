"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.badge);

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-tropical-teal text-sm font-body font-semibold uppercase tracking-[0.2em] block mb-3">
            Featured Gear
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-deep-ocean tracking-tight">
            Handpicked for Belize Waters
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.1}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
