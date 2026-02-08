"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { Anchor, Users, Award, Clock } from "lucide-react";

const stats = [
  { icon: Clock, value: "20+", label: "Years Experience" },
  { icon: Users, value: "5,000+", label: "Happy Anglers" },
  { icon: Award, value: "150+", label: "Premium Products" },
  { icon: Anchor, value: "50+", label: "Local Guides" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1440557653082-e9c440333768?w=1200&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-deep-ocean/20" />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.2}>
            <span className="text-tropical-teal text-sm font-body font-semibold uppercase tracking-[0.2em] block mb-3">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-deep-ocean tracking-tight mb-6">
              Your Trusted Partner on the Water
            </h2>
            <p className="text-drift-gray font-body leading-relaxed mb-4">
              Founded in 2003 on the shores of San Pedro, Belize Fishing has grown from a small
              waterfront shop into the Caribbean&apos;s most trusted source for premium fishing equipment.
              Every product we carry has been tested in the crystal-clear waters of the Belize Barrier Reef.
            </p>
            <p className="text-drift-gray font-body leading-relaxed mb-10">
              Our team of experienced anglers and local fishing guides hand-select every rod, reel,
              and lure we stock. We don&apos;t just sell gear — we share decades of knowledge to help
              you make the most of your time on the water.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-tropical-teal/10 flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="text-tropical-teal" size={20} strokeWidth={1.5} />
                  </div>
                  <p className="font-body text-xl font-bold text-deep-ocean">{stat.value}</p>
                  <p className="text-drift-gray text-xs font-body uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
