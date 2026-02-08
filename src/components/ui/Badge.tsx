import { cn } from "@/lib/utils";

interface BadgeProps {
  text: string;
  variant?: "coral" | "teal" | "gold";
  className?: string;
}

export default function Badge({ text, variant = "coral", className = "" }: BadgeProps) {
  const variants = {
    coral: "bg-coral-accent text-white",
    teal: "bg-tropical-teal text-white",
    gold: "bg-sun-gold text-deep-ocean",
  };

  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full",
        variants[variant],
        className
      )}
    >
      {text}
    </span>
  );
}
