"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/ui/blur-fade";
import { Phone, Coffee, Music, Sandwich, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AfternoonTea() {
  const highlights = [
    { icon: Sparkles, text: "Luxurious Pastries", ariaLabel: "Luxurious pastries included" },
    { icon: Coffee, text: "Finest Teas", ariaLabel: "Finest teas included" },
    { icon: Sandwich, text: "Classic Sandwiches", ariaLabel: "Classic sandwiches included" },
    { icon: Music, text: "Live Music", ariaLabel: "Live music accompaniment" }
  ];

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

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-glow {
            animation: none;
          }
        }
      `}</style>
      <SiteHeader />
      <main className="flex flex-col relative unified-background overflow-hidden min-h-screen">
        {/* Single Viewport Layout */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-8" role="main" aria-label="Afternoon Tea Service Information">

          {/* Content Container */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto w-full">
              {/* Header */}
              <BlurFade delay={0} duration={0.6}>
                <header className="text-center mb-6 sm:mb-8">
                  <BlurFade delay={0.1}>
                    <div className="mb-4">
                      <span
                        className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 font-handwritten text-base stamp"
                        role="note"
                        aria-label="This is a Moon River tradition"
                      >
                        <Coffee className="inline-block w-4 h-4 mr-1 -mt-1" aria-hidden="true" />
                        A Moon River Tradition
                      </span>
                    </div>
                  </BlurFade>
                  <BlurFade delay={0.2}>
                    <h1
                      className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 handwritten-underline"
                      style={{
                        fontFamily: 'TanNimbus, serif',
                        color: '#926F34'
                      }}
                    >
                      Afternoon Tea
                    </h1>
                  </BlurFade>
                  <BlurFade delay={0.3}>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-casual px-2">
                      Luxurious pastries, finest teas, and live music in timeless sophistication
                    </p>
                  </BlurFade>
                </header>
              </BlurFade>

              {/* Info Grid */}
              <BlurFade delay={0.1} inView>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-4 sm:mb-6">
                  {/* Highlights Card */}
                  <BlurFade delay={0.1} inView>
                    <Card className="backdrop-blur-sm border-2 border-primary/20 warm-shadow-enhanced rounded-xl sm:rounded-2xl paper-texture hover:shadow-xl transition-all duration-300 group">
                      <CardContent className="p-4 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-handwritten text-primary mb-3 sm:mb-4 flex items-center gap-2">
                          <Sparkles className="w-5 h-5" aria-hidden="true" />
                          What&apos;s Included
                        </h2>
                        <ul className="grid grid-cols-2 gap-2 sm:gap-3" role="list" aria-label="Afternoon tea inclusions">
                          {highlights.map((item) => {
                            const Icon = item.icon;
                            return (
                              <li
                                key={item.text}
                                className="flex items-center gap-2 p-2 rounded-md hover:bg-primary/5 transition-colors"
                                aria-label={item.ariaLabel}
                              >
                                <Icon className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                                <span className="text-sm font-casual text-foreground">{item.text}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </CardContent>
                    </Card>
                  </BlurFade>

                  {/* Reservation Card */}
                  <BlurFade delay={0.15} inView>
                    <Card className="backdrop-blur-sm border-2 border-primary/20 warm-shadow-enhanced rounded-xl sm:rounded-2xl paper-texture hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="relative h-24 sm:h-32 overflow-hidden">
                        <Image
                          src="/images_videos/afternoon_tea/high_tea.jpg"
                          alt="Elegant afternoon tea setup with fine china, pastries, and tea service"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                      </div>
                      <CardContent className="p-4 sm:p-6 -mt-4 relative z-10">
                        <h2 className="text-lg sm:text-xl font-handwritten text-primary mb-2 sm:mb-3">Reserve Now</h2>
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-baseline gap-2" role="text" aria-label="Price: 65 dollars per person">
                            <span className="text-2xl sm:text-3xl font-handwritten text-primary">$65</span>
                            <span className="text-sm font-casual text-muted-foreground">per person</span>
                          </div>
                          <Button
                            className="w-full bg-primary hover:bg-primary/90 text-white font-handwritten text-sm sm:text-base focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all min-h-[44px]"
                            asChild
                          >
                            <Link
                              href="https://www.eventbrite.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Book afternoon tea on Eventbrite (opens in new tab)"
                            >
                              Book on Eventbrite
                            </Link>
                          </Button>
                          <Button
                            className="w-full font-handwritten text-sm sm:text-base focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all border-primary/30 hover:bg-primary/10 min-h-[44px]"
                            variant="outline"
                            aria-label="Call to reserve afternoon tea"
                          >
                            <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                            Call to Reserve
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </BlurFade>
                </div>
              </BlurFade>

              {/* Bottom Note */}
              <BlurFade delay={0.2} inView>
                <footer className="text-center" role="contentinfo" aria-label="Important information">
                  <p className="text-sm text-muted-foreground font-casual">
                    Reservations required <span aria-hidden="true">•</span> Served daily <span aria-hidden="true">•</span> Groups of 6+ please call ahead
                  </p>
                </footer>
              </BlurFade>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}