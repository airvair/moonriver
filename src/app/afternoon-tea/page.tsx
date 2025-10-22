"use client";

import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Clock, Music, Calendar, CreditCard, Users, Star, Heart, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface EBWidgets {
  createWidget: (config: {
    widgetType: string;
    eventId: string;
    iframeContainerId: string;
    iframeContainerHeight: number;
    onOrderComplete: () => void;
  }) => void;
}

declare global {
  interface Window {
    EBWidgets?: EBWidgets;
  }
}

export default function AfternoonTea() {
  const offerings = [
    {
      name: "Luxurious Pastries",
      className: "col-span-1 md:col-span-2 lg:col-span-2",
      Icon: Heart,
      description: "Exquisite pastries crafted in-house daily by our skilled pâtissiers",
      href: "#",
      cta: "Explore Menu",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(colors.amber.500/0.1),transparent)]" />
          <Sparkles className="absolute top-4 right-4 h-8 w-8 text-amber-500/30 animate-pulse" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
      )
    },
    {
      name: "Finest Teas",
      className: "col-span-1 md:col-span-1 lg:col-span-1",
      Icon: Coffee,
      description: "A curated collection of premium loose-leaf teas from around the world",
      href: "#",
      cta: "Tea Selection",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.emerald.500/0.1),transparent)]" />
        </div>
      )
    },
    {
      name: "Classic Sandwiches",
      className: "col-span-1 md:col-span-1 lg:col-span-1",
      Icon: Star,
      description: "Delicate finger sandwiches with traditional and modern fillings",
      href: "#",
      cta: "View Varieties",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, transparent 20%, rgba(255,255,255,0.02) 20.5%, rgba(255,255,255,0.02) 30%, transparent 30.5%)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
      )
    },
    {
      name: "Fresh Scones",
      className: "col-span-1 md:col-span-1 lg:col-span-1",
      Icon: Clock,
      description: "Warm, freshly baked scones served with clotted cream and preserves",
      href: "#",
      cta: "Daily Fresh",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-amber-500/10 to-orange-500/10">
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>
      )
    },
    {
      name: "Live Music",
      className: "col-span-1 md:col-span-2 lg:col-span-2",
      Icon: Music,
      description: "Gentle melodies to enhance your afternoon tea experience",
      href: "#",
      cta: "Performance Schedule",
      background: (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10" />
          <div className="absolute -top-4 -right-4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 h-32 w-32 animate-pulse rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 blur-2xl animation-delay-1000" />
          <Music className="absolute bottom-4 right-4 h-6 w-6 text-indigo-500/20 animate-bounce" />
        </div>
      )
    },
    {
      name: "Timeless Elegance",
      className: "col-span-1 md:col-span-1 lg:col-span-1",
      Icon: Users,
      description: "An ambiance of refined comfort and sophisticated charm",
      href: "#",
      cta: "Reserve Table",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 via-gray-500/10 to-zinc-500/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.gray.500/0.05)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.gray.500/0.05)_1px,transparent_1px)]"
               style={{ backgroundSize: '20px 20px' }} />
        </div>
      )
    }
  ];

  return (
    <>
      <Script
        src="https://www.eventbrite.com/static/widgets/eb_widgets.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize widget after script loads
          const exampleCallback = function() {
            console.log('Order complete!');
          };

          if (typeof window !== 'undefined' && window.EBWidgets) {
            window.EBWidgets.createWidget({
              widgetType: 'checkout',
              eventId: '1709272091839',
              iframeContainerId: 'eventbrite-widget-container-1709272091839',
              iframeContainerHeight: 425,
              onOrderComplete: exampleCallback
            });
          }
        }}
      />
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
      `}</style>
      <SiteHeader />
      <main className="flex flex-col">
        {/* Hero Section with Video Background */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images_videos/afternoon_tea/stirring_tea.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
            <AnimatedGradientText className="mb-6">
              <span className={cn(
                "inline bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent text-sm font-medium uppercase tracking-wider"
              )}>
                A Moon River Tradition
              </span>
            </AnimatedGradientText>

            <h1
              className="text-6xl md:text-8xl font-bold mb-6 text-white"
              style={{ fontFamily: 'TanNimbus, serif' }}
            >
              Afternoon Tea
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Indulge in an exquisite afternoon of refined elegance, featuring luxurious pastries,
              finest teas, and live music in an atmosphere of timeless sophistication.
            </p>

            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                asChild
              >
                <Link href="https://www.eventbrite.com" target="_blank" rel="noopener noreferrer">
                  Reserve on Eventbrite
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <AnimatedGradientText className="mb-4">
                <span className={cn(
                  "inline bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent text-sm font-medium uppercase tracking-wider"
                )}>
                  An Unforgettable Experience
                </span>
              </AnimatedGradientText>
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: 'TanNimbus, serif' }}
              >
                What to Expect
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every element of our afternoon tea service has been carefully curated to create
                an unforgettable experience of indulgence and refinement.
              </p>
            </div>

            <BentoGrid className="max-w-7xl mx-auto">
              {offerings.map((item) => (
                <BentoCard
                  key={item.name}
                  {...item}
                />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* Visual Showcase Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Section */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images_videos/afternoon_tea/high_tea.jpg"
                    alt="Elegant afternoon tea setup"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  Served Daily
                </Badge>
              </div>

              {/* Video Section */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                  style={{ maxHeight: '500px' }}
                >
                  <source src="/images_videos/afternoon_tea/high_tea_sweets.mp4" type="video/mp4" />
                </video>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">Artisan Sweets</h3>
                  <p className="text-gray-200">
                    Each pastry is a work of art, crafted with precision and passion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reservation Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-4xl md:text-5xl font-bold mb-8"
              style={{ fontFamily: 'TanNimbus, serif' }}
            >
              Reserve Your Experience
            </h2>

            <Card className="bg-card/50 backdrop-blur border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl">
                  <Calendar className="inline-block mr-2 h-6 w-6" />
                  Reservations Required
                </CardTitle>
                <CardDescription className="text-lg">
                  Secure your spot for this exclusive afternoon tradition
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-bl-full" />
                    <CardHeader>
                      <CardTitle className="text-xl">At the Café</CardTitle>
                      <div className="text-3xl font-bold text-primary">
                        $65
                        <span className="text-base font-normal text-muted-foreground ml-2">per person</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Purchase directly at Moon River Café
                      </p>
                      <Button className="w-full mt-4" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call to Reserve
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10">
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white z-10">
                      Online Booking
                    </Badge>
                    <CardHeader className="pt-12">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Reserve Online
                      </CardTitle>
                      <CardDescription>
                        Secure your reservation with Eventbrite
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        id="eventbrite-widget-container-1709272091839"
                        className="w-full min-h-[425px] rounded-lg overflow-hidden"
                      />
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-8 border-t">
                  <p className="text-lg text-muted-foreground mb-4">
                    We look forward to welcoming you to this new Moon River tradition.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For groups larger than 6, please contact us directly for special arrangements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}