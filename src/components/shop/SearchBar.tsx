"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-md mx-auto">
      <Search
        size={18}
        strokeWidth={1.5}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-drift-gray"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-11 pr-10 py-3 rounded-full bg-shell-white border border-sand-medium font-body text-sm text-deep-ocean placeholder:text-drift-gray/60 focus:outline-none focus:border-tropical-teal transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-drift-gray hover:text-deep-ocean transition-colors cursor-pointer"
          aria-label="Clear search"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
