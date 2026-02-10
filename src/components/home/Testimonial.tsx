"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { Quote } from "lucide-react";

export default function Testimonial() {
  return (
    <section className="py-24 lg:py-32 bg-sand-medium/50 dark:bg-dark-surface/50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <Quote
              className="text-sun-gold/40 mx-auto mb-8"
              size={48}
              strokeWidth={1}
            />
            <blockquote className="font-display text-2xl md:text-3xl text-deep-ocean dark:text-dark-text italic leading-relaxed mb-8">
              The best fishing gear in all of Belize. Wouldn&apos;t trust anyone
              else for my deep sea trips.
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-deep-ocean to-tropical-teal" />
              <div className="text-left">
                <p className="font-body font-semibold text-deep-ocean dark:text-dark-text">
                  Captain James
                </p>
                <p className="text-drift-gray dark:text-dark-text-secondary text-sm font-body">San Pedro</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
