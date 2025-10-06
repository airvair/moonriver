import { NextResponse } from "next/server";

export async function GET() {
  const calendarId = process.env.GCAL_ID;
  const apiKey = process.env.GCAL_API_KEY;

  // Check if environment variables are configured
  if (!calendarId || !apiKey) {
    return NextResponse.json(
      { error: "Google Calendar not configured. Please set GCAL_ID and GCAL_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  const now = new Date().toISOString();

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`
  );

  url.searchParams.set("timeMin", now);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("showDeleted", "false");
  url.searchParams.set("maxResults", "1");
  url.searchParams.set("key", apiKey);

  // Fields projection keeps response small and faster
  url.searchParams.set(
    "fields",
    "items(htmlLink,summary,location,description,start(date,dateTime,timeZone),end(date,dateTime,timeZone))"
  );

  try {
    const response = await fetch(url.toString(), { cache: "no-store" });

    if (!response.ok) {
      console.error("Google Calendar API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Google Calendar fetch failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      { event: data.items?.[0] ?? null },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Error fetching calendar event:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar event" },
      { status: 500 }
    );
  }
}