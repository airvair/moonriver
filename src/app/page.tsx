import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col">
        {/* Hero section */}
        <div className="min-h-screen flex flex-col items-center justify-center text-center py-8">
          <div className="relative h-64 w-64 mb-8">
            <video
              src="/dog_hare_animation.webm"
              className="h-full w-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>

        {/* Additional space sections for scrolling */}
        <div className="min-h-screen bg-background"></div>
        <div className="min-h-screen bg-background"></div>
        <div className="min-h-screen bg-background"></div>
      </main>
    </>
  );
}
