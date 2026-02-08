"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "@/components/ui/Badge";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  badge?: string | null;
}

export default function ImageGallery({ images, alt, badge }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-sand-medium">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[selected]}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <Badge text={badge} />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                selected === i
                  ? "ring-2 ring-tropical-teal ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${alt} ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
