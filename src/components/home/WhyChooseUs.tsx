"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { Compass, Package, Waves } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Expert Selection",
    description: "Curated gear tested in Belize waters by local fishing guides",
  },
  {
    icon: Package,
    title: "Personal Service",
    description: "Direct contact and tailored recommendations for your trip",
  },
  {
    icon: Waves,
    title: "Local Knowledge",
    description: "20+ years of Caribbean fishing expertise at your disposal",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 lg:py-32 bg-sand-medium/50 dark:bg-dark-surface/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-tropical-teal text-sm font-body font-semibold uppercase tracking-[0.2em] block mb-3">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-deep-ocean dark:text-dark-text tracking-tight">
            The Belize Fishing Difference
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.15}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-deep-ocean via-midnight-blue to-tropical-teal flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-white" size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-body text-lg font-semibold text-deep-ocean dark:text-dark-text uppercase tracking-wider mb-3">
                  {feature.title}
                </h3>
                <p className="text-drift-gray dark:text-dark-text-secondary font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
