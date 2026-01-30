"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOURS, fetchStoreHours, type DayHours } from "@/lib/hours";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Get current day in store's time zone
function getStoreDay(timezone: string = "America/New_York"): number {
  const now = new Date();
  const storeTimeStr = now.toLocaleString("en-US", {
    timeZone: timezone,
  });
  return new Date(storeTimeStr).getDay();
}

export function StoreHours() {
  const [hours, setHours] = useState<DayHours[]>(HOURS);
  const [timezone, setTimezone] = useState("America/New_York");
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch hours from Sanity
    async function loadHours() {
      try {
        const data = await fetchStoreHours();
        setHours(data.hours);
        setTimezone(data.timezone);
      } catch (error) {
        console.error("Failed to fetch hours:", error);
        // Keep default HOURS as fallback
      } finally {
        setIsLoading(false);
        setCurrentDay(getStoreDay(timezone));
      }
    }

    loadHours();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Update current day every minute
    const interval = setInterval(() => {
      setCurrentDay(getStoreDay(timezone));
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [timezone, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-full p-4 sm:p-5 lg:p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-[#926F34]" />
          <h3 className="font-semibold text-sm sm:text-base">Hours</h3>
        </div>
        <div className="space-y-1.5">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-0.5 sm:py-1 px-1.5 sm:px-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4 sm:p-5 lg:p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-[#926F34]" />
        <h3 className="font-semibold text-sm sm:text-base">Hours</h3>
      </div>

      <div className="space-y-0.5 sm:space-y-1 lg:space-y-1.5">
        {hours.map((schedule, index) => (
          <div
            key={schedule.day}
            className={cn(
              "flex justify-between items-center text-xs sm:text-sm py-0.5 sm:py-1 px-1.5 sm:px-2 rounded-md transition-colors",
              index === currentDay && "bg-[#926F34]/10 font-medium"
            )}
          >
            <span className={cn(
              index === currentDay && "text-[#926F34]"
            )}>
              {schedule.day}
            </span>
            <span className={cn(
              "text-muted-foreground",
              index === currentDay && "text-[#926F34]",
              schedule.hours === "Closed" && "text-muted-foreground/60"
            )}>
              {schedule.hours}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[10px] sm:text-xs text-muted-foreground/70 mt-2 sm:mt-3 italic">
        Hours may vary during holidays and special events
      </p>
    </div>
  );
}
