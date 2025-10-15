"use client";

import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { TextReveal } from "@/components/ui/text-reveal";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Particles } from "@/components/ui/particles";
import { Coffee, Heart, Music, Palette, Book, Users, Award, Sparkles, Calendar, ChevronDown, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// Custom BentoGridItem Component
const BentoGridItem = ({
  title,
  description,
  icon,
  className,
  children
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn(
      "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
      className
    )}>
      {children}
      <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-[#AE8625]/20 to-[#D2AC47]/20">
            {icon}
          </div>
        </div>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};

export default function OurStory() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      title: "Hand-Painted Artistry",
      description: "Kate's original acrylic and oil paintings adorn our walls, including a stunning hand-painted mural that doubles as our menu board",
      icon: <Palette className="h-5 w-5" />,
      className: "md:col-span-2",
      image: "/images_videos/our_story/moonriver_artwork.jpg"
    },
    {
      title: "World Treasures",
      description: "An 1863 German steamer trunk, 1876 coffee grinder, antique apothecary scales, and brass register tell stories from around the globe",
      icon: <Sparkles className="h-5 w-5" />,
      className: "md:col-span-1"
    },
    {
      title: "Celestial Ceiling",
      description: "Hand-painted mosaic ceiling sprinkled with moon and star motifs casts a warm, enchanting glow throughout the café",
      icon: <Star className="h-5 w-5" />,
      className: "md:col-span-1"
    },
    {
      title: "The Cozy Interior",
      description: "Every corner tells a story, inviting you to sip slowly and stay awhile",
      icon: <Heart className="h-5 w-5" />,
      className: "md:col-span-2",
      image: "/images_videos/our_story/moonriver_today_inside.jpg"
    }
  ];

  const offerings = [
    {
      title: "European Café Traditions",
      description: "Lavazza coffee, house-made Belgian waffles, delicate scones with clotted cream, and gourmet sandwiches with Florida flair",
      icon: <Coffee className="h-5 w-5" />
    },
    {
      title: "The Palm Court",
      description: "Elegant weekend afternoon high tea with fine china, premium loose-leaf teas, and freshly baked treats under a crystal chandelier",
      icon: <Heart className="h-5 w-5" />
    },
    {
      title: "Sober Bar Experience",
      description: "Brevard County's first and only alcohol-free bar, featuring exquisite zero-proof mocktails crafted with care",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      title: "The Galleria",
      description: "In-house art gallery showcasing rotating exhibits from local and international artists alongside your morning coffee",
      icon: <Palette className="h-5 w-5" />
    },
    {
      title: "Live Arts & Music",
      description: "Acoustic performances, poetry readings, 'coffee and canvas' workshops, and creative sessions that blur café and arts center",
      icon: <Music className="h-5 w-5" />
    },
    {
      title: "Local Authors' Corner",
      description: "Dedicated shelf space for Brevard writers with book signings, author spotlights, and children's storytime events",
      icon: <Book className="h-5 w-5" />
    }
  ];

  const testimonials = [
    {
      quote: "Moon River feels like home. It's where I come to write, to think, and to be inspired.",
      author: "Sarah M.",
      title: "Local Author"
    },
    {
      quote: "The perfect blend of coffee, culture, and community. This place is magical!",
      author: "James R.",
      title: "Daily Visitor"
    },
    {
      quote: "Mary and Kate have created something truly special. It's more than a café – it's a sanctuary.",
      author: "Emily L.",
      title: "Artist"
    },
    {
      quote: "The attention to detail is incredible. Every visit feels like a new discovery.",
      author: "Michael T.",
      title: "Coffee Enthusiast"
    },
    {
      quote: "My children love storytime here. It's become our favorite weekend tradition.",
      author: "Amanda K.",
      title: "Mom of Two"
    }
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
      `}</style>

      <ScrollProgress className="top-[64px] z-40" />
      <SiteHeader />

      <main className="flex flex-col">
        {/* Hero Section with Parallax */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Parallax Image Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          >
            <Image
              src="/images_videos/our_story/moonriver_hero.jpg"
              alt="Moon River Café interior"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-[1]" />

          {/* Particles Effect */}
          <Particles
            className="absolute inset-0 z-[2]"
            quantity={50}
            ease={80}
            refresh={false}
          />

          <div className="container mx-auto px-4 py-32 relative z-10">
            <BlurFade delay={0.25} inView>
              <AnimatedGradientText className="mb-6">
                <span className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-lg font-medium`
                )}>
                  A Dream Over Two Decades in the Making
                </span>
              </AnimatedGradientText>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <h1
                className="text-6xl md:text-8xl font-bold mb-6 text-white max-w-4xl mx-auto"
                style={{
                  fontFamily: 'TanNimbus, sans-serif',
                  WebkitTextStroke: '3px #926F34',
                  paintOrder: 'stroke fill'
                }}
              >
                Our Story
              </h1>
            </BlurFade>

            <BlurFade delay={0.75} inView>
              <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
                A mother-daughter vision brought to life in the heart of Downtown Melbourne
              </p>
            </BlurFade>

            <BlurFade delay={1} inView>
              <ChevronDown className="h-8 w-8 text-white/60 mx-auto animate-bounce" />
            </BlurFade>
          </div>
        </section>

        {/* Welcome Section with Front Door */}
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <BlurFade delay={0.25} inView>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src="/images_videos/our_story/moonriver_frontdoor.webp"
                      alt="Moon River front door"
                      width={600}
                      height={800}
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <p className="text-white text-lg font-medium">
                        <MapPin className="inline h-5 w-5 mr-2" />
                        Downtown Melbourne, Florida
                      </p>
                    </div>
                  </div>
                </BlurFade>

                <div className="space-y-6">
                  <BlurFade delay={0.5} inView>
                    <AnimatedGradientText className="mb-4">
                      <span className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium`
                      )}>
                        Your Journey Begins Here
                      </span>
                    </AnimatedGradientText>
                  </BlurFade>

                  <BlurFade delay={0.75} inView>
                    <h2
                      className="text-4xl md:text-5xl font-bold mb-6"
                      style={{ fontFamily: 'TanNimbus, sans-serif' }}
                    >
                      Step Into Our World
                    </h2>
                  </BlurFade>

                  <BlurFade delay={1} inView>
                    <TextReveal>
                      Step through our doors and enter a world where time slows down, creativity flourishes, and every cup tells a story. This isn&apos;t just a café – it&apos;s a portal to a place where Old-World charm meets modern comfort, where strangers become friends, and where dreams come to life over coffee.
                    </TextReveal>
                  </BlurFade>

                  <BlurFade delay={1.25} inView>
                    <div className="flex items-center gap-6 mt-8">
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          <NumberTicker value={20} />+
                        </p>
                        <p className="text-sm text-muted-foreground">Years in the Making</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          <NumberTicker value={2025} />
                        </p>
                        <p className="text-sm text-muted-foreground">Grand Opening</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          #<NumberTicker value={1} />
                        </p>
                        <p className="text-sm text-muted-foreground">Coffee House in Brevard</p>
                      </div>
                    </div>
                  </BlurFade>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Dream Begins Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <BlurFade delay={0.25} inView>
                <div className="text-center mb-16">
                  <AnimatedGradientText className="mb-4">
                    <span className={cn(
                      `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium`
                    )}>
                      The Beginning
                    </span>
                  </AnimatedGradientText>
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    A Mother-Daughter Dream
                  </h2>
                </div>
              </BlurFade>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <BlurFade delay={0.5} inView>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <p>
                      Moon River Café & Curiosities began as a spark of inspiration over 20 years ago, when Melbourne locals Mary and Kate Broderick envisioned a creative sanctuary for their community. For years, this mother-daughter duo strolled the historic downtown streets, dreaming of a café that would be more than a coffee shop – a welcoming haven for artists, writers, and neighbors from all walks of life.
                    </p>
                    <p>
                      Even the name &quot;Moon River&quot; carries a special piece of their story: it&apos;s inspired by the classic song Audrey Hepburn sang in <em>Breakfast at Tiffany&apos;s</em>, a lullaby Mary would sing to young Kate years ago. In 2025, that long-held dream became reality as Moon River Café opened its doors in the heart of Downtown Melbourne.
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.75} inView>
                  <Card className="bg-gradient-to-br from-[#AE8625]/10 to-[#D2AC47]/10 border-[#AE8625]/20">
                    <CardContent className="p-12 text-center">
                      <Users className="h-24 w-24 mx-auto mb-4 text-[#AE8625]/40" />
                      <p className="text-lg font-medium text-foreground mb-2">Mary & Kate Broderick</p>
                      <p className="text-muted-foreground italic">
                        Mother & Daughter, Dreamers & Creators
                      </p>
                    </CardContent>
                  </Card>
                </BlurFade>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Section - Before & After */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <BlurFade delay={0.25} inView>
              <div className="max-w-6xl mx-auto text-center mb-16">
                <AnimatedGradientText className="mb-4">
                  <span className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium`
                  )}>
                    The Transformation
                  </span>
                </AnimatedGradientText>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  From Vision to Reality
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Watch how a historic space was lovingly transformed into the magical café you see today
                </p>
              </div>
            </BlurFade>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <BlurFade delay={0.5} inView>
                <div className="relative group">
                  <Badge className="absolute -top-3 left-4 z-10 bg-muted text-muted-foreground">
                    Before Renovations
                  </Badge>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src="/images_videos/our_story/before_renovations.jpg"
                      alt="Before renovations"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.75} inView>
                <div className="relative group">
                  <Badge className="absolute -top-3 left-4 z-10 bg-gradient-to-r from-[#AE8625] to-[#D2AC47] text-white">
                    Moon River Today (2025)
                  </Badge>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src="/images_videos/our_story/moonriver_today_barview.jpg"
                      alt="Moon River today - bar view"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Personal Touches Section with Bento Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <BlurFade delay={0.25} inView>
              <div className="max-w-6xl mx-auto text-center mb-16">
                <AnimatedGradientText className="mb-4">
                  <span className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium`
                  )}>
                    Personal Touches
                  </span>
                </AnimatedGradientText>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  From Lullaby to Local Landmark
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Every corner of Moon River tells a story, infused with art, history, and a mother-daughter&apos;s passion
                </p>
              </div>
            </BlurFade>

            <BentoGrid className="max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <BlurFade key={index} delay={0.25 * (index + 2)} inView>
                  <BentoGridItem
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    className={cn(
                      feature.className,
                      "relative overflow-hidden group cursor-pointer"
                    )}
                  >
                    {feature.image && (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                        />
                      </div>
                    )}
                  </BentoGridItem>
                </BlurFade>
              ))}
            </BentoGrid>

            <BlurFade delay={1.5} inView>
              <div className="mt-12 max-w-4xl mx-auto text-center">
                <p className="text-lg text-muted-foreground">
                  Step inside and you&apos;ll be greeted by Old-World charm with a modern twist. Look around and you&apos;ll spot antiques and curiosities from around the world – each piece carefully curated to spark conversation and creativity. Here, even the tables can double as writing desks and the walls bloom with local art, inviting you to sip slowly, savor deeply, and stay awhile.
                </p>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Coffee Meets Culture Section */}
        <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <BlurFade delay={0.25} inView>
              <div className="max-w-6xl mx-auto text-center mb-16">
                <AnimatedGradientText className="mb-4">
                  <span className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium`
                  )}>
                    Experience
                  </span>
                </AnimatedGradientText>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  Where Coffee Meets Culture
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  More than excellent coffee and tea – a vibrant community gathering space where every cup comes with creativity
                </p>
              </div>
            </BlurFade>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {offerings.map((offering, index) => (
                <BlurFade key={index} delay={0.1 * index} inView>
                  <Card className="hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-[#AE8625]/10 hover:border-[#AE8625]/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gradient-to-r from-[#AE8625]/20 to-[#D2AC47]/20">
                          {offering.icon}
                        </div>
                        {offering.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {offering.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials with Marquee */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <BlurFade delay={0.25} inView>
              <div className="max-w-6xl mx-auto text-center mb-16">
                <AnimatedGradientText className="mb-4">
                  <span className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium`
                  )}>
                    What People Say
                  </span>
                </AnimatedGradientText>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  Stories From Our Community
                </h2>
              </div>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <Marquee className="py-4" pauseOnHover>
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="mx-4 w-96 bg-gradient-to-br from-[#AE8625]/5 to-[#D2AC47]/5 border-[#AE8625]/20">
                    <CardContent className="p-6">
                      <div className="flex gap-2 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#AE8625] text-[#AE8625]" />
                        ))}
                      </div>
                      <p className="text-lg mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </Marquee>
            </BlurFade>
          </div>
        </section>

        {/* Award Recognition Section */}
        <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <BlurFade delay={0.25} inView>
                <div className="inline-block mb-8">
                  <div className="relative">
                    <Award className="h-24 w-24 text-[#AE8625] mx-auto" />
                    <Sparkles className="h-8 w-8 text-[#F7EF8A] absolute -top-2 -right-2 animate-pulse" />
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.5} inView>
                <Badge className="mb-6 bg-gradient-to-r from-[#AE8625] to-[#D2AC47] text-white text-lg px-6 py-2">
                  Award Winner
                </Badge>
              </BlurFade>

              <BlurFade delay={0.75} inView>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-6"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  Brevard&apos;s #<NumberTicker value={1} /> Coffee House
                </h2>
              </BlurFade>

              <BlurFade delay={1} inView>
                <p className="text-xl text-muted-foreground mb-8">
                  In less than a year of opening, Moon River was crowned Brevard&apos;s &quot;Best Coffee House&quot; after thousands of locals cast their votes in a county-wide poll. Mary and Kate were humbled by the honor, calling it proof that a dream built on passion and community can indeed flourish.
                </p>
              </BlurFade>

              <BlurFade delay={1.25} inView>
                <Card className="bg-gradient-to-br from-[#AE8625]/10 to-[#D2AC47]/10 border-[#AE8625]/20">
                  <CardContent className="p-8">
                    <p className="text-lg text-foreground italic">
                      &quot;Our greatest pride is in the everyday moments: a customer who says the café &apos;feels like home,&apos; an aspiring poet finding her voice at an open-mic night, or neighbors forming new friendships at a Moon River workshop. These moments are the true legacy of Moon River Café.&quot;
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      — Mary & Kate Broderick
                    </p>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Love Letter to Melbourne Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <BlurFade delay={0.25} inView>
                <AnimatedGradientText className="mb-6">
                  <span className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-lg font-medium`
                  )}>
                    A Love Letter to Melbourne
                  </span>
                </AnimatedGradientText>
              </BlurFade>

              <BlurFade delay={0.5} inView>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-8"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  You&apos;re Part of Our Story
                </h2>
              </BlurFade>

              <div className="space-y-6 text-lg text-muted-foreground mb-12">
                <BlurFade delay={0.75} inView>
                  <p>
                    In many ways, Moon River Café & Curiosities is a love letter to Melbourne – an homage to the town and people that inspired its creation. Mary often says she and Kate didn&apos;t just build a café; they built a community space where every cup comes with a story and every visitor becomes part of the family.
                  </p>
                </BlurFade>
                <BlurFade delay={1} inView>
                  <p>
                    By reviving the timeless tradition of the neighborhood coffee house and tea room, Moon River brings old-fashioned hospitality and &quot;anything is possible&quot; creativity into the modern day. The atmosphere is fun and imaginative, yet always professional in its service.
                  </p>
                </BlurFade>
                <BlurFade delay={1.25} inView>
                  <p>
                    What started with a song and a vision between a mother and daughter has blossomed into a vibrant gathering place for all of Melbourne. We invite you to come sip, savor, create, and stay awhile under our roof – because this isn&apos;t just our story, it&apos;s one we share with everyone who walks through our door.
                  </p>
                </BlurFade>
              </div>

              <BlurFade delay={1.5} inView>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#926F34] hover:to-[#AE8625] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="/">
                      <Coffee className="h-4 w-4 mr-2" />
                      Visit Us Today
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#AE8625] text-[#AE8625] hover:bg-[#AE8625]/10 shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="/calendar">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Our Events
                    </Link>
                  </Button>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />
      </main>
    </>
  );
}