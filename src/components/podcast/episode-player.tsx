"use client";

import { getYouTubeVideoId } from "@/lib/podcast-utils";
import { cn } from "@/lib/utils";

interface EpisodePlayerProps {
  youtubeUrl: string;
  title: string;
  className?: string;
}

export function EpisodePlayer({
  youtubeUrl,
  title,
  className,
}: EpisodePlayerProps) {
  const videoId = getYouTubeVideoId(youtubeUrl);

  if (!videoId) {
    return (
      <div className={cn("bg-muted rounded-lg p-8 text-center", className)}>
        <p className="text-muted-foreground">Unable to load video</p>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden warm-shadow-enhanced">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
