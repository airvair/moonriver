import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Podcast',
  description:
    'Moon River Podcast - Conversations with local creatives, artists, and makers over a cup of coffee. Listen to inspiring stories from the Melbourne, FL creative community.',
  openGraph: {
    title: 'Podcast | Moon River Cafe',
    description:
      'Conversations with local creatives, artists, and makers. Inspiring stories from the Melbourne, FL creative community.',
  },
};

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
