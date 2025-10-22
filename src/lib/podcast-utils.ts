/**
 * Podcast Utility Functions
 * Helper functions for filtering, searching, and sorting podcast episodes
 */

import type { PodcastEpisode } from "./types/podcast";

/**
 * Extract all unique topics from episodes
 */
export function extractAllTopics(episodes: PodcastEpisode[]): string[] {
  const topicsSet = new Set<string>();

  episodes.forEach((episode) => {
    episode.topics?.forEach((topic) => {
      topicsSet.add(topic);
    });
  });

  return Array.from(topicsSet).sort();
}

/**
 * Extract all unique guests from episodes
 */
export function extractAllGuests(episodes: PodcastEpisode[]): string[] {
  const guestsSet = new Set<string>();

  episodes.forEach((episode) => {
    if (episode.guest) {
      guestsSet.add(episode.guest);
    }
  });

  return Array.from(guestsSet).sort();
}

/**
 * Filter episodes by topic
 */
export function filterEpisodesByTopic(
  episodes: PodcastEpisode[],
  topic: string
): PodcastEpisode[] {
  if (topic === "all") {
    return episodes;
  }

  return episodes.filter((episode) => episode.topics?.includes(topic));
}

/**
 * Filter episodes by guest
 */
export function filterEpisodesByGuest(
  episodes: PodcastEpisode[],
  guest: string
): PodcastEpisode[] {
  if (guest === "all") {
    return episodes;
  }

  return episodes.filter((episode) => episode.guest === guest);
}

/**
 * Filter episodes by platform
 */
export function filterEpisodesByPlatform(
  episodes: PodcastEpisode[],
  platform: string
): PodcastEpisode[] {
  if (platform === "all") {
    return episodes;
  }

  return episodes.filter((episode) => {
    switch (platform) {
      case "youtube":
        return !!episode.platforms.youtube;
      case "spotify":
        return !!episode.platforms.spotify;
      case "apple":
        return !!episode.platforms.apple;
      case "instagram":
        return !!episode.platforms.instagram;
      default:
        return true;
    }
  });
}

/**
 * Search episodes by title, description, or guest
 */
export function searchEpisodes(
  episodes: PodcastEpisode[],
  query: string
): PodcastEpisode[] {
  if (!query || query.trim() === "") {
    return episodes;
  }

  const searchTerm = query.toLowerCase().trim();

  return episodes.filter((episode) => {
    const title = episode.title.toLowerCase();
    const description = episode.description.toLowerCase();
    const guest = episode.guest?.toLowerCase() || "";
    const topics = episode.topics?.map((t) => t.toLowerCase()).join(" ") || "";

    return (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      guest.includes(searchTerm) ||
      topics.includes(searchTerm)
    );
  });
}

/**
 * Sort episodes by publish date
 */
export function sortEpisodesByDate(
  episodes: PodcastEpisode[],
  order: "asc" | "desc" = "desc"
): PodcastEpisode[] {
  return [...episodes].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();

    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
}

/**
 * Format duration from ISO 8601 (e.g., PT15M33S) to readable format
 */
export function formatDuration(duration?: string): string {
  if (!duration) return "";

  // Parse ISO 8601 duration format (PT15M33S)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Format publish date to readable format
 */
export function formatPublishDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Extract guest name from video title or description
 * Common patterns: "with [Guest Name]", "ft. [Guest Name]", "featuring [Guest Name]"
 */
export function extractGuestFromText(text: string): string | undefined {
  const patterns = [
    /with\s+([^|•\-\n]+?)(?:\s*[|•\-]|$)/i,
    /ft\.?\s+([^|•\-\n]+?)(?:\s*[|•\-]|$)/i,
    /featuring\s+([^|•\-\n]+?)(?:\s*[|•\-]|$)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return undefined;
}

/**
 * Extract topics from description or tags
 * Looks for hashtags or comma-separated topics
 */
export function extractTopicsFromText(text: string): string[] {
  const topics: string[] = [];

  // Extract hashtags
  const hashtagMatches = text.matchAll(/#(\w+)/g);
  for (const match of hashtagMatches) {
    topics.push(match[1]);
  }

  // Extract from "Topics:" or "Tags:" section
  const topicsMatch = text.match(/(?:topics|tags):\s*([^\n]+)/i);
  if (topicsMatch && topicsMatch[1]) {
    const extractedTopics = topicsMatch[1]
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    topics.push(...extractedTopics);
  }

  return [...new Set(topics)]; // Remove duplicates
}

/**
 * Get YouTube video ID from URL
 */
export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
