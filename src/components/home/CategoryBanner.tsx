"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CategoryBanner() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center">
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1545816250-e12bedcab7be?w=1600&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-ocean/90 via-deep-ocean/60 to-transparent" />

            {/* Content */}
            <div className="relative z-10 p-10 md:p-16 max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sun-gold text-sm font-body font-semibold uppercase tracking-[0.2em] block mb-4"
              >
                Featured Collection
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
              >
                Deep Sea Collection
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/70 font-body text-lg mb-8"
              >
                Tackle the big game with our professional-grade deep sea equipment
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/shop">
                  <Button>Shop Now &rarr;</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
