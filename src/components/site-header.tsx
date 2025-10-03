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
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  const [visible, setVisible] = React.useState(true)
  const [prevScrollPos, setPrevScrollPos] = React.useState(0)

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
      <div
        className={cn(
          "fixed top-4 left-1/2 z-50 w-max transition-all duration-300",
          !visible ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        style={{
          transform: visible
            ? "translateX(-50%)"
            : "translateX(-50%) translateY(-100%)",
        }}
      >
        <div className="relative px-4 py-2 rounded-3xl bg-background/80 backdrop-blur-md border shadow-lg">
          <NavigationMenu viewport={false}>
              <NavigationMenuList className="items-center">
                {/* Cafe name text with red border - properly wrapped in NavigationMenuItem */}
                <NavigationMenuItem className="mr-6">
                  <NavigationMenuLink asChild>
                    <Link href="/" className="flex items-center">
                      <div className="flex items-center" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                        <span
                          className="text-xl font-normal whitespace-nowrap leading-none text-white"
                          style={{
                            WebkitTextStroke: '2px #B91C1C',
                            textStroke: '2px #B91C1C',
                            paintOrder: 'stroke fill'
                          }}
                        >
                          Moon River
                        </span>
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
                  <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
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
                        </Link>
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
                  <ul className="grid gap-2 p-4 md:w-[400px]">
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
                  <ul className="grid gap-2 p-4 md:w-[400px]">
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

              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
        <Link href={href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}