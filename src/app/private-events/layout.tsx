import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Events',
  description:
    'Host your next private event at Moon River Café in Melbourne, FL. From intimate celebrations to creative workshops, our curated space is perfect for your gathering.',
  openGraph: {
    title: 'Private Events | Moon River Café',
    description:
      'Host your next private event at Moon River Café. Contact us to plan your gathering.',
  },
};

export default function PrivateEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
