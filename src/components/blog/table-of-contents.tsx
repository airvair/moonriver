"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const TOCContent = () => (
    <nav className="space-y-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={cn(
            "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
            "hover:bg-[#D2AC47]/20 hover:text-[#F7EF8A]",
            item.level > 2 && "pl-6",
            item.level > 3 && "pl-9",
            activeId === item.id
              ? "bg-gradient-to-r from-[#D2AC47]/30 to-[#F7EF8A]/20 text-[#F7EF8A] font-medium"
              : "text-[#d4c9b8]"
          )}
        >
          {item.text}
        </button>
      ))}
    </nav>
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop Table of Contents */}
      <div className={cn("hidden lg:block", className)}>
        <div className="sticky top-32">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#F7EF8A]">
            On This Page
          </h3>
          <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
            <TOCContent />
          </ScrollArea>
        </div>
      </div>

      {/* Mobile Table of Contents */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#926F34] hover:to-[#AE8625] text-white"
            >
              <List className="h-5 w-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Table of Contents</DrawerTitle>
              <DrawerDescription>
                Navigate through the article sections
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="h-[50vh] px-4 pb-4">
              <TOCContent />
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}