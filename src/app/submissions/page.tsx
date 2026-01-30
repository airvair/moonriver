"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { BookOpen, ExternalLink, Feather, FileText, Heart, PenLine, ScrollText, Sparkles } from "lucide-react";

export default function SubmissionsPage() {
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

      <main id="main-content" className="flex flex-col unified-background">
        {/* Hero Section */}
        <BlurFade delay={0} duration={0.6}>
          <section className="relative min-h-[45vh] sm:min-h-[50vh] flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Feather className="absolute top-[15%] left-[10%] h-8 w-8 text-primary/10 rotate-[-15deg]" />
              <BookOpen className="absolute top-[25%] right-[15%] h-10 w-10 text-primary/10 rotate-[10deg]" />
              <PenLine className="absolute bottom-[30%] left-[20%] h-6 w-6 text-primary/10 rotate-[25deg]" />
              <ScrollText className="absolute bottom-[20%] right-[10%] h-8 w-8 text-primary/10 rotate-[-10deg]" />
            </div>

            <div className="container mx-auto px-4 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 relative z-10">
              <div className="max-w-4xl mx-auto">
                <BlurFade delay={0.1}>
                  <span className="inline-block text-xs sm:text-sm font-medium uppercase tracking-wider text-primary/80 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 mb-6">
                    Call for Submissions
                  </span>
                </BlurFade>

                <BlurFade delay={0.2}>
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    Moon River Literary Journal
                  </h1>
                </BlurFade>

                <BlurFade delay={0.4}>
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-casual max-w-2xl mx-auto px-2 leading-relaxed">
                    We are pleased to welcome submissions for the first edition of the Moon River Literary Journal.
                  </p>
                </BlurFade>

                <BlurFade delay={0.5}>
                  <p className="text-sm sm:text-base text-muted-foreground/80 font-casual mt-4 italic max-w-2xl mx-auto">
                    This inaugural issue seeks work that is attentive to language, image, and emotional resonance.
                    Writing that lingers, unsettles gently, and illuminates something quietly true.
                  </p>
                </BlurFade>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* What We're Looking For */}
        <section className="py-10 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BlurFade delay={0.1} inView>
                <h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  What We&apos;re Looking For
                </h2>
              </BlurFade>

              <BlurFade delay={0.15} inView>
                <div className="bg-background rounded-xl sm:rounded-2xl warm-shadow p-6 sm:p-8 mb-6">
                  <p className="text-muted-foreground font-casual mb-6 text-center">
                    We accept original, unpublished work in the following categories:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: BookOpen, label: "Short Fiction" },
                      { icon: Sparkles, label: "Creative Nonfiction" },
                      { icon: Feather, label: "Poetry" },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <item.icon className="h-6 w-6 text-primary mb-2" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-muted-foreground font-casual mt-6 text-center text-sm">
                    We are interested in work that values craft and voice.
                  </p>

                  <p className="text-sm text-muted-foreground/70 mt-4 text-center font-casual">
                    We do not accept op-eds, reviews, or polemical essays.
                  </p>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Submission Guidelines */}
        <section className="py-10 sm:py-12 md:py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BlurFade delay={0.1} inView>
                <h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center"
                  style={{ fontFamily: 'TanNimbus, sans-serif' }}
                >
                  Submission Guidelines
                </h2>
              </BlurFade>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <BlurFade delay={0.15} inView>
                  <div className="bg-background rounded-lg sm:rounded-xl p-5 sm:p-6 warm-shadow h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold">Format Requirements</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground font-casual text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Maximum length: 3,500 words</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Typed, single-spaced</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Font size: 12pt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Submit as one document</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Maximum 3 submissions per author</span>
                      </li>
                    </ul>
                  </div>
                </BlurFade>

                <BlurFade delay={0.2} inView>
                  <div className="bg-background rounded-lg sm:rounded-xl p-5 sm:p-6 warm-shadow h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <PenLine className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold">Include in Your Document</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground font-casual text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Title of work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Author name</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Contact information</span>
                      </li>
                    </ul>
                  </div>
                </BlurFade>

                <BlurFade delay={0.25} inView>
                  <div className="bg-background rounded-lg sm:rounded-xl p-5 sm:p-6 warm-shadow h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold">Content Guidelines</h3>
                    </div>
                    <p className="text-muted-foreground font-casual text-sm mb-3">
                      To ensure accessibility for a broad readership:
                    </p>
                    <ul className="space-y-2 text-muted-foreground font-casual text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>No gratuitous violence</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>No gratuitous sexual content</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground/70 mt-3 italic">
                      Work may engage difficult or complex subjects, but content should serve the piece rather than exist for shock or excess.
                    </p>
                  </div>
                </BlurFade>

                <BlurFade delay={0.3} inView>
                  <div className="bg-background rounded-lg sm:rounded-xl p-5 sm:p-6 warm-shadow h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ScrollText className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold">Rights & Originality</h3>
                    </div>
                    <p className="text-muted-foreground font-casual text-sm mb-3">
                      By submitting, you confirm that:
                    </p>
                    <ul className="space-y-2 text-muted-foreground font-casual text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>The work is your own</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>You maintain valid rights to publish the work</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>You are submitting exclusively to Moon River Literary Journal during the review period</span>
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground/70 mt-3">
                      Authors selected for publication will be contacted directly with next steps and publication details.
                    </p>
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </section>

        {/* Deadline Banner */}
        <BlurFade delay={0.1} inView>
          <section className="py-8 sm:py-10">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <div className="bg-primary/10 border border-primary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
                  <p className="text-sm uppercase tracking-wider text-primary/80 mb-2 font-medium">
                    Submission Deadline
                  </p>
                  <p
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
                    style={{ fontFamily: 'TanNimbus, sans-serif' }}
                  >
                    March 20, 2026
                  </p>
                </div>
              </div>
            </div>
          </section>
        </BlurFade>

        {/* Submit Form Section */}
        <section className="py-10 sm:py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BlurFade delay={0.1} inView>
                <div className="bg-background rounded-xl sm:rounded-2xl warm-shadow overflow-hidden">
                  {/* Form Header */}
                  <div className="p-4 sm:p-6 md:p-8 border-b border-border">
                    <h2
                      className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
                      style={{ fontFamily: 'TanNimbus, sans-serif' }}
                    >
                      Submit Your Work
                    </h2>
                    <p className="text-muted-foreground font-casual">
                      Ready to share your writing with us? Submit your work using the form below.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="p-6 sm:p-8 md:p-10">
                    <div className="flex flex-col items-center text-center">
                      <Feather className="h-10 w-10 text-primary/40 mb-6" />
                      <p className="text-muted-foreground font-casual mb-8 max-w-md">
                        Click below to open our submission form. You&apos;ll be able to upload your
                        work and provide your contact information.
                      </p>
                      <a
                        href="https://forms.gle/Wtn6BUBYtCswp3Jh6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium text-lg warm-shadow hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
                      >
                        <PenLine className="h-5 w-5" />
                        Submit Your Work
                        <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <p className="text-xs text-muted-foreground/60 mt-4">
                        Opens in a new tab
                      </p>
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <BlurFade delay={0.1} inView>
          <section className="py-10 sm:py-12 md:py-16 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <p className="font-handwritten text-xl sm:text-2xl md:text-3xl text-primary leading-relaxed">
                  &ldquo;A word after a word after a word is power.&rdquo;
                </p>
                <p className="text-muted-foreground font-casual mt-4 text-sm">
                  — Margaret Atwood
                </p>
              </div>
            </div>
          </section>
        </BlurFade>

        <SiteFooter />
      </main>
    </>
  );
}
