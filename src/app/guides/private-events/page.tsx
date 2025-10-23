"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
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
  Phone,
  Mail,
  MapPin,
  Wine,
  Check,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PrivateEvents() {
  // Event types for the grid showcase
  const eventTypes = [
    {
      title: "Corporate Events",
      description: "Professional gatherings with premium coffee service and meeting spaces",
      emoji: "💼",
      features: ["Team meetings", "Client presentations", "Product launches"],
      badge: "Popular",
    },
    {
      title: "Birthday Celebrations",
      description: "Make your special day memorable with custom cakes and decorations",
      emoji: "🎉",
      features: ["Custom cakes", "Themed decorations", "Party packages"],
      badge: "Best Seller",
    },
    {
      title: "Bridal Showers",
      description: "Elegant pre-wedding celebrations with tea service and champagne",
      emoji: "💕",
      features: ["Tea service", "Champagne toasts", "Dessert bars"],
      badge: "Elegant",
    },
    {
      title: "Wine Tastings",
      description: "Curated wine experiences with sommelier guidance and pairings",
      emoji: "🍷",
      features: ["Sommelier guidance", "Cheese pairings", "Wine education"],
      badge: "Premium",
    },
    {
      title: "Team Building",
      description: "Strengthen bonds with coffee workshops and latte art classes",
      emoji: "☕",
      features: ["Coffee workshops", "Latte art classes", "Team challenges"],
      badge: "Fun",
    },
    {
      title: "Private Dinners",
      description: "Intimate dining with custom menus and personal chef service",
      emoji: "🍽️",
      features: ["Custom menus", "Personal chef", "Wine selection"],
      badge: "Exclusive",
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
      <main className="flex flex-col relative unified-background overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Background Image */}
          <img
            src="/images_videos/home/christmas_cafe.png"
            alt="Moon River Café private event space"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Warm Overlay for Text Readability */}
          <div className="absolute inset-0 z-[1]">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/55" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#926F34]/10 via-transparent to-[#D4AF37]/10" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FFE5B4]/5 to-transparent" />
          </div>

          <div className="container mx-auto px-4 py-32 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
              {/* Left side - Main content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-base font-handwritten border border-primary/20 warm-glow">
                    ✨ Exclusive Venue • Exceptional Service
                  </span>
                </div>

                <h1
                  className="text-6xl md:text-8xl font-bold mb-6 text-white"
                  style={{
                    fontFamily: 'TanNimbus, sans-serif',
                    WebkitTextStroke: '3px #926F34',
                    paintOrder: 'stroke fill'
                  }}
                >
                  Private Events
                </h1>

                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 font-casual">
                  Transform your special occasions into unforgettable experiences. From intimate gatherings to corporate celebrations, we create moments that matter.
                </p>

                <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-handwritten text-lg warm-glow"
                    asChild
                  >
                    <Link href="#booking">
                      Book Your Event
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white/30 hover:bg-white/10 font-handwritten text-lg"
                    asChild
                  >
                    <Link href="#gallery">
                      View Gallery
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right side - Quick Info Card */}
              <div className="w-full lg:w-96 xl:w-[28rem]">
                <div className="backdrop-blur-sm border-2 border-primary/20 warm-shadow-enhanced rounded-2xl paper-texture vintage-paper p-6">
                  <h2 className="text-2xl font-handwritten text-primary mb-4">At a Glance</h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-handwritten text-lg text-primary">Up to 50 Guests</p>
                        <p className="text-sm text-muted-foreground font-casual">Perfect for any gathering</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Utensils className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-handwritten text-lg text-primary">Custom Menus</p>
                        <p className="text-sm text-muted-foreground font-casual">Tailored to your taste</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-handwritten text-lg text-primary">Dedicated Staff</p>
                        <p className="text-sm text-muted-foreground font-casual">Professional service</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="font-handwritten text-lg text-primary">Full Amenities</p>
                        <p className="text-sm text-muted-foreground font-casual">Everything you need</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-handwritten" asChild>
                    <Link href="#booking">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-card/95 rounded-2xl p-6 text-center warm-shadow-enhanced vintage-paper paper-texture cozy-card">
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <NumberTicker value={500} />+
                </h3>
                <p className="text-muted-foreground font-casual">Events Hosted</p>
              </div>
              <div className="bg-card/95 rounded-2xl p-6 text-center warm-shadow-enhanced vintage-paper paper-texture cozy-card">
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <NumberTicker value={50} />
                </h3>
                <p className="text-muted-foreground font-casual">Guest Capacity</p>
              </div>
              <div className="bg-card/95 rounded-2xl p-6 text-center warm-shadow-enhanced vintage-paper paper-texture cozy-card">
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <NumberTicker value={98} />%
                </h3>
                <p className="text-muted-foreground font-casual">Satisfaction Rate</p>
              </div>
              <div className="bg-card/95 rounded-2xl p-6 text-center warm-shadow-enhanced vintage-paper paper-texture cozy-card">
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <NumberTicker value={10} />+
                </h3>
                <p className="text-muted-foreground font-casual">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Event Types Showcase */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  Celebrations We Host
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                Event Types
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-casual">
                From corporate gatherings to intimate celebrations, we provide the perfect setting
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {eventTypes.map((item, index) => (
                <div key={index} className="bg-card/95 rounded-3xl p-8 warm-shadow-enhanced vintage-paper cozy-card">
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-[#926F34]/20 via-[#D4AF37]/10 to-primary/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-7xl mb-2">{item.emoji}</div>
                        <p className="text-muted-foreground font-casual text-sm">{item.badge}</p>
                      </div>
                    </div>
                  </div>
                  <span className="stamp stamp-fresh text-xs">{item.badge}</span>
                  <h3 className="text-2xl font-handwritten text-primary mt-4 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 font-casual">
                    {item.description}
                  </p>
                  <ul className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-4 w-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features & Amenities Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  Everything You Need
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                Features & Amenities
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-casual">
                All the essentials for a successful event, in one exceptional venue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card/95 warm-shadow-enhanced vintage-paper paper-texture cozy-card border-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        {feature.icon}
                      </div>
                      <span className="font-handwritten text-xl text-primary">{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base font-casual">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-32 px-4" id="gallery">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  Memorable Moments
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                Event Gallery
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-casual">
                A glimpse at some of the special events we&apos;ve hosted
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Gallery images */}
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] group vintage-paper warm-shadow-enhanced">
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
                    <p className="text-white font-handwritten text-lg">Elegant Dessert Service</p>
                    <p className="text-white/80 text-sm font-casual">Corporate Event</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl aspect-[4/3] group vintage-paper warm-shadow-enhanced">
                <Image
                  src="/images_videos/afternoon_tea/high_tea.jpg"
                  alt="Private event setup"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-handwritten text-lg">Tea Service Setup</p>
                    <p className="text-white/80 text-sm font-casual">Bridal Shower</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl aspect-[4/3] group vintage-paper warm-shadow-enhanced">
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
                    <p className="text-white font-handwritten text-lg">Artisan Coffee Service</p>
                    <p className="text-white/80 text-sm font-casual">Team Building</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  Client Stories
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                What Our Clients Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-casual">
                Real experiences from wonderful people who celebrated with us
              </p>
            </div>

            <div className="relative">
              <Marquee pauseOnHover className="[--duration:40s]">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="w-[350px] mx-4 bg-card/95 vintage-paper paper-texture warm-shadow-enhanced border-primary/10">
                    <CardHeader>
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <CardDescription className="text-base italic font-casual">
                        &ldquo;{testimonial.quote}&rdquo;
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-handwritten text-lg text-primary">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground font-casual">{testimonial.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        {/* Packages & Pricing Section */}
        <section className="py-32 px-4" id="booking">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  Choose Your Package
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                Event Packages
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-casual">
                Select the perfect package for your celebration, or let us create something custom
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Essential Package */}
              <Card className="relative bg-card/95 vintage-paper paper-texture warm-shadow-enhanced border-primary/10 cozy-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-handwritten text-primary">Essential</CardTitle>
                  <CardDescription className="font-casual">Perfect for small gatherings</CardDescription>
                  <div className="text-4xl font-bold text-primary mt-4">
                    $500
                    <span className="text-base font-normal text-muted-foreground ml-2">starting</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Up to 20 guests</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>3-hour venue rental</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Coffee & tea service</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Basic AV equipment</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Dedicated event coordinator</span>
                    </li>
                  </ul>
                  <Button className="w-full font-handwritten" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Package */}
              <Card className="relative bg-card/95 vintage-paper paper-texture warm-shadow-enhanced border-primary/20 cozy-card">
                <span className="stamp stamp-fresh absolute -top-3 left-1/2 -translate-x-1/2 text-xs">
                  Most Popular
                </span>
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl font-handwritten text-primary">Premium</CardTitle>
                  <CardDescription className="font-casual">Ideal for corporate events</CardDescription>
                  <div className="text-4xl font-bold text-primary mt-4">
                    $1,200
                    <span className="text-base font-normal text-muted-foreground ml-2">starting</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Up to 35 guests</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>5-hour venue rental</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Full bar service</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Customized menu options</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Professional AV setup</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Live music option</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-handwritten warm-glow">
                    Book Now
                  </Button>
                </CardContent>
              </Card>

              {/* Luxe Package */}
              <Card className="relative bg-card/95 vintage-paper paper-texture warm-shadow-enhanced border-primary/10 cozy-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-handwritten text-primary">Luxe</CardTitle>
                  <CardDescription className="font-casual">Ultimate celebration experience</CardDescription>
                  <div className="text-4xl font-bold text-primary mt-4">
                    $2,500
                    <span className="text-base font-normal text-muted-foreground ml-2">starting</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Up to 50 guests</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Full-day exclusive venue</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Premium bar & cocktails</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Chef&apos;s tasting menu</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Custom decorations</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Photography included</span>
                    </li>
                    <li className="flex items-center font-casual">
                      <Check className="h-4 w-4 mr-3 text-green-500" />
                      <span>Valet parking service</span>
                    </li>
                  </ul>
                  <Button className="w-full font-handwritten" variant="outline">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground font-casual">
                All packages can be customized to meet your specific needs. Contact us for a personalized quote.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                Book Your Event
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-casual">
                Ready to create something special? Our events team is here to help
              </p>
            </div>

            <Card className="bg-card/95 vintage-paper paper-texture warm-shadow-enhanced border-primary/10">
              <CardHeader>
                <CardTitle className="text-2xl font-handwritten text-primary">Contact Our Events Team</CardTitle>
                <CardDescription className="text-base font-casual">
                  We&apos;ll work with you to create the perfect event experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-handwritten text-lg text-primary">Call Us</p>
                        <p className="text-muted-foreground font-casual">(321) 555-0100</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-handwritten text-lg text-primary">Email Us</p>
                        <p className="text-muted-foreground font-casual">events@moonrivercafe.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-handwritten text-lg text-primary">Visit Us</p>
                        <p className="text-muted-foreground font-casual">728 E New Haven Ave<br />Melbourne, FL 32901</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-handwritten text-primary">Name</label>
                      <Input placeholder="Your name" className="mt-1 font-casual" />
                    </div>
                    <div>
                      <label className="text-sm font-handwritten text-primary">Email</label>
                      <Input type="email" placeholder="your@email.com" className="mt-1 font-casual" />
                    </div>
                    <div>
                      <label className="text-sm font-handwritten text-primary">Event Type</label>
                      <Input placeholder="e.g., Corporate event, Birthday party" className="mt-1 font-casual" />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-handwritten warm-glow">
                      Send Inquiry
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-center text-sm text-muted-foreground font-casual">
                    Our events team typically responds within 24 hours during business days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="text-sm font-medium uppercase tracking-wider text-primary badge-handwritten">
                  Questions & Answers
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 handwritten-underline" style={{ fontFamily: 'TanNimbus, sans-serif' }}>
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-casual">
                Everything you need to know about hosting your event at Moon River
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={`item-${index}`}
                  value={`item-${index}`}
                  className="bg-card/95 vintage-paper paper-texture warm-shadow-enhanced border rounded-lg px-6"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left font-handwritten text-lg text-primary">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-casual">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4 font-casual">
                Still have questions? We&apos;re here to help!
              </p>
              <Button
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 font-handwritten warm-glow"
                asChild
              >
                <Link href="mailto:events@moonrivercafe.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Our Events Team
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <SiteFooter />
      </main>
    </>
  );
}
