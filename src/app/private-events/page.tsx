"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { Mail, Phone, Sparkles } from "lucide-react";
import Image from "next/image";

export default function PrivateEvents() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex flex-col relative unified-background overflow-hidden min-h-screen">
        {/* Full Viewport Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <Image
            src="/images_videos/Cafe Pics/Sitting Area-2.png"
            alt="Moon River Café intimate seating area"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          {/* Warm Overlay */}
          <div className="absolute inset-0 z-[1]">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#926F34]/20 via-transparent to-[#D4AF37]/10" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-4 py-12">
            <div className="max-w-2xl mx-auto">
              {/* Invitation Card */}
              <BlurFade delay={0.1} duration={0.6}>
                <div className="bg-card/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 warm-shadow-enhanced paper-texture border-2 border-primary/20 text-center">
                  {/* Decorative Top */}
                  <BlurFade delay={0.2}>
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
                      <Sparkles className="w-5 h-5 text-primary/60" />
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
                    </div>
                  </BlurFade>

                  {/* Heading */}
                  <BlurFade delay={0.3}>
                    <h1
                      className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary"
                      style={{ fontFamily: 'TanNimbus, serif' }}
                    >
                      Private Events
                    </h1>
                  </BlurFade>

                  {/* Description */}
                  <BlurFade delay={0.4}>
                    <p className="text-base sm:text-lg text-muted-foreground font-casual leading-relaxed mb-8 max-w-md mx-auto">
                      Host your next gathering in our cozy, curated space.
                      From intimate celebrations to creative workshops,
                      we&apos;d love to help make your event unforgettable.
                    </p>
                  </BlurFade>

                  {/* Decorative Divider */}
                  <BlurFade delay={0.5}>
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <div className="h-px flex-1 max-w-[100px] bg-primary/20" />
                      <span className="font-handwritten text-primary text-sm">Get in Touch</span>
                      <div className="h-px flex-1 max-w-[100px] bg-primary/20" />
                    </div>
                  </BlurFade>

                  {/* Contact Links */}
                  <BlurFade delay={0.6}>
                    <div className="space-y-4">
                      {/* Email */}
                      <a
                        href="mailto:contact@themoonrivercafe.com"
                        className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-casual text-foreground group-hover:text-primary transition-colors">
                          contact@themoonrivercafe.com
                        </span>
                      </a>

                      {/* Phone */}
                      <a
                        href="tel:+13212109704"
                        className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-casual text-foreground group-hover:text-primary transition-colors">
                          (321) 210-9704
                        </span>
                      </a>
                    </div>
                  </BlurFade>

                  {/* Decorative Bottom */}
                  <BlurFade delay={0.7}>
                    <div className="flex items-center justify-center gap-3 mt-8">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
                      <Sparkles className="w-5 h-5 text-primary/60" />
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
                    </div>
                  </BlurFade>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
