"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Coffee } from "lucide-react";

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
        <div className="flex gap-3 pb-2">
          {/* All Stories Button */}
          <button
            onClick={() => onTagSelect("all")}
            className={cn(
              "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2.5 shrink-0",
              "transform hover:scale-105 hover:-rotate-1",
              selectedTag === "all"
                ? "bg-gradient-to-r from-[#926F34]/20 to-[#AE8625]/15 text-[#926F34] shadow-md font-semibold border-2 border-[#926F34]/30"
                : "bg-[#fdfbf7] text-[#4a3f2f]/70 hover:bg-[#f5e6d3] hover:text-[#926F34] border border-[#e5d5c7] hover:border-[#926F34]/40"
            )}
          >
            <Coffee className="h-4 w-4" />
            All Stories
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-bold",
              selectedTag === "all"
                ? "bg-[#926F34] text-white"
                : "bg-[#e5d5c7] text-[#4a3f2f]/60"
            )}>
              {allCount}
            </span>

            {/* Paper clip decoration for selected */}
            {selectedTag === "all" && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-[#926F34]/40 rounded-full shadow-sm" />
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-[#e5d5c7] self-center" />

          {/* Tag buttons */}
          {tags.map((tag, index) => (
            <button
              key={tag.name}
              onClick={() => onTagSelect(tag.name)}
              className={cn(
                "relative px-4 py-2.5 rounded-full text-sm transition-all duration-300 flex items-center gap-2 shrink-0",
                "transform hover:scale-105",
                index % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1",
                selectedTag === tag.name
                  ? "bg-gradient-to-r from-[#926F34]/20 to-[#AE8625]/15 text-[#926F34] shadow-md font-semibold border-2 border-[#926F34]/30"
                  : "bg-[#fdfbf7] text-[#4a3f2f]/60 hover:bg-[#f5e6d3] hover:text-[#926F34] border border-[#e5d5c7] hover:border-[#926F34]/40"
              )}
            >
              {/* Coffee bean decoration */}
              <span className={cn(
                "w-2 h-2 rounded-full",
                selectedTag === tag.name
                  ? "bg-gradient-to-br from-[#926F34] to-[#6b4f26]"
                  : "bg-gradient-to-br from-[#e5d5c7] to-[#d4c4b6]"
              )} />

              <span className={selectedTag === tag.name ? "font-semibold" : ""}>
                {tag.name}
              </span>

              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full font-bold",
                selectedTag === tag.name
                  ? "bg-[#926F34] text-white"
                  : "bg-[#e5d5c7]/70 text-[#4a3f2f]/50"
              )}>
                {tag.count}
              </span>

              {/* Paper clip or tape decoration for selected */}
              {selectedTag === tag.name && (
                <div className={cn(
                  "absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-1 rounded-full shadow-sm",
                  index % 3 === 0 ? "bg-[#926F34]/40 rotate-3" :
                  index % 3 === 1 ? "bg-[#AE8625]/40 -rotate-2" :
                  "bg-[#D2AC47]/40 rotate-1"
                )} />
              )}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}