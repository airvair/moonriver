"use client"

import Link from "next/link"
import { Mail, MapPin, Phone, Clock } from "lucide-react"
import { getOpenStatus, fetchStoreHours, HOURS, type DayHours } from "@/lib/hours"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getSiteSettings } from "@/lib/sanity"

// Default contact info (fallback if Sanity fetch fails)
const DEFAULT_SETTINGS = {
  contactEmail: "contact@themoonrivercafe.com",
  contactPhone: "(321) 210-9704",
  address: "728 E. New Haven Avenue\nMelbourne, FL 32901",
  socialLinks: {
    facebook: "https://www.facebook.com/profile.php?id=61557348156870",
    instagram: "https://www.instagram.com/themoonrivercafe/",
    youtube: "https://www.youtube.com/@themoonrivercafe",
  },
};

export function SiteFooter() {
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean; message: string } | null>(null);
  const [hours, setHours] = useState<DayHours[]>(HOURS);
  const [timezone, setTimezone] = useState("America/New_York");
  const [settings, setSettings] = useState<typeof DEFAULT_SETTINGS>(DEFAULT_SETTINGS);

  // Fetch site settings from Sanity
  useEffect(() => {
    async function loadSettings() {
      try {
        const sanitySettings = await getSiteSettings();
        if (sanitySettings) {
          setSettings({
            contactEmail: sanitySettings.contactEmail || DEFAULT_SETTINGS.contactEmail,
            contactPhone: sanitySettings.contactPhone || DEFAULT_SETTINGS.contactPhone,
            address: sanitySettings.address || DEFAULT_SETTINGS.address,
            socialLinks: {
              facebook: sanitySettings.socialLinks?.facebook || DEFAULT_SETTINGS.socialLinks.facebook,
              instagram: sanitySettings.socialLinks?.instagram || DEFAULT_SETTINGS.socialLinks.instagram,
              youtube: DEFAULT_SETTINGS.socialLinks.youtube, // YouTube not in schema, keep default
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch site settings:", error);
      }
    }

    loadSettings();
  }, []);

  // Fetch store hours from Sanity
  useEffect(() => {
    async function loadHours() {
      try {
        const data = await fetchStoreHours();
        setHours(data.hours);
        setTimezone(data.timezone);
      } catch (error) {
        console.error("Failed to fetch hours:", error);
      }
    }

    loadHours();
  }, []);

  // Check open status periodically
  useEffect(() => {
    const checkStatus = () => {
      setOpenStatus(getOpenStatus(hours, timezone));
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, [hours, timezone]);

  // Format hours for display
  const hoursDisplay = hours.length > 0
    ? `Mon: ${hours[1]?.hours || 'Closed'} | Tue-Thu: ${hours[2]?.hours || '9-3'} | Fri-Sat: ${hours[5]?.hours || '9-8'} | Sun: ${hours[0]?.hours || '9-3'}`
    : "Mon: Closed | Tue-Thu: 9-3 | Fri-Sat: 9-8 | Sun: 9-3";

  // Format address for display (replace \n with <br />)
  const addressParts = settings.address.split('\n');

  return (
    <footer className="bg-gradient-to-b from-primary/10 to-primary/20 border-t-2 border-primary/20 relative z-10 paper-texture">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* Top Section - Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Visit Us Card */}
            <div className="bg-card/80 rounded-xl sm:rounded-2xl p-5 sm:p-6 warm-shadow">
              <h3 className="font-handwritten text-xl sm:text-2xl text-primary mb-3 sm:mb-4">Visit Us</h3>

              {/* Open Status */}
              {openStatus && (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm mb-3 sm:mb-4 ${
                  openStatus.isOpen
                    ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                    : 'bg-red-500/20 text-red-700 dark:text-red-400'
                }`}>
                  <span className="animate-pulse">{openStatus.isOpen ? '🟢' : '🔴'}</span>
                  {openStatus.message}
                </div>
              )}

              <div className="space-y-2 sm:space-y-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings.address.replace('\n', ' '))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base min-h-[44px] py-1"
                >
                  <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <span>{addressParts.map((part, i) => (
                    <span key={i}>{part}{i < addressParts.length - 1 && <br />}</span>
                  ))}</span>
                </a>

                <a
                  href={`tel:${settings.contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base min-h-[44px]"
                >
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{settings.contactPhone}</span>
                </a>

                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base min-h-[44px]"
                >
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{settings.contactEmail}</span>
                </a>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    {hoursDisplay}
                  </span>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-card/80 rounded-xl sm:rounded-2xl p-5 sm:p-6 warm-shadow">
              <h3 className="font-handwritten text-xl sm:text-2xl text-primary mb-2 sm:mb-3">Join Our Coffee Family</h3>

              <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm">
                Sign up for weekly updates on new menu items, special events, and heartwarming stories.
              </p>

              {/* Newsletter Form - Coming Soon */}
              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter subscription"
                  disabled
                  className="bg-background/50 border-primary/20 focus:border-primary/40 transition-all duration-300 text-sm min-h-[44px] opacity-60"
                />
                <Button
                  size="sm"
                  disabled
                  className="w-full bg-primary/60 cursor-not-allowed transform transition-all duration-300 warm-shadow min-h-[44px]"
                >
                  Coming Soon
                  <Mail className="ml-2 h-3 w-3" />
                </Button>
              </div>

              {/* Social proof */}
              <p className="text-xs text-muted-foreground text-center mb-3 sm:mb-4 font-casual">
                Newsletter launching soon - Follow us on social media
              </p>

              {/* Social Media Links */}
              <div className="flex gap-2 sm:gap-3 justify-center pt-3 border-t border-primary/10">
                <a
                  href={settings.socialLinks.facebook}
                  className="w-10 h-10 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={settings.socialLinks.instagram}
                  className="w-10 h-10 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="YouTube"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="w-10 h-10 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-card/80 rounded-xl sm:rounded-2xl p-5 sm:p-6 warm-shadow">
              <h3 className="font-handwritten text-xl sm:text-2xl text-primary mb-3 sm:mb-4">Explore</h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-2">
                <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors text-sm py-1 min-h-[36px] flex items-center">
                  Menu
                </Link>
                <Link href="/calendar" className="text-muted-foreground hover:text-primary transition-colors text-sm py-1 min-h-[36px] flex items-center">
                  Events Calendar
                </Link>
                <Link href="/story" className="text-muted-foreground hover:text-primary transition-colors text-sm py-1 min-h-[36px] flex items-center">
                  Our Story
                </Link>
                <Link href="/private-events" className="text-muted-foreground hover:text-primary transition-colors text-sm py-1 min-h-[36px] flex items-center">
                  Private Events
                </Link>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm py-1 min-h-[36px] flex items-center">
                  Blog
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-primary/10">
                <div className="stamp stamp-fresh text-xs">
                  Best Café in Brevard
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Copyright and Credits */}
          <div className="pt-6 sm:pt-8 border-t border-primary/20">
            <div className="flex flex-wrap justify-center sm:justify-between items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground">
              <p className="text-center sm:text-left">
                © {new Date().getFullYear()} Moon River Café & Curiosities
              </p>
              <span className="hidden sm:inline text-primary/30">•</span>
              <p className="group flex items-center gap-1.5">
                <span className="text-muted-foreground/60 font-casual">Crafted with</span>
                <span className="relative inline-block">
                  <span className="text-sm sm:text-base transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12 inline-block">
                    ☕
                  </span>
                </span>
                <span className="text-muted-foreground/60 font-casual">by</span>
                <a
                  href="mailto:preston.malmquist@gmail.com"
                  className="font-handwritten text-primary hover:text-primary/80 transition-colors text-sm sm:text-base"
                >
                  Preston
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
  )
}
