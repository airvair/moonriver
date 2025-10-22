"use client"

import Link from "next/link"
import { Mail, MapPin, Phone, Clock } from "lucide-react"
import { getOpenStatus } from "@/lib/hours"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean; message: string } | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      setOpenStatus(getOpenStatus());
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
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
      <footer className="bg-gradient-to-b from-primary/10 to-primary/20 border-t-2 border-primary/20 relative z-10 paper-texture">
        <div className="container mx-auto px-4 py-12">
          {/* Top Section - Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Visit Us Card */}
            <div className="bg-card/80 rounded-2xl p-6 warm-shadow">
              <h3 className="font-handwritten text-2xl text-primary mb-4">Visit Us</h3>

              {/* Open Status */}
              {openStatus && (
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4 ${
                  openStatus.isOpen
                    ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                    : 'bg-red-500/20 text-red-700 dark:text-red-400'
                }`}>
                  <span className="animate-pulse">{openStatus.isOpen ? '🟢' : '🔴'}</span>
                  {openStatus.message}
                </div>
              )}

              <div className="space-y-3">
                <a
                  href="https://maps.google.com/?q=728+E+New+Haven+Avenue+Melbourne+FL+32901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <MapPin className="h-4 w-4 mt-1 text-primary" />
                  <span>728 E. New Haven Avenue<br />Melbourne, FL 32901</span>
                </a>

                <a
                  href="tel:+13213456789"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  <span>Coming Soon!</span>
                </a>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    Mon: Closed | Tue-Thu: 9-3, 5-9 | Fri-Sat: 9-9 | Sun: 9-3
                  </span>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-card/80 rounded-2xl p-6 warm-shadow">
              <h3 className="font-handwritten text-2xl text-primary mb-3">Join Our Coffee Family</h3>

              <p className="text-muted-foreground mb-4 text-sm">
                Weekly updates on new menu items, special events, and heartwarming stories.
              </p>

              {/* Newsletter Form */}
              <div className="space-y-3 mb-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background/50 border-primary/20 focus:border-primary/40 transition-all duration-300 text-sm"
                />
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90 transform transition-all duration-300 hover:scale-[1.02] warm-shadow">
                  Subscribe
                  <Mail className="ml-2 h-3 w-3" />
                </Button>
              </div>

              {/* Social proof */}
              <p className="text-xs text-muted-foreground text-center mb-4 font-casual">
                ✨ Join 500+ coffee lovers • One email per week
              </p>

              {/* Social Media Links */}
              <div className="flex gap-3 justify-center pt-3 border-t border-primary/10">
                <a
                  href="https://www.facebook.com/profile.php?id=61557348156870"
                  className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/themoonrivercafe/"
                  className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="YouTube"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="mailto:contact@themoonrivercafe.com"
                  className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-card/80 rounded-2xl p-6 warm-shadow">
              <h3 className="font-handwritten text-2xl text-primary mb-4">Explore</h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <Link href="/menu10-25.pdf" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Menu
                </Link>
                <Link href="/calendar" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Events Calendar
                </Link>
                <Link href="/story" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Our Story
                </Link>
                <Link href="/afternoon-tea" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Afternoon Tea
                </Link>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
                <Link href="https://www.toasttab.com/moon-river-cafe-728-e-new-haven-ave/giftcards" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Gift Cards
                </Link>
              </div>

              <div className="mt-4 pt-4 border-t border-primary/10">
                <div className="stamp stamp-fresh text-xs">
                  Best Café in Brevard
                </div>
              </div>
            </div>
          </div>

          {/* Personal Message */}
          <div className="text-center mb-8">
            <div className="coffee-divider mb-4"></div>
            <p className="font-handwritten text-2xl text-primary/80 italic">
              &ldquo;Thank you for being part of our coffee family!&rdquo;
            </p>
          </div>

          {/* Bottom Section - Copyright and Credits */}
          <div className="pt-8 border-t border-primary/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} Moon River Café & Curiosities. Made with love in Melbourne, FL.
              </p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                <span className="text-primary/30">•</span>
                <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                <span className="text-primary/30">•</span>
                <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
              </div>
            </div>

            {/* Creative credit for Preston - Now warmer and simpler */}
            <div className="mt-6 flex flex-col items-center">
              <div className="group relative">
                <div className="text-sm flex items-center gap-2">
                  <span className="text-muted-foreground/60 font-casual">Website crafted with</span>
                  <span className="relative inline-block">
                    <span className="text-xl transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12 inline-block">
                      ☕
                    </span>
                    {/* Simple steam effect */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-primary/30 text-xs">♨</span>
                    </div>
                  </span>
                  <span className="text-muted-foreground/60 font-casual">by</span>
                  <a
                    href="mailto:preston.malmquist@gmail.com"
                    className="font-handwritten text-primary hover:text-primary/80 transition-colors text-lg"
                  >
                    Preston Malmquist
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}