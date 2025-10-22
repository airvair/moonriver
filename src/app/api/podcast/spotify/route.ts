import { NextResponse } from "next/server";
import type {
  SpotifyEpisodesResponse,
  PodcastEpisode,
} from "@/lib/types/podcast";

export const runtime = "nodejs";

// Simple in-memory cache for development
const cache = new Map<
  string,
  {
    data: PodcastEpisode[];
    timestamp: number;
    accessToken?: string;
    tokenExpiry?: number;
  }
>();
const CACHE_TTL = 30 * 1000; // 30 seconds

// Cache Spotify access token
let cachedAccessToken: string | null = null;
let tokenExpiry: number = 0;

async function getSpotifyAccessToken(): Promise<string> {
  // Return cached token if still valid
  if (cachedAccessToken && Date.now() < tokenExpiry) {
    return cachedAccessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials not configured");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get Spotify access token");
  }

  const data = await response.json();
  cachedAccessToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000 - 60000; // Refresh 1 min before expiry

  return cachedAccessToken;
}

export async function GET(request: Request) {
  const showId = process.env.SPOTIFY_SHOW_ID;

  // Check if environment variables are configured
  if (!showId) {
    return NextResponse.json(
      {
        error:
          "Spotify not configured. Please set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_SHOW_ID in .env.local",
      },
      { status: 500 }
    );
  }

  // Parse URL to get query parameters
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "20";
  const offset = searchParams.get("offset") || "0";

  // Create cache key based on request parameters
  const cacheKey = `spotify-${limit}-${offset}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log("Serving from cache:", cacheKey);
    return NextResponse.json(
      { episodes: cached.data },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Cache": "HIT",
        },
      }
    );
  }

  try {
    // Get access token
    const accessToken = await getSpotifyAccessToken();

    // Fetch episodes from Spotify
    const url = new URL(
      `https://api.spotify.com/v1/shows/${showId}/episodes`
    );
    url.searchParams.set("limit", limit);
    url.searchParams.set("offset", offset);
    url.searchParams.set("market", "US");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Spotify API error:",
        response.status,
        response.statusText,
        errorText
      );

      // Handle rate limiting
      if (response.status === 429) {
        const staleCache = cache.get(cacheKey);
        if (staleCache) {
          console.log("Rate limited - serving stale cache:", cacheKey);
          return NextResponse.json(
            { episodes: staleCache.data },
            {
              headers: {
                "Cache-Control":
                  "public, s-maxage=300, stale-while-revalidate=600",
                "X-Cache": "STALE",
                "X-Rate-Limited": "true",
              },
            }
          );
        }

        return NextResponse.json(
          {
            error:
              "Spotify API rate limit exceeded. Please try again in a few moments.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch Spotify episodes" },
        { status: response.status }
      );
    }

    const data: SpotifyEpisodesResponse = await response.json();

    // Transform to PodcastEpisode format
    const episodes: PodcastEpisode[] = data.items.map((episode) => {
      // Calculate duration in ISO 8601 format
      const durationMs = episode.duration_ms;
      const hours = Math.floor(durationMs / 3600000);
      const minutes = Math.floor((durationMs % 3600000) / 60000);
      const seconds = Math.floor((durationMs % 60000) / 1000);
      const duration = `PT${hours > 0 ? `${hours}H` : ""}${minutes}M${seconds}S`;

      return {
        id: episode.id,
        title: episode.name,
        description: episode.description,
        publishedAt: episode.release_date,
        thumbnailUrl: episode.images[0]?.url || "",
        duration,
        platforms: {
          spotify: episode.external_urls.spotify,
        },
      };
    });

    // Store in cache
    cache.set(cacheKey, {
      data: episodes,
      timestamp: Date.now(),
    });

    // Clean up old cache entries (keep last 50)
    if (cache.size > 50) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }

    return NextResponse.json(
      { episodes },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Cache": "MISS",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Spotify episodes:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcast episodes from Spotify" },
      { status: 500 }
    );
  }
}
