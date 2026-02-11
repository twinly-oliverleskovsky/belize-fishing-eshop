import { Skeleton } from "@/components/ui/Skeleton";

export default function CartLoading() {
  return (
    <main className="pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Skeleton className="h-10 w-48 mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-6">
                <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
