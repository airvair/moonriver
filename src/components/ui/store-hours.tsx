"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOURS, getOpenStatus } from "@/lib/hours";
import { useEffect, useState } from "react";

export function StoreHours() {
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  const [status, setStatus] = useState(getOpenStatus());

  useEffect(() => {
    // Update status every minute
    const interval = setInterval(() => {
      setCurrentDay(new Date().getDay());
      setStatus(getOpenStatus());
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-6 w-6 text-[#926F34]" />
        <h3 className="font-semibold text-base">Hours</h3>
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded ml-auto whitespace-nowrap",
          status.isOpen
            ? "bg-green-500/10 text-green-600 dark:text-green-400"
            : "bg-muted text-muted-foreground"
        )}>
          {status.message}
        </span>
      </div>

      <div className="space-y-1.5">
        {HOURS.map((schedule, index) => (
          <div
            key={schedule.day}
            className={cn(
              "flex justify-between items-center text-sm py-1 px-2 rounded-md transition-colors",
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

      <p className="text-xs text-muted-foreground/70 mt-3 italic">
        Hours may vary during holidays and special events
      </p>
    </div>
  );
}