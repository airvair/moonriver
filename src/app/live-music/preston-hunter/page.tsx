"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { ExternalLink, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// TikTok icon component (not in lucide-react)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/prestonhuntermusic/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/prestonhuntermusic",
    icon: Facebook,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@prestonhuntermusic",
    icon: TikTokIcon,
  },
];

export default function PrestonHunterPage() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex flex-col unified-background">
        {/* Hero Section */}
        <BlurFade delay={0} duration={0.6}>
          <section className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />

            <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
              <div className="max-w-4xl mx-auto">
                {/* Portrait Photo */}
                <BlurFade delay={0.1}>
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto mb-6 sm:mb-8 rounded-full overflow-hidden warm-shadow-enhanced border-4 border-primary/20">
                    <Image
                      src="/images_videos/preston-hunter/portait_photo.jpg"
                      alt="Preston Hunter"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </BlurFade>

                <BlurFade delay={0.2}>
                  {/* Logo */}
                  <div className="relative w-56 sm:w-72 md:w-96 h-16 sm:h-20 md:h-24 mx-auto mb-4">
                    <Image
                      src="/images_videos/preston-hunter/prestonhunter_logo.png"
                      alt="Preston Hunter Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-casual italic px-2">
                    Singer-songwriter crafting authentic folk and acoustic music
                  </p>
                </BlurFade>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* About Section */}
        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <BlurFade delay={0.1} inView>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  About the Artist
                </h2>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-casual leading-relaxed mb-5 sm:mb-6">
                  Preston Hunter is a Melbourne, Florida-based singer-songwriter whose music weaves
                  together the warmth of folk traditions with the intimacy of acoustic storytelling.
                  His performances at Moon River Cafe bring a soulful energy that perfectly complements
                  our cozy, community-focused atmosphere.
                </p>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-casual leading-relaxed mb-6 sm:mb-8">
                  With a gift for crafting melodies that feel both timeless and fresh, Preston creates
                  musical moments that invite listeners to slow down, connect, and feel something real.
                </p>
              </BlurFade>

              {/* Social Links */}
              <BlurFade delay={0.4} inView>
                <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.name}
                      variant="outline"
                      size="lg"
                      asChild
                      className="gap-2"
                    >
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <link.icon className="size-5" />
                        <span className="sr-only md:not-sr-only">{link.name}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </BlurFade>

              {/* External Website Link */}
              <BlurFade delay={0.5} inView>
                <div className="text-center">
                  <Button size="lg" asChild className="gap-2">
                    <Link
                      href="https://prestonhuntermusic.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Full Website
                      <ExternalLink className="size-4" />
                    </Link>
                  </Button>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Upcoming Appearances Section */}
        <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <BlurFade delay={0.1} inView>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  Upcoming at Moon River
                </h2>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <div className="bg-background rounded-xl sm:rounded-2xl p-6 sm:p-8 warm-shadow text-center">
                  <p className="text-base sm:text-lg text-muted-foreground font-casual">
                    Check back soon for upcoming performance dates!
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-4">
                    Follow Preston on social media or check our{" "}
                    <Link href="/calendar" className="text-primary hover:underline">
                      events calendar
                    </Link>{" "}
                    for the latest updates.
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Merch Placeholder Section */}
        <section className="py-12 sm:py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <BlurFade delay={0.1} inView>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  Merchandise
                </h2>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <div className="bg-muted/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center border-2 border-dashed border-muted-foreground/20">
                  <p className="text-base sm:text-lg text-muted-foreground font-casual">
                    Coming Soon
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-2">
                    Artist merchandise will be available here in the future.
                  </p>
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
