"use client";

import { cn } from "@/lib/utils";
import { categories } from "@/data/products";

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={cn(
            "px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 cursor-pointer",
            active === cat
              ? "bg-tropical-teal text-white shadow-md"
              : "bg-transparent border border-sand-medium text-drift-gray hover:border-tropical-teal hover:text-tropical-teal"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
