"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type RotationType = "none" | "left-1" | "left-2" | "right-1" | "right-2";

interface PolaroidCardProps {
  image: string;
  title: string;
  caption: string;
  rotation?: RotationType;
  aspectRatio?: "square" | "portrait";
  floating?: boolean;
  className?: string;
}

const rotationClasses: Record<RotationType, string> = {
  none: "",
  "left-1": "-rotate-1",
  "left-2": "-rotate-2",
  "right-1": "rotate-1",
  "right-2": "rotate-2",
};

export function PolaroidCard({
  image,
  title,
  caption,
  rotation = "none",
  aspectRatio = "square",
  floating = false,
  className,
}: PolaroidCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-card p-4 rounded-lg warm-shadow-enhanced transition-all duration-300 hover:scale-105 hover:z-10",
        "paper-texture vintage-paper",
        rotationClasses[rotation],
        floating && "floating-polaroid",
        className
      )}
    >
      <div
        className={cn(
          "relative bg-muted rounded-sm overflow-hidden mb-3",
          aspectRatio === "square" ? "aspect-square" : "aspect-[3/4]"
        )}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="font-handwritten text-xl text-primary mb-1">{title}</h3>
      <p className="font-casual text-sm text-muted-foreground">{caption}</p>
    </div>
  );
}

// Helper to convert numeric rotation to type
export function getRotationType(rotation: number): RotationType {
  if (rotation === 0) return "none";
  if (rotation === -1) return "left-1";
  if (rotation === -2) return "left-2";
  if (rotation === 1) return "right-1";
  if (rotation === 2) return "right-2";
  // Default fallback based on sign
  return rotation < 0 ? "left-1" : "right-1";
}
