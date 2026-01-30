import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Afternoon Tea',
  description:
    'Experience traditional afternoon tea service at Moon River Cafe in Melbourne, FL. Luxurious pastries, finest teas, classic sandwiches, and live music. $65 per person. Reservations required.',
  openGraph: {
    title: 'Afternoon Tea | Moon River Cafe',
    description:
      'Traditional afternoon tea service with luxurious pastries, finest teas, and live music. $65 per person.',
  },
};

export default function AfternoonTeaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
