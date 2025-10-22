"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { BlurFade } from "@/components/ui/blur-fade";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Users,
  Utensils,
  Music,
  Wifi,
  Monitor,
  Car,
  Star,
  Heart,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Sparkles,
  PartyPopper,
  Briefcase,
  Wine,
  Check,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function PrivateEvents() {
  // Event types for the bento grid showcase
  const eventTypes = [
    {
      title: "Corporate Events",
      description: "Professional gatherings with premium coffee service",
      icon: <Briefcase className="h-12 w-12" />,
      features: ["Team meetings", "Client presentations", "Product launches"],
      className: "md:col-span-2",
    },
    {
      title: "Birthday Parties",
      description: "Celebrate your special day in style",
      icon: <PartyPopper className="h-12 w-12" />,
      features: ["Custom cakes", "Themed decorations", "Party packages"],
    },
    {
      title: "Bridal Showers",
      description: "Elegant pre-wedding celebrations",
      icon: <Heart className="h-12 w-12" />,
      features: ["Tea service", "Champagne toasts", "Dessert bars"],
    },
    {
      title: "Wine Tastings",
      description: "Curated wine experiences with food pairings",
      icon: <Wine className="h-12 w-12" />,
      features: ["Sommelier guidance", "Cheese pairings", "Wine education"],
    },
    {
      title: "Team Building",
      description: "Strengthen bonds over great coffee",
      icon: <Users className="h-12 w-12" />,
      features: ["Coffee workshops", "Latte art classes", "Team challenges"],
      className: "md:col-span-2",
    },
    {
      title: "Private Dinners",
      description: "Intimate dining experiences",
      icon: <Utensils className="h-12 w-12" />,
      features: ["Custom menus", "Personal chef", "Wine selection"],
    },
  ];

  // Features and amenities
  const features = [
    {
      title: "Capacity",
      description: "Accommodate up to 50 guests comfortably",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Custom Menus",
      description: "Tailored dining experiences to match your vision",
      icon: <Utensils className="h-5 w-5" />
    },
    {
      title: "AV Equipment",
      description: "Professional audio-visual setup included",
      icon: <Monitor className="h-5 w-5" />
    },
    {
      title: "Private Bar",
      description: "Full bar service with expert mixologists",
      icon: <Wine className="h-5 w-5" />
    },
    {
      title: "Dedicated Staff",
      description: "Professional team devoted to your event",
      icon: <Star className="h-5 w-5" />
    },
    {
      title: "Flexible Setup",
      description: "Customizable space layout for any occasion",
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      title: "Free Wifi",
      description: "High-speed internet for all your guests",
      icon: <Wifi className="h-5 w-5" />
    },
    {
      title: "Parking",
      description: "Convenient parking available nearby",
      icon: <Car className="h-5 w-5" />
    },
    {
      title: "Live Music",
      description: "Options for live entertainment",
      icon: <Music className="h-5 w-5" />
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "Moon River made our corporate event absolutely perfect. The attention to detail and service was exceptional.",
      author: "Sarah Mitchell",
      role: "Event Coordinator, Tech Corp",
      rating: 5
    },
    {
      quote: "We celebrated our daughter's birthday here and it was magical. The staff went above and beyond!",
      author: "Michael Chen",
      role: "Happy Parent",
      rating: 5
    },
    {
      quote: "The perfect venue for our team building workshop. Great atmosphere and amazing coffee!",
      author: "Jennifer Adams",
      role: "HR Director",
      rating: 5
    },
    {
      quote: "Our bridal shower was everything we dreamed of. Beautiful space and incredible service.",
      author: "Emily Rodriguez",
      role: "Bride-to-be",
      rating: 5
    },
    {
      quote: "The wine tasting event exceeded all expectations. Knowledgeable staff and perfect pairings.",
      author: "David Thompson",
      role: "Wine Enthusiast",
      rating: 5
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What is the maximum capacity for private events?",
      answer: "Our private event space can comfortably accommodate up to 50 guests. For larger events, we can discuss exclusive use of the entire café."
    },
    {
      question: "Can we customize the menu for our event?",
      answer: "Absolutely! We work with you to create a custom menu that perfectly matches your event's theme and dietary requirements. From coffee service to full dinner menus, we've got you covered."
    },
    {
      question: "Is there a minimum spend requirement?",
      answer: "Yes, private events have a minimum spend requirement that varies based on the day of the week and time of day. Please contact us for specific details based on your event date."
    },
    {
      question: "How far in advance should we book?",
      answer: "We recommend booking at least 4-6 weeks in advance, especially for weekend events. However, we can sometimes accommodate shorter notice depending on availability."
    },
    {
      question: "Do you provide audio-visual equipment?",
      answer: "Yes, we have professional AV equipment available including a sound system, microphones, and display screens for presentations. These are included in most event packages."
    },
    {
      question: "What are the payment terms?",
      answer: "We require a 30% deposit to secure your booking, with the remaining balance due 48 hours before your event. We accept all major credit cards and bank transfers."
    },
    {
      question: "Can we bring our own decorations?",
      answer: "Yes, you're welcome to bring your own decorations! We just ask that you coordinate with our event team in advance and avoid anything that might damage our walls or fixtures."
    },
    {
      question: "Is parking available for guests?",
      answer: "Yes, there's convenient parking available nearby with both street parking and a public lot within a 2-minute walk of the café."
    }
  ];

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
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Video Background - using a coffee shop video for now */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images_videos/home/coffee2.mp4" type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20">
            <BlurFade delay={0.25} inView>
              <AnimatedGradientText className="mb-6">
                <span className={cn(
                  "inline bg-gradient-to-r from-[#AE8625] via-[#F7EF8A] to-[#D2AC47] bg-clip-text text-transparent text-sm font-medium uppercase tracking-wider"
                )}>
                  Exclusive Venue • Exceptional Service
                </span>
              </AnimatedGradientText>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <h1
                className="text-6xl md:text-8xl font-bold mb-6 text-white"
                style={{
                  fontFamily: 'TanNimbus, serif',
                  WebkitTextStroke: '3px #926F34',
                  paintOrder: 'stroke fill'
                }}
              >
                Private Events
              </h1>
            </BlurFade>

            <BlurFade delay={0.75} inView>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Transform your special occasions into unforgettable experiences at Moon River Café.
                From intimate gatherings to corporate celebrations, we create moments that matter.
              </p>
            </BlurFade>

            <BlurFade delay={1} inView>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#926F34] hover:to-[#AE8625] text-white"
                  asChild
                >
                  <Link href="#booking">
                    Book Your Event
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10"
                  asChild
                >
                  <Link href="#gallery">
                    View Gallery
                  </Link>
                </Button>
              </div>
            </BlurFade>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronRight className="h-8 w-8 text-white/50 rotate-90" />
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <BlurFade delay={0.25} inView>
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">
                    <NumberTicker value={500} className="text-transparent bg-gradient-to-r from-[#AE8625] to-[#D2AC47] bg-clip-text" />+
                  </h3>
                  <p className="text-muted-foreground">Events Hosted</p>
                </div>
              </BlurFade>
              <BlurFade delay={0.5} inView>
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">
                    <NumberTicker value={50} className="text-transparent bg-gradient-to-r from-[#AE8625] to-[#D2AC47] bg-clip-text" />
                  </h3>
                  <p className="text-muted-foreground">Guest Capacity</p>
                </div>
              </BlurFade>
              <BlurFade delay={0.75} inView>
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">
                    <NumberTicker value={98} className="text-transparent bg-gradient-to-r from-[#AE8625] to-[#D2AC47] bg-clip-text" />%
                  </h3>
                  <p className="text-muted-foreground">Satisfaction Rate</p>
                </div>
              </BlurFade>
              <BlurFade delay={1} inView>
                <div className="text-center">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">
                    <NumberTicker value={10} className="text-transparent bg-gradient-to-r from-[#AE8625] to-[#D2AC47] bg-clip-text" />+
                  </h3>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Event Types Showcase */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.25} inView>
              <div className="text-center mb-12">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, serif' }}
                >
                  Event Types We Host
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From corporate gatherings to intimate celebrations, we provide the perfect
                  setting for every occasion
                </p>
              </div>
            </BlurFade>

            <BentoGrid className="max-w-7xl mx-auto">
              {eventTypes.map((item, index) => (
                <BlurFade key={index} delay={0.25 + index * 0.15} inView>
                  <BentoCard
                    name={item.title}
                    description={item.description}
                    background={
                      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#AE8625]/20 to-[#D2AC47]/20 rounded-lg">
                        {item.icon}
                      </div>
                    }
                    className={cn("bg-card/50 backdrop-blur", item.className)}
                    Icon={() => item.icon}
                    href="#"
                    cta="Learn More"
                  />
                </BlurFade>
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* Features & Amenities Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.25} inView>
              <div className="text-center mb-12">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, serif' }}
                >
                  Features & Amenities
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need for a successful event, all in one exceptional venue
                </p>
              </div>
            </BlurFade>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <BlurFade key={index} delay={0.25 + index * 0.1} inView>
                  <MagicCard
                    className="cursor-pointer bg-card/50 backdrop-blur border-primary/10"
                    gradientColor="#D2AC47"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gradient-to-r from-[#AE8625]/20 to-[#D2AC47]/20">
                          {feature.icon}
                        </div>
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 px-4" id="gallery">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.25} inView>
              <div className="text-center mb-12">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, serif' }}
                >
                  Event Gallery
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Take a glimpse at some of the memorable events we&apos;ve hosted
                </p>
              </div>
            </BlurFade>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Gallery images - using placeholder videos/images */}
              <BlurFade delay={0.5} inView>
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] group">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  >
                    <source src="/images_videos/afternoon_tea/high_tea_sweets.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-semibold">Elegant Dessert Service</p>
                      <p className="text-white/80 text-sm">Corporate Event</p>
                    </div>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.75} inView>
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] group">
                  <Image
                    src="/images_videos/afternoon_tea/high_tea.jpg"
                    alt="Private event setup"
                    width={600}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-semibold">Tea Service Setup</p>
                      <p className="text-white/80 text-sm">Bridal Shower</p>
                    </div>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={1} inView>
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] group">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  >
                    <source src="/images_videos/afternoon_tea/stirring_tea.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-semibold">Artisan Coffee Service</p>
                      <p className="text-white/80 text-sm">Team Building</p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.25} inView>
              <div className="text-center mb-12">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, serif' }}
                >
                  What Our Clients Say
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Don&apos;t just take our word for it - hear from those who&apos;ve experienced our events
                </p>
              </div>
            </BlurFade>

            <div className="relative">
              <Marquee pauseOnHover className="[--duration:40s]">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="w-[350px] mx-4 bg-card/50 backdrop-blur border-primary/10">
                    <CardHeader>
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-[#D2AC47] text-[#D2AC47]" />
                        ))}
                      </div>
                      <CardDescription className="text-base italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        {/* Packages & Pricing Section */}
        <section className="py-20 px-4" id="booking">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.25} inView>
              <div className="text-center mb-12">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, serif' }}
                >
                  Event Packages
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose the perfect package for your celebration, or let us create a custom solution
                </p>
              </div>
            </BlurFade>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Essential Package */}
              <BlurFade delay={0.5} inView>
                <Card className="relative bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-2xl">Essential</CardTitle>
                    <CardDescription>Perfect for small gatherings</CardDescription>
                    <div className="text-4xl font-bold text-primary mt-4">
                      $500
                      <span className="text-base font-normal text-muted-foreground ml-2">starting</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Up to 20 guests</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>3-hour venue rental</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Coffee & tea service</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Basic AV equipment</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Dedicated event coordinator</span>
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Premium Package */}
              <BlurFade delay={0.75} inView>
                <Card className="relative bg-gradient-to-br from-[#AE8625]/10 to-[#D2AC47]/10 border-primary/30 hover:border-primary/50 transition-colors">
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#AE8625] to-[#D2AC47] text-white">
                    Most Popular
                  </Badge>
                  <CardHeader className="pt-8">
                    <CardTitle className="text-2xl">Premium</CardTitle>
                    <CardDescription>Ideal for corporate events</CardDescription>
                    <div className="text-4xl font-bold text-primary mt-4">
                      $1,200
                      <span className="text-base font-normal text-muted-foreground ml-2">starting</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Up to 35 guests</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>5-hour venue rental</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Full bar service</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Customized menu options</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Professional AV setup</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Live music option</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#926F34] hover:to-[#AE8625] text-white">
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Luxe Package */}
              <BlurFade delay={1} inView>
                <Card className="relative bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-2xl">Luxe</CardTitle>
                    <CardDescription>Ultimate celebration experience</CardDescription>
                    <div className="text-4xl font-bold text-primary mt-4">
                      $2,500
                      <span className="text-base font-normal text-muted-foreground ml-2">starting</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Up to 50 guests</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Full-day exclusive venue</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Premium bar & cocktails</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Chef&apos;s tasting menu</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Custom decorations</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Photography included</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 mr-3 text-green-500" />
                        <span>Valet parking service</span>
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Contact Us
                    </Button>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>

            <BlurFade delay={1.25} inView>
              <div className="text-center mt-12">
                <p className="text-muted-foreground">
                  All packages can be customized to meet your specific needs.
                  Contact us for a personalized quote.
                </p>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
          <div className="max-w-4xl mx-auto">
            <BlurFade delay={0.25} inView>
              <div className="text-center mb-12">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, serif' }}
                >
                  Book Your Event
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ready to create something special? Get in touch with our events team
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <Card className="bg-card/50 backdrop-blur border-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Our Events Team</CardTitle>
                  <CardDescription className="text-base">
                    We&apos;ll work with you to create the perfect event experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-gradient-to-r from-[#AE8625]/20 to-[#D2AC47]/20">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">Call Us</p>
                          <p className="text-muted-foreground">(321) 555-0100</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-gradient-to-r from-[#AE8625]/20 to-[#D2AC47]/20">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">Email Us</p>
                          <p className="text-muted-foreground">events@moonrivercafe.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-gradient-to-r from-[#AE8625]/20 to-[#D2AC47]/20">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold">Visit Us</p>
                          <p className="text-muted-foreground">728 E New Haven Ave<br />Melbourne, FL 32901</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input placeholder="Your name" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input type="email" placeholder="your@email.com" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Event Type</label>
                        <Input placeholder="e.g., Corporate event, Birthday party" className="mt-1" />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[#AE8625] to-[#D2AC47] hover:from-[#926F34] hover:to-[#AE8625] text-white">
                        Send Inquiry
                      </Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <p className="text-center text-sm text-muted-foreground">
                      Our events team typically responds within 24 hours during business days
                    </p>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <BlurFade delay={0.25} inView>
              <div className="text-center mb-12">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'TanNimbus, serif' }}
                >
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to know about hosting your event at Moon River
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={`item-${index}`}
                    value={`item-${index}`}
                    className="bg-card/50 backdrop-blur border rounded-lg px-6"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </BlurFade>

            <BlurFade delay={0.75} inView>
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Still have questions? We&apos;re here to help!
                </p>
                <Button
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10"
                  asChild
                >
                  <Link href="mailto:events@moonrivercafe.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Our Events Team
                  </Link>
                </Button>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />
      </main>
    </>
  );
}