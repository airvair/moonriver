"use client";

import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import type { CalendarType } from "@/lib/calendar-config";

interface EventData {
  htmlLink?: string;
  summary?: string;
  location?: string;
  description?: string;
  start?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
}

function formatEventDate(start: EventData["start"], end: EventData["end"]) {
  if (!start) return "";

  const startDate = start.dateTime ?? start.date;
  const endDate = end?.dateTime ?? end?.date;

  if (!startDate) return "";

  const sd = new Date(startDate);
  const ed = endDate ? new Date(endDate) : null;

  // All-day event
  if (start.date && !start.dateTime) {
    return sd.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }

  // Event with time
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric"
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit"
  };

  const dateStr = sd.toLocaleDateString([], dateOptions);
  const startTimeStr = sd.toLocaleTimeString([], timeOptions);
  const endTimeStr = ed ? ed.toLocaleTimeString([], timeOptions) : "";

  if (endTimeStr) {
    return `${dateStr}, ${startTimeStr} - ${endTimeStr}`;
  }

  return `${dateStr}, ${startTimeStr}`;
}

interface NextEventProps {
  /**
   * The type of calendar to display events from
   * @default "primary"
   */
  calendarType?: CalendarType;

  /**
   * Optional title override for the widget
   */
  title?: string;
}

export function NextEvent({ calendarType = "primary", title }: NextEventProps) {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const url = new URL("/api/next-event", window.location.origin);
        url.searchParams.set("calendarType", calendarType);

        const response = await fetch(url.toString());

        if (response.ok) {
          const data = await response.json();
          setEvent(data.event);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Unable to load events");
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch next event:", err);
        setErrorMessage("Failed to connect to calendar");
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [calendarType]);

  const hasMinimalContent = !event?.description && !event?.location;

  return (
    <div className="w-full h-full p-4 sm:p-5 lg:p-6 flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-shrink-0">
        <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-[#926F34]" />
        <h3 className="font-semibold text-sm sm:text-base">{title || "Next Event"}</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center flex-1 min-h-0">
          <video
            src="/dog_hare_animation.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[120px] sm:max-w-[160px] lg:max-w-[200px] h-auto"
          />
        </div>
      ) : error ? (
        <div className="text-xs sm:text-sm text-muted-foreground flex-1 min-h-0 flex items-center">
          {errorMessage || "Unable to load events"}
        </div>
      ) : !event ? (
        <div className="text-xs sm:text-sm text-muted-foreground flex-1 min-h-0 flex items-center">
          No upcoming events
        </div>
      ) : (
        <div className={`flex flex-col flex-1 min-h-0 overflow-hidden ${hasMinimalContent ? 'justify-center' : ''}`}>
          {/* Event card with subtle background */}
          <div className={`rounded-xl ${hasMinimalContent ? 'bg-[#926F34]/5 p-3 sm:p-4' : ''}`}>
            {/* Event Title */}
            <h4 className={`font-bold text-[#926F34] line-clamp-2 leading-snug ${hasMinimalContent ? 'text-center text-base sm:text-lg' : 'text-sm sm:text-base'}`}>
              {event.summary || "Untitled Event"}
            </h4>

            {/* Date/Time */}
            <div className={`flex items-center gap-1.5 mt-2 ${hasMinimalContent ? 'justify-center' : ''}`}>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#926F34]/50 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-foreground/70">
                {formatEventDate(event.start, event.end)}
              </p>
            </div>

            {/* Location - If available */}
            {event.location && (
              <div className="flex items-center gap-1.5 mt-1.5 text-xs sm:text-sm text-muted-foreground justify-center">
                <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0 text-[#926F34]/40" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>

          {/* Description - If available, shown below the card */}
          {event.description && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 hidden sm:block mt-3 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}