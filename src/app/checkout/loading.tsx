import { Skeleton } from "@/components/ui/Skeleton";

export default function CheckoutLoading() {
  return (
    <main className="pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Skeleton className="h-10 w-48 mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3 space-y-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-5 w-96 mb-10" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
            <Skeleton className="h-14 w-full rounded-full" />
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="h-80 rounded-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
