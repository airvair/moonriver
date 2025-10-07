import { NextResponse } from "next/server";
import type { BloggerPost } from "@/lib/types/blogger";

export const runtime = "nodejs";

// Simple in-memory cache for development
const cache = new Map<string, { data: BloggerPost; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const blogId = process.env.BLOGGER_BLOG_ID;
  const apiKey = process.env.BLOGGER_API_KEY;

  // Check if environment variables are configured
  if (!blogId || !apiKey) {
    return NextResponse.json(
      { error: "Blogger not configured. Please set BLOGGER_BLOG_ID and BLOGGER_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  // Create cache key
  const cacheKey = `post-${postId}`;

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Serving post from cache:', cacheKey);
    return NextResponse.json(cached.data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Cache": "HIT"
      }
    });
  }

  const url = new URL(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}`
  );

  url.searchParams.set("key", apiKey);

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
          console.log('Rate limited - serving stale post cache:', cacheKey);
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
        { error: "Blog post not found" },
        { status: response.status }
      );
    }

    const data: BloggerPost = await response.json();

    // Store in cache
    cache.set(cacheKey, { data, timestamp: Date.now() });

    // Clean up old cache entries (keep last 50)
    if (cache.size > 50) {
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
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
