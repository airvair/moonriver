"use client";

import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BloggerPost } from "@/lib/types/blogger";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface BlogCardProps {
  post: BloggerPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  // Helper to extract excerpt from HTML content
  const getExcerpt = (html: string, maxLength = 150): string => {
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Helper to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Helper to extract first image from post content
  const getFirstImage = (html: string): string | null => {
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
    return imgMatch ? imgMatch[1] : null;
  };

  // Calculate reading time
  const calculateReadingTime = (html: string): string => {
    const text = html.replace(/<[^>]*>/g, "");
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min`;
  };

  const firstImage = getFirstImage(post.content);
  const readingTime = calculateReadingTime(post.content);
  const displayImage = firstImage || "/moonriver_logo.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/blog/${post.id}`} className="block group h-full">
        <div className="relative bg-background/80 backdrop-blur-md border border-border/50 shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-[#AE8625]/30 h-full flex flex-col">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#926F34]/10 to-[#AE8625]/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayImage}
              alt={post.title}
              className={cn(
                "w-full h-full transition-transform duration-500 group-hover:scale-110",
                firstImage ? "object-cover" : "object-contain p-8"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>

          {/* Content Section */}
          <div className="p-6 flex flex-col flex-grow">
            {/* Tags */}
            <div className="min-h-[32px] mb-3">
              {post.labels && post.labels.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.labels.slice(0, 2).map((label) => (
                    <span
                      key={label}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#926F34]/10 text-[#926F34] font-medium"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-[#AE8625] transition-colors">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
              {getExcerpt(post.content)}
            </p>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-[#926F34]" />
                  <span>{formatDate(post.published)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#926F34]" />
                  <span>{readingTime}</span>
                </div>
              </div>

              {/* Read More Arrow */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-4 w-4 text-[#AE8625]" />
              </div>
            </div>
          </div>

          {/* Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#AE8625]/0 via-[#AE8625]/0 to-[#AE8625]/0 group-hover:from-[#AE8625]/5 group-hover:via-transparent group-hover:to-[#D2AC47]/5 transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}