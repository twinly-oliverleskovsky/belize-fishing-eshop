import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <main className="pt-28 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Skeleton className="h-4 w-32 mx-auto mb-3" />
          <Skeleton className="h-10 w-72 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[16/10] rounded-xl" />
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
