"use client";

import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Coffee, Utensils, Search, Printer } from "lucide-react";
import { menuData, sandwichNote, type MenuCategory } from "@/lib/menu-data";
import { MenuCategoryComponent } from "@/components/menu/menu-category";

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<"food" | "drinks">("food");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter menu data based on search query
  const filteredMenuData = useMemo(() => {
    if (!searchQuery) {
      // If no search query, return only the active tab's data
      const activeSection = menuData.find(section => section.type === activeTab);
      return activeSection?.categories || [];
    }

    // If there's a search query, search across ALL menu sections
    const searchLower = searchQuery.toLowerCase();
    const allFilteredCategories: (MenuCategory & { sectionType?: "food" | "drinks" })[] = [];

    menuData.forEach(section => {
      section.categories.forEach(category => {
        const filteredItems = category.items.filter(item =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)
        );

        if (filteredItems.length > 0) {
          allFilteredCategories.push({
            ...category,
            items: filteredItems,
            sectionType: section.type // Add section type to show where items come from
          });
        }
      });
    });

    return allFilteredCategories;
  }, [activeTab, searchQuery]);

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
        {/* Today's Features Section */}
        <section className="py-16 relative pt-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-handwritten text-primary">
                  Today&apos;s Features
                </h2>
                <p className="text-lg text-muted-foreground font-casual">
                  Fresh selections, specially prepared for you
                </p>
              </div>

              {/* Today's Brew Widget */}
              <div className="mb-8">
                <div className="bg-card/95 rounded-3xl p-8 warm-shadow-enhanced vintage-paper cozy-card relative overflow-hidden border border-primary/10">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="text-center md:text-left flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-3xl coffee-steam relative inline-block">☕</span>
                        <h3 className="text-xl font-bold text-primary font-casual">Today&apos;s Brew</h3>
                        <span className="stamp stamp-fresh text-xs ml-2" style={{ animation: 'gentle-float 4s ease-in-out infinite' }}>Brewing Now</span>
                      </div>

                      <h4 className="text-2xl font-handwritten text-primary mb-2">
                        Ethiopian Yirgacheffe
                      </h4>

                      <p className="text-muted-foreground text-sm mb-2">
                        Light roast with bright citrus notes, floral aromatics, and a silky smooth finish
                      </p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>🌍 Origin: Gedeo Zone</span>
                        <span>🌡️ Roast: Light</span>
                        <span>🍊 Notes: Citrus & Jasmine</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-3xl font-handwritten text-primary">$4.50</p>
                      <p className="text-sm text-muted-foreground">per cup</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Specials */}
              <div className="bg-card/80 rounded-3xl p-8 warm-shadow-enhanced vintage-paper cozy-card">
                <h3 className="text-2xl font-bold font-casual text-primary mb-6 text-center">
                  Daily Specials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Morning Special */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-bold font-casual text-primary mb-2">
                          Morning Delight
                          <span className="stamp stamp-fresh ml-3 text-xs">Fresh Today</span>
                        </h4>
                        <p className="text-muted-foreground mb-3">
                          Freshly baked croissant with house-made raspberry jam,
                          served with our signature medium roast coffee
                        </p>
                        <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm">
                          Available until 11 AM
                        </span>
                      </div>
                      <span className="text-2xl font-handwritten text-primary">$12</span>
                    </div>
                  </div>

                  {/* Afternoon Special */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-bold font-casual text-primary mb-2">
                          Afternoon Comfort
                          <span className="stamp stamp-fresh stamp-tilted ml-3 text-xs">Chef&apos;s Choice</span>
                        </h4>
                        <p className="text-muted-foreground mb-3">
                          Homemade soup of the day with artisan bread,
                          paired with your choice of tea
                        </p>
                        <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-sm">
                          From 12 PM onwards
                        </span>
                      </div>
                      <span className="text-2xl font-handwritten text-primary">$14</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Navigation */}
        <section className="py-6 sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b-2 border-primary/20 warm-shadow">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
              {/* Tab Buttons and Print Button */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex gap-2">
                  <Button
                    variant={activeTab === "food" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setActiveTab("food")}
                    className={cn(
                      "font-casual text-lg transition-all duration-300",
                      activeTab === "food"
                        ? "bg-primary text-primary-foreground shadow-lg transform scale-105"
                        : "hover:bg-primary/10"
                    )}
                  >
                    <Utensils className="mr-2 h-5 w-5" />
                    Food Menu
                  </Button>
                  <Button
                    variant={activeTab === "drinks" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setActiveTab("drinks")}
                    className={cn(
                      "font-casual text-lg transition-all duration-300",
                      activeTab === "drinks"
                        ? "bg-primary text-primary-foreground shadow-lg transform scale-105"
                        : "hover:bg-primary/10"
                    )}
                  >
                    <Coffee className="mr-2 h-5 w-5" />
                    Drinks Menu
                  </Button>
                </div>

                {/* Printable Menu Button */}
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="font-casual text-lg transition-all duration-300 hover:bg-primary/10 border-primary/30"
                >
                  <a href="/menu10-25.pdf" target="_blank" rel="noopener noreferrer">
                    <Printer className="mr-2 h-5 w-5" />
                    Printable Menu
                  </a>
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64 lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-card border border-primary/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:border-primary/40"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Search Results Notice */}
              {searchQuery && filteredMenuData.length > 0 && (
                <div className="text-center mb-6 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm text-muted-foreground font-casual">
                    Showing results from both Food and Drinks menus for &ldquo;{searchQuery}&rdquo;
                  </p>
                </div>
              )}

              <div className="bg-card/95 rounded-3xl p-8 warm-shadow-enhanced vintage-paper">
                {filteredMenuData.length > 0 ? (
                  <>
                    {filteredMenuData.map((category, index) => (
                      <MenuCategoryComponent
                        key={index}
                        category={category}
                        note={!searchQuery && activeTab === "food" && category.name === "Sandwiches" ? sandwichNote : undefined}
                        showSectionBadge={!!searchQuery}
                      />
                    ))}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Coffee className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground font-casual text-lg">
                      No items found matching &ldquo;{searchQuery}&rdquo;
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      className="mt-4"
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}