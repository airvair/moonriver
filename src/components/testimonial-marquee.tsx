"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { TESTIMONIALS } from "@/lib/testimonials";
import { Star } from "lucide-react";

// Duplicate testimonials for better marquee flow
const reviews = [
  ...TESTIMONIALS,
  ...TESTIMONIALS, // Duplicate to ensure smooth scrolling
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

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
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6",
        // Light mode styles with coffee-themed colors
        "border-red-200/30 bg-gradient-to-br from-red-50/50 to-orange-50/30 hover:from-red-100/50 hover:to-orange-100/40",
        // Dark mode styles
        "dark:border-red-950/30 dark:bg-gradient-to-br dark:from-red-950/20 dark:to-orange-950/20 dark:hover:from-red-950/30 dark:hover:to-orange-950/30"
      )}
    >
      <div className="flex flex-row items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#B91C1C] to-[#f87171] text-white font-semibold">
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
                  "h-4 w-4",
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
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
    </figure>
  );
};

export function TestimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:40s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:40s] mt-6">
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