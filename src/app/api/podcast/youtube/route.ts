import { NextResponse } from "next/server";
import type {
  YouTubeSearchResponse,
  PodcastEpisode,
  YouTubeVideo,
  YouTubePlaylistItem,
  YouTubeVideoDetails,
} from "@/lib/types/podcast";
import {
  extractGuestFromText,
  extractTopicsFromText,
} from "@/lib/podcast-utils";

export const runtime = "nodejs";

// Simple in-memory cache for development
const cache = new Map<
  string,
  { data: PodcastEpisode[]; timestamp: number; nextPageToken?: string }
>();
const CACHE_TTL = 30 * 1000; // 30 seconds

export async function GET(request: Request) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID;

  // Check if environment variables are configured
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "YouTube API not configured. Please set YOUTUBE_API_KEY in .env.local",
      },
      { status: 500 }
    );
  }

  if (!channelId && !playlistId) {
    return NextResponse.json(
      {
        error:
          "YouTube source not configured. Please set YOUTUBE_CHANNEL_ID or YOUTUBE_PLAYLIST_ID in .env.local",
      },
      { status: 500 }
    );
  }

  // Parse URL to get query parameters
  const { searchParams } = new URL(request.url);
  const maxResults = searchParams.get("maxResults") || "12";
  const pageToken = searchParams.get("pageToken");

  // Create cache key based on request parameters
  const cacheKey = `youtube-${maxResults}-${pageToken || "first"}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log("Serving from cache:", cacheKey);
    return NextResponse.json(
      {
        episodes: cached.data,
        nextPageToken: cached.nextPageToken,
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
    let videos: YouTubeVideo[] = [];
    let nextPageTokenValue: string | undefined;

    // Fetch from playlist or channel
    if (playlistId) {
      // Fetch from playlist
      const playlistUrl = new URL(
        "https://www.googleapis.com/youtube/v3/playlistItems"
      );
      playlistUrl.searchParams.set("key", apiKey);
      playlistUrl.searchParams.set("playlistId", playlistId);
      playlistUrl.searchParams.set("part", "snippet,contentDetails");
      playlistUrl.searchParams.set("maxResults", maxResults);
      if (pageToken) {
        playlistUrl.searchParams.set("pageToken", pageToken);
      }

      const response = await fetch(playlistUrl.toString());

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "YouTube API error:",
          response.status,
          response.statusText,
          errorText
        );

        // Handle rate limiting
        if (response.status === 429 || response.status === 403) {
          const staleCache = cache.get(cacheKey);
          if (staleCache) {
            console.log("Rate limited - serving stale cache:", cacheKey);
            return NextResponse.json(
              {
                episodes: staleCache.data,
                nextPageToken: staleCache.nextPageToken,
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
                "YouTube API rate limit exceeded. Please try again in a few moments.",
            },
            { status: 429 }
          );
        }

        return NextResponse.json(
          { error: "Failed to fetch YouTube videos" },
          { status: response.status }
        );
      }

      const data = await response.json();
      const playlistItems: YouTubePlaylistItem[] = data.items || [];
      nextPageTokenValue = data.nextPageToken;

      // Transform playlist items to match search response format
      videos = playlistItems.map((item) => ({
        id: { videoId: item.contentDetails?.videoId || item.snippet.resourceId?.videoId || '' },
        snippet: item.snippet,
      }));
    } else if (channelId) {
      // Fetch from channel search
      const searchUrl = new URL(
        "https://www.googleapis.com/youtube/v3/search"
      );
      searchUrl.searchParams.set("key", apiKey);
      searchUrl.searchParams.set("channelId", channelId);
      searchUrl.searchParams.set("part", "snippet");
      searchUrl.searchParams.set("order", "date");
      searchUrl.searchParams.set("type", "video");
      searchUrl.searchParams.set("maxResults", maxResults);
      if (pageToken) {
        searchUrl.searchParams.set("pageToken", pageToken);
      }

      const response = await fetch(searchUrl.toString());

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "YouTube API error:",
          response.status,
          response.statusText,
          errorText
        );

        // Handle rate limiting
        if (response.status === 429 || response.status === 403) {
          const staleCache = cache.get(cacheKey);
          if (staleCache) {
            console.log("Rate limited - serving stale cache:", cacheKey);
            return NextResponse.json(
              {
                episodes: staleCache.data,
                nextPageToken: staleCache.nextPageToken,
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
                "YouTube API rate limit exceeded. Please try again in a few moments.",
            },
            { status: 429 }
          );
        }

        return NextResponse.json(
          { error: "Failed to fetch YouTube videos" },
          { status: response.status }
        );
      }

      const data: YouTubeSearchResponse = await response.json();
      videos = data.items || [];
      nextPageTokenValue = data.nextPageToken;
    }

    // Fetch video details to get duration
    const videoIds = videos
      .map((v) => typeof v.id === 'string' ? v.id : v.id?.videoId)
      .filter(Boolean)
      .join(",");
    const videoDurations: { [key: string]: string } = {};

    if (videoIds) {
      const detailsUrl = new URL(
        "https://www.googleapis.com/youtube/v3/videos"
      );
      detailsUrl.searchParams.set("key", apiKey);
      detailsUrl.searchParams.set("id", videoIds);
      detailsUrl.searchParams.set("part", "contentDetails");

      const detailsResponse = await fetch(detailsUrl.toString());
      if (detailsResponse.ok) {
        const detailsData: { items?: YouTubeVideoDetails[] } = await detailsResponse.json();
        detailsData.items?.forEach((item) => {
          videoDurations[item.id] = item.contentDetails.duration;
        });
      }
    }

    // Transform to PodcastEpisode format
    const episodes: PodcastEpisode[] = videos.map((video) => {
      const videoId = typeof video.id === 'string' ? video.id : video.id?.videoId || '';
      const snippet = video.snippet;
      const title = snippet.title;
      const description = snippet.description;

      // Extract guest and topics from title and description
      const guest = extractGuestFromText(`${title} ${description}`);
      const topics = extractTopicsFromText(description);

      return {
        id: videoId,
        title,
        description,
        publishedAt: snippet.publishedAt,
        thumbnailUrl:
          snippet.thumbnails?.maxres?.url ||
          snippet.thumbnails?.high?.url ||
          snippet.thumbnails?.medium?.url ||
          snippet.thumbnails?.default?.url ||
          "",
        duration: videoDurations[videoId],
        guest,
        topics,
        platforms: {
          youtube: `https://www.youtube.com/watch?v=${videoId}`,
        },
      };
    });

    // Store in cache
    cache.set(cacheKey, {
      data: episodes,
      timestamp: Date.now(),
      nextPageToken: nextPageTokenValue,
    });

    // Clean up old cache entries (keep last 50)
    if (cache.size > 50) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }

    return NextResponse.json(
      {
        episodes,
        nextPageToken: nextPageTokenValue,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          "X-Cache": "MISS",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcast episodes" },
      { status: 500 }
    );
  }
}
