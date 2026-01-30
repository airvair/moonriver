"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Skeleton } from "@/components/ui/skeleton";
import { BlurFade } from "@/components/ui/blur-fade";
import { useState, useEffect } from "react";
import { getMenuPdfUrl } from "@/lib/sanity";

// Default menu PDF path (fallback)
const DEFAULT_MENU_PDF = "/menu10-25.pdf";

const PDFViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-8 sm:gap-12">
      <div className="flex flex-col items-center gap-10 sm:gap-14 w-full">
        {[1, 2].map((i) => (
          <div key={i} className="w-full max-w-[680px] md:max-w-[750px] lg:max-w-[820px] xl:max-w-[900px] mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/20" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/20" />
            </div>
            <div className="relative p-4 sm:p-6 bg-card/95 rounded-2xl sm:rounded-3xl warm-shadow-enhanced border border-primary/10">
              <Skeleton
                className="rounded-lg mx-auto w-full"
                style={{ aspectRatio: "595 / 842" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});

export default function MenuPage() {
  const [menuPdfUrl, setMenuPdfUrl] = useState<string>(DEFAULT_MENU_PDF);

  useEffect(() => {
    async function loadMenuUrl() {
      try {
        const url = await getMenuPdfUrl();
        if (url) {
          setMenuPdfUrl(url);
        }
      } catch (error) {
        console.error("Failed to fetch menu PDF URL:", error);
        // Keep default URL as fallback
      }
    }

    loadMenuUrl();
  }, []);
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
      <main id="main-content" className="flex flex-col relative unified-background overflow-x-hidden">
        {/* Hero Section */}
        <BlurFade delay={0} duration={0.6}>
          <section className="relative pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                {/* Decorative badge */}
                <BlurFade delay={0.1}>
                  <div className="mb-6">
                    <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                      Fresh Daily
                    </span>
                  </div>
                </BlurFade>

                {/* Main heading */}
                <BlurFade delay={0.2}>
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 handwritten-underline inline-block"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    Our Menu
                  </h1>
                </BlurFade>

                {/* Subtitle */}
                <BlurFade delay={0.3}>
                  <p className="text-lg sm:text-xl text-muted-foreground font-casual max-w-xl mx-auto mt-6">
                    Lovingly crafted drinks and treats, made fresh every morning just for you
                  </p>
                </BlurFade>

                {/* Decorative coffee divider */}
                <BlurFade delay={0.4}>
                  <div className="coffee-divider mt-8" />
                </BlurFade>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Menu Content */}
        <BlurFade delay={0.1} inView>
          <section className="pb-16 sm:pb-24 relative">
            <div className="container mx-auto px-3 sm:px-4">
              <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
                <PDFViewer file={menuPdfUrl} />
              </div>
            </div>
          </section>
        </BlurFade>

        <SiteFooter />
      </main>
    </>
  );
}
