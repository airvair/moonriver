import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preston Hunter',
  description:
    'Preston Hunter - Melbourne, Florida singer-songwriter performing at Moon River Cafe. Folk and acoustic music that invites listeners to slow down and feel something real.',
  openGraph: {
    title: 'Preston Hunter | Moon River Cafe',
    description:
      'Preston Hunter - Melbourne, FL singer-songwriter crafting authentic folk and acoustic music at Moon River Cafe.',
  },
};

export default function PrestonHunterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
