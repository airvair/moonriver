import { NextResponse } from "next/server";
import type { BloggerPost } from "@/lib/types/blogger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const url = new URL(
    `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}`
  );

  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString(), {
      cache: "no-store",
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      console.error("Blogger API error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: response.status }
      );
    }

    const data: BloggerPost = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
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
