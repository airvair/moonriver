// Blogger API Types
// Based on Blogger API v3 specification

export interface BloggerAuthor {
  id: string;
  displayName: string;
  url?: string;
  image?: {
    url: string;
  };
}

export interface BloggerBlog {
  id: string;
  name: string;
  description: string;
  published: string;
  updated: string;
  url: string;
  selfLink: string;
  posts: {
    totalItems: number;
    selfLink: string;
  };
  pages?: {
    totalItems: number;
    selfLink: string;
  };
  locale: {
    language: string;
    country: string;
    variant: string;
  };
}

export interface BloggerPost {
  kind: string;
  id: string;
  blog: {
    id: string;
  };
  published: string;
  updated: string;
  url: string;
  selfLink: string;
  title: string;
  content: string;
  author: BloggerAuthor;
  replies?: {
    totalItems: string;
    selfLink: string;
  };
  labels?: string[];
  images?: Array<{
    url: string;
  }>;
}

export interface BloggerPostList {
  kind: string;
  nextPageToken?: string;
  prevPageToken?: string;
  items: BloggerPost[];
}

export interface BloggerApiError {
  error: string;
}
