import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Literary Journal Submissions',
  description:
    'Submit your work to the Moon River Literary Journal. We accept original, unpublished short fiction, creative nonfiction, and poetry. Submission deadline: March 20, 2026.',
  openGraph: {
    title: 'Literary Journal Submissions | Moon River Cafe',
    description:
      'Call for submissions - Moon River Literary Journal. Submit your original work by March 20, 2026.',
  },
};

export default function SubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
