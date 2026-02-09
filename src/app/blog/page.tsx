import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Blog | Belize Fishing",
  description:
    "Tips, guides, and stories from the waters of Belize. Expert fishing advice, gear reviews, and destination guides.",
};

export default function BlogPage() {
  return (
    <main className="pt-28 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-tropical-teal text-sm font-body font-semibold uppercase tracking-[0.2em] block mb-3">
            Our Blog
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-deep-ocean tracking-tight mb-4">
            Fishing Stories & Tips
          </h1>
          <p className="text-drift-gray font-body text-lg max-w-lg mx-auto">
            Expert advice, gear guides, and tales from the Caribbean waters
          </p>
        </AnimatedSection>

        <BlogGrid />
      </div>
    </main>
  );
}
