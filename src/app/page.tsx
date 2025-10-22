"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NextEvent } from "@/components/ui/next-event";
import { StoreHours } from "@/components/ui/store-hours";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
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
            src="/images_videos/home/christmas_cafe.png"
            alt="Moon River Café interior"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Warm Overlay for Text Readability with golden hour effect */}
          <div className="absolute inset-0 z-[1]">
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/40-to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#926F34]/10 via-transparent to-[#D4AF37]/10" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FFE5B4]/5 to-transparent" />
          </div>

          <div className="container mx-auto px-4 py-32 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
              {/* Left side - Main content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href="https://www.floridatoday.com/story/entertainment/dining/2025/10/03/moon-river-cafe-named-best-coffee-shop-in-brevard-by-our-readers-florida/86310528007/?gnt-cfr=1&gca-cat=p&gca-uir=true&gca-epti=z11xx53p000450c000450e008700v11xx53b00xxxxd11xx65&gca-ft=228&gca-ds=sophi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-lg font-medium border border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:scale-105 warm-glow"
                  >
                    ☕ Best Café in Brevard — Florida Today
                  </a>
                  {/* Open/Closed Indicator */}
                  {openStatus && (
                    <div className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-full font-handwritten text-lg transition-all duration-300 hover:scale-105",
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
                  className="text-5xl md:text-7xl font-bold mt-8 mb-6 text-white"
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
              <div className="flex flex-col gap-4 w-full lg:w-96 xl:w-[28rem]">
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
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  House Favorites
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                Our Signature Items
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-casual">
                The creations that keep our community coming back
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Signature Drink */}
              <div className="bg-card/95 rounded-3xl p-8 warm-shadow-enhanced vintage-paper cozy-card">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-[#926F34]/20 via-[#D4AF37]/10 to-primary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2 coffee-steam relative inline-block">☕</div>
                      <p className="text-muted-foreground font-casual text-sm">Signature Drink Photo</p>
                    </div>
                  </div>
                </div>
                <span className="stamp stamp-fresh text-xs">Best Seller</span>
                <h3 className="text-2xl font-handwritten text-primary mt-4 mb-2">
                  Moon River Latte
                </h3>
                <p className="text-muted-foreground mb-4 font-casual">
                  Our signature blend with hints of vanilla and caramel, topped with house-made foam art
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-handwritten text-primary">$5.50</span>
                  <span className="text-sm text-muted-foreground">⭐ 4.9/5</span>
                </div>
              </div>

              {/* Signature Food */}
              <div className="bg-card/95 rounded-3xl p-8 warm-shadow-enhanced vintage-paper cozy-card">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-accent/20 via-secondary/20 to-primary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🥐</div>
                      <p className="text-muted-foreground font-casual text-sm">Signature Food Photo</p>
                    </div>
                  </div>
                </div>
                <span className="stamp stamp-fresh stamp-tilted text-xs">Fresh</span>
                <h3 className="text-2xl font-handwritten text-primary mt-4 mb-2">
                  Almond Croissant
                </h3>
                <p className="text-muted-foreground mb-4 font-casual">
                  Buttery layers filled with almond cream, baked to golden perfection each morning
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-handwritten text-primary">$4.75</span>
                  <span className="text-sm text-muted-foreground">⭐ 5.0/5</span>
                </div>
              </div>

              {/* Specialty Offering */}
              <div className="bg-card/95 rounded-3xl p-8 warm-shadow-enhanced vintage-paper cozy-card">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-primary/15 via-accent/15 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🍰</div>
                      <p className="text-muted-foreground font-casual text-sm">Specialty Item Photo</p>
                    </div>
                  </div>
                </div>
                <span className="stamp stamp-fresh text-xs">Local Favorite</span>
                <h3 className="text-2xl font-handwritten text-primary mt-4 mb-2">
                  Lemon Lavender Cake
                </h3>
                <p className="text-muted-foreground mb-4 font-casual">
                  Light, fragrant cake with local lavender and fresh lemon zest — a Melbourne original
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-handwritten text-primary">$6.00</span>
                  <span className="text-sm text-muted-foreground">⭐ 4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Coffee Story - Split Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Coffee Image placeholder */}
                <div className="order-1">
                  <div className="relative aspect-square rounded-3xl overflow-hidden warm-shadow-enhanced bg-card/80 vintage-paper">
                    {/* Placeholder for coffee image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#926F34]/20 via-[#D4AF37]/10 to-primary/20">
                      <div className="text-center p-8">
                        <div className="text-7xl mb-4">☕</div>
                        <p className="font-handwritten text-3xl text-primary mb-2">
                          Coffee Beans
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Story Content */}
                <div className="order-2">
                  <div className="mb-6">
                    <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                      Craft & Care
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                    Our Coffee Story
                  </h2>
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground font-casual leading-relaxed">
                      Every cup we serve begins with a story. We partner with small, ethical farms
                      that share our values of sustainability and fair trade. Our beans are hand-selected
                      and roasted in small batches to bring out their unique character.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🌱</span>
                        <div>
                          <h3 className="font-handwritten text-xl text-primary mb-1">Ethically Sourced</h3>
                          <p className="text-sm text-muted-foreground">Direct relationships with farmers</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🔥</span>
                        <div>
                          <h3 className="font-handwritten text-xl text-primary mb-1">Small Batch</h3>
                          <p className="text-sm text-muted-foreground">Roasted fresh for peak flavor</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🌍</span>
                        <div>
                          <h3 className="font-handwritten text-xl text-primary mb-1">Single Origin</h3>
                          <p className="text-sm text-muted-foreground">Traceable to the farm</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💚</span>
                        <div>
                          <h3 className="font-handwritten text-xl text-primary mb-1">Sustainable</h3>
                          <p className="text-sm text-muted-foreground">Good for Earth and farmers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section - Side by Side Layout */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Image placeholder */}
                <div className="order-2 lg:order-1">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden warm-shadow-enhanced bg-card/80 vintage-paper">
                    {/* Placeholder for community photo - can be replaced with actual image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10">
                      <div className="text-center p-8">
                        <p className="font-handwritten text-2xl text-primary">
                          Community Gathering Photo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="order-1 lg:order-2">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                    Your Neighborhood Coffee House
                  </h2>
                  <p className="text-xl text-muted-foreground mb-10 font-casual">
                    More than just coffee — we're a gathering place where neighbors become friends
                  </p>

                  {/* 2x2 Grid of features */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-left group">
                      <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110 coffee-steam relative inline-block">☕</div>
                      <h3 className="text-2xl font-handwritten mb-2 text-primary">
                        Fresh Daily
                      </h3>
                      <p className="text-sm text-muted-foreground font-casual">Roasted with love</p>
                    </div>
                    <div className="text-left group">
                      <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 inline-block">🥐</div>
                      <h3 className="text-2xl font-handwritten mb-2 text-primary">
                        Homemade
                      </h3>
                      <p className="text-sm text-muted-foreground font-casual">Baked fresh every morning</p>
                    </div>
                    <div className="text-left group">
                      <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 inline-block">🎨</div>
                      <h3 className="text-2xl font-handwritten mb-2 text-primary">
                        Local Art
                      </h3>
                      <p className="text-sm text-muted-foreground font-casual">Supporting our artists</p>
                    </div>
                    <div className="text-left group">
                      <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110 animate-pulse inline-block">❤️</div>
                      <h3 className="text-2xl font-handwritten mb-2 text-primary">
                        Community
                      </h3>
                      <p className="text-sm text-muted-foreground font-casual">Where everyone belongs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  From Our Coffee Family
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                What Our Friends Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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