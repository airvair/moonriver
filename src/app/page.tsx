import { SiteHeader } from "@/components/site-header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col">
        {/* Hero section */}
        <div className="min-h-screen flex flex-col items-center justify-center text-center py-8">
          <div className="relative h-64 w-64 mb-8">
            <Image
              src="/moonriver_logo.png"
              alt="Moon River Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Additional white space sections for scrolling */}
        <div className="min-h-screen bg-white"></div>
        <div className="min-h-screen bg-white"></div>
        <div className="min-h-screen bg-white"></div>
      </main>
    </>
  );
}
