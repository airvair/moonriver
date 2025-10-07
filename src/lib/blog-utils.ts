import type { BloggerPost } from "@/lib/types/blogger";
import type { TOCItem } from "@/components/blog/table-of-contents";

/**
 * Calculate reading time from HTML content
 */
export function calculateReadingTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "");
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  if (readingTime === 1) {
    return "1 min read";
  }
  return `${readingTime} min read`;
}

/**
 * Extract headings from HTML content for table of contents
 */
export function extractHeadings(html: string): TOCItem[] {
  const headings: TOCItem[] = [];

  // Match h1-h6 tags with their content
  const headingRegex = /<h([1-6])(?:\s+[^>]*)?>(.+?)<\/h\1>/gi;
  let match;
  let index = 0;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, "").trim(); // Remove any nested HTML tags

    // Generate a unique ID for the heading
    const id = `heading-${index}-${text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}`;

    headings.push({
      id,
      text,
      level,
    });

    index++;
  }

  return headings;
}

/**
 * Extract first image from HTML content
 */
export function getFirstImage(html: string): string | null {
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch ? imgMatch[1] : null;
}

/**
 * Extract excerpt from HTML content
 */
export function getExcerpt(html: string, maxLength = 200): string {
  const text = html.replace(/<[^>]*>/g, "").trim();

  if (text.length <= maxLength) {
    return text;
  }

  // Try to cut at a word boundary
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + "...";
  }

  return truncated + "...";
}

/**
 * Format date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Extract all unique tags from posts
 */
export function extractAllTags(posts: BloggerPost[]): { name: string; count: number }[] {
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.labels) {
      post.labels.forEach((label) => {
        tagCounts[label] = (tagCounts[label] || 0) + 1;
      });
    }
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Filter posts by tag
 */
export function filterPostsByTag(posts: BloggerPost[], tag: string): BloggerPost[] {
  if (tag === "all" || tag === "All") {
    return posts;
  }

  return posts.filter((post) => post.labels?.includes(tag));
}

/**
 * Search posts by query
 */
export function searchPosts(posts: BloggerPost[], query: string): BloggerPost[] {
  const lowerQuery = query.toLowerCase();

  return posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(lowerQuery);
    const contentMatch = post.content.toLowerCase().includes(lowerQuery);
    const labelMatch = post.labels?.some((label) =>
      label.toLowerCase().includes(lowerQuery)
    );

    return titleMatch || contentMatch || labelMatch;
  });
}

/**
 * Get related posts based on tags
 */
export function getRelatedPosts(
  currentPost: BloggerPost,
  allPosts: BloggerPost[],
  limit = 3
): BloggerPost[] {
  const otherPosts = allPosts.filter((post) => post.id !== currentPost.id);

  if (!currentPost.labels || currentPost.labels.length === 0) {
    // If no tags, just return the most recent posts
    return otherPosts
      .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime())
      .slice(0, limit);
  }

  // Score posts by tag overlap
  const scoredPosts = otherPosts.map((post) => {
    const tagOverlap = currentPost.labels!.filter((tag) =>
      post.labels?.includes(tag)
    ).length;

    return {
      post,
      score: tagOverlap,
    };
  });

  // Sort by score (tag overlap) first, then by date
  return scoredPosts
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }
      return new Date(b.post.published).getTime() - new Date(a.post.published).getTime();
    })
    .slice(0, limit)
    .map((item) => item.post);
}

/**
 * Sort posts by date
 */
export function sortPostsByDate(posts: BloggerPost[], order: "asc" | "desc" = "desc"): BloggerPost[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.published).getTime();
    const dateB = new Date(b.published).getTime();

    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Get featured posts (posts with "featured" label)
 */
export function getFeaturedPosts(posts: BloggerPost[]): BloggerPost[] {
  return posts.filter((post) => post.labels?.includes("featured"));
}

/**
 * Add IDs to headings in HTML content for anchor links
 */
export function addHeadingIds(html: string): string {
  const headings = extractHeadings(html);
  let modifiedHtml = html;

  headings.forEach((heading) => {
    const headingRegex = new RegExp(
      `<h${heading.level}(?:\\s+[^>]*)?>\\s*${heading.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*</h${heading.level}>`,
      "i"
    );

    modifiedHtml = modifiedHtml.replace(
      headingRegex,
      `<h${heading.level} id="${heading.id}">${heading.text}</h${heading.level}>`
    );
  });

  return modifiedHtml;
}