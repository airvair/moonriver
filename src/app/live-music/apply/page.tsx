"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlurFade } from "@/components/ui/blur-fade";

export default function ApplyToPerformPage() {
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

      <main id="main-content" className="flex flex-col unified-background">
        {/* Hero Section */}
        <BlurFade delay={0} duration={0.6}>
          <section className="relative min-h-[35vh] sm:min-h-[40vh] flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />

            <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10">
              <div className="max-w-4xl mx-auto">
                <BlurFade delay={0.2}>
                  <h1
                    className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    Perform at Moon River
                  </h1>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-casual max-w-2xl mx-auto px-2">
                    We love hosting live music at the cafe! If you&apos;re a musician interested in
                    performing at Moon River, we&apos;d love to hear from you.
                  </p>
                </BlurFade>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Form Section */}
        <section className="py-8 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BlurFade delay={0.1} inView>
                <div className="bg-background rounded-xl sm:rounded-2xl warm-shadow overflow-hidden">
                  {/* Form Header */}
                  <div className="p-4 sm:p-6 md:p-8 border-b border-border">
                    <h2
                      className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
                      style={{ fontFamily: 'TanNimbus, sans-serif' }}
                    >
                      Musician Application
                    </h2>
                    <p className="text-muted-foreground font-casual">
                      Please fill out the form below and we&apos;ll be in touch if we think you&apos;d
                      be a good fit for our venue.
                    </p>
                  </div>

                  {/* Google Form Embed */}
                  <div className="p-4 sm:p-6 md:p-8">
                    <iframe
                      src="https://docs.google.com/forms/d/e/1FAIpQLSedOpH9eTGHWAerw212aQ0C54yHcOb6WOd8loO7W-6WnS3FQQ/viewform?embedded=true"
                      width="100%"
                      height="872"
                      frameBorder="0"
                      marginHeight={0}
                      marginWidth={0}
                      title="Musician Application Form"
                      className="rounded-lg"
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-10 sm:py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <BlurFade delay={0.1} inView>
                <h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  What We&apos;re Looking For
                </h2>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-background rounded-lg sm:rounded-xl p-5 sm:p-6 warm-shadow">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Music Style</h3>
                    <p className="text-muted-foreground font-casual text-sm">
                      We welcome acoustic, folk, singer-songwriter, jazz, and similar genres that
                      complement our cozy cafe atmosphere.
                    </p>
                  </div>

                  <div className="bg-background rounded-lg sm:rounded-xl p-5 sm:p-6 warm-shadow">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Performance Format</h3>
                    <p className="text-muted-foreground font-casual text-sm">
                      Solo artists and small acoustic ensembles work best for our intimate space.
                      Typically sets run 1-2 hours.
                    </p>
                  </div>

                  <div className="bg-background rounded-lg sm:rounded-xl p-5 sm:p-6 warm-shadow">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">What to Include</h3>
                    <p className="text-muted-foreground font-casual text-sm">
                      Please share links to your music (Spotify, YouTube, SoundCloud, etc.) and
                      any social media where we can learn more about you.
                    </p>
                  </div>

                  <div className="bg-background rounded-lg sm:rounded-xl p-5 sm:p-6 warm-shadow">
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Local Artists</h3>
                    <p className="text-muted-foreground font-casual text-sm">
                      We especially love supporting local Melbourne and Space Coast musicians, but
                      we welcome applications from all artists.
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
