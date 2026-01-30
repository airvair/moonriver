import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'The Moon River Journal - Stories, recipes, and musings from our cafe. Discover articles about coffee culture, local events, creative inspiration, and community happenings in Melbourne, FL.',
  openGraph: {
    title: 'Journal | Moon River Cafe',
    description:
      'Stories, recipes, and musings from Moon River Cafe. Coffee culture, local events, and creative inspiration.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
