"use client";

import type { PodcastEpisode } from "@/lib/types/podcast";
import { formatPublishDate, formatDuration } from "@/lib/podcast-utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Play } from "lucide-react";
import { useState } from "react";
import { EpisodePlayer } from "./episode-player";
import { cn } from "@/lib/utils";

interface EpisodeCardProps {
  episode: PodcastEpisode;
  className?: string;
}

export function EpisodeCard({ episode, className }: EpisodeCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card
      className={cn(
        "bg-card/95 rounded-3xl p-6 warm-shadow-enhanced vintage-paper cozy-card transition-all duration-300 hover:scale-[1.02] overflow-hidden h-full",
        className
      )}
    >
      {!isPlaying ? (
        // Thumbnail view
        <div className="flex flex-col h-full">
          {/* Thumbnail with play overlay */}
          <div className="relative aspect-video rounded-2xl overflow-hidden warm-shadow group cursor-pointer flex-shrink-0"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={episode.thumbnailUrl}
              alt={episode.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-primary/90 rounded-full p-6 transform group-hover:scale-110 transition-transform duration-300">
                <Play className="h-8 w-8 text-primary-foreground fill-current" />
              </div>
            </div>
            {episode.duration && (
              <div className="absolute bottom-2 right-2 bg-black/75 text-white px-2 py-1 rounded text-xs font-medium">
                {formatDuration(episode.duration)}
              </div>
            )}
          </div>

          {/* Episode info */}
          <div className="flex flex-col flex-1 pt-4">
            <h3 className="text-xl font-handwritten text-primary line-clamp-2 leading-snug">
              {episode.title}
            </h3>

            <p className="text-sm text-muted-foreground font-casual line-clamp-3 mt-2 flex-1">
              {episode.description}
            </p>

            {/* Bottom section - always at bottom */}
            <div className="mt-auto pt-4 space-y-3">
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatPublishDate(episode.publishedAt)}</span>
                </div>
                {episode.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDuration(episode.duration)}</span>
                  </div>
                )}
              </div>

              {/* Watch button */}
              {episode.platforms.youtube && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/30 hover:bg-primary/10"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Watch
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Player view
        <div className="space-y-4">
          <EpisodePlayer
            youtubeUrl={episode.platforms.youtube!}
            title={episode.title}
          />
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-handwritten text-primary line-clamp-1">
              {episode.title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
