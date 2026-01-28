"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NextEvent } from "@/components/ui/next-event";
import { StoreHours } from "@/components/ui/store-hours";
import { cn } from "@/lib/utils";
import { TestimonialMarquee } from "@/components/testimonial-marquee";
import { useState, useEffect } from "react";
import { getOpenStatus } from "@/lib/hours";

export default function Home() {
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean; message: string } | null>(null);

  useEffect(() => {
    // Check if cafe is open using the same logic as StoreHours
    const checkStatus = () => {
      setOpenStatus(getOpenStatus());
    };

    checkStatus();
    // Update every minute
    const interval = setInterval(checkStatus, 60000);

    return () => clearInterval(interval);
  }, []);

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
      <main className="flex flex-col relative unified-background overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Background Image */}
          <img
            src="/images_videos/Cafe Pics/Reading Room.png"
            alt="Moon River Café interior"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Warm Overlay for Text Readability with golden hour effect */}
          <div className="absolute inset-0 z-[1]">
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/40-to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#926F34]/10 via-transparent to-[#D4AF37]/10" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FFE5B4]/5 to-transparent" />
          </div>

          <div className="container mx-auto px-4 py-20 sm:py-32 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 max-w-7xl mx-auto">
              {/* Left side - Main content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  <a
                    href="https://www.floridatoday.com/story/entertainment/dining/2025/10/03/moon-river-cafe-named-best-coffee-shop-in-brevard-by-our-readers-florida/86310528007/?gnt-cfr=1&gca-cat=p&gca-uir=true&gca-epti=z11xx53p000450c000450e008700v11xx53b00xxxxd11xx65&gca-ft=228&gca-ds=sophi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 sm:px-4 py-2 bg-primary/10 text-primary rounded-full text-sm sm:text-lg font-medium border border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:scale-105 warm-glow"
                  >
                    ☕ Best Café in Brevard — Florida Today
                  </a>
                  {/* Open/Closed Indicator */}
                  {openStatus && (
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full font-handwritten text-sm sm:text-lg transition-all duration-300 hover:scale-105",
                      openStatus.isOpen
                        ? "bg-green-900/80 text-green-100 border-2 border-green-400/50 hover:bg-green-900/90"
                        : "bg-red-900/80 text-red-100 border-2 border-red-400/50 hover:bg-red-900/90"
                    )}>
                      <span className="animate-pulse">{openStatus.isOpen ? '🟢' : '🔴'}</span>
                      {openStatus.message}
                    </div>
                  )}
                </div>

                <h1
                  className="text-4xl sm:text-5xl md:text-7xl font-bold mt-6 sm:mt-8 mb-4 sm:mb-6 text-white"
                  style={{
                    fontFamily: 'TanNimbus, sans-serif',
                    WebkitTextStroke: '3px #926F34',
                    paintOrder: 'stroke fill'
                  }}
                >
                  Moon River Café
                </h1>
              </div>

              {/* Right side - Info boxes */}
              <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-96 xl:w-[28rem]">
                {/* Next Event Box */}
                <div className="backdrop-blur-sm border-2 border-primary/20 warm-shadow-enhanced rounded-2xl min-h-[180px] paper-texture">
                  <NextEvent />
                </div>

                {/* Store Hours Box */}
                <div className="backdrop-blur-sm border-2 border-primary/20 warm-shadow-enhanced rounded-2xl paper-texture">
                  <StoreHours />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Items - 3 Column Grid */}
        <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  House Favorites
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                Our Signature Items
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-casual px-2">
                The creations that keep our community coming back
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {/* Bella Capri */}
              <div className="bg-card/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 warm-shadow-enhanced vintage-paper cozy-card">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src="/images_videos/food/Moon River_Food Pics_Jan 2026/Bella Capri.png"
                    alt="Bella Capri"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <span className="stamp stamp-fresh text-xs">Best Seller</span>
                <h3 className="text-2xl font-handwritten text-primary mt-4 mb-2">
                  Bella Capri
                </h3>
                <p className="text-muted-foreground mb-4 font-casual">
                  A delightful Italian-inspired creation that captures the essence of the Mediterranean
                </p>
              </div>

              {/* Regency Toast */}
              <div className="bg-card/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 warm-shadow-enhanced vintage-paper cozy-card">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src="/images_videos/food/Moon River_Food Pics_Jan 2026/Regency Toast-2.png"
                    alt="Regency Toast"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <span className="stamp stamp-fresh stamp-tilted text-xs">Fresh</span>
                <h3 className="text-2xl font-handwritten text-primary mt-4 mb-2">
                  Regency Toast
                </h3>
                <p className="text-muted-foreground mb-4 font-casual">
                  Thick-cut brioche French toast with seasonal toppings, made fresh every morning
                </p>
              </div>

              {/* Belgian Waffle and Baron */}
              <div className="bg-card/95 rounded-2xl sm:rounded-3xl p-6 sm:p-8 warm-shadow-enhanced vintage-paper cozy-card">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src="/images_videos/food/Moon River_Food Pics_Jan 2026/Belgian Waffle and Baron.png"
                    alt="Belgian Waffle and Baron"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <span className="stamp stamp-fresh text-xs">Local Favorite</span>
                <h3 className="text-2xl font-handwritten text-primary mt-4 mb-2">
                  Belgian Waffle & Baron
                </h3>
                <p className="text-muted-foreground mb-4 font-casual">
                  Crispy Belgian waffle paired with our signature Baron coffee — the perfect brunch combo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  From Our Coffee Family
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                What Our Friends Say
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                Real stories from the wonderful people who make Moon River special
              </p>
            </div>

            <TestimonialMarquee />
          </div>
        </section>


        {/* Footer */}
        <SiteFooter />
      </main>
    </>
  );
}