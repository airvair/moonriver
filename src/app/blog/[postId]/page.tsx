"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TableOfContents, type TOCItem } from "@/components/blog/table-of-contents";
import { AuthorCard } from "@/components/blog/author-card";
import { ReadMoreSection } from "@/components/blog/read-more-section";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, RefreshCw, Share2, Check } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import type { BloggerPost, BloggerApiError } from "@/lib/types/blogger";
import {
  calculateReadingTime,
  extractHeadings,
  formatDate,
  addHeadingIds,
  getFirstImage,
} from "@/lib/blog-utils";
import { getAuthorFromBlogger } from "@/lib/authors";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;

  const [post, setPost] = useState<BloggerPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/blog/${postId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch blog post");
      }

      const data: BloggerPost | BloggerApiError = await response.json();

      if ("error" in data) {
        throw new Error(data.error);
      }

      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // Extract table of contents from post content
  const tocItems = useMemo<TOCItem[]>(() => {
    if (!post) return [];
    return extractHeadings(post.content);
  }, [post]);

  // Process content to add heading IDs
  const processedContent = useMemo(() => {
    if (!post) return "";
    return addHeadingIds(post.content);
  }, [post]);

  // Get author information
  const author = useMemo(() => {
    if (!post) return null;
    return getAuthorFromBlogger(post.author);
  }, [post]);

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!post) return "";
    return calculateReadingTime(post.content);
  }, [post]);

  // Get thumbnail image
  const thumbnail = useMemo(() => {
    if (!post) return null;
    return getFirstImage(post.content);
  }, [post]);

  const handleShare = async () => {
    if (!post) return;

    const shareData = {
      title: post.title,
      text: `Check out this article: ${post.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or error - fall back to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <style jsx global>{`
        /* Blog content styling - optimized for dark brown background */
        .blog-content {
          line-height: 1.8;
          color: #f5efe6;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 2rem 0;
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          font-family: 'TanNimbus', sans-serif;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: bold;
          scroll-margin-top: 5rem;
          color: #faf6f0;
        }

        .blog-content h1 { font-size: 1.75rem; }
        .blog-content h2 { font-size: 1.5rem; }
        .blog-content h3 { font-size: 1.25rem; }
        .blog-content h4 { font-size: 1.125rem; }

        @media (min-width: 640px) {
          .blog-content h1 { font-size: 2.5rem; }
          .blog-content h2 { font-size: 2rem; }
          .blog-content h3 { font-size: 1.75rem; }
          .blog-content h4 { font-size: 1.5rem; }
        }

        .blog-content p {
          margin-bottom: 1.5rem;
          color: #e8e0d5;
        }

        .blog-content a {
          color: #F7EF8A;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .blog-content a:hover {
          color: #fffacd;
        }

        .blog-content ul, .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
          color: #e8e0d5;
        }

        .blog-content li {
          margin-bottom: 0.5rem;
        }

        .blog-content blockquote {
          border-left: 4px solid #D2AC47;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #d4c9b8;
          background: rgba(210, 172, 71, 0.08);
          padding: 1rem 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        .blog-content code {
          background: rgba(255, 255, 255, 0.1);
          color: #F7EF8A;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }

        .blog-content pre {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid rgba(210, 172, 71, 0.2);
        }

        .blog-content pre code {
          background: transparent;
          padding: 0;
          color: #e8e0d5;
        }

        .blog-content strong {
          color: #faf6f0;
          font-weight: 600;
        }

        .blog-content em {
          color: #d4c9b8;
        }

        .blog-content hr {
          border-color: rgba(210, 172, 71, 0.3);
          margin: 2rem 0;
        }
      `}</style>

      <SiteHeader />
      <main id="main-content" className="min-h-screen bg-background relative">
        {/* Flickering Grid Background */}
        <div className="absolute top-20 left-0 z-0 w-full h-[250px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
          <FlickeringGrid
            className="absolute top-0 left-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#AE8625"
            maxOpacity={0.1}
            flickerChance={0.05}
          />
        </div>

        {loading && (
          <div className="relative z-10 pt-20">
            <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-4 md:px-0">
              <div className="w-full p-6 lg:p-10">
                <div className="space-y-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
              <aside className="hidden lg:block w-[350px] p-6 lg:p-10">
                <Skeleton className="h-32 w-full" />
              </aside>
            </div>
          </div>
        )}

        {error && (
          <div className="relative z-10 min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => fetchPost()}
                  variant="outline"
                  className="border-[#AE8625] text-[#AE8625] hover:bg-[#AE8625]/10"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={() => router.push("/blog")}
                  variant="outline"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && post && (
          <>
            {/* Header Section */}
            <BlurFade delay={0} duration={0.6}>
              <div className="space-y-3 sm:space-y-4 border-b border-border relative z-10 pt-20">
                <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
                  <BlurFade delay={0.1}>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 gap-y-3 sm:gap-y-5 text-xs sm:text-sm text-muted-foreground">
                      <Button variant="outline" asChild className="h-8 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm">
                        <Link href="/blog">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to all articles
                        </Link>
                      </Button>
                      {post.labels && post.labels.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.labels.map((label) => (
                            <Badge
                              key={label}
                              variant="secondary"
                              className="bg-gradient-to-r from-[#D2AC47]/30 to-[#F7EF8A]/20 text-[#F7EF8A] border-[#D2AC47]/40 font-medium"
                            >
                              {label}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-[#d4c9b8]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-[#D2AC47]" />
                          <time>{formatDate(post.published)}</time>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-[#D2AC47]" />
                          <span>{readingTime}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className={`ml-auto border-[#D2AC47]/40 hover:bg-[#D2AC47]/20 transition-all ${
                          copied
                            ? "text-green-400 border-green-400/40"
                            : "text-[#F7EF8A] hover:text-[#fffacd]"
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </>
                        )}
                      </Button>
                    </div>
                  </BlurFade>

                  <BlurFade delay={0.2}>
                    <h1
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-balance text-[#faf6f0]"
                      style={{ fontFamily: 'TanNimbus, sans-serif' }}
                    >
                      {post.title}
                    </h1>
                  </BlurFade>
                </div>
              </div>
            </BlurFade>

            {/* Content Section */}
            <div className="flex divide-x divide-border relative max-w-7xl mx-auto px-0 sm:px-4 md:px-0 z-10">
              <div className="absolute max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-full sm:w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />

              <main className="w-full p-0 overflow-hidden">
                {thumbnail && (
                  <BlurFade delay={0.3}>
                    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    </div>
                  </BlurFade>
                )}

                <BlurFade delay={0.4}>
                  <div className="p-4 sm:p-6 lg:p-10">
                    <article
                      className="blog-content prose prose-sm sm:prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: processedContent }}
                    />
                  </div>
                </BlurFade>

                {/* Related Posts */}
                <BlurFade delay={0.1} inView>
                  <div className="mt-10">
                    <ReadMoreSection
                      currentPostId={post.id}
                      currentTags={post.labels}
                    />
                  </div>
                </BlurFade>
              </main>

              {/* Sidebar */}
              <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/30">
                <BlurFade delay={0.5}>
                  <div className="sticky top-32 space-y-8">
                    {author && <AuthorCard author={author} />}

                    {tocItems.length > 0 && (
                      <>
                        <Separator />
                        <TableOfContents items={tocItems} />
                      </>
                    )}
                  </div>
                </BlurFade>
              </aside>
            </div>

            {/* Mobile Table of Contents */}
            {tocItems.length > 0 && (
              <TableOfContents items={tocItems} className="lg:hidden" />
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}