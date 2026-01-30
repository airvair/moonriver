"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlurFade } from "@/components/ui/blur-fade";

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
      <main id="main-content" className="flex flex-col min-h-screen unified-background overflow-x-hidden">
        <div className="container mx-auto px-4 py-20 sm:py-28 md:py-32 flex-1">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <BlurFade delay={0} duration={0.6}>
              <div className="text-center mb-8 sm:mb-12">
                <BlurFade delay={0.1}>
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 handwritten-underline"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    Events Calendar
                  </h1>
                </BlurFade>
                <BlurFade delay={0.2}>
                  <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-casual px-2">
                    Join us for live music, art shows, and community gatherings
                  </p>
                </BlurFade>
              </div>
            </BlurFade>

            {/* Calendar Container with Cozy Styling */}
            <BlurFade delay={0.1} inView>
              <div className="bg-card/95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 warm-shadow-enhanced vintage-paper cozy-card border-2 border-primary/10">
                <div className="w-full aspect-square sm:aspect-[4/3] md:aspect-video rounded-xl sm:rounded-2xl overflow-hidden warm-shadow">
                  <iframe
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showTz=0&showCalendars=0&showTabs=0&showTitle=0&title=Moon%20River%20Public%20Calendar&src=Y18zMDFiOWU4YTJiZmQzYWNkYmYxOGI2NTY3NWQ4YWNlNGMwNjk2ZmQ5YmQ4ODFlNDc3ZDA5OTFhZGI5MDcxNGM3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23b39ddb&color=%230b8043"
                    className="w-full h-full"
                    title="Moon River Café Events Calendar"
                    style={{ border: 0 }}
                  />
                </div>

                {/* Decorative Note */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-primary/20">
                  <p className="text-center font-casual text-base sm:text-lg text-muted-foreground">
                    &ldquo;Looking forward to seeing you at our next event!&rdquo;
                  </p>
                </div>
              </div>
            </BlurFade>

            {/* Quick Info Cards */}
            <BlurFade delay={0.2} inView>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
                <BlurFade delay={0.1} inView>
                  <div className="bg-card/95 rounded-xl sm:rounded-2xl p-5 sm:p-6 warm-shadow-enhanced vintage-paper text-center">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎵</div>
                    <h3 className="text-lg sm:text-xl font-handwritten text-primary mb-2">Live Music</h3>
                    <p className="text-sm text-muted-foreground font-casual">
                      Local artists
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.15} inView>
                  <div className="bg-card/95 rounded-xl sm:rounded-2xl p-5 sm:p-6 warm-shadow-enhanced vintage-paper text-center">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎨</div>
                    <h3 className="text-lg sm:text-xl font-handwritten text-primary mb-2">Art Shows</h3>
                    <p className="text-sm text-muted-foreground font-casual">
                      Exhibitions featuring local artists
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.2} inView>
                  <div className="bg-card/95 rounded-xl sm:rounded-2xl p-5 sm:p-6 warm-shadow-enhanced vintage-paper text-center">
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🤝</div>
                    <h3 className="text-lg sm:text-xl font-handwritten text-primary mb-2">Community</h3>
                    <p className="text-sm text-muted-foreground font-casual">
                      Special gatherings and workshops
                    </p>
                  </div>
                </BlurFade>
              </div>
            </BlurFade>
          </div>
        </div>
        <SiteFooter />
      </main>
    </>
  );
}
