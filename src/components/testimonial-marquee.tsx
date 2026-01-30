"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { TESTIMONIALS, fetchTestimonials } from "@/lib/testimonials";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Testimonial } from "@/lib/types/testimonials";

const ReviewCard = ({
  name,
  role,
  review,
  rating,
  initials,
}: {
  name: string;
  role: string;
  review: string;
  rating: number;
  initials: string;
}) => {
  // Truncate review for marquee display
  const truncatedReview = review.length > 200
    ? review.substring(0, 200) + "..."
    : review;

  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6 cozy-card warm-shadow-enhanced vintage-paper",
        // Light mode styles with warm coffee-themed colors
        "border-[#926F34]/20 bg-gradient-to-br from-[#F5EBD7]/40 to-[#E8D4B0]/30 hover:from-[#F5EBD7]/60 hover:to-[#E8D4B0]/40",
        // Dark mode styles
        "dark:border-[#926F34]/30 dark:bg-gradient-to-br dark:from-[#3A2F26]/30 dark:to-[#4A3929]/20 dark:hover:from-[#3A2F26]/40 dark:hover:to-[#4A3929]/30"
      )}
    >
      <div className="flex flex-row items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#926F34] to-[#D4AF37] text-white font-semibold shadow-md">
          {initials}
        </div>
        <div className="flex flex-col flex-1">
          <figcaption className="text-base font-semibold dark:text-white">
            {name}
          </figcaption>
          <p className="text-sm text-muted-foreground">{role}</p>
          <div className="flex gap-0.5 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 transition-all duration-300",
                  i < rating
                    ? "fill-[#D4AF37] text-[#D4AF37] drop-shadow-sm"
                    : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <blockquote className="mt-4 text-sm text-muted-foreground leading-relaxed">
        {truncatedReview}
      </blockquote>
      {/* Coffee bean decoration */}
      <div className="absolute bottom-2 right-2 opacity-10">
        <span className="text-4xl">☕</span>
      </div>
    </figure>
  );
};

const ReviewCardSkeleton = () => (
  <div className="relative h-full w-80 overflow-hidden rounded-xl border p-6 border-[#926F34]/20 bg-gradient-to-br from-[#F5EBD7]/40 to-[#E8D4B0]/30">
    <div className="flex flex-row items-start gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col flex-1 gap-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4" />
          ))}
        </div>
      </div>
    </div>
    <div className="mt-4 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

export function TestimonialMarquee() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        // Keep default TESTIMONIALS as fallback
      } finally {
        setIsLoading(false);
      }
    }

    loadTestimonials();
  }, []);

  // Duplicate testimonials for better marquee flow
  const reviews = [
    ...testimonials,
    ...testimonials, // Duplicate to ensure smooth scrolling
  ];

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  if (isLoading) {
    return (
      <div className="relative flex w-full max-w-full flex-col items-center justify-center overflow-hidden">
        <div className="flex gap-4 py-4">
          {[...Array(4)].map((_, i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
        <div className="flex gap-4 py-4 mt-6">
          {[...Array(4)].map((_, i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
        {/* Gradient edges for fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative flex w-full max-w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:80s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:80s] mt-6">
        {secondRow.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} {...review} />
        ))}
      </Marquee>
      {/* Gradient edges for fade effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}
