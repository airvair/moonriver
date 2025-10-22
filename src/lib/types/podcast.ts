/**
 * Podcast Episode Types
 * Unified type system for podcast episodes from multiple platforms
 */

// Platform types
export type PodcastPlatform = "youtube" | "spotify" | "apple" | "instagram";

// Base episode interface
export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  duration?: string;
  guest?: string;
  topics?: string[];
  platforms: {
    youtube?: string; // YouTube video URL
    spotify?: string; // Spotify episode URL
    apple?: string; // Apple Podcasts episode URL
    instagram?: string; // Instagram video URL
  };
}

// YouTube API Response Types
export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
      standard?: YouTubeThumbnail;
      maxres?: YouTubeThumbnail;
    };
    channelTitle: string;
  };
  contentDetails?: {
    duration: string; // ISO 8601 duration format (PT15M33S)
  };
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubeApiError {
  error: string;
}

// Spotify API Response Types
export interface SpotifyEpisode {
  id: string;
  name: string;
  description: string;
  release_date: string;
  duration_ms: number;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyEpisodesResponse {
  items: SpotifyEpisode[];
  next?: string;
  previous?: string;
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyApiError {
  error: string;
}

// Instagram API Response Types
export interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  timestamp: string;
  permalink: string;
}

export interface InstagramMediaResponse {
  data: InstagramMedia[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export interface InstagramApiError {
  error: string;
}

// Combined API response type
export type PodcastApiResponse =
  | { episodes: PodcastEpisode[]; nextPageToken?: string }
  | { error: string };
