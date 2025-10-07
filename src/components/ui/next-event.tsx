"use client";

import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

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

export function NextEvent() {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch("/api/next-event");

        if (response.ok) {
          const data = await response.json();
          setEvent(data.event);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch next event:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, []);

  return (
    <div className="w-full h-full p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-6 w-6 text-[#926F34]" />
        <h3 className="font-semibold text-base">Next Event</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <video
            src="/dog_hare_animation.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[200px] h-auto"
          />
        </div>
      ) : error ? (
        <div className="text-sm text-muted-foreground">
          Unable to load events
        </div>
      ) : !event ? (
        <div className="text-sm text-muted-foreground">
          No upcoming events
        </div>
      ) : (
        <div className="flex flex-col gap-3 flex-1">
          <div>
            <h4 className="font-semibold text-base line-clamp-1">
              {event.summary || "Untitled Event"}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {formatEventDate(event.start, event.end)}
            </p>
          </div>

          {event.location && (
            <div className="flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}

          {event.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}