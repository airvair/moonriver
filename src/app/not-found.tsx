"use client";

import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { SiteHeader } from "@/components/site-header";
import Link from "next/link";
import { Home, Coffee } from "lucide-react";

export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center unified-background overflow-hidden px-4">
      <SiteHeader />
      <div className="max-w-lg mx-auto text-center">
        {/* Animated Video */}
        <BlurFade delay={0.1}>
          <div className="relative w-40 h-40 sm:w-52 sm:h-52 mx-auto">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            >
              <source src="/dog_hare_animation.webm" type="video/webm" />
            </video>
          </div>
        </BlurFade>

        {/* Main heading */}
        <BlurFade delay={0.2}>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 mb-2 text-primary leading-snug sm:leading-normal"
            style={{ fontFamily: "TanNimbus, sans-serif" }}
          >
            Whoa there! Wrong trail.
          </h1>
        </BlurFade>

        {/* Subheading */}
        <BlurFade delay={0.3}>
          <p className="text-base sm:text-lg font-handwritten text-muted-foreground mb-4">
            This page hopped away before we could catch it.
          </p>
        </BlurFade>

        {/* Fun message */}
        <BlurFade delay={0.4}>
          <p className="text-xs sm:text-sm text-muted-foreground/70 font-casual mb-6">
            Error 404 • Page Not Found
          </p>
        </BlurFade>

        {/* CTA Buttons */}
        <BlurFade delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button asChild size="default" className="w-full sm:w-auto warm-shadow-enhanced">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="default" className="w-full sm:w-auto warm-glow">
              <Link href="/menu">
                <Coffee className="mr-2 h-4 w-4" />
                View Menu
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </main>
  );
}
