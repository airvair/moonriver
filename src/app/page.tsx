"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NextEvent } from "@/components/ui/next-event";
import { StoreHours } from "@/components/ui/store-hours";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ArrowRight, Coffee, Leaf, Truck, Award, Star, Check, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

export default function Home() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

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
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/images_videos/home/coffee_art.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-[1]" />

          <div className="container mx-auto px-4 py-32 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
              {/* Left side - Main content */}
              <div className="flex-1 text-center lg:text-left">
                <AnimatedGradientText className="mb-4 justify-center lg:justify-start">
                  <span className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2Ac47] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-lg font-medium`
                  )}>
                    Awarded "Best Café in Brevard" — Florida Today
                  </span>
                </AnimatedGradientText>

                <h1
                  className="text-5xl md:text-7xl font-bold mt-8 mb-6 text-white"
                  style={{
                    fontFamily: 'TanNimbus, sans-serif',
                    WebkitTextStroke: '3px #926F34',
                    textStroke: '3px #926F34',
                    paintOrder: 'stroke fill'
                  }}
                >
                  Moon River Café
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl">

                </p>
              </div>

              {/* Right side - Info boxes */}
              <div className="flex flex-col gap-4 w-full lg:w-96 xl:w-[28rem]">
                {/* Next Event Box */}
                <div className="bg-background/80 backdrop-blur-md border shadow-lg rounded-2xl min-h-[220px]">
                  <NextEvent />
                </div>

                {/* Store Hours Box */}
                <div className="bg-background/80 backdrop-blur-md border shadow-lg rounded-2xl">
                  <StoreHours />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-24 bg-background/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#B91C1C] to-[#f87171] bg-clip-text text-transparent">
                  50K+
                </h3>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#B91C1C] to-[#f87171] bg-clip-text text-transparent">
                  98%
                </h3>
                <p className="text-muted-foreground">Customer Satisfaction</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#B91C1C] to-[#f87171] bg-clip-text text-transparent">
                  25+
                </h3>
                <p className="text-muted-foreground">Coffee Origins</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#B91C1C] to-[#f87171] bg-clip-text text-transparent">
                  10+
                </h3>
                <p className="text-muted-foreground">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <AnimatedGradientText className="mb-4">
                <span className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#B91C1C] via-[#ef4444] to-[#f87171] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-medium`
                )}>
                  Customer Reviews
                </span>
              </AnimatedGradientText>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: "John Doe", role: "Coffee Enthusiast", initial: "JD" },
                { name: "Jane Smith", role: "Regular Customer", initial: "JS" },
                { name: "Mike Johnson", role: "Business Owner", initial: "MJ" }
              ].map((customer, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar>
                        <AvatarFallback>{customer.initial}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{customer.name}</CardTitle>
                        <CardDescription>{customer.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">
                      &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.&quot;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <AnimatedGradientText className="mb-6">
                <span className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#B91C1C] via-[#ef4444] to-[#f87171] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-lg font-medium`
                )}>
                  Stay Updated
                </span>
              </AnimatedGradientText>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Lorem Ipsum Dolor Sit Amet
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button size="lg" className="whitespace-nowrap">
                  Subscribe Now
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />
      </main>
    </>
  );
}