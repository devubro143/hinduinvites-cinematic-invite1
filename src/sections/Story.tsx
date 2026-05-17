import { memo, useRef, useState, useEffect } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Sparkles, MapPin, Gift, Trophy } from "lucide-react";

// List of luxury icons mapped to timeline indices
const STORY_ICONS = [Heart, MessageCircle, Sparkles, MapPin, Gift, Trophy];

export const Story = memo(function Story() {
  const { story } = wedding;
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Smooth scroll logic for desktop arrows
  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    
    const cardWidth = 340; // Card width + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    
    containerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Monitor scroll position to show/hide controls dynamically
  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Initial check
      checkScroll();
    }
    return () => container?.removeEventListener("scroll", checkScroll);
  }, [story.moments]);

  return (
    <section id="story" className="relative px-6 py-24 sm:py-32 overflow-hidden bg-[#08030a]">
      {/* Subtle background ambient light */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--maroon-deep) 0%, transparent 60%)"
        }}
      />

      <SectionTitle eyebrow="Our Journey" title={story.title} subtitle={story.body} />

      <div className="relative mx-auto mt-16 max-w-5xl">
        {/* Cinematic Horizontal Timeline Rail */}
        <div className="absolute left-8 right-8 top-[36px] h-px bg-gradient-to-r from-transparent via-marigold/30 to-transparent z-0 pointer-events-none" />

        {/* Story Slider Container */}
        <div
          ref={containerRef}
          className="relative z-10 flex gap-6 overflow-x-auto py-12 px-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {story.moments.map((m, i) => {
            const IconComponent = STORY_ICONS[i % STORY_ICONS.length];
            return (
              <div
                key={m.year}
                className="group relative flex-shrink-0 w-[290px] sm:w-[330px] snap-center rounded-2xl border border-marigold/15 bg-gradient-to-b from-maroon-deep/20 to-black/50 p-6 sm:p-8 backdrop-blur-md shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-marigold/45 hover:shadow-elegant flex flex-col justify-between min-h-[260px]"
              >
                {/* Timeline connector node linking the card to the rail above */}
                <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 pointer-events-none">
                  <div className="h-[20px] w-px bg-gradient-to-b from-marigold/60 to-marigold/10" />
                  <div className="h-3 w-3 rounded-full bg-marigold border-2 border-[#08030a] shadow-[0_0_8px_rgba(232,192,122,0.6)] animate-pulse" />
                </div>

                <div>
                  {/* Year Header & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl sm:text-4xl text-premium-gold font-bold tracking-tight">
                      {m.year}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-marigold/30 bg-maroon-deep/30 text-marigold shadow-[0_0_8px_rgba(232,192,122,0.12)] transition-transform duration-500 group-hover:scale-110">
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl text-foreground font-medium text-left">
                    {m.title}
                  </h3>
                  
                  {/* Elegant gold separator */}
                  <div className="h-px w-full bg-gradient-to-r from-marigold/30 via-marigold/10 to-transparent my-3.5" />
                </div>

                <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed text-left text-balance">
                  {m.note}
                </p>
              </div>
            );
          })}
        </div>

        {/* Floating Desktop Controls */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-marigold/20 bg-black/70 text-marigold backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-marigold hover:bg-marigold/10 active:scale-95"
            aria-label="Previous story card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full border border-marigold/20 bg-black/70 text-marigold backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-marigold hover:bg-marigold/10 active:scale-95"
            aria-label="Next story card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Embedded CSS block to completely hide the scrollbar track */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
    </section>
  );
});
