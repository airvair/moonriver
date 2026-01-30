import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events Calendar',
  description:
    'View upcoming events at Moon River Cafe in Melbourne, FL. Live music performances, art shows, poetry nights, community gatherings, and special workshops.',
  openGraph: {
    title: 'Events Calendar | Moon River Cafe',
    description:
      'Live music, art shows, poetry nights, and community gatherings at Moon River Cafe.',
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
