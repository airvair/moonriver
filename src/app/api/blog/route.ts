import { NextResponse } from "next/server";
import type { BloggerPostList } from "@/lib/types/blogger";

export const runtime = "nodejs";

// Simple in-memory cache for development
const cache = new Map<string, { data: BloggerPostList; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request: Request) {
  const blogId = process.env.BLOGGER_BLOG_ID;
  const apiKey = process.env.BLOGGER_API_KEY;

  // Check if environment variables are configured
  if (!blogId || !apiKey) {
    return NextResponse.json(
      { error: "Blogger not configured. Please set BLOGGER_BLOG_ID and BLOGGER_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  // Parse URL to get query parameters for pagination
  const { searchParams } = new URL(request.url);
  const maxResults = searchParams.get("maxResults") || "10";
  const pageToken = searchParams.get("pageToken");

  // Create cache key based on request parameters
  const cacheKey = `posts-${maxResults}-${pageToken || 'first'}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Serving from cache:', cacheKey);
    return NextResponse.json(cached.data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Cache": "HIT"
      }
    });
  }

  const url = new URL(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`
  );

  url.searchParams.set("key", apiKey);
  url.searchParams.set("maxResults", maxResults);

  if (pageToken) {
    url.searchParams.set("pageToken", pageToken);
  }

  // Fields projection to keep response optimized
  url.searchParams.set(
    "fields",
    "nextPageToken,prevPageToken,items(id,published,updated,url,selfLink,title,content,author(id,displayName,url,image),labels,images)"
  );

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Blogger API error:", response.status, response.statusText, errorText);

      // Handle rate limiting specifically
      if (response.status === 429) {
        // Try to serve stale cache if available
        const staleCache = cache.get(cacheKey);
        if (staleCache) {
          console.log('Rate limited - serving stale cache:', cacheKey);
          return NextResponse.json(staleCache.data, {
            headers: {
              "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
              "X-Cache": "STALE",
              "X-Rate-Limited": "true"
            }
          });
        }

        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again in a few moments." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: "Blogger API fetch failed" },
        { status: response.status }
      );
    }

    const data: BloggerPostList = await response.json();

    // Store in cache
    cache.set(cacheKey, { data, timestamp: Date.now() });

    // Clean up old cache entries (keep last 100)
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      if (firstKey) cache.delete(firstKey);
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Cache": "MISS"
      }
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
