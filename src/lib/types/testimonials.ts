// Testimonial Types for Customer Reviews

export interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review: string;
  avatar?: string; // Optional image URL
  initials: string; // Fallback for avatar
  date?: string; // Optional review date
}
