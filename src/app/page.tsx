"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NextEvent } from "@/components/ui/next-event";
import { StoreHours } from "@/components/ui/store-hours";
import { cn } from "@/lib/utils";
import { TestimonialMarquee } from "@/components/testimonial-marquee";
import { useState, useEffect } from "react";
import { getOpenStatus, fetchStoreHours, HOURS, type DayHours } from "@/lib/hours";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { MagicCard } from "@/components/ui/magic-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Calendar, Mic, Coffee, ArrowRight } from "lucide-react";
import { getSignatureItems, urlFor, type SanitySignatureItem } from "@/lib/sanity";

// Default signature items (fallback if Sanity fetch fails)
const DEFAULT_SIGNATURE_ITEMS = [
  {
    name: "Bella Capri",
    description: "A delightful Italian-inspired creation that captures the essence of the Mediterranean",
    image: "/images_videos/food/Moon River_Food Pics_Jan 2026/Bella Capri.png",
    badge: "Best Seller",
  },
  {
    name: "Regency Toast",
    description: "Thick-cut brioche French toast with seasonal toppings, made fresh every morning",
    image: "/images_videos/food/Moon River_Food Pics_Jan 2026/Regency Toast-2.png",
    badge: "Fresh",
  },
  {
    name: "Belgian Waffle & Baron",
    description: "Crispy Belgian waffle paired with our signature Baron coffee — the perfect brunch combo",
    image: "/images_videos/food/Moon River_Food Pics_Jan 2026/Belgian Waffle and Baron.png",
    badge: "Local Favorite",
  },
];

interface SignatureItem {
  name: string;
  description: string;
  image: string;
  badge?: string;
}

export default function Home() {
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean; closesSoon?: boolean; message: string } | null>(null);
  const [hours, setHours] = useState<DayHours[]>(HOURS);
  const [timezone, setTimezone] = useState("America/New_York");
  const [signatureItems, setSignatureItems] = useState<SignatureItem[]>(DEFAULT_SIGNATURE_ITEMS);
  const [isLoadingItems, setIsLoadingItems] = useState(true);

  // Fetch store hours from Sanity
  useEffect(() => {
    async function loadHours() {
      try {
        const data = await fetchStoreHours();
        setHours(data.hours);
        setTimezone(data.timezone);
      } catch (error) {
        console.error("Failed to fetch hours:", error);
      }
    }

    loadHours();
  }, []);

  // Fetch signature items from Sanity
  useEffect(() => {
    async function loadSignatureItems() {
      try {
        const items = await getSignatureItems();
        if (items && items.length > 0) {
          setSignatureItems(items.map((item: SanitySignatureItem) => ({
            name: item.name,
            description: item.description,
            image: item.image ? urlFor(item.image).width(800).height(800).url() : DEFAULT_SIGNATURE_ITEMS[0].image,
            badge: item.badge,
          })));
        }
      } catch (error) {
        console.error("Failed to fetch signature items:", error);
      } finally {
        setIsLoadingItems(false);
      }
    }

    loadSignatureItems();
  }, []);

  // Check open status periodically
  useEffect(() => {
    const checkStatus = () => {
      setOpenStatus(getOpenStatus(hours, timezone));
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, [hours, timezone]);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex flex-col relative unified-background overflow-x-hidden">
        {/* Hero Section */}
        <BlurFade delay={0} duration={0.6}>
          <section className="relative h-screen min-h-[600px] max-h-[1200px] flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Image */}
            <Image
              src="/images_videos/Cafe Pics/Reading Room.png"
              alt="Moon River Café interior - cozy reading room with warm lighting"
              fill
              className="object-cover z-0"
              priority
              sizes="100vw"
            />

            {/* Warm Overlay for Text Readability with golden hour effect */}
            <div className="absolute inset-0 z-[1]">
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/40 to-black/50" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#926F34]/10 via-transparent to-[#D4AF37]/10" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FFE5B4]/5 to-transparent" />
            </div>

            <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16 relative z-10 h-full flex items-center">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto w-full">
                {/* Left side - Main content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Badges row - hidden on very small screens to save space */}
                  <BlurFade delay={0.1}>
                    <div className="mb-3 sm:mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                      <a
                        href="https://www.floridatoday.com/story/entertainment/dining/2025/10/03/moon-river-cafe-named-best-coffee-shop-in-brevard-by-our-readers-florida/86310528007/?gnt-cfr=1&gca-cat=p&gca-uir=true&gca-epti=z11xx53p000450c000450e008700v11xx53b00xxxxd11xx65&gca-ft=228&gca-ds=sophi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm lg:text-lg font-medium border border-primary/20 transition-all duration-300 hover:bg-primary/20 hover:scale-105 warm-glow"
                      >
                        ☕ Best Café in Brevard — Florida Today
                      </a>
                      {/* Open/Closed Indicator */}
                      {openStatus && (
                        <div className={cn(
                          "inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-handwritten text-xs sm:text-sm lg:text-lg transition-all duration-300 hover:scale-105",
                          openStatus.isOpen && !openStatus.closesSoon
                            ? "bg-green-900/80 text-green-100 border-2 border-green-400/50 hover:bg-green-900/90"
                            : openStatus.closesSoon
                            ? "bg-amber-900/80 text-amber-100 border-2 border-amber-400/50 hover:bg-amber-900/90"
                            : "bg-red-900/80 text-red-100 border-2 border-red-400/50 hover:bg-red-900/90"
                        )}>
                          <span className="animate-pulse">
                            {openStatus.isOpen && !openStatus.closesSoon ? '🟢' : openStatus.closesSoon ? '🟡' : '🔴'}
                          </span>
                          {openStatus.message}
                        </div>
                      )}
                    </div>
                  </BlurFade>

                  <BlurFade delay={0.2}>
                    <h1
                      className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-4 sm:mt-6 mb-3 sm:mb-4 lg:mb-6 text-white"
                      style={{
                        fontFamily: 'TanNimbus, sans-serif',
                        WebkitTextStroke: '3px #926F34',
                        paintOrder: 'stroke fill'
                      }}
                    >
                      Moon River Café
                    </h1>
                  </BlurFade>

                  {/* Hero CTA Buttons */}
                  <BlurFade delay={0.3}>
                    <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                      <Button asChild size="lg" className="text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 h-10 sm:h-11 warm-shadow-enhanced">
                        <Link href="/menu">
                          View Menu
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 h-10 sm:h-11 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm">
                        <Link href="/story">
                          Our Story
                        </Link>
                      </Button>
                    </div>
                  </BlurFade>
                </div>

                {/* Right side - Info boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-3 sm:gap-4 w-full lg:w-80 xl:w-96 mt-4 lg:mt-0">
                  {/* Next Event Box */}
                  <BlurFade delay={0.4}>
                    <div className="backdrop-blur-sm border-2 border-primary/20 warm-shadow-enhanced rounded-2xl paper-texture h-full">
                      <NextEvent />
                    </div>
                  </BlurFade>

                  {/* Store Hours Box */}
                  <BlurFade delay={0.5}>
                    <div className="backdrop-blur-sm border-2 border-primary/20 warm-shadow-enhanced rounded-2xl paper-texture h-full">
                      <StoreHours />
                    </div>
                  </BlurFade>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Value Proposition Section */}
        <BlurFade delay={0.1} inView>
          <section className="py-10 sm:py-14 md:py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <BlurFade delay={0.1} inView>
                  <h2
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-primary/90 leading-tight"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    Where coffee meets culture in downtown Melbourne
                  </h2>
                </BlurFade>
                <BlurFade delay={0.15} inView>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-casual leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto px-2 sm:px-0">
                    Born from a mother-daughter dream and inspired by European cafés, Moon River is more than a coffee shop —
                    it&apos;s a gathering place for artists, writers, dreamers, and neighbors. A home away from home where
                    every cup poured is an invitation to connect.
                  </p>
                </BlurFade>
                <BlurFade delay={0.2} inView>
                  <Button asChild variant="outline" size="lg" className="warm-glow h-12 sm:h-11 px-6 sm:px-8">
                    <Link href="/story">
                      Read Our Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </BlurFade>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Signature Items - 3 Column Grid */}
        <BlurFade delay={0.1} inView>
          <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <BlurFade delay={0.1} inView>
                <SectionHeader
                  badge="House Favorites"
                  title="Our Signature Items"
                  description="The creations that keep our community coming back"
                />
              </BlurFade>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                {isLoadingItems ? (
                  // Loading skeletons
                  [...Array(3)].map((_, index) => (
                    <BlurFade key={index} delay={0.15 + index * 0.05} inView>
                      <div className="bg-card/95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 warm-shadow-enhanced vintage-paper cozy-card">
                        <Skeleton className="aspect-square rounded-xl sm:rounded-2xl mb-4 sm:mb-6" />
                        <Skeleton className="h-6 w-24 mb-3" />
                        <Skeleton className="h-7 w-32 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4 mt-1" />
                      </div>
                    </BlurFade>
                  ))
                ) : (
                  signatureItems.map((item, index) => (
                    <BlurFade key={item.name} delay={0.15 + index * 0.05} inView>
                      <div className={cn(
                        "bg-card/95 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 warm-shadow-enhanced vintage-paper cozy-card",
                        index === 2 && "sm:col-span-2 md:col-span-1"
                      )}>
                        <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6">
                          <Image
                            src={item.image}
                            alt={`${item.name} at Moon River Café`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        {item.badge && (
                          <span className={cn(
                            "stamp stamp-fresh text-xs",
                            index === 1 && "stamp-tilted"
                          )}>{item.badge}</span>
                        )}
                        <h3 className="text-xl sm:text-2xl font-handwritten text-primary mt-3 sm:mt-4 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground font-casual">
                          {item.description}
                        </p>
                      </div>
                    </BlurFade>
                  ))
                )}
              </div>

              {/* See Full Menu CTA */}
              <BlurFade delay={0.3} inView>
                <div className="text-center mt-8 sm:mt-10 md:mt-12 px-4 sm:px-0">
                  <Button asChild size="lg" className="warm-shadow-enhanced h-12 sm:h-11 px-8 w-full sm:w-auto">
                    <Link href="/menu">
                      See Full Menu
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </BlurFade>
            </div>
          </section>
        </BlurFade>

        {/* Content Discovery Section */}
        <BlurFade delay={0.1} inView>
          <section className="py-16 sm:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <BlurFade delay={0.1} inView>
                <SectionHeader
                  badge="Explore"
                  title="Discover Moon River"
                  description="Stories, events, and experiences waiting for you"
                />
              </BlurFade>

              <div className="max-w-6xl mx-auto">
                {/* Featured Row - Journal & Afternoon Tea */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  {/* The Journal - Featured */}
                  <BlurFade delay={0.15} inView>
                    <Link href="/blog" className="group block">
                      <MagicCard
                        className="h-full rounded-2xl sm:rounded-3xl overflow-hidden"
                        gradientColor="#926F34"
                        gradientFrom="#D4AF37"
                        gradientTo="#926F34"
                        gradientOpacity={0.15}
                      >
                        <div className="relative h-full min-h-[280px] sm:min-h-[320px] p-5 sm:p-6 md:p-8 flex flex-col justify-between">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/10 via-transparent to-orange-100/10 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                              The Journal
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground font-casual leading-relaxed max-w-sm">
                              Stories, recipes, and musings from our little corner of Melbourne
                            </p>
                          </div>

                          <div className="relative z-10 flex items-center gap-2 text-primary font-medium text-sm sm:text-base group-hover:gap-3 transition-all duration-300">
                            Read the Journal
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </MagicCard>
                    </Link>
                  </BlurFade>

                  {/* Afternoon Tea - Featured */}
                  <BlurFade delay={0.2} inView>
                    <Link href="/afternoon-tea" className="group block">
                      <MagicCard
                        className="h-full rounded-2xl sm:rounded-3xl overflow-hidden"
                        gradientColor="#926F34"
                        gradientFrom="#FE8BBB"
                        gradientTo="#D4AF37"
                        gradientOpacity={0.15}
                      >
                        <div className="relative h-full min-h-[280px] sm:min-h-[320px] p-5 sm:p-6 md:p-8 flex flex-col justify-between">
                          {/* Background Pattern */}
                          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/10 via-transparent to-amber-100/10 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                              <Coffee className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                              Afternoon Tea
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground font-casual leading-relaxed max-w-sm">
                              A classic tiered tea service with fresh pastries, savories, and premium teas
                            </p>
                          </div>

                          <div className="relative z-10 flex items-center gap-2 text-primary font-medium text-sm sm:text-base group-hover:gap-3 transition-all duration-300">
                            Reserve Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </MagicCard>
                    </Link>
                  </BlurFade>
                </div>

                {/* Secondary Row - Podcast & Events */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Podcast Card */}
                  <BlurFade delay={0.25} inView>
                    <Link href="/podcast" className="group block">
                      <MagicCard
                        className="h-full rounded-2xl sm:rounded-3xl overflow-hidden"
                        gradientColor="#926F34"
                        gradientFrom="#9E7AFF"
                        gradientTo="#FE8BBB"
                        gradientOpacity={0.12}
                      >
                        <div className="relative h-full min-h-[200px] sm:min-h-[220px] p-5 sm:p-6 flex flex-col justify-between">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/10 via-transparent to-pink-100/10 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                              <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                              Moon River Podcast
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground font-casual leading-relaxed">
                              Conversations with local creatives and community voices
                            </p>
                          </div>

                          <div className="relative z-10 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300 mt-3">
                            Listen Now
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </MagicCard>
                    </Link>
                  </BlurFade>

                  {/* Events Card */}
                  <BlurFade delay={0.3} inView>
                    <Link href="/calendar" className="group block">
                      <MagicCard
                        className="h-full rounded-2xl sm:rounded-3xl overflow-hidden"
                        gradientColor="#926F34"
                        gradientFrom="#60A5FA"
                        gradientTo="#34D399"
                        gradientOpacity={0.12}
                      >
                        <div className="relative h-full min-h-[200px] sm:min-h-[220px] p-5 sm:p-6 flex flex-col justify-between">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 via-transparent to-emerald-100/10 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                              Upcoming Events
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground font-casual leading-relaxed">
                              Open mics, poetry nights, live music, and more
                            </p>
                          </div>

                          <div className="relative z-10 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300 mt-3">
                            View Calendar
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </MagicCard>
                    </Link>
                  </BlurFade>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Testimonials Section */}
        <BlurFade delay={0.1} inView>
          <section className="py-16 sm:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <BlurFade delay={0.1} inView>
                <SectionHeader
                  badge="From Our Coffee Family"
                  title="What Our Friends Say"
                  description="Real stories from the wonderful people who make Moon River special"
                />
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <TestimonialMarquee />
              </BlurFade>
            </div>
          </section>
        </BlurFade>


        {/* Footer */}
        <SiteFooter />
      </main>
    </>
  );
}
