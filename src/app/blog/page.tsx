"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import type { BloggerPost, BloggerPostList, BloggerApiError } from "@/lib/types/blogger";
import Link from "next/link";

export default function BlogPage() {
  const [posts, setPosts] = useState<BloggerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();

  const fetchPosts = async (pageToken?: string) => {
    try {
      setLoading(true);
      setError(null);

      const url = new URL("/api/blog", window.location.origin);
      if (pageToken) {
        url.searchParams.set("pageToken", pageToken);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }

      const data: BloggerPostList | BloggerApiError = await response.json();

      if ("error" in data) {
        throw new Error(data.error);
      }

      setPosts(data.items || []);
      setNextPageToken(data.nextPageToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Helper to extract excerpt from HTML content
  const getExcerpt = (html: string, maxLength = 200): string => {
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Helper to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Helper to extract first image from post content
  const getFirstImage = (html: string): string | null => {
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

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
      `}</style>
      <SiteHeader />
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4 py-32 relative z-10">
            <AnimatedGradientText className="mb-6">
              <span className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-lg font-medium`
              )}>
                Stories, Updates & Inspiration
              </span>
            </AnimatedGradientText>

            <h1
              className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl mx-auto"
              style={{
                fontFamily: 'TanNimbus, sans-serif',
                WebkitTextStroke: '3px #926F34',
                paintOrder: 'stroke fill'
              }}
            >
              Moon River Blog
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stay up to date with café news, community events, and behind-the-scenes stories
            </p>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-64 h-64 object-contain"
                  >
                    <source src="/dog_hare_animation.webm" type="video/webm" />
                  </video>
                  <span className="text-lg text-muted-foreground">Loading posts...</span>
                </div>
              )}

              {error && (
                <div className="text-center py-12">
                  <Card className="max-w-md mx-auto border-destructive/50 bg-destructive/5">
                    <CardContent className="pt-6">
                      <p className="text-destructive mb-4">{error}</p>
                      <Button
                        onClick={() => fetchPosts()}
                        variant="outline"
                        className="border-[#AE8625] text-[#AE8625] hover:bg-[#AE8625]/10"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {!loading && !error && posts.length === 0 && (
                <div className="text-center py-12">
                  <Card className="max-w-md mx-auto">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground text-lg">No blog posts available yet. Check back soon!</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {!loading && !error && posts.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => {
                      const firstImage = getFirstImage(post.content);

                      return (
                        <Card
                          key={post.id}
                          className="hover:shadow-lg transition-shadow bg-card/50 backdrop-blur flex flex-col"
                        >
                          {firstImage && (
                            <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={firstImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <CardHeader>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.labels?.slice(0, 3).map((label) => (
                                <Badge
                                  key={label}
                                  variant="secondary"
                                  className="bg-gradient-to-r from-[#AE8625]/20 to-[#D2AC47]/20 text-[#926F34]"
                                >
                                  {label}
                                </Badge>
                              ))}
                            </div>

                            <CardTitle className="line-clamp-2 text-xl">
                              {post.title}
                            </CardTitle>

                            <div className="flex flex-col gap-2 text-sm text-muted-foreground pt-2">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(post.published)}</span>
                              </div>

                              {post.author && (
                                <div className="flex items-center gap-2">
                                  <User className="h-4 w-4" />
                                  <span>{post.author.displayName}</span>
                                </div>
                              )}
                            </div>
                          </CardHeader>

                          <CardContent className="flex-grow">
                            <CardDescription className="line-clamp-3 text-base">
                              {getExcerpt(post.content)}
                            </CardDescription>
                          </CardContent>

                          <div className="p-6 pt-0">
                            <Button
                              asChild
                              className="w-full bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#926F34] hover:to-[#AE8625] text-white"
                            >
                              <Link href={`/blog/${post.id}`}>
                                Read More
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  {nextPageToken && (
                    <div className="flex justify-center mt-12">
                      <Button
                        onClick={() => fetchPosts(nextPageToken)}
                        size="lg"
                        variant="outline"
                        className="border-[#AE8625] text-[#AE8625] hover:bg-[#AE8625]/10"
                      >
                        Load More Posts
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />
      </main>
    </>
  );
}
