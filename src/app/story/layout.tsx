import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Discover the story behind Moon River Cafe - a mother-daughter dream inspired by European cafes and childhood tea parties. Learn about our journey to create a creative community space in downtown Melbourne, FL.',
  openGraph: {
    title: 'Our Story | Moon River Cafe',
    description:
      'The story behind Moon River Cafe - a mother-daughter dream inspired by European cafes and childhood tea parties.',
  },
};

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
