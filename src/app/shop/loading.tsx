import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ShopLoading() {
  return (
    <main className="pt-28 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <Skeleton className="h-10 w-72 mx-auto mb-6" />
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
