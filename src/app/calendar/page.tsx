import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function CalendarPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-24 flex-1">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              Events Calendar
            </h1>

            <div className="w-full aspect-[4/3] md:aspect-video rounded-lg overflow-hidden border shadow-lg">
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showTz=0&showCalendars=0&showTabs=0&showTitle=0&src=cHJlc3Rvbi5tYWxtcXVpc3RAZ21haWwuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039be5&color=%230b8043"
                className="w-full h-full"
                style={{ border: 0 }}
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>
        </div>
        <SiteFooter />
      </main>
    </>
  );
}
