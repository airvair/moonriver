export interface Author {
  name: string;
  position: string;
  avatar: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

/**
 * Author profiles for the blog
 * Map Blogger author IDs or names to rich author profiles
 */
export const authors: Record<string, Author> = {
  default: {
    name: "Moon River Team",
    position: "Coffee Enthusiasts",
    avatar: "/authors/default.png",
    bio: "Passionate about coffee, community, and creating memorable experiences at Moon River.",
  },
  "Moon River": {
    name: "Moon River",
    position: "Coffee Shop",
    avatar: "/authors/moonriver.png",
    bio: "Your local coffee sanctuary, where every cup tells a story and every visit feels like home.",
  },
  admin: {
    name: "Moon River Admin",
    position: "Community Manager",
    avatar: "/authors/admin.png",
    bio: "Managing the Moon River community and keeping you updated with the latest from our café.",
  },
  barista: {
    name: "Head Barista",
    position: "Coffee Artisan",
    avatar: "/authors/barista.png",
    bio: "Crafting the perfect cup, one brew at a time. Passionate about coffee education and exploration.",
  },
} as const;

export type AuthorKey = keyof typeof authors;

/**
 * Get author by key, with fallback to default
 */
export function getAuthor(key: string): Author {
  // Try to match by key
  if (key in authors) {
    return authors[key as AuthorKey];
  }

  // Try to match by name (case-insensitive)
  const normalizedKey = key.toLowerCase();
  const matchingKey = Object.keys(authors).find(
    (authorKey) => authorKey.toLowerCase() === normalizedKey
  );

  if (matchingKey) {
    return authors[matchingKey as AuthorKey];
  }

  // Return default author
  return authors.default;
}

/**
 * Get author from Blogger author data
 */
export function getAuthorFromBlogger(bloggerAuthor?: {
  displayName: string;
  url?: string;
  image?: { url: string };
}): Author {
  if (!bloggerAuthor) {
    return authors.default;
  }

  // Try to find matching author by display name
  const author = getAuthor(bloggerAuthor.displayName);

  // If we found a match, use it but override with Blogger data if available
  if (author !== authors.default) {
    return {
      ...author,
      avatar: bloggerAuthor.image?.url || author.avatar,
    };
  }

  // Create a new author from Blogger data
  return {
    name: bloggerAuthor.displayName,
    position: "Contributor",
    avatar: bloggerAuthor.image?.url || "/authors/default.png",
  };
}

/**
 * Check if a key is a valid author
 */
export function isValidAuthor(key: string): key is AuthorKey {
  return key in authors;
}