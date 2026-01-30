import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarWrapper } from "@/components/sidebar-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://themoonrivercafe.com'),
  title: {
    default: 'Moon River Cafe | Best Coffee Shop in Brevard, Melbourne FL',
    template: '%s | Moon River Cafe',
  },
  description:
    'Moon River Cafe is a European-inspired coffee shop in downtown Melbourne, Florida. Enjoy artisan espresso, afternoon tea, live music, poetry nights, and local art in a cozy, creative atmosphere. Best coffee shop in Brevard County.',
  keywords: [
    'coffee shop',
    'Melbourne FL',
    'Brevard County',
    'downtown Melbourne',
    'cafe',
    'espresso',
    'afternoon tea',
    'live music',
    'poetry',
    'local art',
    'European cafe',
    'best coffee',
    'Florida coffee shop',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Moon River Cafe',
    title: 'Moon River Cafe | Best Coffee Shop in Brevard, Melbourne FL',
    description:
      'European-inspired coffee shop in downtown Melbourne, FL. Artisan espresso, afternoon tea, live music, poetry nights, and local art.',
    images: [
      {
        url: '/images_videos/Cafe Pics/Reading Room.png',
        width: 1200,
        height: 630,
        alt: 'Moon River Cafe Reading Room',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moon River Cafe | Best Coffee Shop in Brevard, Melbourne FL',
    description:
      'European-inspired coffee shop in downtown Melbourne, FL. Artisan espresso, afternoon tea, live music, and more.',
    images: ['/images_videos/Cafe Pics/Reading Room.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          @font-face {
            font-family: 'TanNimbus';
            src: url('/fonts/tan-nimbus.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CafeOrCoffeeShop',
              name: 'Moon River Cafe',
              image: 'https://themoonrivercafe.com/images_videos/Cafe Pics/Reading Room.png',
              '@id': 'https://themoonrivercafe.com',
              url: 'https://themoonrivercafe.com',
              telephone: '+1-321-327-8770',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '816 E New Haven Ave',
                addressLocality: 'Melbourne',
                addressRegion: 'FL',
                postalCode: '32901',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 28.0836,
                longitude: -80.6081,
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '07:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '08:00',
                  closes: '18:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Sunday',
                  opens: '08:00',
                  closes: '16:00',
                },
              ],
              servesCuisine: ['Coffee', 'Tea', 'Pastries', 'Light Fare'],
              priceRange: '$$',
              sameAs: [
                'https://www.instagram.com/themoonrivercafe',
                'https://www.youtube.com/@TheMoonRiverCafe',
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SidebarWrapper>
            {children}
          </SidebarWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
