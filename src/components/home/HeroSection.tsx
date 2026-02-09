"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Background image with zoom animation */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 20, ease: "linear" }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1666461468421-d20a489594e1?w=1920&q=80')",
          }}
        />
      </motion.div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean via-deep-ocean/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-24 lg:pb-32 w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="inline-block text-sun-gold text-sm font-body font-semibold uppercase tracking-[0.2em] mb-4">
            Belize&apos;s Finest
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
        >
          Premium Fishing
          <br />
          Equipment
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-white/70 text-lg md:text-xl font-body max-w-lg mb-8 leading-relaxed"
        >
          Gear up for the ultimate Caribbean fishing experience
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link href="/shop">
            <Button size="lg" className="text-base">
              Explore Collection &rarr;
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
