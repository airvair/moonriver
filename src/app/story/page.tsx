"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Sparkles, MapPin, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Polaroid Photo Card Component
const PolaroidCard = ({
  image,
  title,
  caption,
  rotation = 0,
  className
}: {
  image: string;
  title: string;
  caption: string;
  rotation?: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-card p-4 rounded-lg warm-shadow-enhanced transition-all duration-300 hover:scale-105 hover:z-10",
        "paper-texture vintage-paper",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative aspect-square bg-muted rounded-sm overflow-hidden mb-3">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-handwritten text-xl text-primary mb-1">{title}</h3>
      <p className="font-casual text-sm text-muted-foreground">{caption}</p>
    </div>
  );
};

// Sticky Note Component
const StickyNote = ({
  children,
  color = "yellow",
  rotation = 0,
  className
}: {
  children: React.ReactNode;
  color?: "yellow" | "pink" | "blue" | "green";
  rotation?: number;
  className?: string;
}) => {
  const colorClasses = {
    yellow: "bg-yellow-100/90 dark:bg-yellow-900/30",
    pink: "bg-pink-100/90 dark:bg-pink-900/30",
    blue: "bg-blue-100/90 dark:bg-blue-900/30",
    green: "bg-green-100/90 dark:bg-green-900/30"
  };

  return (
    <div
      className={cn(
        "p-6 rounded-sm warm-shadow-enhanced transition-all duration-300 hover:scale-105 hover:z-10",
        "paper-texture",
        colorClasses[color],
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
};

export default function OurStory() {
  const pressArticles = [
    {
      date: "Oct 21, 2025",
      publication: "Hometown News Brevard",
      title: "Writers Remember Mentor with Plaque",
      url: "https://www.hometownnewsbrevard.com/news/local/brevard_county/writers-remember-mentor-with-plaque-at-moon-river-caf/article_e143f66a-b873-5f61-a9fc-5aa06841e8cb.html",
      color: "yellow" as const,
      rotation: -2
    },
    {
      date: "Oct 3, 2025",
      publication: "Florida Today",
      title: "Named Best Coffee Shop in Brevard",
      url: "https://www.floridatoday.com/story/entertainment/dining/2025/10/03/moon-river-cafe-named-best-coffee-shop-in-brevard-by-our-readers-florida/86310528007/",
      color: "pink" as const,
      rotation: 1
    },
    {
      date: "Oct 2, 2025",
      publication: "The Crimson",
      title: "Grand Opening Celebration",
      url: "https://www.crimson.fit.edu/arts_and_entertainment/moon-river-caf-and-curiosities-celebrates-its-grand-opening/article_4cee279c-dcf7-4bd2-a0e2-d82d87ed24ca.html",
      color: "blue" as const,
      rotation: -1
    },
    {
      date: "Sept 29, 2025",
      publication: "Florida Today",
      title: "Top 4 Coffee Shops - Vote Round 3",
      url: "https://www.floridatoday.com/story/entertainment/dining/2025/09/29/top-4-coffee-shops-in-brevard-cast-your-vote-today-round-three-best-in-brevard-coffee/86310165007/",
      color: "green" as const,
      rotation: 2
    },
    {
      date: "Sept 26, 2025",
      publication: "Florida Today",
      title: "Who Will Brew to the Final Four?",
      url: "https://www.floridatoday.com/story/entertainment/dining/2025/09/26/brevard-top-coffee-shops-who-will-brew-their-way-to-the-final-four-vote-best-coffee/86309898007/",
      color: "yellow" as const,
      rotation: -1
    },
    {
      date: "Sept 24, 2025",
      publication: "Florida Today",
      title: "Best Beans in Brevard - Vote Now",
      url: "https://www.floridatoday.com/story/entertainment/dining/2025/09/24/from-titusville-to-palm-bay-who-is-brewing-the-best-beans-in-brevard-vote-best-coffee-shop/86293503007/",
      color: "pink" as const,
      rotation: 1
    },
    {
      date: "Sept 2025",
      publication: "Brevard Business News",
      title: "Featured in Archives",
      url: "https://brevardbusinessnews.com/archives/2025-articles/",
      color: "blue" as const,
      rotation: -2
    },
    {
      date: "Aug 6, 2025",
      publication: "Florida Today",
      title: "Restaurants Opened in Brevard 2025",
      url: "https://www.floridatoday.com/picture-gallery/entertainment/dining/2025/06/05/restaurants-that-opened-in-brevard-in-2025-photos-florida-melbourne-viera-merritt-island/84034775007/",
      color: "green" as const,
      rotation: 1
    },
    {
      date: "May 19, 2025",
      publication: "Brevard is Best",
      title: "Where Coffee Meets Culture",
      url: "https://brevardisbestteam.com/moon-river-cafe-curiosities-where-coffee-meets-culture-in-downtown-melbourne/",
      color: "yellow" as const,
      rotation: -1
    },
    {
      date: "May 7, 2025",
      publication: "Florida Today",
      title: "Mom and Daughter Open Moon River",
      url: "https://www.floridatoday.com/videos/entertainment/dining/2025/05/07/mom-and-daughter-open-moon-river-cafe-and-add-to-melbourne-arts-scene-downtown-artists-coffee/83491830007/",
      color: "pink" as const,
      rotation: 2
    },
    {
      date: "May 1, 2025",
      publication: "Everything Brevard",
      title: "Art, Poetry, Creative Connections",
      url: "https://www.everythingbrevard.com/blog/new-melbourne-caf%C3%A9-features-art-poetry-creative-connections",
      color: "blue" as const,
      rotation: -2
    },
    {
      date: "April 29, 2025",
      publication: "The Crimson",
      title: "Grand Opening Celebration",
      url: "https://www.crimson.fit.edu/arts_and_entertainment/moon-river-caf-and-curiosities-celebrates-its-grand-opening/article_4cee279c-dcf7-4bd2-a0e2-d82d87ed24ca.html",
      color: "green" as const,
      rotation: 1
    },
    {
      date: "April 21, 2025",
      publication: "Hometown News Brevard",
      title: "Steeped in Charm and Creativity",
      url: "https://www.hometownnewsbrevard.com/arts_and_entertainment/dining_reviews/moon-river-caf-curiosities-steeped-in-charm-and-creativity/article_aa6e8fcc-226c-5107-bba3-d436b1c89b42.html",
      color: "yellow" as const,
      rotation: -1
    },
    {
      date: "March 2025",
      publication: "Florida Today",
      title: "Great Month for Restaurants",
      url: "https://www.floridatoday.com/story/entertainment/dining/2025/03/28/march-was-a-great-month-for-restaurants-in-brevard-new-places-to-dine-foodies-cocoa-melbourne/82637175007/",
      color: "pink" as const,
      rotation: 2
    },
    {
      date: "Feb 2025",
      publication: "Business Debut",
      title: "European-Inspired Café Coming",
      url: "https://www.businessdebut.com/european-inspired-cafe-coming-to-melbourne-in-early-march/",
      color: "blue" as const,
      rotation: -1
    },
    {
      date: "Jan 27, 2025",
      publication: "The Crimson",
      title: "Inspiration from Breakfast at Tiffany's",
      url: "https://www.crimson.fit.edu/arts_and_entertainment/moon-river-cafe---a-local-inspiration-from-breakfast-at-tiffany-s/article_e004564c-dcf0-11ef-bfd3-2bbdc00ca918.html",
      color: "green" as const,
      rotation: 1
    },
    {
      date: "Nov 2024",
      publication: "Orlando Voyager",
      title: "Rising Stars: Meet Kate Broderick",
      url: "https://orlandovoyager.com/interview/rising-stars-meet-kate-broderick-of-melbourne/",
      color: "yellow" as const,
      rotation: -2
    },
    {
      date: "Sept 14, 2024",
      publication: "Florida Today",
      title: "Thirsty for Community",
      url: "https://www.floridatoday.com/story/entertainment/dining/2024/09/14/thirsty-for-community-moon-river-cafe-is-making-plans-in-melbourne-culture-arts-poetry-mocktails/74951921007/",
      color: "pink" as const,
      rotation: 2
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

      <main className="flex flex-col unified-background">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a1810] via-[#3d2417] to-[#2a1810]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#926F34]/10 via-transparent to-[#D4AF37]/10" />

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h1
                className="text-5xl md:text-7xl font-bold mb-6 text-white"
                style={{
                  fontFamily: 'TanNimbus, sans-serif',
                  WebkitTextStroke: '3px #926F34',
                  paintOrder: 'stroke fill'
                }}
              >
                Our Story
              </h1>

              <p className="text-xl md:text-2xl text-amber-100/90 mb-8 font-casual italic">
                Some stories begin with fireworks, but ours began with a teapot.
              </p>
            </div>
          </div>
        </section>

        {/* The Beginning - Tea Party Origins */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Polaroid image */}
                <div className="relative order-2 lg:order-1">
                  <PolaroidCard
                    image="/images_videos/our_story/moonriver_today_inside.jpg"
                    title="Where Magic Began"
                    caption="From childhood tea parties to Moon River"
                    rotation={-2}
                  />
                </div>

                {/* Content */}
                <div className="space-y-6 order-1 lg:order-2">
                  <span className="badge-handwritten text-primary">
                    The Beginning
                  </span>
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-6 handwritten-underline"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    A Teapot&apos;s Promise
                  </h2>

                  <Card className="bg-card/95 warm-shadow-enhanced vintage-paper paper-texture">
                    <CardContent className="p-8">
                      <p className="text-lg text-muted-foreground font-casual leading-relaxed mb-4">
                        I grew up in rural Pennsylvania, where winters lasted forever and imagination was often
                        the best source of entertainment. My mother, Mary, understood this better than anyone.
                      </p>
                      <p className="text-lg text-muted-foreground font-casual leading-relaxed">
                        She staged lavish childhood tea parties for me—not the polite sort, but the kind where
                        the mismatched china seemed enchanted, the stuffed animals held complicated political
                        alliances, and every cup poured was an invitation to dream a little bigger than the world allowed.
                      </p>
                    </CardContent>
                  </Card>

                  <StickyNote color="yellow" rotation={-1}>
                    <p className="font-casual text-sm text-muted-foreground mb-3">
                      Those early afternoons planted something in both of us: the idea that a shared table can
                      be a kind of magic. A place where people become braver, kinder, more themselves.
                    </p>
                    <p className="font-handwritten text-lg text-primary">
                      — The Seed Was Planted
                    </p>
                  </StickyNote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Journey - European Research */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="badge-handwritten text-primary">
                  The Journey
                </span>
                <h2
                  className="text-4xl md:text-5xl font-bold mt-4 mb-8 handwritten-underline"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  Following the Thread
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <PolaroidCard
                  image="/images_videos/our_story/moonriver_artwork.jpg"
                  title="Parisian Dreams"
                  caption="Hideaways where ideas crackled in the air"
                  rotation={-1}
                />
                <PolaroidCard
                  image="/images_videos/our_story/moonriver_today_barview.jpg"
                  title="Dutch Delights"
                  caption="Coffee houses filled with music and pastries"
                  rotation={1}
                />
                <PolaroidCard
                  image="/images_videos/our_story/moonriver_frontdoor.webp"
                  title="London Tearooms"
                  caption="Friendships forged over Darjeeling"
                  rotation={-2}
                />
              </div>

              <Card className="bg-card/95 warm-shadow-enhanced vintage-paper paper-texture max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground font-casual leading-relaxed mb-4">
                    Years later, as adults, my mother and I followed the thread of that magic across the world.
                    We wandered through Europe&apos;s cafés: Parisian hideaways where ideas crackled in the air,
                    Dutch coffee houses filled with music and buttery pastries, London tearooms where whole
                    friendships were forged over a pot of Darjeeling.
                  </p>
                  <p className="text-lg text-muted-foreground font-casual leading-relaxed">
                    We even stood among the misty tea farms of Asia, watching leaves that had traveled
                    centuries and continents.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* The Revelation - Historical Significance */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <span className="badge-handwritten text-primary">
                    The Revelation
                  </span>
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-6 handwritten-underline"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    Spaces of Belonging
                  </h2>

                  <Card className="bg-card/95 warm-shadow-enhanced vintage-paper paper-texture">
                    <CardContent className="p-8">
                      <p className="text-lg text-muted-foreground font-casual leading-relaxed">
                        What struck both of us most was how these houses once served as equalizers. Grand or humble,
                        they welcomed everyone: artists and laborers, dreamers and skeptics, strangers and friends.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StickyNote color="pink" rotation={1}>
                      <p className="font-casual text-sm text-muted-foreground">
                        They were the first modern spaces where women could gather freely, share their thoughts,
                        and build community.
                      </p>
                    </StickyNote>
                    <StickyNote color="blue" rotation={-1}>
                      <p className="font-casual text-sm text-muted-foreground">
                        Places to step, quietly but firmly, into public life.
                      </p>
                    </StickyNote>
                  </div>
                </div>

                {/* Quote Card */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-[#AE8625]/10 to-[#D2AC47]/10 border-2 border-[#AE8625]/20 rounded-3xl p-12 text-center warm-shadow-enhanced paper-texture">
                    <p className="font-handwritten text-3xl text-primary mb-4">
                      &quot;Some dreams fade over time.&quot;
                    </p>
                    <p className="font-handwritten text-4xl text-[#AE8625]">
                      Ours didn&apos;t.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Moon River's Birth */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Polaroid-style front door photo */}
                <div className="relative">
                  <div
                    className="bg-white dark:bg-card p-6 rounded-lg warm-shadow-enhanced paper-texture vintage-paper"
                    style={{ transform: 'rotate(-1deg)' }}
                  >
                    <div className="relative aspect-[3/4] bg-muted rounded-sm overflow-hidden mb-4">
                      <Image
                        src="/images_videos/our_story/moonriver_frontdoor.webp"
                        alt="Moon River front door"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-handwritten text-2xl text-primary text-center">
                      <MapPin className="inline h-5 w-5 mr-2" />
                      Welcome Home
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <span className="badge-handwritten text-primary">
                    The Dream Realized
                  </span>
                  <h2
                    className="text-4xl md:text-5xl font-bold mb-6 handwritten-underline"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    Moon River is Born
                  </h2>

                  <Card className="bg-card/95 warm-shadow-enhanced vintage-paper paper-texture">
                    <CardContent className="p-8">
                      <p className="text-lg text-muted-foreground font-casual leading-relaxed mb-4">
                        Moon River Cafe was born from that stubborn, shining idea my mother and I carried
                        across oceans: to build a place where people felt safe, seen, and welcomed.
                      </p>
                      <p className="text-lg text-muted-foreground font-casual leading-relaxed">
                        A home away from home filled with Italian espresso strong enough to revive the dead,
                        Parisian teas with stories steeped into every leaf, and treats that taste like comfort.
                      </p>
                    </CardContent>
                  </Card>

                  <StickyNote color="green" rotation={1}>
                    <p className="font-casual text-sm text-muted-foreground mb-3">
                      But above all, Moon River exists for you: the artists, authors, musicians, wanderers,
                      and neighbors who give our little café its beating heart.
                    </p>
                    <p className="font-handwritten text-lg text-primary">
                      — For You
                    </p>
                  </StickyNote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-[#AE8625]/10 to-[#D2AC47]/10 border-2 border-[#AE8625]/20 rounded-3xl p-12 warm-shadow-enhanced paper-texture">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-6"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  Step inside. Take a seat.
                </h2>

                <p className="text-xl text-muted-foreground font-casual mb-8">
                  Magic — of the everyday, extraordinary sort — lives here.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#926F34] hover:to-[#AE8625] text-white shadow-lg hover:shadow-xl transition-all duration-300 font-handwritten text-xl"
                    asChild
                  >
                    <Link href="/">
                      <Coffee className="h-5 w-5 mr-2" />
                      Visit Us Today
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#AE8625] text-[#AE8625] hover:bg-[#AE8625]/10 shadow-lg hover:shadow-xl transition-all duration-300 font-handwritten text-xl"
                    asChild
                  >
                    <Link href="/calendar">
                      <Sparkles className="h-5 w-5 mr-2" />
                      View Our Events
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Press Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="badge-handwritten text-primary">
                  In the News
                </span>
                <h2
                  className="text-4xl md:text-5xl font-bold mt-4 mb-4 handwritten-underline"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  Press
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pressArticles.map((article, index) => (
                  <StickyNote
                    key={index}
                    color={article.color}
                    rotation={article.rotation}
                    className="cursor-pointer"
                  >
                    <Link
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <p className="font-casual text-xs text-muted-foreground mb-2">
                        {article.date}
                      </p>
                      <h3 className="font-handwritten text-lg text-primary mb-2">
                        {article.title}
                      </h3>
                      <p className="font-casual text-sm text-muted-foreground flex items-center gap-1">
                        {article.publication}
                        <ExternalLink className="h-3 w-3" />
                      </p>
                    </Link>
                  </StickyNote>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
