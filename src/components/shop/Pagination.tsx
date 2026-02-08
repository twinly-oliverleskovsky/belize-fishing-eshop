"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
          currentPage === 1
            ? "text-sand-medium cursor-not-allowed"
            : "text-drift-gray hover:bg-tropical-teal hover:text-white"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-medium transition-all duration-300 cursor-pointer",
            currentPage === page
              ? "bg-tropical-teal text-white shadow-md"
              : "text-drift-gray hover:bg-sand-medium"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
          currentPage === totalPages
            ? "text-sand-medium cursor-not-allowed"
            : "text-drift-gray hover:bg-tropical-teal hover:text-white"
        )}
        aria-label="Next page"
      >
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}
