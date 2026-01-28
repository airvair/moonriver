"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut } from "lucide-react";
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
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pageInputValue, setPageInputValue] = useState("1");
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure container width for responsive PDF rendering
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Account for padding (32px = p-4 * 2)
        const width = containerRef.current.clientWidth - 32;
        setContainerWidth(width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Calculate the PDF width - max 595px (standard PDF width) or container width
  const pdfWidth = containerWidth ? Math.min(containerWidth, 595) * scale : undefined;

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setIsLoading(false);
    },
    []
  );

  const goToPrevPage = () => {
    setPageNumber((prev) => {
      const newPage = Math.max(prev - 1, 1);
      setPageInputValue(String(newPage));
      return newPage;
    });
  };

  const goToNextPage = () => {
    setPageNumber((prev) => {
      const newPage = Math.min(prev + 1, numPages || 1);
      setPageInputValue(String(newPage));
      return newPage;
    });
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInputValue(e.target.value);
  };

  const handlePageInputBlur = () => {
    const parsed = parseInt(pageInputValue, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= (numPages || 1)) {
      setPageNumber(parsed);
    } else {
      setPageInputValue(String(pageNumber));
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
  };

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.25, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));

  return (
    <div className={cn("flex flex-col gap-3 sm:gap-4", className)}>
      {/* Controls - Mobile optimized */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-card/80 rounded-xl sm:rounded-2xl border border-primary/10">
        {/* Top row on mobile: Page Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Input
              type="text"
              value={pageInputValue}
              onChange={handlePageInputChange}
              onBlur={handlePageInputBlur}
              onKeyDown={handlePageInputKeyDown}
              className="w-12 sm:w-14 h-8 sm:h-9 text-center text-sm"
            />
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              of {numPages || "..."}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Divider - hidden on mobile */}
        <div className="h-6 w-px bg-border mx-2 hidden sm:block" />

        {/* Bottom row on mobile: Zoom + Download */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs sm:text-sm text-muted-foreground w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={zoomIn}
              disabled={scale >= 2}
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Download */}
          <Button variant="default" size="sm" asChild className="h-8 sm:h-9 text-xs sm:text-sm">
            <a href={file} download>
              <Download className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Download Menu</span>
            </a>
          </Button>
        </div>
      </div>

      {/* PDF Display - Responsive */}
      <div
        ref={containerRef}
        className="flex justify-center overflow-auto rounded-xl sm:rounded-2xl bg-muted/30 p-2 sm:p-4 min-h-[400px] sm:min-h-[600px]"
      >
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <Skeleton
              className="rounded-lg"
              style={{
                width: pdfWidth || "100%",
                maxWidth: "100%",
                aspectRatio: "595 / 842",
              }}
            />
            <p className="text-sm text-muted-foreground">Loading menu...</p>
          </div>
        )}

        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={null}
          className={cn(isLoading && "hidden")}
        >
          <Page
            pageNumber={pageNumber}
            width={pdfWidth}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-lg rounded-lg overflow-hidden"
          />
        </Document>
      </div>
    </div>
  );
}
