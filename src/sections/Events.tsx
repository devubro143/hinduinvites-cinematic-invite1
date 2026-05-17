import { useState, useEffect, useRef, memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  X, 
  Shirt, 
  Sparkles 
} from "lucide-react";

interface EventTheme {
  id: string;
  name: string;
  cardBg: string;
  borderColor: string;
  glowBg: string;
  glowColor: string;
  textColorAccent: string;
  markerBg: string;
  btnClass: string;
  nodePulse: string;
  ambientGradient: string;
  glassClass: string;
  dividerCenterSymbol: string;
}

// Custom-curated Event-Wise Cinematic Color & Sensory System
const EVENT_THEMES: Record<string, EventTheme> = {
  haldi: {
    id: "haldi",
    name: "Haldi",
    cardBg: "from-[#221303]/90 via-[#160c02]/95 to-[#080400]/98",
    borderColor: "border-amber-500/20 group-hover:border-amber-400/40",
    glowBg: "rgba(245,158,11,0.08)",
    glowColor: "var(--color-amber-400, #fbbf24)",
    textColorAccent: "text-amber-400",
    markerBg: "border-amber-500/40 bg-[#170c02]/90 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]",
    btnClass: "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]",
    nodePulse: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    ambientGradient: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.14) 0%, rgba(34,19,3,0.04) 50%, transparent 100%)",
    glassClass: "bg-amber-500/5 border-amber-500/10 text-amber-300",
    dividerCenterSymbol: "🌼",
  },
  mehendi: {
    id: "mehendi",
    name: "Mehendi",
    cardBg: "from-[#03180c]/90 via-[#011008]/95 to-[#000502]/98",
    borderColor: "border-emerald-500/20 group-hover:border-emerald-400/40",
    glowBg: "rgba(16,185,129,0.08)",
    glowColor: "var(--color-emerald-400, #34d399)",
    textColorAccent: "text-emerald-400",
    markerBg: "border-emerald-500/40 bg-[#021008]/90 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]",
    btnClass: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]",
    nodePulse: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
    ambientGradient: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.12) 0%, rgba(3,24,12,0.04) 50%, transparent 100%)",
    glassClass: "bg-emerald-500/5 border-emerald-500/10 text-emerald-300",
    dividerCenterSymbol: "🌿",
  },
  sangeet: {
    id: "sangeet",
    name: "Sangeet",
    cardBg: "from-[#1a0523]/90 via-[#0e0213]/95 to-[#040008]/98",
    borderColor: "border-fuchsia-500/20 group-hover:border-fuchsia-400/40",
    glowBg: "rgba(217,70,239,0.08)",
    glowColor: "var(--color-fuchsia-400, #e879f9)",
    textColorAccent: "text-fuchsia-400",
    markerBg: "border-fuchsia-500/40 bg-[#100315]/90 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.25)]",
    btnClass: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300 hover:bg-fuchsia-500/20 hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(217,70,239,0.25)]",
    nodePulse: "bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.6)]",
    ambientGradient: "radial-gradient(circle at 50% 50%, rgba(217,70,239,0.14) 0%, rgba(26,5,35,0.04) 50%, transparent 100%)",
    glassClass: "bg-fuchsia-500/5 border-fuchsia-500/10 text-fuchsia-300",
    dividerCenterSymbol: "✦",
  },
  wedding: {
    id: "wedding",
    name: "Wedding",
    cardBg: "from-[#2f0105]/90 via-[#190002]/95 to-[#080001]/98",
    borderColor: "border-red-500/20 group-hover:border-amber-500/40",
    glowBg: "rgba(239,68,68,0.10)",
    glowColor: "var(--color-red-400, #f87171)",
    textColorAccent: "text-red-400",
    markerBg: "border-red-500/40 bg-[#1d0103]/90 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.25)]",
    btnClass: "border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]",
    nodePulse: "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    ambientGradient: "radial-gradient(circle at 50% 50%, rgba(239,68,68,0.16) 0%, rgba(47,1,5,0.04) 50%, transparent 100%)",
    glassClass: "bg-red-500/5 border-red-500/10 text-red-300",
    dividerCenterSymbol: "🪔",
  },
  reception: {
    id: "reception",
    name: "Reception",
    cardBg: "from-[#1d160e]/90 via-[#100c07]/95 to-[#040302]/98",
    borderColor: "border-amber-200/20 group-hover:border-amber-100/40",
    glowBg: "rgba(253,251,247,0.06)",
    glowColor: "var(--color-amber-200, #fde68a)",
    textColorAccent: "text-amber-200",
    markerBg: "border-amber-200/40 bg-[#120f09]/90 text-amber-100 shadow-[0_0_15px_rgba(253,251,247,0.2)]",
    btnClass: "border-amber-200/40 bg-amber-200/5 text-amber-100 hover:bg-amber-200/15 hover:border-amber-100 hover:shadow-[0_0_15px_rgba(253,251,247,0.2)]",
    nodePulse: "bg-amber-100 shadow-[0_0_8px_rgba(253,251,247,0.5)]",
    ambientGradient: "radial-gradient(circle at 50% 50%, rgba(253,251,247,0.12) 0%, rgba(29,22,14,0.04) 50%, transparent 100%)",
    glassClass: "bg-amber-200/5 border-amber-200/10 text-amber-100",
    dividerCenterSymbol: "✺",
  },
};

export const Events = memo(function Events() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; left: number; top: number; size: number; delay: number; duration: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate dynamic, floating, sparkling royal ambient particles
  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 6,
    }));
    setParticles(generated);
  }, []);

  const handleCardClick = (eventId: string) => {
    if (expandedId === eventId) {
      setExpandedId(null);
    } else {
      setExpandedId(eventId);
      
      // Smooth viewport scroll to center the newly expanded card
      setTimeout(() => {
        const cardElement = document.getElementById(`card-${eventId}`);
        if (cardElement) {
          cardElement.scrollIntoView({ 
            behavior: "smooth", 
            block: "center" 
          });
        }
      }, 350);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // Determine which visual backdrop to render
  const currentActiveId = expandedId || hoveredId;
  const activeTheme = currentActiveId ? (EVENT_THEMES[currentActiveId] || EVENT_THEMES.wedding) : null;

  return (
    <section id="events" className="relative bg-[#050207] px-6 py-12 sm:py-32 overflow-hidden transition-colors duration-[1000ms]">
      {/* Premium Cinematic Ambient Backlight */}
      <div 
        className="absolute inset-0 z-0 opacity-25 pointer-events-none transition-all duration-[1000ms] ease-out"
        style={{
          background: activeTheme 
            ? activeTheme.ambientGradient 
            : "radial-gradient(circle at 50% 50%, var(--maroon-deep, #5c2018) 0%, transparent 70%)"
        }}
      />

      {/* Floating Sparkles & Light Nodes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-30 mix-blend-screen animate-float"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: activeTheme ? activeTheme.glowColor : "var(--marigold, #e8c07a)",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              boxShadow: `0 0 12px ${activeTheme ? activeTheme.glowColor : "var(--marigold, #e8c07a)"}`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionTitle
          eyebrow="Ceremonial Chapters"
          title="Sacred Vows. Eternal Journeys."
          subtitle="Explore the interactive chapters of our ceremonies. Click any card below to unveil its detailed royal itinerary, dress code, and sensory settings."
        />

        {/* Widescreen luxury list container */}
        <div 
          ref={containerRef}
          className="mx-auto mt-8 sm:mt-16 max-w-4xl flex flex-col gap-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        >
          {wedding.events.map((e: any, i: number) => {
            const isExpanded = expandedId === e.id;
            const isAnyExpanded = expandedId !== null;
            const isDimmed = isAnyExpanded && !isExpanded;
            const theme = EVENT_THEMES[e.id] || EVENT_THEMES.wedding;

            return (
              <div
                key={e.id}
                id={`card-${e.id}`}
                onMouseEnter={() => !isAnyExpanded && setHoveredId(e.id)}
                onMouseLeave={() => !isAnyExpanded && setHoveredId(null)}
                onMouseMove={handleMouseMove}
                onClick={() => handleCardClick(e.id)}
                className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b ${theme.cardBg} p-6 sm:p-10 backdrop-blur-xl shadow-soft transition-all duration-[800ms] cubic-bezier(0.25,1,0.5,1) cursor-pointer select-none
                  ${isExpanded 
                    ? "scale-[1.01] border-white/15 shadow-elegant ring-1 ring-white/10 z-30" 
                    : isDimmed 
                      ? "opacity-25 scale-[0.97] blur-[1.5px] saturate-[60%] pointer-events-none" 
                      : "hover:scale-[1.01] hover:border-white/10 hover:shadow-elegant z-10"
                  }
                `}
                style={{
                  willChange: "transform, opacity, height",
                }}
              >
                {/* Micro Cursor tracking gradient glow (Desktop-Only interaction) */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl z-0" 
                  style={{
                    background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${theme.glowBg}, transparent 50%)`
                  }}
                />

                {/* Elegant gold ambient bloom inside expanded card */}
                <div 
                  className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${isExpanded ? "opacity-100" : "opacity-0"}`}
                  style={{
                    background: `radial-gradient(circle at 90% 10%, ${theme.glowBg} 0%, transparent 60%)`
                  }}
                />

                <div className="relative z-10 w-full flex flex-col justify-between">
                  
                  {/* CARD COLLAPSED VIEW LAYOUT */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Chapter & Header Area */}
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-3 mb-2.5">
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-marigold/80 font-bold">
                          Chapter 0{i + 1}
                        </span>
                        <span className="text-white/20 text-[10px]">✦</span>
                        <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-0.5 rounded-full border ${theme.glassClass}`}>
                          {theme.name}
                        </span>
                      </div>
                      
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display font-light text-2xl sm:text-4xl text-slate-100 tracking-wide font-serif transition-colors group-hover:text-white">
                          {e.title}
                        </h3>
                        <span className={`text-xl transition-all duration-700 animate-pulse ${theme.textColorAccent}`}>
                          {e.icon}
                        </span>
                      </div>

                      <p className="mt-2 text-xs sm:text-sm text-ivory/70 font-serif italic max-w-xl leading-relaxed font-light">
                        {e.description}
                      </p>
                    </div>

                    {/* Quick Metadata Block (Mainly Date, Time, Location) */}
                    <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 sm:gap-6 md:gap-2.5 text-xs text-slate-300 font-sans tracking-wide">
                      <div className="flex items-center gap-2">
                        <Calendar className={`h-4 w-4 shrink-0 opacity-60 ${theme.textColorAccent}`} />
                        <span>{e.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className={`h-4 w-4 shrink-0 opacity-60 ${theme.textColorAccent}`} />
                        <span>{e.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className={`h-4 w-4 shrink-0 opacity-60 ${theme.textColorAccent}`} />
                        <span>{e.venue.includes(",") ? e.venue.split(",")[0] : e.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* UNEXPANDED CLICK SUGGESTION PROMPT */}
                  {!isExpanded && (
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-white/40 group-hover:text-white/60 transition-colors">
                        Click to discover chapter itinerary
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-marigold opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-500 font-semibold">
                          Unveil
                        </span>
                        <ChevronRight className={`h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 ${theme.textColorAccent}`} />
                      </div>
                    </div>
                  )}

                  {/* EXPANDED RICH CONTENT AREA */}
                  <div 
                    className={`transition-all duration-[900ms] ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden text-left
                      ${isExpanded 
                        ? "max-h-[2000px] opacity-100 mt-10 pt-8 border-t border-white/10" 
                        : "max-h-0 opacity-0 pointer-events-none"
                      }
                    `}
                  >
                    {/* Decorative Elegant divider line */}
                    <div className="flex items-center justify-center gap-6 my-2 text-white/10">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                      <span className={`text-sm tracking-[0.3em] font-serif italic ${theme.textColorAccent}`}>
                        {theme.dividerCenterSymbol}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 mt-8">
                      
                      {/* Left Column (lg:col-span-5): Dress Code Showcase & Action Panel */}
                      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                        
                        {/* Dress Code Showcase Decree (Luxurious Centered Couture Layout) */}
                        {e.dressCode && (
                          <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/15 via-black/40 to-transparent border border-amber-400/30 shadow-[0_0_20px_rgba(245,158,11,0.05)] overflow-hidden group/dress h-full flex flex-col justify-center min-h-[180px]">
                            {/* Royal gold light accent reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 via-transparent to-transparent opacity-0 group-hover/dress:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            
                            <div className="flex items-start gap-4.5 relative z-10">
                              <div className={`p-4 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 shrink-0 shadow-lg ${theme.textColorAccent}`}>
                                <Shirt className="h-7 w-7 animate-pulse" />
                              </div>
                              <div className="text-left">
                                <div className="flex items-center gap-2">
                                  <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-amber-300 font-bold">Royal Dress Code</span>
                                  <span className="animate-pulse text-amber-400 text-xs">✦</span>
                                </div>
                                <h4 className="font-serif text-xl sm:text-2xl text-slate-100 mt-2 leading-relaxed font-light tracking-wide">
                                  {e.dressCode}
                                </h4>
                                <div className="h-0.5 w-12 bg-gradient-to-r from-amber-400/40 to-transparent mt-3.5" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Venue Navigation Quick Panel */}
                        {e.mapsUrl && (
                          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col gap-4">
                            <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-slate-400 font-bold block text-left">
                              Location Maps & Navigation
                            </span>
                            <p className="font-sans text-[11px] text-ivory/60 leading-relaxed text-left font-light">
                              Click below to view the interactive map, coordinates, and exact palace route for this auspicious ceremony.
                            </p>
                            <a
                              href={e.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(evt) => evt.stopPropagation()} // Prevent bubble up collapse
                              className={`group/btn w-full inline-flex items-center justify-center gap-2.5 rounded-full border px-6 py-3.5 text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 ${theme.btnClass}`}
                            >
                              <span>Navigate to Venue</span>
                              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Right Column (lg:col-span-7): Upgraded Premium Ceremony Timeline */}
                      <div className="lg:col-span-7">
                        {e.schedule && e.schedule.length > 0 && (
                          <div className="relative p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl h-full flex flex-col justify-between">
                            {/* Floating decorative sparkles */}
                            <span className="absolute top-4 right-4 text-amber-400/30 text-lg animate-pulse">✨</span>
                            <span className="absolute bottom-4 left-4 text-amber-400/20 text-sm animate-pulse">✦</span>

                            <div>
                              <h4 className="font-serif text-lg sm:text-xl text-premium-gold font-light tracking-[0.2em] mb-8 text-left border-b border-white/10 pb-4 uppercase flex items-center gap-3">
                                <Sparkles className={`h-5 w-5 animate-pulse ${theme.textColorAccent}`} />
                                <span>Ceremony Itinerary</span>
                              </h4>
                              
                              <div className="relative pl-6 border-l border-amber-500/20 space-y-8">
                                {e.schedule.map((item: any, idx: number) => (
                                  <div 
                                    key={idx} 
                                    className="relative pl-6 group/item transition-all duration-700 ease-out"
                                  >
                                    {/* Animated pulsing custom gold node */}
                                    <div className="absolute -left-[37.5px] top-1 h-5 w-5 rounded-full bg-black border-2 border-amber-400 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.4)] group-hover/item:scale-110 group-hover/item:rotate-45 transition-all duration-500">
                                      <span className="text-[10px] text-amber-300 font-bold group-hover/item:animate-pulse">✦</span>
                                    </div>
                                    
                                    <div className="flex flex-col text-left">
                                      <span className={`font-sans text-[9px] uppercase tracking-[0.2em] font-semibold ${theme.textColorAccent}`}>
                                        {item.time}
                                      </span>
                                      <span className="font-serif text-lg sm:text-xl text-slate-100 mt-1 font-light tracking-wide group-hover:text-white transition-colors">
                                        {item.title}
                                      </span>
                                      {item.note && (
                                        <span className="font-sans text-xs text-ivory/60 mt-1.5 leading-relaxed font-light">
                                          {item.note}
                                        </span>
                                      )}
                                    </div>

                                    {/* Delicate horizontal divider line between itinerary items */}
                                    {idx < e.schedule.length - 1 && (
                                      <div className="h-px bg-white/[0.03] w-full mt-6 absolute -bottom-[16px] left-6" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* EXPANDED ACTION & CLOSE BUTTON ROW */}
                    <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-end">
                      <button
                        onClick={(evt) => {
                          evt.stopPropagation(); // Prevent card collapse toggle
                          setExpandedId(null);
                        }}
                        className="group/close w-full sm:w-auto flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-[9px] uppercase tracking-[0.25em] text-ivory/60 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                      >
                        <X className="h-3.5 w-3.5 transition-transform duration-500 group-hover/close:rotate-90" />
                        <span>Close Chapter</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
