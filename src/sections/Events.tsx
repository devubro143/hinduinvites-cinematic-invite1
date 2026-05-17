import { memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

export const Events = memo(function Events() {
  return (
    <section id="events" className="relative bg-[#0b050d]/80 px-6 py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--maroon-deep) 0%, transparent 70%)"
        }}
      />

      <SectionTitle
        eyebrow="Ceremonial Chapters"
        title="Five days. One love story."
        subtitle="Join us as we celebrate every sacred ritual and joyful moment."
      />

      <div className="mx-auto mt-16 max-w-5xl relative flex flex-col gap-12 sm:gap-16">
        {/* Glowing Vertical Timeline Spine (Responsive Left/Center alignment) */}
        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-marigold/30 to-transparent z-0" />

        {wedding.events.map((e, i) => (
          <div key={e.id} className="relative flex md:grid md:grid-cols-2 gap-8 md:gap-16 items-start w-full z-10">
            
            {/* Glowing marker node with ceremonial icon */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-marigold/30 bg-[#120815] shadow-[0_0_12px_rgba(232,192,122,0.2)] text-base sm:text-lg">
              <span className="animate-pulse">{e.icon}</span>
            </div>

            {/* Alternating Event Card Container */}
            <div className={`w-full pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12 md:text-left"}`}>
              <article 
                className="group relative overflow-hidden rounded-2xl border border-marigold/15 bg-gradient-to-b from-maroon-deep/15 to-black/55 p-6 sm:p-8 backdrop-blur-md shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-marigold/35 hover:shadow-elegant"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Inner card ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,192,122,0.03)_0%,transparent_70%)] pointer-events-none rounded-2xl" />

                <div className="relative z-10">
                  {/* Event Number Eyebrow */}
                  <div className={`mb-4 flex items-center justify-between ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <span className="text-[10px] uppercase tracking-[0.35em] text-marigold/70 font-semibold">
                      Chapter 0{i + 1}
                    </span>
                    <span className="text-sm opacity-40 text-marigold">✦</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground font-medium">
                    {e.title}
                  </h3>

                  {/* Emotional Description */}
                  <p className="mt-2 text-xs sm:text-sm text-ivory/70 italic leading-relaxed">
                    {e.description}
                  </p>

                  {/* Luxury separator */}
                  <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-marigold/20 to-transparent" />

                  {/* Schedule Info */}
                  <div className={`space-y-2.5 text-xs sm:text-sm text-foreground/80 flex flex-col ${i % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 text-accent shrink-0" />
                      <span>{e.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-accent shrink-0" />
                      <span>{e.time}</span>
                    </div>
                    <div className={`flex items-start gap-2.5 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className={i % 2 === 0 ? "md:text-right" : "md:text-left"}>
                        {e.venue}{e.city ? `, ${e.city}` : ""}
                      </span>
                    </div>
                  </div>

                  {/* Luxury Action Button Upgrade */}
                  {e.mapsUrl && (
                    <div className={`mt-6 flex ${i % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      <a
                        href={e.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-2 rounded-full border border-marigold/30 bg-maroon-deep/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-marigold shadow-[0_0_8px_rgba(232,192,122,0.1)] transition-all duration-300 hover:scale-105 hover:border-marigold hover:bg-marigold/10 hover:shadow-[0_0_12px_rgba(232,192,122,0.2)] active:scale-95"
                      >
                        <span>View Location</span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
