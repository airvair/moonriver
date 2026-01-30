import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perform at Moon River',
  description:
    'Apply to perform live music at Moon River Cafe in Melbourne, FL. We welcome acoustic, folk, singer-songwriter, and jazz musicians. Share your talent with our community.',
  openGraph: {
    title: 'Perform at Moon River | Moon River Cafe',
    description:
      'Apply to perform live music at Moon River Cafe. We welcome acoustic, folk, and singer-songwriter musicians.',
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
