import { getStoreHours as fetchSanityStoreHours } from "./sanity";

// Types
export interface DayHours {
  day: string;
  hours: string;
}

// Default store hours (fallback if Sanity fetch fails)
const DEFAULT_TIMEZONE = "America/New_York";

export const HOURS: DayHours[] = [
  { day: "Sunday", hours: "9 AM–3 PM" },
  { day: "Monday", hours: "Closed" },
  { day: "Tuesday", hours: "9 AM–3 PM" },
  { day: "Wednesday", hours: "9 AM–3 PM" },
  { day: "Thursday", hours: "9 AM–3 PM" },
  { day: "Friday", hours: "9 AM–8 PM" },
  { day: "Saturday", hours: "9 AM–8 PM" },
];

// Fetch store hours from Sanity CMS
export async function fetchStoreHours(): Promise<{ hours: DayHours[]; timezone: string }> {
  try {
    const sanityHours = await fetchSanityStoreHours();
    if (sanityHours?.hours && sanityHours.hours.length > 0) {
      return {
        hours: sanityHours.hours,
        timezone: sanityHours.timezone || DEFAULT_TIMEZONE,
      };
    }
  } catch (error) {
    console.error("Failed to fetch store hours from Sanity:", error);
  }
  // Fallback to default hours
  return { hours: HOURS, timezone: DEFAULT_TIMEZONE };
}

// Get current time in store's time zone
function getStoreTime(timezone: string = DEFAULT_TIMEZONE): Date {
  // Get current UTC time
  const now = new Date();

  // Convert to store's time zone
  const storeTimeStr = now.toLocaleString("en-US", {
    timeZone: timezone,
  });

  return new Date(storeTimeStr);
}

// Parse time string like "9 AM" into hours (24-hour format)
export function parseTime(timeStr: string): number {
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
export function isCurrentlyOpen(hoursStr: string, timezone: string = DEFAULT_TIMEZONE): boolean {
  if (hoursStr === "Closed") return false;

  const now = getStoreTime(timezone);
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

// Get the next opening time (today or in the future)
function getNextOpeningTime(storeTime: Date, hoursData: DayHours[] = HOURS): { date: Date; dayName: string } | null {
  const currentDay = storeTime.getDay();
  const currentTimeInMinutes = storeTime.getHours() * 60 + storeTime.getMinutes();

  // First check if we open later today
  const todayHours = hoursData[currentDay].hours;
  if (todayHours !== "Closed") {
    const periods = todayHours.split(',').map(p => p.trim());

    for (const period of periods) {
      const match = period.match(/(.+?)\s*[–-]\s*(.+)/);
      if (!match) continue;

      const startHours = parseTime(match[1]);
      const startTimeInMinutes = startHours * 60;

      // If this period starts later today
      if (currentTimeInMinutes < startTimeInMinutes) {
        const openingDate = new Date(storeTime);
        openingDate.setHours(startHours, 0, 0, 0);
        return {
          date: openingDate,
          dayName: hoursData[currentDay].day,
        };
      }
    }
  }

  // Check future days
  for (let i = 1; i <= 7; i++) {
    const nextDay = (currentDay + i) % 7;
    const nextDayHours = hoursData[nextDay].hours;

    if (nextDayHours !== "Closed") {
      // Get first opening time of that day
      const periods = nextDayHours.split(',').map(p => p.trim());
      const firstPeriod = periods[0];
      const match = firstPeriod.match(/(.+?)\s*[–-]\s*(.+)/);

      if (match) {
        const startHours = parseTime(match[1]);
        const openingDate = new Date(storeTime);
        openingDate.setDate(openingDate.getDate() + i);
        openingDate.setHours(startHours, 0, 0, 0);

        return {
          date: openingDate,
          dayName: hoursData[nextDay].day,
        };
      }
    }
  }

  return null;
}

// Get minutes until closing for the current period
function getMinutesUntilClosing(hoursStr: string, timezone: string = DEFAULT_TIMEZONE): number | null {
  if (hoursStr === "Closed") return null;

  const now = getStoreTime(timezone);
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  // Split by comma to handle multiple periods
  const periods = hoursStr.split(',').map(p => p.trim());

  for (const period of periods) {
    const match = period.match(/(.+?)\s*[–-]\s*(.+)/);
    if (!match) continue;

    const startHours = parseTime(match[1]);
    const endHours = parseTime(match[2]);

    const startTimeInMinutes = startHours * 60;
    const endTimeInMinutes = endHours * 60;

    // Check if we're currently in this period
    if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
      return endTimeInMinutes - currentTimeInMinutes;
    }
  }

  return null;
}

export interface OpenStatus {
  isOpen: boolean;
  closesSoon?: boolean;
  message: string;
  shortMessage: string;
  hours?: string;
  minutesUntilClose?: number;
  nextOpenDay?: string;
  nextOpenTime?: string;
}

// Get friendly status message with opening information
export function getOpenStatus(hoursData: DayHours[] = HOURS, timezone: string = DEFAULT_TIMEZONE): OpenStatus {
  const now = getStoreTime(timezone);
  const currentDay = now.getDay();
  const currentDayHours = hoursData[currentDay];
  const isOpen = isCurrentlyOpen(currentDayHours.hours, timezone);

  if (isOpen) {
    const minutesUntilClose = getMinutesUntilClosing(currentDayHours.hours, timezone);

    // Check if closing within 15 minutes
    if (minutesUntilClose !== null && minutesUntilClose <= 15) {
      return {
        isOpen: true,
        closesSoon: true,
        message: `Closes in ${minutesUntilClose} ${minutesUntilClose === 1 ? 'min' : 'mins'}`,
        shortMessage: "Closes soon",
        hours: currentDayHours.hours,
        minutesUntilClose,
      };
    }

    return {
      isOpen: true,
      closesSoon: false,
      message: "We're open!",
      shortMessage: "Open",
      hours: currentDayHours.hours,
    };
  }

  // Closed - figure out when we open next
  const nextOpening = getNextOpeningTime(now, hoursData);

  if (!nextOpening) {
    return {
      isOpen: false,
      message: "Closed",
      shortMessage: "Closed",
    };
  }

  const { date: openingDate, dayName } = nextOpening;
  const minutesUntilOpen = Math.floor((openingDate.getTime() - now.getTime()) / 1000 / 60);
  const hoursUntilOpen = Math.floor(minutesUntilOpen / 60);

  // Extract opening time for display
  const openingTimeStr = openingDate.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  });

  let message = "Closed";

  // Less than 1 hour away
  if (minutesUntilOpen < 60) {
    message = `Opens in ${minutesUntilOpen} ${minutesUntilOpen === 1 ? 'minute' : 'minutes'}`;
  }
  // Less than 24 hours and same day
  else if (hoursUntilOpen < 24 && openingDate.getDate() === now.getDate()) {
    message = `Opens in ${hoursUntilOpen} ${hoursUntilOpen === 1 ? 'hour' : 'hours'}`;
  }
  // Tomorrow
  else if (openingDate.getDate() === now.getDate() + 1 ||
           (now.getDate() === new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() && openingDate.getDate() === 1)) {
    message = `Closed • Back tomorrow at ${openingTimeStr}`;
  }
  // Later this week
  else {
    message = `Closed • Back ${dayName} at ${openingTimeStr}`;
  }

  return {
    isOpen: false,
    message,
    shortMessage: "Closed",
    nextOpenDay: dayName,
    nextOpenTime: openingTimeStr,
  };
}
