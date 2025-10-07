"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: { name: string; count: number }[];
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

export function TagFilter({ tags, selectedTag, onTagSelect }: TagFilterProps) {
  const allCount = tags.reduce((sum, tag) => sum + tag.count, 0);

  return (
    <div className="w-full">
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {/* All button */}
          <button
            onClick={() => onTagSelect("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 shrink-0",
              selectedTag === "all"
                ? "bg-[#926F34]/20 text-[#926F34] border border-[#926F34]/30"
                : "bg-background/60 backdrop-blur-sm border border-border/50 text-muted-foreground hover:bg-background/80 hover:text-foreground hover:border-[#AE8625]/30"
            )}
          >
            All
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              selectedTag === "all"
                ? "bg-[#926F34]/20 text-[#926F34]"
                : "bg-background/40 text-muted-foreground"
            )}>
              {allCount}
            </span>
          </button>

          {/* Tag buttons */}
          {tags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => onTagSelect(tag.name)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 shrink-0",
                selectedTag === tag.name
                  ? "bg-[#926F34]/20 text-[#926F34] border border-[#926F34]/30"
                  : "bg-background/60 backdrop-blur-sm border border-border/50 text-muted-foreground hover:bg-background/80 hover:text-foreground hover:border-[#AE8625]/30"
              )}
            >
              {tag.name}
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                selectedTag === tag.name
                  ? "bg-[#926F34]/20 text-[#926F34]"
                  : "bg-background/40 text-muted-foreground"
              )}>
                {tag.count}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}