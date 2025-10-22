"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JournalBlogCard } from "@/components/blog/journal-blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton";
import { TagFilter } from "@/components/blog/tag-filter";
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
import { RefreshCw, Search, BookOpen, Coffee, Heart, Newspaper } from "lucide-react";
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

        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Kalam:wght@300;400;700&display=swap');

        .font-handwriting {
          font-family: 'Caveat', cursive;
        }

        .font-journal {
          font-family: 'Kalam', cursive;
        }
      `}</style>
      <SiteHeader />
      <main className="min-h-screen bg-background relative">

        {/* Hero Section with Tags */}
        <div className="relative z-10 bg-gradient-to-b from-background to-secondary/20">
          <div className="p-6 pt-28 md:pt-32 pb-8">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6"
              >
                {/* Header with Coffee Icons */}
                <div className="flex items-center gap-3 mb-2">
                  <Coffee className="h-5 w-5 text-primary" />
                  <AnimatedGradientText>
                    <span className={cn(
                      "inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-sm font-medium uppercase tracking-wider"
                    )}>
                      Stories from the Café
                    </span>
                  </AnimatedGradientText>
                  <Newspaper className="h-5 w-5 text-primary" />
                </div>

                {/* Title and Description with Journal Feel */}
                <div className="space-y-4">
                  <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground"
                    style={{ fontFamily: 'TanNimbus, serif' }}
                  >
                    The Moon River Journal
                  </h1>
                  <p className="text-muted-foreground text-base md:text-lg max-w-2xl font-serif">
                    Pour yourself a cup and dive into our collection of stories, recipes, and musings.
                  </p>
                </div>

                {/* Search Bar - Clean and simple */}
                <div className="relative max-w-md">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                      type="search"
                      placeholder="Search our stories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="relative w-full pl-11 pr-4 py-3 bg-background/50 border border-border rounded-lg focus:bg-background focus:border-primary/50 focus:outline-none transition-all duration-300 placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Tag Filter Section - Clean and simple */}
          {allTags.length > 0 && !loading && (
            <div className="border-y border-border/50 bg-accent/10">
              <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center gap-4 mb-3">
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Browse by Category</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
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
              <div className="max-w-md mx-auto bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8 paper-texture">
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
              <div className="max-w-md mx-auto bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-8 paper-texture">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                {filteredPosts.map((post, index) => (
                  <JournalBlogCard
                    key={post.id}
                    post={post}
                    index={index}
                    variant={index % 4 === 0 ? "notebook" : index % 4 === 1 ? "journal" : index % 4 === 2 ? "recipe" : "polaroid"}
                  />
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
                    <PaginationContent className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-2 paper-texture">
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
