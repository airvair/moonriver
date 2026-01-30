import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <div className="relative bg-gradient-to-br from-[#fdfbf7] to-[#f5f1e8] dark:from-card dark:to-card/90 border border-[#e5d5c7]/50 dark:border-border/50 shadow-xl rounded-lg overflow-hidden animate-pulse">
      {/* Date stamp skeleton */}
      <div className="absolute top-4 right-4 z-10">
        <Skeleton className="h-6 w-28 rounded-full bg-[#926F34]/10" />
      </div>

      <div className="p-7 sm:p-8">
        {/* Author section skeleton */}
        <div className="flex items-center gap-3 mb-5">
          <Skeleton className="w-12 h-12 rounded-full bg-[#926F34]/10" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 bg-[#926F34]/15" />
            <Skeleton className="h-3 w-24 bg-[#926F34]/10" />
          </div>
        </div>

        {/* Image skeleton (polaroid style) */}
        <div className="mb-5 -mx-2">
          <div className="bg-white dark:bg-card p-1.5 shadow-md">
            <Skeleton className="w-full h-48 sm:h-52 bg-[#926F34]/10" />
          </div>
        </div>

        {/* Title skeleton */}
        <div className="space-y-2 mb-3">
          <Skeleton className="h-7 w-full bg-[#926F34]/15" />
          <Skeleton className="h-7 w-3/4 bg-[#926F34]/15" />
        </div>

        {/* Excerpt skeleton */}
        <div className="space-y-2.5 mb-5">
          <Skeleton className="h-5 w-full bg-[#926F34]/10" />
          <Skeleton className="h-5 w-full bg-[#926F34]/10" />
          <Skeleton className="h-5 w-5/6 bg-[#926F34]/10" />
          <Skeleton className="h-5 w-2/3 bg-[#926F34]/10" />
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2 mb-5">
          <Skeleton className="h-8 w-20 rounded-full bg-[#f5e6d3] dark:bg-[#926F34]/10" />
          <Skeleton className="h-8 w-24 rounded-full bg-[#f5e6d3] dark:bg-[#926F34]/10" />
        </div>

        {/* Footer skeleton */}
        <div className="pt-4 border-t border-[#e5d5c7]/50 dark:border-border/30">
          <div className="flex gap-4">
            <Skeleton className="h-5 w-24 bg-[#926F34]/10" />
            <Skeleton className="h-5 w-28 bg-[#926F34]/10" />
          </div>
        </div>
      </div>
    </div>
  );
}