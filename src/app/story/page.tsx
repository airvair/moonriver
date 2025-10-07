"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Heart, Music, Palette, Book, Users, Award, Sparkles, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function OurStory() {
  const features = [
    {
      title: "Hand-Painted Artistry",
      description: "Kate's original acrylic and oil paintings adorn our walls, including a stunning hand-painted mural that doubles as our menu board",
      icon: <Palette className="h-5 w-5" />,
      placeholder: true
    },
    {
      title: "World Treasures",
      description: "An 1863 German steamer trunk, 1876 coffee grinder, antique apothecary scales, and brass register tell stories from around the globe",
      icon: <Sparkles className="h-5 w-5" />,
      placeholder: true
    },
    {
      title: "Celestial Ceiling",
      description: "Hand-painted mosaic ceiling sprinkled with moon and star motifs casts a warm, enchanting glow throughout the café",
      icon: <Sparkles className="h-5 w-5" />,
      placeholder: true
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
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Image Background */}
          <Image
            src="/images_videos/our_story/moonriver_today_inside.jpg"
            alt="Moon River Café interior"
            fill
            className="object-cover"
            priority
          />

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-[1]" />

          <div className="container mx-auto px-4 py-32 relative z-10">
            <AnimatedGradientText className="mb-6">
              <span className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-lg font-medium`
              )}>
                A Dream Over Two Decades in the Making
              </span>
            </AnimatedGradientText>

            <h1
              className="text-5xl md:text-7xl font-bold mb-6 text-white max-w-4xl mx-auto"
              style={{
                fontFamily: 'TanNimbus, sans-serif',
                WebkitTextStroke: '3px #926F34',
                paintOrder: 'stroke fill'
              }}
            >
              Our Story
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              A mother-daughter vision brought to life in the heart of Downtown Melbourne
            </p>
          </div>
        </section>

        {/* The Dream Begins Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <AnimatedGradientText className="mb-4">
                    <span className={cn(
                      `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium`
                    )}>
                      The Beginning
                    </span>
                  </AnimatedGradientText>
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-6"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    A Dream Over Two Decades
                  </h2>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <p>
                      Moon River Café & Curiosities began as a spark of inspiration over 20 years ago, when Melbourne locals Mary and Kate Broderick envisioned a creative sanctuary for their community. For years, this mother-daughter duo strolled the historic downtown streets, dreaming of a café that would be more than a coffee shop – a welcoming haven for artists, writers, and neighbors from all walks of life.
                    </p>
                    <p>
                      Even the name &quot;Moon River&quot; carries a special piece of their story: it&apos;s inspired by the classic song Audrey Hepburn sang in <em>Breakfast at Tiffany&apos;s</em>, a lullaby Mary would sing to young Kate years ago. In 2025, that long-held dream became reality as Moon River Café opened its doors in the heart of Downtown Melbourne.
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  {/* Placeholder for Mary & Kate photo */}
                  <Card className="bg-gradient-to-br from-[#AE8625]/10 to-[#D2AC47]/10 border-[#AE8625]/20">
                    <CardContent className="p-12 text-center">
                      <Users className="h-24 w-24 mx-auto mb-4 text-[#AE8625]/40" />
                      <p className="text-muted-foreground italic">
                        Photo of Mary & Kate Broderick coming soon
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Section - Before & After */}
        <section className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Before */}
              <div className="relative group">
                <Badge className="absolute -top-3 left-4 z-10 bg-muted text-muted-foreground">
                  Before Renovations
                </Badge>
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images_videos/our_story/before_renovations.jpg"
                    alt="Before renovations"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>

              {/* After */}
              <div className="relative group">
                <Badge className="absolute -top-3 left-4 z-10 bg-gradient-to-r from-[#AE8625] to-[#D2AC47] text-white">
                  Moon River Today (2025)
                </Badge>
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images_videos/our_story/moonriver_today_barview.jpg"
                    alt="Moon River today - bar view"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mother-Daughter Dream Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <MagicCard
                  key={index}
                  className="cursor-pointer bg-card/50 backdrop-blur border-[#AE8625]/10"
                  gradientColor="#D2AC47"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-r from-[#AE8625]/20 to-[#D2AC47]/20">
                        {feature.icon}
                      </div>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                    {feature.placeholder && (
                      <p className="text-xs text-muted-foreground mt-4 italic">
                        Photo coming soon
                      </p>
                    )}
                  </CardContent>
                </MagicCard>
              ))}
            </div>

            <div className="mt-12 max-w-4xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                Step inside and you&apos;ll be greeted by Old-World charm with a modern twist. Look around and you&apos;ll spot antiques and curiosities from around the world – each piece carefully curated to spark conversation and creativity. Here, even the tables can double as writing desks and the walls bloom with local art, inviting you to sip slowly, savor deeply, and stay awhile.
              </p>
            </div>
          </div>
        </section>

        {/* Coffee Meets Culture Section */}
        <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {offerings.map((offering, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-card/50 backdrop-blur">
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
              ))}
            </div>
          </div>
        </section>

        {/* Community Impact Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  {/* Placeholder for community event photo */}
                  <Card className="bg-gradient-to-br from-[#AE8625]/10 to-[#D2AC47]/10 border-[#AE8625]/20">
                    <CardContent className="p-12 text-center">
                      <Users className="h-24 w-24 mx-auto mb-4 text-[#AE8625]/40" />
                      <p className="text-muted-foreground italic">
                        Community event photos coming soon
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="order-1 lg:order-2">
                  <AnimatedGradientText className="mb-4">
                    <span className={cn(
                      `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium`
                    )}>
                      Community
                    </span>
                  </AnimatedGradientText>
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-6"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    Brewing Community & Creativity
                  </h2>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <p>
                      From the start, giving back to the community has been as important to Moon River as serving a perfect cup of coffee. We partner with area non-profits and organizations to uplift local talent and causes.
                    </p>
                    <p>
                      Our Local Authors&apos; Corner provides shelf space for Brevard writers, hosting meet-and-greet book signings and monthly author spotlights. Bibliophiles can find book club meetings and poetry reading nights on the calendar, including children&apos;s storytime events.
                    </p>
                    <p>
                      The goal is simple: to foster an inclusive, uplifting environment where neighbors become friends and everyone&apos;s creativity is encouraged. It&apos;s not uncommon to see strangers chatting over cappuccinos as if they&apos;ve known each other forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Award Recognition Section */}
        <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-8">
                <div className="relative">
                  <Award className="h-24 w-24 text-[#AE8625] mx-auto" />
                  <Sparkles className="h-8 w-8 text-[#F7EF8A] absolute -top-2 -right-2 animate-pulse" />
                </div>
              </div>

              <Badge className="mb-6 bg-gradient-to-r from-[#AE8625] to-[#D2AC47] text-white text-lg px-6 py-2">
                Award Winner
              </Badge>

              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: 'TanNimbus, sans-serif' }}
              >
                Brevard&apos;s Best Coffee House
              </h2>

              <p className="text-xl text-muted-foreground mb-8">
                In less than a year of opening, Moon River was crowned Brevard&apos;s &quot;Best Coffee House&quot; after thousands of locals cast their votes in a county-wide poll. Mary and Kate were humbled by the honor, calling it proof that a dream built on passion and community can indeed flourish.
              </p>

              <p className="text-lg text-muted-foreground italic">
                &quot;Our greatest pride is in the everyday moments: a customer who says the café &apos;feels like home,&apos; an aspiring poet finding her voice at an open-mic night, or neighbors forming new friendships at a Moon River workshop. These moments are the true legacy of Moon River Café.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Love Letter to Melbourne Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedGradientText className="mb-6">
                <span className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-lg font-medium`
                )}>
                  A Love Letter to Melbourne
                </span>
              </AnimatedGradientText>

              <h2
                className="text-4xl md:text-5xl font-bold mb-8"
                style={{ fontFamily: 'TanNimbus, sans-serif' }}
              >
                You&apos;re Part of Our Story
              </h2>

              <div className="space-y-6 text-lg text-muted-foreground mb-12">
                <p>
                  In many ways, Moon River Café & Curiosities is a love letter to Melbourne – an homage to the town and people that inspired its creation. Mary often says she and Kate didn&apos;t just build a café; they built a community space where every cup comes with a story and every visitor becomes part of the family.
                </p>
                <p>
                  By reviving the timeless tradition of the neighborhood coffee house and tea room, Moon River brings old-fashioned hospitality and &quot;anything is possible&quot; creativity into the modern day. The atmosphere is fun and imaginative, yet always professional in its service.
                </p>
                <p>
                  What started with a song and a vision between a mother and daughter has blossomed into a vibrant gathering place for all of Melbourne. We invite you to come sip, savor, create, and stay awhile under our roof – because this isn&apos;t just our story, it&apos;s one we share with everyone who walks through our door.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#926F34] hover:to-[#AE8625] text-white"
                  asChild
                >
                  <Link href="/">
                    Visit Us Today
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#AE8625] text-[#AE8625] hover:bg-[#AE8625]/10"
                  asChild
                >
                  <Link href="/calendar">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Our Events
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />
      </main>
    </>
  );
}
