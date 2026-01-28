"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { StickyNote, getRotationType as getStickyRotationType } from "@/components/ui/sticky-note";

// Press articles data
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

export default function OurStory() {
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
        {/* Hero Section - Image Background */}
        <BlurFade delay={0} duration={0.6}>
          <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background Image */}
            <Image
              src="/images_videos/Cafe Pics/Reading Room.png"
              alt="Moon River Cafe Reading Room"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-4xl mx-auto">
                <BlurFade delay={0.2}>
                  <h1
                    className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
                    style={{
                      fontFamily: 'TanNimbus, sans-serif',
                    }}
                  >
                    Our Story
                  </h1>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <p className="text-xl md:text-2xl text-white/90 font-casual italic drop-shadow-md">
                    Some stories begin with fireworks, but ours began with a teapot.
                  </p>
                </BlurFade>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Story Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Opening */}
              <BlurFade delay={0.1} inView>
                <p className="text-lg md:text-xl text-muted-foreground font-casual leading-relaxed mb-8">
                  I grew up in rural Pennsylvania, where winters lasted forever and imagination was often
                  the best source of entertainment. My mother, Mary, understood this better than anyone.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} inView>
                <p className="text-lg md:text-xl text-muted-foreground font-casual leading-relaxed mb-8">
                  She staged lavish childhood tea parties for me—not the polite sort, but the kind where
                  the mismatched china seemed enchanted, the stuffed animals held complicated political
                  alliances, and every cup poured was an invitation to dream a little bigger than the world allowed.
                </p>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <p className="text-lg md:text-xl text-muted-foreground font-casual leading-relaxed mb-12">
                  Those early afternoons planted something in both of us: the idea that a shared table can
                  be a kind of magic. A place where people become braver, kinder, more themselves.
                </p>
              </BlurFade>

              {/* Image Break - Sitting Area */}
              <BlurFade delay={0.25} inView>
                <div className="my-12 md:my-16">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden warm-shadow-enhanced">
                    <Image
                      src="/images_videos/Cafe Pics/Sitting Area-2.png"
                      alt="Cozy sitting area at Moon River"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </BlurFade>

              {/* Journey */}
              <BlurFade delay={0.1} inView>
                <p className="text-lg md:text-xl text-muted-foreground font-casual leading-relaxed mb-8">
                  Years later, as adults, my mother and I followed the thread of that magic across the
                  world. We wandered through Europe&apos;s cafés: Parisian hideaways where ideas crackled
                  in the air, Dutch coffee houses filled with music and buttery pastries, London tearooms
                  where whole friendships were forged over a pot of Darjeeling. We even stood among
                  the misty tea farms of Asia, watching leaves that had traveled centuries and continents.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} inView>
                <p className="text-lg md:text-xl text-muted-foreground font-casual leading-relaxed mb-12">
                  What struck both of us most was how these houses once served as equalizers. Grand
                  or humble, they welcomed everyone: artists and laborers, dreamers and skeptics,
                  strangers and friends. They were the first modern spaces where women could gather
                  freely, share their thoughts, build community, and step, quietly but firmly, into public life.
                </p>
              </BlurFade>

              {/* Image Grid */}
              <BlurFade delay={0.2} inView>
                <div className="grid grid-cols-2 gap-4 my-12 md:my-16">
                  <div className="relative aspect-square rounded-xl overflow-hidden warm-shadow-enhanced">
                    <Image
                      src="/images_videos/Cafe Pics/Front Counter-1.png"
                      alt="Front counter at Moon River"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden warm-shadow-enhanced">
                    <Image
                      src="/images_videos/Cafe Pics/Statue and Books.png"
                      alt="Statue and books at Moon River"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </BlurFade>

              {/* The Dream */}
              <BlurFade delay={0.1} inView>
                <p className="font-handwritten text-2xl md:text-3xl text-primary text-center my-12">
                  Some dreams fade over time. Ours didn&apos;t.
                </p>
              </BlurFade>

              <BlurFade delay={0.15} inView>
                <p className="text-lg md:text-xl text-muted-foreground font-casual leading-relaxed mb-8">
                  Moon River Cafe was born from that stubborn, shining idea my mother and I carried
                  across oceans: to build a place where people felt safe, seen, and welcomed. A home
                  away from home filled with Italian espresso strong enough to revive the dead, Parisian
                  teas with stories steeped into every leaf, and treats that taste like comfort.
                </p>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <p className="text-lg md:text-xl text-muted-foreground font-casual leading-relaxed mb-12">
                  But above all, Moon River exists for you: the artists, authors, musicians, wanderers, and
                  neighbors who give our little café its beating heart.
                </p>
              </BlurFade>

              {/* Final Image */}
              <BlurFade delay={0.25} inView>
                <div className="my-12 md:my-16">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden warm-shadow-enhanced">
                    <Image
                      src="/images_videos/Cafe Pics/Books.png"
                      alt="Books and curiosities at Moon River"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </BlurFade>

              {/* Closing */}
              <BlurFade delay={0.1} inView>
                <div className="text-center space-y-4 py-8">
                  <p
                    className="text-3xl md:text-4xl font-bold"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    Step inside. Take a seat.
                  </p>
                  <p className="text-xl md:text-2xl text-muted-foreground font-casual">
                    Magic—of the everyday, extraordinary sort—lives here.
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Press Section - Marquee */}
        <BlurFade delay={0.1} inView inViewMargin="-100px">
          <section className="py-16 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <BlurFade delay={0.1} inView>
                  <div className="text-center mb-12">
                    <h2
                      className="text-4xl md:text-5xl font-bold"
                      style={{ fontFamily: 'TanNimbus, sans-serif' }}
                    >
                      In the Press
                    </h2>
                  </div>
                </BlurFade>
              </div>
            </div>

            {/* First row - scrolling left */}
            <Marquee pauseOnHover className="[--duration:60s] mb-4">
              {pressArticles.slice(0, 9).map((article, index) => (
                <StickyNote
                  key={`row1-${index}`}
                  color={article.color}
                  rotation={getStickyRotationType(article.rotation)}
                  className="cursor-pointer mx-2 min-w-[280px]"
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
            </Marquee>

            {/* Second row - scrolling right */}
            <Marquee reverse pauseOnHover className="[--duration:60s]">
              {pressArticles.slice(9).map((article, index) => (
                <StickyNote
                  key={`row2-${index}`}
                  color={article.color}
                  rotation={getStickyRotationType(article.rotation)}
                  className="cursor-pointer mx-2 min-w-[280px]"
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
            </Marquee>
          </section>
        </BlurFade>

        <SiteFooter />
      </main>
    </>
  );
}
