import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Explore the Moon River Cafe menu featuring artisan espresso drinks, specialty teas, fresh pastries, and light fare. Made fresh daily in downtown Melbourne, FL.',
  openGraph: {
    title: 'Menu | Moon River Cafe',
    description:
      'Artisan espresso, specialty teas, fresh pastries, and light fare. Explore our full menu.',
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
