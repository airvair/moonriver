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

  return (
    <div className="w-full h-full p-4 sm:p-5 lg:p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-2 sm:mb-3 lg:mb-4">
        <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-[#926F34]" />
        <h3 className="font-semibold text-sm sm:text-base">{title || "Next Event"}</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center flex-1">
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
        <div className="text-xs sm:text-sm text-muted-foreground">
          {errorMessage || "Unable to load events"}
        </div>
      ) : !event ? (
        <div className="text-xs sm:text-sm text-muted-foreground">
          No upcoming events
        </div>
      ) : (
        <div className="flex flex-col gap-2 sm:gap-3 flex-1">
          <div>
            <h4 className="font-semibold text-sm sm:text-base line-clamp-1">
              {event.summary || "Untitled Event"}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
              {formatEventDate(event.start, event.end)}
            </p>
          </div>

          {event.location && (
            <div className="flex items-start gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}

          {event.description && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 hidden sm:block">
              {event.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}