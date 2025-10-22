import { NextResponse } from "next/server";
import type {
  InstagramMediaResponse,
  PodcastEpisode,
} from "@/lib/types/podcast";
import {
  extractGuestFromText,
  extractTopicsFromText,
} from "@/lib/podcast-utils";

export const runtime = "nodejs";

// Simple in-memory cache for development
const cache = new Map<
  string,
  { data: PodcastEpisode[]; timestamp: number; nextCursor?: string }
>();
const CACHE_TTL = 30 * 1000; // 30 seconds

export async function GET(request: Request) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  // Check if environment variables are configured
  if (!accessToken || !userId) {
    return NextResponse.json(
      {
        error:
          "Instagram not configured. Please set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in .env.local",
      },
      { status: 500 }
    );
  }

  // Parse URL to get query parameters
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "12";
  const after = searchParams.get("after");

  // Create cache key based on request parameters
  const cacheKey = `instagram-${limit}-${after || "first"}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log("Serving from cache:", cacheKey);
    return NextResponse.json(
      {
        episodes: cached.data,
        nextCursor: cached.nextCursor,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Cache": "HIT",
        },
      }
    );
  }

  try {
    // Fetch media from Instagram Graph API
    const url = new URL(
      `https://graph.instagram.com/${userId}/media`
    );
    url.searchParams.set("access_token", accessToken);
    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_url,thumbnail_url,timestamp,permalink"
    );
    url.searchParams.set("limit", limit);
    if (after) {
      url.searchParams.set("after", after);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "Instagram API error:",
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
            {
              episodes: staleCache.data,
              nextCursor: staleCache.nextCursor,
            },
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
              "Instagram API rate limit exceeded. Please try again in a few moments.",
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Failed to fetch Instagram media" },
        { status: response.status }
      );
    }

    const data: InstagramMediaResponse = await response.json();

    // Filter for video content only
    const videos = data.data.filter((media) => media.media_type === "VIDEO");

    // Transform to PodcastEpisode format
    const episodes: PodcastEpisode[] = videos.map((video) => {
      const caption = video.caption || "";
      const guest = extractGuestFromText(caption);
      const topics = extractTopicsFromText(caption);

      // Extract title from caption (first line or first 50 chars)
      const titleMatch = caption.split("\n")[0] || caption.substring(0, 100);
      const title = titleMatch.trim() || "Instagram Video";

      return {
        id: video.id,
        title,
        description: caption,
        publishedAt: video.timestamp,
        thumbnailUrl: video.thumbnail_url || video.media_url,
        guest,
        topics,
        platforms: {
          instagram: video.permalink,
        },
      };
    });

    // Store in cache
    cache.set(cacheKey, {
      data: episodes,
      timestamp: Date.now(),
      nextCursor: data.paging?.cursors?.after,
    });

    // Clean up old cache entries (keep last 50)
    if (cache.size > 50) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }

    return NextResponse.json(
      {
        episodes,
        nextCursor: data.paging?.cursors?.after,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Cache": "MISS",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Instagram media:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcast clips from Instagram" },
      { status: 500 }
    );
  }
}
