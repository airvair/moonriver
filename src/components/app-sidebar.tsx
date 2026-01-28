"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BookOpen,
  Mic,
  ShoppingBag,
  Gift,
  Calendar,
  Coffee,
  Heart,
  Users,
  ExternalLink,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const mainNavItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "Menu", href: "/menu", icon: Coffee },
  { title: "Blog", href: "/blog", icon: BookOpen },
  { title: "Podcast", href: "/podcast", icon: Mic },
]

const shopNavItems = [
  { title: "Merchandise", href: "/guides/merchandise", icon: ShoppingBag, disabled: true },
  {
    title: "Gift Cards",
    href: "https://www.toasttab.com/moon-river-cafe-728-e-new-haven-ave/giftcards",
    icon: Gift,
    external: true,
    disabled: true,
  },
]

const eventsNavItems = [
  { title: "Calendar", href: "/calendar", icon: Calendar },
  { title: "Afternoon Tea", href: "/afternoon-tea", icon: Coffee },
]

const aboutNavItems = [
  { title: "Our Story", href: "/story", icon: Heart },
  { title: "Our Team", href: "/our-team", icon: Users },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  const handleLinkClick = () => {
    setOpenMobile(false)
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <Sidebar collapsible="offcanvas" className="lg:hidden">
      <SidebarHeader className="p-4">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center"
          style={{ fontFamily: "TanNimbus, sans-serif" }}
        >
          <span
            className="text-xl font-normal whitespace-nowrap leading-none text-white"
            style={{
              WebkitTextStroke: "2px #926F34",
              paintOrder: "stroke fill",
            }}
          >
            Moon River Cafe
          </span>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} size="lg">
                    <Link href={item.href} onClick={handleLinkClick}>
                      <item.icon className="size-5" />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Shop Navigation - Coming Soon */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm text-muted-foreground/50">Shop (Coming Soon)</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {shopNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    size="lg"
                    disabled
                    className="opacity-40 cursor-not-allowed"
                  >
                    <item.icon className="size-5" />
                    <span className="text-base">{item.title}</span>
                    {item.external && <ExternalLink className="ml-auto size-3 opacity-50" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Events Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Events</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {eventsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} size="lg">
                    <Link href={item.href} onClick={handleLinkClick}>
                      <item.icon className="size-5" />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* About Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">About</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {aboutNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} size="lg">
                    <Link href={item.href} onClick={handleLinkClick}>
                      <item.icon className="size-5" />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button asChild className="w-full" size="lg">
          <a
            href="https://order.toasttab.com/online/moon-river-cafe-728-e-new-haven-ave"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            Order Online
            <ExternalLink className="ml-2 size-4" />
          </a>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
