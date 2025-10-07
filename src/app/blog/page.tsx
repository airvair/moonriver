"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton";
import { TagFilter } from "@/components/blog/tag-filter";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { RefreshCw, Search, BookOpen } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import type { BloggerPost, BloggerPostList, BloggerApiError } from "@/lib/types/blogger";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  extractAllTags,
  filterPostsByTag,
  searchPosts,
  sortPostsByDate,
} from "@/lib/blog-utils";

const POSTS_PER_PAGE = 9; // 3x3 grid

export default function BlogPage() {
  const [posts, setPosts] = useState<BloggerPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageTokens, setPageTokens] = useState<Map<number, string>>(new Map());
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchPosts = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      // Scroll to top of blog section when changing pages
      if (page !== currentPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      const url = new URL("/api/blog", window.location.origin);
      url.searchParams.set("maxResults", POSTS_PER_PAGE.toString());

      // Get the token for the requested page
      const token = pageTokens.get(page);
      if (token) {
        url.searchParams.set("pageToken", token);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }

      const data: BloggerPostList | BloggerApiError = await response.json();

      if ("error" in data) {
        throw new Error(data.error);
      }

      const sortedPosts = sortPostsByDate(data.items || [], "desc");
      setPosts(sortedPosts);
      setNextPageToken(data.nextPageToken);

      // Store the next page token for future navigation
      if (data.nextPageToken) {
        setPageTokens(prev => new Map(prev).set(page + 1, data.nextPageToken!));
      }

      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      setPageTokens(new Map());
      fetchPosts(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag, searchQuery]);

  // Extract all unique tags from posts
  const allTags = useMemo(() => extractAllTags(posts), [posts]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = filterPostsByTag(posts, selectedTag);

    if (searchQuery) {
      filtered = searchPosts(filtered, searchQuery);
    }

    return filtered;
  }, [posts, selectedTag, searchQuery]);

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
      <main className="min-h-screen bg-background relative">
        {/* Subtle Flickering Grid Background */}
        <div className="absolute top-20 left-0 z-0 w-full h-[400px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <FlickeringGrid
            className="absolute top-0 left-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#AE8625"
            maxOpacity={0.05}
            flickerChance={0.02}
          />
        </div>

        {/* Hero Section with Tags */}
        <div className="relative z-10">
          <div className="p-6 pt-28 md:pt-32 pb-8">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6"
              >
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-[#926F34]/10">
                    <BookOpen className="h-6 w-6 text-[#926F34]" />
                  </div>
                  <AnimatedGradientText>
                    <span className={cn(
                      "inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-sm font-medium uppercase tracking-wider"
                    )}>
                      Our Stories
                    </span>
                  </AnimatedGradientText>
                </div>

                {/* Title and Description */}
                <div className="space-y-3">
                  <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      Moon River Blog
                    </span>
                  </h1>
                  <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                    Discover stories, updates, and inspiration from your local coffee sanctuary
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-colors group-focus-within:text-[#926F34]" />
                    <input
                      type="search"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl focus:bg-background/80 focus:border-[#AE8625]/50 focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tag Filter Section */}
          {allTags.length > 0 && !loading && (
            <div className="border-y border-border/50 bg-background/40 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-6 py-4">
                <TagFilter
                  tags={allTags}
                  selectedTag={selectedTag}
                  onTagSelect={setSelectedTag}
                />
              </div>
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto w-full px-6 py-12">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          )}

          {error && (
            <div className="py-16 text-center">
              <div className="max-w-md mx-auto bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <p className="text-destructive mb-4">{error}</p>
                <Button
                  onClick={() => fetchPosts()}
                  variant="outline"
                  className="border-[#AE8625] text-[#AE8625] hover:bg-[#AE8625]/10 transition-colors"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {!loading && !error && filteredPosts.length === 0 && (
            <div className="py-16 text-center">
              <div className="max-w-md mx-auto bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8">
                <p className="text-muted-foreground text-lg">
                  {searchQuery
                    ? `No posts found matching "${searchQuery}"`
                    : selectedTag !== "all"
                    ? `No posts found with tag "${selectedTag}"`
                    : "No blog posts available yet. Check back soon!"}
                </p>
              </div>
            </div>
          )}

          {!loading && !error && filteredPosts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {/* Show pagination only when not filtering */}
              {!searchQuery && selectedTag === "all" && (nextPageToken || currentPage > 1) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-center pt-12"
                >
                  <Pagination>
                    <PaginationContent className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-2">
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => currentPage > 1 && fetchPosts(currentPage - 1)}
                          className={cn(
                            "transition-all duration-300",
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "hover:bg-[#AE8625]/10 hover:text-[#AE8625] cursor-pointer"
                          )}
                        />
                      </PaginationItem>

                      {/* Show current page */}
                      <PaginationItem>
                        <PaginationLink
                          isActive
                          className="bg-[#926F34]/20 text-[#926F34] border-[#926F34]/30"
                        >
                          {currentPage}
                        </PaginationLink>
                      </PaginationItem>

                      {/* Show next page if available */}
                      {nextPageToken && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => fetchPosts(currentPage + 1)}
                            className="hover:bg-[#AE8625]/10 hover:text-[#AE8625] cursor-pointer transition-all duration-300"
                          >
                            {currentPage + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Show ellipsis if more pages might exist */}
                      {nextPageToken && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() => nextPageToken && fetchPosts(currentPage + 1)}
                          className={cn(
                            "transition-all duration-300",
                            !nextPageToken
                              ? "pointer-events-none opacity-50"
                              : "hover:bg-[#AE8625]/10 hover:text-[#AE8625] cursor-pointer"
                          )}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
