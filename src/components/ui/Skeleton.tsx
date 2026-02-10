import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-sand-medium dark:bg-dark-border rounded-lg",
        className
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-shell-white dark:bg-dark-card border border-sand-medium dark:border-dark-border rounded-xl overflow-hidden">
      <Skeleton className="aspect-[4/5] rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <main className="pt-28 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Skeleton className="h-4 w-48 mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <div className="pt-4">
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
