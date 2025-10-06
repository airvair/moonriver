"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Clock, Music, Calendar, CreditCard, Users, Star, Heart, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function AfternoonTea() {
  const offerings = [
    {
      title: "Luxurious Pastries",
      description: "Exquisite pastries crafted in-house daily by our skilled pâtissiers",
      icon: <Heart className="h-5 w-5" />
    },
    {
      title: "Finest Teas",
      description: "A curated collection of premium loose-leaf teas from around the world",
      icon: <Coffee className="h-5 w-5" />
    },
    {
      title: "Classic Sandwiches",
      description: "Delicate finger sandwiches with traditional and modern fillings",
      icon: <Star className="h-5 w-5" />
    },
    {
      title: "Fresh Scones",
      description: "Warm, freshly baked scones served with clotted cream and preserves",
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Live Music",
      description: "Gentle melodies to enhance your afternoon tea experience",
      icon: <Music className="h-5 w-5" />
    },
    {
      title: "Timeless Elegance",
      description: "An ambiance of refined comfort and sophisticated charm",
      icon: <Users className="h-5 w-5" />
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
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call to Reserve
              </Button>
            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.map((item, index) => (
                <MagicCard
                  key={index}
                  className="cursor-pointer bg-card/50 backdrop-blur border-primary/10"
                  gradientColor="#FF6B35"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20">
                        {item.icon}
                      </div>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </MagicCard>
              ))}
            </div>
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
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      Online Booking
                    </Badge>
                    <CardHeader className="pt-12">
                      <CardTitle className="text-xl">Eventbrite</CardTitle>
                      <div className="text-3xl font-bold text-primary">
                        $76
                        <span className="text-base font-normal text-muted-foreground ml-2">per person</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Convenient online reservation
                      </p>
                      <Button
                        className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                        asChild
                      >
                        <Link href="https://www.eventbrite.com" target="_blank" rel="noopener noreferrer">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Book on Eventbrite
                        </Link>
                      </Button>
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