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
import Link from "next/link"
import { cn } from "@/lib/utils"
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
      <style jsx global>{`
        @font-face {
          font-family: 'TanNimbus';
          src: url('/fonts/tan-nimbus.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
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
                {/* Cafe name text with red border - properly wrapped in NavigationMenuItem */}
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

              <NavigationMenuItem>
                <NavigationMenuTrigger>Live Music</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 md:w-[400px]">
                    <ListItem href="/live-music/preston-hunter" title="Preston Hunter">
                      Featured artist appearances and music.
                    </ListItem>
                    <ListItem href="/live-music/apply" title="Perform at Moon River">
                      Apply to perform at the café.
                    </ListItem>
                    <ListItem href="#" title="Watch Performances">
                      Watch live music videos on YouTube.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/blog" className={navigationMenuTriggerStyle()}>
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/podcast" className={navigationMenuTriggerStyle()}>
                    Podcast
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/story" className={navigationMenuTriggerStyle()}>
                    Our Story
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="https://order.toasttab.com/online/moon-river-cafe-728-e-new-haven-ave" className={navigationMenuTriggerStyle()}>
                      Order Online
                  </Link>
                </NavigationMenuLink>
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
