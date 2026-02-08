"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-tropical-teal text-white hover:bg-tropical-teal/90 rounded-full",
    secondary:
      "bg-deep-ocean text-white hover:bg-midnight-blue rounded-full",
    outline:
      "bg-transparent border-2 border-tropical-teal text-tropical-teal hover:bg-tropical-teal hover:text-white rounded-full",
    ghost:
      "bg-transparent text-tropical-teal hover:text-tropical-teal/80",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
