"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BloggerPost } from "@/lib/types/blogger";
import { Skeleton } from "@/components/ui/skeleton";

interface ReadMoreSectionProps {
  currentPostId: string;
  currentTags?: string[];
}

export function ReadMoreSection({
  currentPostId,
  currentTags = [],
}: ReadMoreSectionProps) {
  const [relatedPosts, setRelatedPosts] = useState<BloggerPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) return;

        const data = await response.json();
        if (!data.items) return;

        // Filter out current post and sort by tag relevance
        const otherPosts = data.items
          .filter((post: BloggerPost) => post.id !== currentPostId)
          .map((post: BloggerPost) => {
            const tagOverlap = currentTags.filter((tag) =>
              post.labels?.includes(tag)
            ).length;

            return {
              ...post,
              relevanceScore: tagOverlap,
            };
          })
          .sort((a: any, b: any) => {
            if (a.relevanceScore !== b.relevanceScore) {
              return b.relevanceScore - a.relevanceScore;
            }
            // Sort by date if relevance is the same
            return new Date(b.published).getTime() - new Date(a.published).getTime();
          })
          .slice(0, 3);

        setRelatedPosts(otherPosts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPostId, currentTags]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getExcerpt = (html: string, maxLength = 150): string => {
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const getFirstImage = (html: string): string | null => {
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  if (loading) {
    return (
      <section className="border-t border-border p-0">
        <div className="p-6 lg:p-10">
          <h2 className="text-2xl font-medium mb-8">Read more</h2>
          <div className="flex flex-col gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4">
                <div className="col-span-1 lg:col-span-4">
                  <Skeleton className="w-full h-32 rounded-lg" />
                </div>
                <div className="col-span-1 lg:col-span-8 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border p-0">
      <div className="p-6 lg:p-10">
        <h2 className="text-2xl font-medium mb-8">Read more</h2>

        <div className="flex flex-col gap-8">
          {relatedPosts.map((post) => {
            const thumbnail = getFirstImage(post.content);
            const formattedDate = formatDate(post.published);

            return (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group grid grid-cols-1 lg:grid-cols-12 items-center gap-4 cursor-pointer"
              >
                {thumbnail && (
                  <div className="flex-shrink-0 col-span-1 lg:col-span-4">
                    <div className="relative w-full h-32">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                  </div>
                )}
                <div className={cn(
                  "space-y-2 flex-1 col-span-1",
                  thumbnail ? "lg:col-span-8" : "lg:col-span-12"
                )}>
                  <h3 className="text-lg group-hover:underline underline-offset-4 font-semibold text-card-foreground group-hover:text-[#AE8625] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {getExcerpt(post.content)}
                  </p>
                  <time className="block text-xs font-medium text-muted-foreground">
                    {formattedDate}
                  </time>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";