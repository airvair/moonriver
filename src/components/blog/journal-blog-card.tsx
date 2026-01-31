"use client";

import { Coffee, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import type { BloggerPost } from "@/lib/types/blogger";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface JournalBlogCardProps {
  post: BloggerPost;
  index?: number;
  variant?: "notebook" | "journal" | "recipe" | "polaroid";
}

// Author mapping for personal touches
const AUTHORS: Record<string, { name: string; avatar: string; role: string; signature: string }> = {
  "Moon River Blog": {
    name: "Moon River Café",
    avatar: "/moonriver_logo.png",
    role: "Stories from the café",
    signature: "MR",
  },
  default: {
    name: "Moon River Café",
    avatar: "/moonriver_logo.png",
    role: "Stories from the café",
    signature: "MR",
  },
};

export function JournalBlogCard({
  post,
  index = 0,
  variant = "journal"
}: JournalBlogCardProps) {
  // Helper to extract excerpt from HTML content
  const getExcerpt = (html: string, maxLength = 180): string => {
    const text = html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Helper to format date in handwritten style
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
    return `${readingTime} min read`;
  };

  const firstImage = getFirstImage(post.content);
  const readingTime = calculateReadingTime(post.content);
  const author = AUTHORS[post.author?.displayName] || AUTHORS.default;

  // Rotate cards slightly for natural look
  const rotation = index % 2 === 0 ? -1 + (index % 3) * 0.5 : 1 - (index % 3) * 0.5;

  // Paper texture styles based on variant
  const paperStyles = {
    notebook: "bg-gradient-to-br from-white to-[#faf8f3] before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-full before:bg-[repeating-linear-gradient(transparent,transparent_27px,#e5d5c7_27px,#e5d5c7_28px)] before:pointer-events-none before:z-0",
    journal: "bg-gradient-to-br from-[#fdfbf7] to-[#f5f1e8]",
    recipe: "bg-gradient-to-br from-[#fffdf5] to-[#faf6e9] before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(174,134,37,0.03)_10px,rgba(174,134,37,0.03)_20px)] before:pointer-events-none",
    polaroid: "bg-gradient-to-b from-white to-[#fafafa]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotation }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        rotate: 0,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative h-full"
    >
      <Link href={`/blog/${post.id}`} className="block group h-full">
        <div className={cn(
          "relative overflow-visible h-full flex flex-col",
          "transition-all duration-300",
        )}>
          {/* Paper Background with texture */}
          <div className={cn(
            "relative rounded-lg shadow-xl overflow-hidden h-full flex flex-col",
            paperStyles[variant],
            "border border-[#e5d5c7]/50",
            "group-hover:shadow-2xl",
          )}>
            {/* Coffee Stain Decoration */}
            <div className="absolute -top-6 -right-6 w-32 h-32 opacity-10 pointer-events-none">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="#926F34"
                  opacity="0.3"
                  filter="url(#coffee-stain)"
                />
                <defs>
                  <filter id="coffee-stain">
                    <feTurbulence baseFrequency="0.02" numOctaves="3" />
                    <feColorMatrix values="0 0 0 0 0.57 0 0 0 0 0.43 0 0 0 0 0.20 0 0 0 1 0"/>
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Tape/Paper Clip Decoration */}
            {variant === "polaroid" && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#f5e6d3] opacity-60 rotate-3" />
            )}

            {/* Date Stamp */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-[#926F34]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#926F34]/20">
                <span className="text-xs text-[#926F34] font-handwritten">
                  {formatDate(post.published)}
                </span>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="p-7 sm:p-8 flex flex-col flex-grow relative z-10">
              {/* Author Section */}
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#926F34] to-[#AE8625] p-0.5">
                    <div className="w-full h-full rounded-full bg-[#fdfbf7] flex items-center justify-center overflow-hidden">
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                  {/* Small coffee cup icon */}
                  <Coffee className="absolute -bottom-1 -right-1 w-4 h-4 text-[#926F34] bg-[#fdfbf7] rounded-full p-0.5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2c2416]">
                    {author.name}
                  </p>
                  <p className="text-xs text-[#5a4a3a]">
                    {author.role}
                  </p>
                </div>
              </div>

              {/* Image as Polaroid if present */}
              {firstImage && (
                <div className="mb-5 -mx-2">
                  <div className="bg-white p-1.5 shadow-md rotate-1 group-hover:rotate-0 transition-transform duration-300">
                    <img
                      src={firstImage}
                      alt={post.title}
                      className="w-full h-48 sm:h-52 object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Title with handwritten style */}
              <h3 className="font-bold text-xl sm:text-2xl mb-3 text-[#2c2416] group-hover:text-[#926F34] transition-colors leading-tight"
                style={{ fontFamily: 'TanNimbus, cursive' }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-[#3d3225] leading-relaxed mb-5 flex-grow font-serif">
                {getExcerpt(post.content)}
              </p>

              {/* Tags as coffee beans */}
              {post.labels && post.labels.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.labels.slice(0, 3).map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm px-3 py-1.5 rounded-full bg-[#f5e6d3] text-[#6b4f26] border border-[#926F34]/20 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#926F34]" />
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[#e5d5c7]/50">
                <div className="flex items-center gap-4 text-xs sm:text-sm text-[#5a4a3a]">
                  <div className="flex items-center gap-1.5">
                    <Coffee className="h-4 w-4" />
                    <span>{readingTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>Moon River</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#926F34]">
                  <Heart className="h-4 w-4 fill-current opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Handwritten note decoration */}
            <div className="absolute bottom-2 left-6 text-xs text-[#926F34]/40 italic font-handwritten">
              &ldquo;A story worth sharing...&rdquo;
            </div>
          </div>

          {/* Shadow effect for lifted paper look */}
          <div className="absolute inset-0 -z-10 bg-black/10 blur-xl translate-y-2" />
        </div>
      </Link>
    </motion.div>
  );
}