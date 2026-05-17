import { useState, memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Calendar, Clock, MapPin } from "lucide-react";

interface DayTheme {
  cardBg: string;
  borderColor: string;
  glowBg: string;
  textAccent: string;
  badgeBg: string;
  nodeColor: string;
}

// Custom-curated Event-Wise Color System mapped to Itinerary Days
const DAY_THEMES: DayTheme[] = [
  // Day 1: Welcome (Ivory / Champagne glow)
  {
    cardBg: "from-[#221c13]/85 via-[#14110b]/95 to-[#080704]/98",
    borderColor: "border-amber-200/20 group-hover:border-amber-100/40",
    glowBg: "rgba(253,251,247,0.05)",
    textAccent: "text-amber-200",
    badgeBg: "bg-amber-200/10 text-amber-200 border-amber-200/30",
    nodeColor: "bg-amber-100 shadow-[0_0_8px_rgba(253,251,247,0.65)]",
  },
  // Day 2: Haldi & Mehendi (Turmeric gold / Emerald mix)
  {
    cardBg: "from-[#201c05]/85 via-[#0e1707]/95 to-[#020501]/98",
    borderColor: "border-emerald-500/20 group-hover:border-amber-400/40",
    glowBg: "rgba(245,158,11,0.05)",
    textAccent: "text-amber-400",
    badgeBg: "bg-emerald-500/10 text-amber-400 border-emerald-500/30",
    nodeColor: "bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]",
  },
  // Day 3: Sangeet (Royal Plum / Wine)
  {
    cardBg: "from-[#220729]/85 via-[#120317]/95 to-[#050009]/98",
    borderColor: "border-fuchsia-500/20 group-hover:border-fuchsia-400/40",
    glowBg: "rgba(217,70,239,0.05)",
    textAccent: "text-fuchsia-400",
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
    nodeColor: "bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.7)]",
  },
  // Day 4: Wedding (Deep sacred maroon + gold)
  {
    cardBg: "from-[#350308]/85 via-[#1c0104]/95 to-[#0a0001]/98",
    borderColor: "border-red-500/20 group-hover:border-red-400/40",
    glowBg: "rgba(239,68,68,0.05)",
    textAccent: "text-red-400",
    badgeBg: "bg-red-500/10 text-red-300 border-red-500/30",
    nodeColor: "bg-red-400 shadow-[0_0_8px_rgba(239,68,68,0.7)]",
  },
  // Day 5: Reception (Champagne / Rose gold)
  {
    cardBg: "from-[#292218]/85 via-[#18140e]/95 to-[#080604]/98",
    borderColor: "border-amber-200/20 group-hover:border-amber-100/40",
    glowBg: "rgba(253,251,247,0.05)",
    textAccent: "text-amber-200",
    badgeBg: "bg-amber-200/5 text-amber-100 border-amber-200/30",
    nodeColor: "bg-amber-100 shadow-[0_0_8px_rgba(253,251,247,0.65)]",
  },
];

export const Itinerary = memo(function Itinerary() {
  const { itinerary } = wedding;
  const [isExpanded, setIsExpanded] = useState(false);

  // CASE 3: Gracefully hide entire section if itinerary details are missing
  if (!itinerary || itinerary.length === 0) return null;

  // Check if there are timings/schedules to expand (CASE 1 vs CASE 2)
  const hasDetailedSchedule = itinerary.some(day => day.items && day.items.length > 0);

  return (
    <section id="itinerary" className="relative bg-[#09040b]/90 px-6 py-24 sm:py-32 overflow-hidden">
      {/* Background radial atmosphere */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--maroon-deep) 0%, transparent 70%)"
        }}
      />

      <SectionTitle
        eyebrow="Celebration Guide"
        title="Five days with us"
        subtitle="A guide to every ceremony, every meal, every memory."
      />

      {/* COMPACT VIEW (DEFAULT MODE): Premium Cinematic day capsules */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
        {itinerary.map((day, idx) => {
          const theme = DAY_THEMES[idx % DAY_THEMES.length];
          // Dynamically compile an inline preview summary from sub-items
          const previewSummary = day.items?.map(it => it.title).join(" · ") || "Celebrations Planned";

          return (
            <div
              key={day.day}
              className={`group relative overflow-hidden rounded-xl border ${theme.borderColor} bg-gradient-to-b ${theme.cardBg} p-5 backdrop-blur-md shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant flex flex-col justify-between min-h-[140px]`}
            >
              {/* Subtle hover event glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-xl" 
                style={{
                  background: `radial-gradient(circle at center, ${theme.glowBg} 0%, transparent 75%)`
                }}
              />

              <div className="relative z-10 text-left">
                <span className={`text-[9px] uppercase tracking-[0.2em] font-semibold ${theme.textAccent}`}>
                  {day.day.includes("—") ? day.day.split("—")[0]?.trim() : `Day ${idx + 1}`}
                </span>
                
                <h3 className="font-display text-base sm:text-lg text-slate-100 font-semibold mt-1 group-hover:text-white transition-colors">
                  {day.day.includes("—") ? day.day.split("—")[1]?.trim() : day.day}
                </h3>
                
                <p className="text-[10px] text-ivory/50 mt-0.5">{day.date}</p>
              </div>

              {/* Dynamic summary preview */}
              <p className="relative z-10 text-[10px] text-ivory/75 italic line-clamp-1 border-t border-white/5 pt-2.5 mt-4 text-left">
                {previewSummary}
              </p>
            </div>
          );
        })}
      </div>

      {/* EXPANDABLE TRIGGER (CASE 1): Shows expander if detailed timings exist */}
      {hasDetailedSchedule && (
        <div className="mt-12 flex justify-center relative z-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group/btn inline-flex items-center gap-3 rounded-full border border-marigold/30 bg-maroon-deep/30 px-6 py-3 text-xs uppercase tracking-[0.25em] text-marigold shadow-[0_0_12px_rgba(232,192,122,0.15)] transition-all duration-300 hover:scale-105 hover:border-marigold hover:bg-marigold/10 hover:shadow-[0_0_15px_rgba(232,192,122,0.3)] active:scale-95"
          >
            <span>{isExpanded ? "Close Celebration Schedule" : "Open Celebration Schedule"}</span>
            <span className={`text-[10px] transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}>
              ✦
            </span>
          </button>
        </div>
      )}

      {/* EXPANDED DETAILED TIMELINE: Premium travel-journal timeline */}
      {hasDetailedSchedule && isExpanded && (
        <div className="mt-12 mx-auto max-w-3xl rounded-2xl border border-marigold/15 bg-gradient-to-b from-[#120815]/90 to-black/98 p-6 sm:p-10 backdrop-blur-md shadow-elegant animate-reveal relative z-10">
          <div 
            className="absolute inset-0 z-0 opacity-20 pointer-events-none rounded-2xl"
            style={{
              background: "radial-gradient(circle at 50% 50%, var(--maroon-deep) 0%, transparent 60%)"
            }}
          />

          <div className="relative z-10">
            <h4 className="font-display text-lg text-premium-gold tracking-[0.3em] mb-10 text-center uppercase border-b border-white/5 pb-4">
              Celebration Journal
            </h4>
            
            <div className="relative flex flex-col gap-10">
              {/* Timeline center rail */}
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-marigold/30 via-marigold/10 to-transparent z-0" />

              {itinerary.map((day, idx) => {
                const theme = DAY_THEMES[idx % DAY_THEMES.length];
                
                return (
                  <div key={day.day} className="relative flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-12 items-start w-full">
                    
                    {/* Glowing timeline node */}
                    <div className={`absolute left-4 sm:left-1/2 -translate-x-1/2 top-2.5 z-20 h-2.5 w-2.5 rounded-full border border-black ${theme.nodeColor}`} />

                    {/* Left Column: Day details (Symmetric alignment on desktop) */}
                    <div className="pl-10 sm:pl-0 sm:text-right sm:pr-8">
                      <span className={`text-[9px] uppercase tracking-[0.25em] font-semibold ${theme.textAccent}`}>
                        {day.day.includes("—") ? day.day.split("—")[0]?.trim() : `Day ${idx + 1}`}
                      </span>
                      <h5 className="font-display text-base sm:text-lg text-slate-100 font-medium mt-0.5">
                        {day.day.includes("—") ? day.day.split("—")[1]?.trim() : day.day}
                      </h5>
                      <span className="text-xs text-ivory/50 block mt-0.5">{day.date}</span>
                    </div>

                    {/* Right Column: Timeline Schedule list */}
                    <div className="pl-10 sm:pl-8 sm:col-start-2 w-full text-left">
                      <ul className="space-y-4">
                        {day.items?.map((it, itemIdx) => (
                          <li key={itemIdx} className="flex flex-col text-left border-l border-white/5 pl-4 relative">
                            {/* Inner node marker */}
                            <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-marigold/40 animate-pulse" />
                            
                            <span className={`text-[9px] uppercase tracking-[0.15em] font-semibold ${theme.textAccent}`}>
                              {it.time}
                            </span>
                            <span className="text-sm text-slate-200 mt-0.5 font-medium">{it.title}</span>
                            
                            {it.note && (
                              <span className="text-xs text-ivory/60 mt-0.5 leading-relaxed">{it.note}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
});
