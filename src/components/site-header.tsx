"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

export function SiteHeader() {
  const [visible, setVisible] = React.useState(true)
  const [prevScrollPos, setPrevScrollPos] = React.useState(0)
  const { openMobile } = useSidebar()

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10

      setPrevScrollPos(currentScrollPos)
      setVisible(visible)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <>
      {/* Mobile Sidebar Trigger - visible on smaller screens, hidden when sidebar is open */}
      <div
        className={cn(
          "fixed top-3 left-3 z-[60] lg:hidden transition-all duration-300",
          openMobile ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
        )}
      >
        <SidebarTrigger className="bg-background/95 backdrop-blur-sm border border-primary/20 warm-shadow size-14" />
      </div>
      {/* Desktop Navigation - only on larger screens */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden lg:block",
          !visible ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
        )}
      >
        <div className="relative px-4 py-3 bg-background/95 backdrop-blur-sm border-b-2 border-primary/20 warm-shadow">
          <div className="container mx-auto flex justify-center">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="items-center flex-nowrap">
                {/* Cafe name text with gold border */}
                <NavigationMenuItem className="mr-6">
                  <NavigationMenuLink asChild>
                    <Link href="/" className="flex items-center">
                      <div className="flex items-center" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                        <span
                          className="text-xl font-normal whitespace-nowrap leading-none text-white"
                          style={{
                            WebkitTextStroke: '2px #926F34',
                            paintOrder: 'stroke fill'
                          }}
                        >
                          Moon River Café
                        </span>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/menu" className={navigationMenuTriggerStyle()}>
                    Menu
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Events</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 md:w-[400px]">
                    <ListItem href="/calendar" title="Calendar">
                        Browse all upcoming events.
                    </ListItem>
                    <ListItem href="/afternoon-tea" title="Afternoon Tea">
                        Reserve a classic tiered tea service with fresh pastries and savories.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Discover Dropdown - grouped content pages */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 md:w-[400px]">
                    <ListItem href="/blog" title="The Journal">
                      Stories, recipes, and musings from our little corner of Melbourne.
                    </ListItem>
                    <ListItem href="/podcast" title="Podcast">
                      Conversations with local creatives and community voices.
                    </ListItem>
                    <ListItem href="/poetry-anthology" title="Poetry Anthology">
                      Submit your poetry for our upcoming anthology.
                    </ListItem>
                    <ListItem href="/story" title="Our Story">
                      The journey behind Moon River — a mother-daughter dream.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Live Music</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 md:w-[400px]">
                    <ListItem href="/live-music/apply" title="Perform at Moon River">
                      Apply to perform at the café.
                    </ListItem>
                    <ListItem href="https://www.youtube.com/@themoonrivercafe" title="Watch Performances">
                      Watch live music videos on YouTube.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Order Online - styled as primary CTA button */}
              <NavigationMenuItem className="ml-2">
                <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 warm-shadow">
                  <a
                    href="https://online.skytab.com/s/moonrivercafeandcuriosities"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Order Online
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="group">
          <div className="text-base leading-none font-medium">{title}</div>
          <p className="text-muted-foreground group-hover:text-foreground line-clamp-2 text-xs leading-snug mt-1">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
