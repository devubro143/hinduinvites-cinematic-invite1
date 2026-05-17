import { memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

interface EventTheme {
  id: string;
  name: string;
  cardBg: string;
  borderColor: string;
  glowBg: string;
  textColorAccent: string;
  markerBg: string;
  btnClass: string;
  nodePulse: string;
}

// Custom-curated Event-Wise Cinematic Color System
const EVENT_THEMES: Record<string, EventTheme> = {
  haldi: {
    id: "haldi",
    name: "Haldi",
    cardBg: "from-[#2b1702]/85 via-[#1c0f01]/95 to-[#080400]/98",
    borderColor: "border-amber-500/20 group-hover:border-amber-400/40",
    glowBg: "rgba(245,158,11,0.06)",
    textColorAccent: "text-amber-400",
    markerBg: "border-amber-500/40 bg-[#1f1003]/90 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.35)]",
    btnClass: "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]",
    nodePulse: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.75)]",
  },
  mehendi: {
    id: "mehendi",
    name: "Mehendi",
    cardBg: "from-[#051a0b]/85 via-[#020c05]/95 to-[#000401]/98",
    borderColor: "border-emerald-500/20 group-hover:border-emerald-400/40",
    glowBg: "rgba(16,185,129,0.06)",
    textColorAccent: "text-emerald-400",
    markerBg: "border-emerald-500/40 bg-[#04150a]/90 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.35)]",
    btnClass: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]",
    nodePulse: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.75)]",
  },
  sangeet: {
    id: "sangeet",
    name: "Sangeet",
    cardBg: "from-[#220729]/85 via-[#120317]/95 to-[#050009]/98",
    borderColor: "border-fuchsia-500/20 group-hover:border-fuchsia-400/40",
    glowBg: "rgba(217,70,239,0.06)",
    textColorAccent: "text-fuchsia-400",
    markerBg: "border-fuchsia-500/40 bg-[#1a0521]/90 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.35)]",
    btnClass: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20 hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]",
    nodePulse: "bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.75)]",
  },
  wedding: {
    id: "wedding",
    name: "Wedding",
    cardBg: "from-[#350308]/85 via-[#1c0104]/95 to-[#0a0001]/98",
    borderColor: "border-red-500/20 group-hover:border-red-400/40",
    glowBg: "rgba(239,68,68,0.06)",
    textColorAccent: "text-red-400",
    markerBg: "border-red-500/40 bg-[#280307]/90 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.35)]",
    btnClass: "border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    nodePulse: "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.75)]",
  },
  reception: {
    id: "reception",
    name: "Reception",
    cardBg: "from-[#292218]/85 via-[#18140e]/95 to-[#080604]/98",
    borderColor: "border-amber-200/20 group-hover:border-amber-100/40",
    glowBg: "rgba(253,251,247,0.06)",
    textColorAccent: "text-amber-200",
    markerBg: "border-amber-200/40 bg-[#211c14]/90 text-amber-100 shadow-[0_0_15px_rgba(253,251,247,0.25)]",
    btnClass: "border-amber-200/40 bg-amber-200/5 text-amber-100 hover:bg-amber-200/15 hover:border-amber-100 hover:shadow-[0_0_15px_rgba(253,251,247,0.35)]",
    nodePulse: "bg-amber-100 shadow-[0_0_8px_rgba(253,251,247,0.65)]",
  },
};

export const Events = memo(function Events() {
  return (
    <section id="events" className="relative bg-[#060208]/95 px-6 py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glow */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
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
        {/* Smooth, multi-stop transitioning timeline center spine */}
        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-500 via-emerald-500 via-fuchsia-500 via-red-600 to-amber-100 opacity-40 z-0 shadow-[0_0_8px_rgba(232,192,122,0.25)]" />

        {wedding.events.map((e, i) => {
          // Resolve unique visual theme based on event ID, default to wedding if not found
          const theme = EVENT_THEMES[e.id] || EVENT_THEMES.wedding;
          
          return (
            <div key={e.id} className="relative flex md:grid md:grid-cols-2 gap-8 md:gap-16 items-start w-full z-10">
              
              {/* glowing circular marker node with event-colored drop shadow */}
              <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 top-8 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border ${theme.markerBg}`}>
                <span className="animate-pulse">{e.icon}</span>
              </div>

              {/* Responsive left/right layout columns */}
              <div className={`w-full pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12 md:text-left"}`}>
                <article 
                  className={`group relative overflow-hidden rounded-2xl border ${theme.borderColor} bg-gradient-to-b ${theme.cardBg} p-6 sm:p-8 backdrop-blur-md shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Subtle event-colored glowing radial behind the card on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" 
                    style={{
                      background: `radial-gradient(circle at center, ${theme.glowBg} 0%, transparent 75%)`
                    }}
                  />

                  <div className="relative z-10">
                    {/* Eyebrow Label */}
                    <div className={`mb-4 flex items-center justify-between ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <span className="text-[10px] uppercase tracking-[0.35em] text-marigold/80 font-semibold">
                        Chapter 0{i + 1}
                      </span>
                      <span className={`text-sm opacity-50 ${theme.textColorAccent}`}>✦</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-3xl text-slate-100 font-medium group-hover:text-white transition-colors">
                      {e.title}
                    </h3>

                    {/* Emotional Description */}
                    <p className="mt-2 text-xs sm:text-sm text-ivory/85 italic leading-relaxed group-hover:text-ivory transition-colors">
                      {e.description}
                    </p>

                    {/* Luxury separator line */}
                    <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-marigold/20 to-transparent" />

                    {/* Metadata with Brighter Text Contrast */}
                    <div className={`space-y-2.5 text-xs sm:text-sm text-slate-200/90 flex flex-col ${i % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                      <div className="flex items-center gap-2.5">
                        <Calendar className={`h-4 w-4 shrink-0 ${theme.textColorAccent}`} />
                        <span className="font-medium text-slate-200">{e.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className={`h-4 w-4 shrink-0 ${theme.textColorAccent}`} />
                        <span className="font-medium text-slate-200">{e.time}</span>
                      </div>
                      <div className={`flex items-start gap-2.5 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                        <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${theme.textColorAccent}`} />
                        <span className={`font-medium text-slate-200 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                          {e.venue}{e.city ? `, ${e.city}` : ""}
                        </span>
                      </div>
                    </div>

                    {/* Upgraded Luxury Action Buttons */}
                    {e.mapsUrl && (
                      <div className={`mt-6 flex ${i % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                        <a
                          href={e.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group/btn inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 ${theme.btnClass}`}
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
          );
        })}
      </div>
    </section>
  );
});
