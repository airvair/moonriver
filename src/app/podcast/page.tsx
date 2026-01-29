"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EpisodeCard } from "@/components/podcast/episode-card";
import { EpisodeSkeleton } from "@/components/podcast/episode-skeleton";
import { EpisodePlayer } from "@/components/podcast/episode-player";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { RefreshCw, Mic2, Youtube, Music2, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import type { PodcastEpisode } from "@/lib/types/podcast";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { sortEpisodesByDate } from "@/lib/podcast-utils";

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = new URL("/api/podcast/youtube", window.location.origin);
      url.searchParams.set("maxResults", "12");

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Failed to fetch podcast episodes");
      }

      const data = await response.json();

      if ("error" in data) {
        throw new Error(data.error);
      }

      const sortedEpisodes = sortEpisodesByDate(data.episodes || [], "desc");
      setEpisodes(sortedEpisodes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const latestEpisode = episodes[0];

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'TanNimbus';
          src: url('/fonts/tan-nimbus.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Kalam:wght@300;400;700&display=swap');
      `}</style>
      <SiteHeader />
      <main className="min-h-screen unified-background relative overflow-x-hidden">
        {/* Hero Section */}
        <div className="relative z-10 bg-gradient-to-b from-background to-secondary/20">
          <div className="p-4 sm:p-6 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6 text-center"
              >
                {/* Header with Icons */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                  <Mic2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <AnimatedGradientText>
                    <span
                      className={cn(
                        "inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-sm font-medium uppercase tracking-wider"
                      )}
                    >
                      Conversations with Creatives
                    </span>
                  </AnimatedGradientText>
                  <Mic2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>

                {/* Title */}
                <div className="space-y-3 sm:space-y-4">
                  <h1
                    className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground"
                    style={{ fontFamily: "TanNimbus, serif" }}
                  >
                    Moon River Podcast
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-casual px-2">
                    Join us as we sit down with local creatives, artists, and makers to explore their stories, inspiration, and craft over a cup of coffee.
                  </p>
                </div>

                {/* Platform Links */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:bg-primary/10 transition-colors"
                    asChild
                  >
                    <a
                      href="https://www.youtube.com/@TheMoonRiverCafe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Youtube className="h-4 w-4" />
                      <span>YouTube</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:bg-primary/10 transition-colors"
                    asChild
                  >
                    <a
                      href="https://spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Music2 className="h-4 w-4" />
                      <span>Spotify</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:bg-primary/10 transition-colors"
                    asChild
                  >
                    <a
                      href="https://podcasts.apple.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Music2 className="h-4 w-4" />
                      <span>Apple Podcasts</span>
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 hover:bg-primary/10 transition-colors"
                    asChild
                  >
                    <a
                      href="https://www.instagram.com/themoonrivercafe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Instagram className="h-4 w-4" />
                      <span>Instagram</span>
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Latest Episode Section */}
        {!loading && !error && latestEpisode && (
          <section className="py-10 sm:py-16 relative">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <h2
                      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 handwritten-underline"
                      style={{ fontFamily: "TanNimbus, sans-serif" }}
                    >
                      Latest Episode
                    </h2>
                    <p className="text-muted-foreground font-casual">
                      Our most recent conversation
                    </p>
                  </div>

                  <div className="bg-card/95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 warm-shadow-enhanced vintage-paper">
                    <div className="space-y-4 sm:space-y-6">
                      {/* Video Player */}
                      {latestEpisode.platforms.youtube && (
                        <EpisodePlayer
                          youtubeUrl={latestEpisode.platforms.youtube}
                          title={latestEpisode.title}
                        />
                      )}

                      {/* Episode Details */}
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-handwritten text-primary">
                          {latestEpisode.title}
                        </h3>

                        {latestEpisode.guest && (
                          <p className="text-base sm:text-lg text-muted-foreground font-casual">
                            <span className="text-foreground font-semibold">Guest:</span>{" "}
                            {latestEpisode.guest}
                          </p>
                        )}

                        <p className="text-muted-foreground font-casual leading-relaxed">
                          {latestEpisode.description}
                        </p>

                        {/* Platform Links */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4">
                          {latestEpisode.platforms.spotify && (
                            <Button
                              variant="outline"
                              className="border-primary/30 hover:bg-primary/10"
                              asChild
                            >
                              <a
                                href={latestEpisode.platforms.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Music2 className="h-4 w-4 mr-2" />
                                Listen on Spotify
                              </a>
                            </Button>
                          )}
                          {latestEpisode.platforms.apple && (
                            <Button
                              variant="outline"
                              className="border-primary/30 hover:bg-primary/10"
                              asChild
                            >
                              <a
                                href={latestEpisode.platforms.apple}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Music2 className="h-4 w-4 mr-2" />
                                Listen on Apple Podcasts
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* All Episodes Section */}
        <section className="py-10 sm:py-16 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 handwritten-underline"
                  style={{ fontFamily: "TanNimbus, sans-serif" }}
                >
                  All Episodes
                </h2>
                <p className="text-muted-foreground font-casual">
                  Explore our full collection of conversations
                </p>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <EpisodeSkeleton key={i} />
                  ))}
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="py-16 text-center">
                  <div className="max-w-md mx-auto bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8 paper-texture">
                    <p className="text-destructive mb-4">{error}</p>
                    <Button
                      onClick={() => fetchEpisodes()}
                      variant="outline"
                      className="border-[#AE8625] text-[#AE8625] hover:bg-[#AE8625]/10 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              {/* No Results State */}
              {!loading && !error && episodes.length <= 1 && (
                <div className="py-16 text-center">
                  <div className="max-w-md mx-auto bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8 paper-texture">
                    <p className="text-muted-foreground text-lg">
                      No additional episodes available yet. Check back soon!
                    </p>
                  </div>
                </div>
              )}

              {/* Episodes Grid */}
              {!loading && !error && episodes.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr"
                >
                  {episodes.slice(1).map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
