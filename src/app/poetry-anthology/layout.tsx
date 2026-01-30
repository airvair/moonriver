import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Poetry Anthology',
  description:
    'Submit your poetry to the Moon River Poetry Anthology. We accept original, unpublished lyric poems, narrative poems, formal verse, and free verse. Submission deadline: May 4, 2026.',
  openGraph: {
    title: 'Poetry Anthology | Moon River Cafe',
    description:
      'Call for submissions - Moon River Poetry Anthology. Submit your original poetry by May 4, 2026.',
  },
};

export default function PoetryAnthologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
