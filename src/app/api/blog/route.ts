import { NextResponse } from "next/server";
import type { BloggerPostList } from "@/lib/types/blogger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    const response = await fetch(url.toString(), {
      cache: "no-store",
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      console.error("Blogger API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Blogger API fetch failed" },
        { status: response.status }
      );
    }

    const data: BloggerPostList = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
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
