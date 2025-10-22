import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function EpisodeSkeleton() {
  return (
    <Card className="bg-card/95 rounded-3xl p-6 warm-shadow-enhanced vintage-paper">
      <div className="space-y-4">
        {/* Thumbnail skeleton */}
        <Skeleton className="w-full aspect-video rounded-2xl" />

        {/* Title skeleton */}
        <Skeleton className="h-6 w-4/5" />

        {/* Guest skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Metadata skeleton */}
        <div className="flex gap-4">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Topics skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </Card>
  );
}
