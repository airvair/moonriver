import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <div className="relative bg-background/80 backdrop-blur-md border border-border/50 shadow-lg rounded-2xl overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48 bg-muted/50" />

      <div className="p-6">
        {/* Tags skeleton */}
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-6 w-16 rounded-full bg-muted/50" />
          <Skeleton className="h-6 w-20 rounded-full bg-muted/50" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-5 w-full bg-muted/50" />
          <Skeleton className="h-5 w-3/4 bg-muted/50" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3.5 w-full bg-muted/50" />
          <Skeleton className="h-3.5 w-2/3 bg-muted/50" />
        </div>

        {/* Metadata skeleton */}
        <div className="flex gap-3">
          <Skeleton className="h-3 w-20 bg-muted/50" />
          <Skeleton className="h-3 w-16 bg-muted/50" />
        </div>
      </div>
    </div>
  );
}