"use client";

import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Skeleton } from "@/components/ui/skeleton";

const PDFViewer = dynamic(() => import("@/components/pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-3 sm:gap-4">
      <Skeleton className="w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl" />
      <div className="flex justify-center p-2 sm:p-4 bg-muted/30 rounded-xl sm:rounded-2xl min-h-[400px] sm:min-h-[600px]">
        <Skeleton
          className="rounded-lg w-full max-w-[595px]"
          style={{ aspectRatio: "595 / 842" }}
        />
      </div>
    </div>
  ),
});

export default function MenuPage() {
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
      <main className="flex flex-col relative unified-background overflow-x-hidden">
        {/* Responsive padding: less on mobile since header is just hamburger button */}
        <section className="py-8 sm:py-12 md:py-16 relative pt-16 sm:pt-20 md:pt-24">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header - smaller on mobile */}
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 font-handwritten text-primary">
                  Our Menu
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground font-casual">
                  Fresh selections, specially prepared for you
                </p>
              </div>

              {/* PDF Viewer */}
              <PDFViewer file="/menu10-25.pdf" />
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
