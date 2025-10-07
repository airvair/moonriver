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
                  <Link href="/menu10-25.pdf" target="_blank" rel="noopener noreferrer" className={navigationMenuTriggerStyle()}>
                    Menu
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                  <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 p-4 md:w-[400px]">
                      <ListItem href="/guides/merchandise" title="Merchandise">
                          Shop our mugs and apparel—available online and in-store.
                      </ListItem>
                      <ListItem href="https://www.toasttab.com/moon-river-cafe-728-e-new-haven-ave/giftcards" title="Gift Cards">
                          Give the gift of coffee with digital or physical cards for any occasion.
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
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
                    <ListItem href="/guides/private-events" title="Private Events">
                        Plan a private gathering with us.
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
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 md:w-[400px]">
                  <ListItem href="/story" title="Our Story">
                      Learn more about the cafe, its history, and its mission.
                  </ListItem>
                  <ListItem href="/guides/press" title="Press">
                      Press inquiries and media inquiries.
                  </ListItem>
                  <ListItem href="/guides/contact" title="Contact">
                      Contact us for more information.
                  </ListItem>
                  </ul>
                </NavigationMenuContent>
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