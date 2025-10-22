"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  guests: string[];
  selectedGuest: string;
  onGuestSelect: (guest: string) => void;
  topics: string[];
  selectedTopic: string;
  onTopicSelect: (topic: string) => void;
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  guests,
  selectedGuest,
  onGuestSelect,
  topics,
  selectedTopic,
  onTopicSelect,
}: SearchFilterProps) {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Search episodes by title, guest, or topic..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-11 pr-4 py-6 text-base bg-background/50 border-border rounded-xl focus:bg-background focus:border-primary/50 transition-all duration-300 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="space-y-4">
        {/* Guest Filter */}
        {guests.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Filter by Guest
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedGuest === "all" ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all duration-200 font-casual text-sm px-4 py-2",
                  selectedGuest === "all"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => onGuestSelect("all")}
              >
                All Guests
              </Badge>
              {guests.map((guest) => (
                <Badge
                  key={guest}
                  variant={selectedGuest === guest ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all duration-200 font-casual text-sm px-4 py-2",
                    selectedGuest === guest
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-border hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => onGuestSelect(guest)}
                >
                  {guest}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Topic Filter */}
        {topics.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Filter by Topic
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedTopic === "all" ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all duration-200 font-casual text-sm px-4 py-2",
                  selectedTopic === "all"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-border hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => onTopicSelect("all")}
              >
                All Topics
              </Badge>
              {topics.map((topic) => (
                <Badge
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all duration-200 font-casual text-sm px-4 py-2",
                    selectedTopic === topic
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border-border hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => onTopicSelect(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
