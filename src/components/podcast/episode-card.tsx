"use client";

import type { PodcastEpisode } from "@/lib/types/podcast";
import { formatPublishDate, formatDuration } from "@/lib/podcast-utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Play } from "lucide-react";
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
        "bg-card/95 rounded-3xl p-6 warm-shadow-enhanced vintage-paper cozy-card transition-all duration-300 hover:scale-[1.02] overflow-hidden",
        className
      )}
    >
      {!isPlaying ? (
        // Thumbnail view
        <div className="space-y-4">
          {/* Thumbnail with play overlay */}
          <div className="relative aspect-video rounded-2xl overflow-hidden warm-shadow group cursor-pointer"
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
          <div className="space-y-3">
            <h3 className="text-xl font-handwritten text-primary line-clamp-2 leading-snug">
              {episode.title}
            </h3>

            {episode.guest && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="font-medium">{episode.guest}</span>
              </div>
            )}

            <p className="text-sm text-muted-foreground font-casual line-clamp-2">
              {episode.description}
            </p>

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

            {/* Topics */}
            {episode.topics && episode.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {episode.topics.slice(0, 3).map((topic) => (
                  <Badge
                    key={topic}
                    variant="secondary"
                    className="text-xs font-casual bg-primary/10 text-primary border-primary/20"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            )}

            {/* Platform links */}
            <div className="flex gap-2 pt-2">
              {episode.platforms.youtube && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-primary/30 hover:bg-primary/10"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Watch
                </Button>
              )}
              {episode.platforms.spotify && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                  asChild
                >
                  <a
                    href={episode.platforms.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Spotify
                  </a>
                </Button>
              )}
              {episode.platforms.apple && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/30 hover:bg-primary/10"
                  asChild
                >
                  <a
                    href={episode.platforms.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apple
                  </a>
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
