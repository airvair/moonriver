"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function CalendarPage() {
  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'TanNimbus';
          src: url('/fonts/tan-nimbus.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      <SiteHeader />
      <main className="flex flex-col min-h-screen unified-background overflow-x-hidden">
        <div className="container mx-auto px-4 py-32 flex-1">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1
                className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline"
                style={{ fontFamily: 'TanNimbus, sans-serif' }}
              >
                Events Calendar
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-casual">
                Join us for live music, art shows, and community gatherings
              </p>
            </div>

            {/* Calendar Container with Cozy Styling */}
            <div className="bg-card/95 rounded-3xl p-6 md:p-8 warm-shadow-enhanced vintage-paper cozy-card border-2 border-primary/10">
              <div className="w-full aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden warm-shadow">
                <iframe
                  src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showTz=0&showCalendars=0&showTabs=0&showTitle=0&title=Moon%20River%20Public%20Calendar&src=Y18zMDFiOWU4YTJiZmQzYWNkYmYxOGI2NTY3NWQ4YWNlNGMwNjk2ZmQ5YmQ4ODFlNDc3ZDA5OTFhZGI5MDcxNGM3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23b39ddb&color=%230b8043"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  frameBorder="0"
                  scrolling="no"
                />
              </div>

              {/* Decorative Note */}
              <div className="mt-6 pt-6 border-t border-primary/20">
                <p className="text-center font-casual text-lg text-muted-foreground">
                  "Looking forward to seeing you at our next event!"
                </p>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-card/95 rounded-2xl p-6 warm-shadow-enhanced vintage-paper text-center">
                <div className="text-4xl mb-3">🎵</div>
                <h3 className="text-xl font-handwritten text-primary mb-2">Live Music</h3>
                <p className="text-sm text-muted-foreground font-casual">
                  Local artists
                </p>
              </div>

              <div className="bg-card/95 rounded-2xl p-6 warm-shadow-enhanced vintage-paper text-center">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-xl font-handwritten text-primary mb-2">Art Shows</h3>
                <p className="text-sm text-muted-foreground font-casual">
                  Exhibitions featuring local artists
                </p>
              </div>

              <div className="bg-card/95 rounded-2xl p-6 warm-shadow-enhanced vintage-paper text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-xl font-handwritten text-primary mb-2">Community</h3>
                <p className="text-sm text-muted-foreground font-casual">
                  Special gatherings and workshops
                </p>
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </main>
    </>
  );
}
