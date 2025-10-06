"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const HOURS = [
  { day: "Sunday", hours: "9 AM–3 PM" },
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday", hours: "9 AM–3 PM, 5 PM–8 PM" },
  { day: "Wednesday", hours: "9 AM–3 PM, 5 PM–8 PM" },
  { day: "Thursday", hours: "9 AM–3 PM, 5 PM–8 PM" },
  { day: "Friday", hours: "9 AM–8 PM" },
  { day: "Saturday", hours: "9 AM–8 PM" },
];

// Parse time string like "9 AM" into hours (24-hour format)
function parseTime(timeStr: string): number {
  const match = timeStr.match(/(\d+)\s*(AM|PM)/i);
  if (!match) return 0;

  let hours = parseInt(match[1]);
  const isPM = match[2].toUpperCase() === "PM";

  // Convert to 24-hour format
  if (isPM && hours !== 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;

  return hours;
}

// Check if current time is within any of the time ranges
function isCurrentlyOpen(hoursStr: string): boolean {
  if (hoursStr === "Closed") return false;

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  // Split by comma to handle multiple periods like "9 AM–3 PM, 5 PM–8 PM"
  const periods = hoursStr.split(',').map(p => p.trim());

  for (const period of periods) {
    // Match patterns like "9 AM–3 PM" or "9 AM-3 PM"
    const match = period.match(/(.+?)\s*[–-]\s*(.+)/);
    if (!match) continue;

    const startHours = parseTime(match[1]);
    const endHours = parseTime(match[2]);

    const startTimeInMinutes = startHours * 60;
    const endTimeInMinutes = endHours * 60;

    // Check if current time falls within this period
    if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
      return true;
    }
  }

  return false;
}

export function StoreHours() {
  // Get current day of week (0 = Sunday, 1 = Monday, etc.)
  const currentDay = new Date().getDay();
  const currentDayHours = HOURS[currentDay];
  const isOpen = isCurrentlyOpen(currentDayHours.hours);

  return (
    <div className="w-full h-full p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-5 w-5 text-[#926F34]" />
        <h3 className="font-semibold text-sm">Hours</h3>
        <span className={cn(
          "text-[10px] font-medium px-1.5 py-0.5 rounded ml-auto",
          isOpen
            ? "bg-green-500/10 text-green-600 dark:text-green-400"
            : "bg-muted text-muted-foreground"
        )}>
          {isOpen ? "Open Now" : "Closed"}
        </span>
      </div>

      <div className="space-y-1.5">
        {HOURS.map((schedule, index) => (
          <div
            key={schedule.day}
            className={cn(
              "flex justify-between items-center text-xs py-1 px-2 rounded-md transition-colors",
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

      <p className="text-[10px] text-muted-foreground/70 mt-3 italic">
        Hours may vary during holidays and special events
      </p>
    </div>
  );
}