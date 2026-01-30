"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BookOpen,
  Mic,
  Calendar,
  Coffee,
  Heart,
  ExternalLink,
  Music,
  Youtube,
  Sparkles,
  Feather,
  PenLine,
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
]

const eventsNavItems = [
  { title: "Calendar", href: "/calendar", icon: Calendar },
  { title: "Afternoon Tea", href: "/afternoon-tea", icon: Coffee },
]

const discoverNavItems = [
  { title: "The Journal", href: "/blog", icon: BookOpen },
  { title: "Podcast", href: "/podcast", icon: Mic },
  { title: "Poetry Anthology", href: "/poetry-anthology", icon: Feather },
  { title: "Literary Journal", href: "/submissions", icon: PenLine },
  { title: "Our Story", href: "/story", icon: Heart },
]

const liveMusicNavItems = [
  { title: "Perform at Moon River", href: "/live-music/apply", icon: Music },
  { title: "Watch Performances", href: "#", icon: Youtube, disabled: true },
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

      {/* Featured Section - Highlight current promotion or event */}
      <div className="px-3 py-3">
        <Link
          href="/calendar"
          onClick={handleLinkClick}
          className="block p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/15 active:bg-primary/20 transition-colors min-h-[44px]"
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">Featured</span>
          </div>
          <p className="font-handwritten text-base text-foreground leading-snug">Poetry Night Every 1st & Last Friday of the Month</p>
          <p className="text-xs text-muted-foreground mt-1">View all events</p>
        </Link>
      </div>

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

        {/* Discover Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Discover</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {discoverNavItems.map((item) => (
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

        {/* Live Music Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm">Live Music</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {liveMusicNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.disabled ? (
                    <SidebarMenuButton
                      size="lg"
                      disabled
                      className="opacity-40 cursor-not-allowed"
                    >
                      <item.icon className="size-5" />
                      <span className="text-base">{item.title}</span>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton asChild isActive={isActive(item.href)} size="lg">
                      <Link href={item.href} onClick={handleLinkClick}>
                        <item.icon className="size-5" />
                        <span className="text-base">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button asChild className="w-full warm-shadow" size="lg">
          <a
            href="https://online.skytab.com/s/moonrivercafeandcuriosities"
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
