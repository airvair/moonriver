"use client";

import { cn } from "@/lib/utils";

type StickyNoteColor = "yellow" | "pink" | "blue" | "green";
type RotationType = "none" | "left-1" | "left-2" | "right-1" | "right-2";

interface StickyNoteProps {
  children: React.ReactNode;
  color?: StickyNoteColor;
  rotation?: RotationType;
  className?: string;
}

const colorClasses: Record<StickyNoteColor, string> = {
  yellow: "bg-yellow-100/90 dark:bg-yellow-900/30 border-yellow-200/50",
  pink: "bg-pink-100/90 dark:bg-pink-900/30 border-pink-200/50",
  blue: "bg-blue-100/90 dark:bg-blue-900/30 border-blue-200/50",
  green: "bg-green-100/90 dark:bg-green-900/30 border-green-200/50",
};

const rotationClasses: Record<RotationType, string> = {
  none: "",
  "left-1": "-rotate-1",
  "left-2": "-rotate-2",
  "right-1": "rotate-1",
  "right-2": "rotate-2",
};

export function StickyNote({
  children,
  color = "yellow",
  rotation = "none",
  className,
}: StickyNoteProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-sm warm-shadow-enhanced transition-all duration-300 hover:scale-105 hover:z-10",
        "paper-texture border",
        colorClasses[color],
        rotationClasses[rotation],
        className
      )}
    >
      {children}
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

export type { StickyNoteColor, RotationType };
