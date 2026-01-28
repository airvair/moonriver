"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  file: string;
  className?: string;
}

export default function PDFViewer({ file, className }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container width for responsive PDF rendering
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Account for padding
        const width = containerRef.current.clientWidth - 48;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Calculate the PDF width - max 595px (standard PDF width) or container width
  const pdfWidth = containerWidth ? Math.min(containerWidth, 595) : undefined;

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
    },
    []
  );

  const onPageLoadSuccess = useCallback((pageNum: number) => {
    setLoadedPages((prev) => {
      const newSet = new Set(prev);
      newSet.add(pageNum);
      return newSet;
    });
  }, []);

  // Check if all pages are loaded
  useEffect(() => {
    if (numPages && loadedPages.size === numPages) {
      setIsLoading(false);
    }
  }, [numPages, loadedPages]);

  // Generate array of page numbers
  const pageNumbers = numPages ? Array.from({ length: numPages }, (_, i) => i + 1) : [];

  return (
    <div className={cn("flex flex-col gap-8 sm:gap-12", className)}>
      {/* PDF Display - All pages stacked with beautiful styling */}
      <div
        ref={containerRef}
        className="flex flex-col items-center gap-10 sm:gap-14"
      >
        {isLoading && (
          <div className="flex flex-col items-center gap-10 sm:gap-14 w-full">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="w-full max-w-[680px] mx-auto"
              >
                {/* Page label skeleton */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/20" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/20" />
                </div>
                {/* Paper frame */}
                <div className="relative p-4 sm:p-6 bg-card/95 rounded-2xl sm:rounded-3xl warm-shadow-enhanced vintage-paper border border-primary/10">
                  <Skeleton
                    className="rounded-lg mx-auto w-full"
                    style={{
                      maxWidth: "595px",
                      aspectRatio: "595 / 842",
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="text-base text-muted-foreground font-casual animate-pulse">
              Brewing your menu...
            </p>
          </div>
        )}

        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={null}
          className={cn("flex flex-col items-center gap-10 sm:gap-14 w-full", isLoading && "hidden")}
        >
          {pageNumbers.map((pageNum) => (
            <div
              key={pageNum}
              className="w-full max-w-[680px] mx-auto"
            >
              {/* Elegant page label */}
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent via-primary/30 to-primary/20" />
                <span className="text-sm font-casual text-primary/70 px-3">
                  {pageNum === 1 ? "Food & Treats" : "Drinks & More"}
                </span>
                <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent via-primary/30 to-primary/20" />
              </div>

              {/* Beautiful paper-styled frame */}
              <div className="relative group">
                {/* Decorative corner accents */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-primary/20 rounded-tl-lg opacity-60" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-primary/20 rounded-tr-lg opacity-60" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-primary/20 rounded-bl-lg opacity-60" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-primary/20 rounded-br-lg opacity-60" />

                {/* Main frame */}
                <div className="relative p-4 sm:p-6 bg-card/98 rounded-2xl sm:rounded-3xl warm-shadow-enhanced border border-primary/10 overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_50px_-15px_rgba(139,90,60,0.25)]">
                  {/* Subtle paper texture overlay */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* PDF Page */}
                  <div className="flex justify-center">
                    <Page
                      pageNumber={pageNum}
                      width={pdfWidth}
                      renderTextLayer={true}
                      renderAnnotationLayer={true}
                      onLoadSuccess={() => onPageLoadSuccess(pageNum)}
                      className="shadow-lg rounded-lg overflow-hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Document>
      </div>

      {/* Beautiful download section */}
      <div className="flex flex-col items-center gap-4 pt-4 pb-8">
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/20" />
          <span className="text-xs text-muted-foreground font-casual">take it with you</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/20" />
        </div>

        <Button
          variant="default"
          size="lg"
          asChild
          className="h-12 px-8 text-base font-casual rounded-full warm-glow bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
        >
          <a href={file} download className="flex items-center gap-3">
            <Download className="h-5 w-5" />
            Download Menu
          </a>
        </Button>
      </div>
    </div>
  );
}
