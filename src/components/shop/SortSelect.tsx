"use client";

import { ArrowUpDown } from "lucide-react";

export type SortOption = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rating";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "rating", label: "Highest Rated" },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative inline-flex items-center gap-2">
      <ArrowUpDown size={16} strokeWidth={1.5} className="text-drift-gray shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-shell-white border border-sand-medium rounded-full px-4 py-2.5 pr-8 font-body text-sm text-deep-ocean focus:outline-none focus:border-tropical-teal transition-colors cursor-pointer appearance-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
