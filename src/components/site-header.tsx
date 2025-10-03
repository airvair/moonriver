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
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AuroraText } from "@/components/ui/aurora-text"

export function SiteHeader() {
  const [visible, setVisible] = React.useState(true)
  const [prevScrollPos, setPrevScrollPos] = React.useState(0)
  const [isAtTop, setIsAtTop] = React.useState(true)
  const wasAtTopRef = React.useRef(true)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10
      const atTop = currentScrollPos < 10

      setPrevScrollPos(currentScrollPos)
      setVisible(visible)
      setIsAtTop(atTop)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  // Track when we transition from top to floating
  React.useEffect(() => {
    if (!isAtTop && wasAtTopRef.current) {
      // Just left the top - disable transition temporarily
      setTimeout(() => {
        wasAtTopRef.current = false
      }, 50) // Small delay to ensure positioning is complete
    } else if (isAtTop) {
      wasAtTopRef.current = true
    }
  }, [isAtTop])

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
      <div
        className={cn(
          "z-50 transition-opacity duration-200",
          isAtTop
            ? "relative w-full"
            : "fixed top-4 left-1/2 w-max",
          !isAtTop && !visible ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        style={{
          transform: !isAtTop
            ? visible
              ? "translateX(-50%)"
              : "translateX(-50%) translateY(-100%)"
            : undefined,
          transition: !isAtTop
            ? wasAtTopRef.current
              ? "opacity 200ms" // Only opacity when leaving top
              : "transform 300ms, opacity 300ms" // Full animation when floating
            : undefined
        }}
      >
        <div className={cn(
          "relative px-4 py-2 transition-all duration-300",
          isAtTop
            ? "bg-background border-b rounded-none"
            : "rounded-3xl bg-background/80 backdrop-blur-md border shadow-lg"
        )}>
          <NavigationMenu className={isAtTop ? "mx-auto" : ""}>
              <NavigationMenuList className="items-center">
                {/* Cafe name text with aurora effect - properly wrapped in NavigationMenuItem */}
                <NavigationMenuItem className="mr-6">
                  <NavigationMenuLink asChild>
                    <Link href="/" className="flex items-center">
                      <div className="flex items-center" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                        <AuroraText
                          className="text-xl font-normal whitespace-nowrap leading-none"
                          colors={["#8B4513", "#D2691E", "#CD853F", "#DEB887"]}
                          speed={5}
                        >
                          Moon River Café
                        </AuroraText>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/subscribe" className={navigationMenuTriggerStyle()}>
                    Subscribe
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/shop" className={navigationMenuTriggerStyle()}>
                    Shop All
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Coffee</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/coffee"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Our Selection
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Discover our curated collection.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/coffee/single-origin" title="Single Origin">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do.
                    </ListItem>
                    <ListItem href="/coffee/blends" title="House Blends">
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                    </ListItem>
                    <ListItem href="/coffee/decaf" title="Decaf Options">
                      Duis aute irure dolor in reprehenderit in voluptate velit.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Lattes & Cold Brews</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px]">
                    <ListItem href="/lattes" title="Signature Lattes">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </ListItem>
                    <ListItem href="/cold-brew" title="Cold Brew Collection">
                      Sed do eiusmod tempor incididunt ut labore et dolore magna.
                    </ListItem>
                    <ListItem href="/seasonal" title="Seasonal Specials">
                      Ut enim ad minim veniam, quis nostrud exercitation.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Brew Guides</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px]">
                    <ListItem href="/guides/pour-over" title="Pour Over">
                      Lorem ipsum dolor sit amet, consectetur adipiscing.
                    </ListItem>
                    <ListItem href="/guides/french-press" title="French Press">
                      Sed do eiusmod tempor incididunt ut labore.
                    </ListItem>
                    <ListItem href="/guides/espresso" title="Espresso">
                      Duis aute irure dolor in reprehenderit.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/cafes" className={navigationMenuTriggerStyle()}>
                    Cafes
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/wholesale" className={navigationMenuTriggerStyle()}>
                    Wholesale
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

