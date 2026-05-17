import { memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Heart, MessageCircle, Sparkles, MapPin, Gift, Trophy, Star } from "lucide-react";

// List of luxury icons mapped to timeline indices
const STORY_ICONS = [Heart, MessageCircle, Sparkles, MapPin, Gift, Trophy, Star];

export const Story = memo(function Story() {
  const { story } = wedding;

  return (
    <section id="story" className="relative px-6 py-16 sm:py-32 overflow-hidden bg-[#08030a]">
      {/* Subtle background ambient light */}
      <div 
        className="absolute inset-0 z-0 opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--maroon-deep) 0%, transparent 70%)"
        }}
      />

      {/* Decorative top gold ornament */}
      <div className="flex justify-center mb-6 opacity-60">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-marigold" />
        <Star className="h-4 w-4 mx-3 text-marigold animate-pulse" />
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-marigold" />
      </div>

      <SectionTitle eyebrow="Our Journey" title={story.title} subtitle={story.body} />

      {/* Fade gradients on left & right edges to make it feel extremely luxury */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-48 bg-gradient-to-r from-[#08030a] via-[#08030a]/85 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-48 bg-gradient-to-l from-[#08030a] via-[#08030a]/85 to-transparent z-20 pointer-events-none" />

      {/* Story Infinite Marquee Slider Container */}
      <div className="relative z-10 mx-auto mt-12 w-full overflow-hidden py-4">
        {/* Track with duplicated sets for seamless loop */}
        <div className="animate-infinite-marquee flex gap-6 hover:[animation-play-state:paused] cursor-pointer">
          {/* Loop over moments multiple times to guarantee seamlessness on all screen sizes */}
          {[1, 2, 3].map((setIndex) => (
            <div key={`set-${setIndex}`} className="flex gap-6">
              {story.moments.map((m: any, i: number) => {
                const IconComponent = STORY_ICONS[i % STORY_ICONS.length];
                return (
                  <div
                    key={`${setIndex}-${m.year}`}
                    className="group relative flex-shrink-0 w-[290px] sm:w-[350px] rounded-2xl border border-marigold/15 bg-gradient-to-br from-[#1b0a13] via-[#0b0409]/95 to-[#1c0812] p-6 sm:p-8 backdrop-blur-md shadow-elegant transition-all duration-500 hover:-translate-y-2.5 hover:border-marigold/50 hover:shadow-[0_15px_30px_rgba(232,192,122,0.15)] flex flex-col justify-between min-h-[250px]"
                  >
                    {/* Inner glowing ambient light on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-maroon/10 via-transparent to-marigold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />

                    <div>
                      {/* Year Header & Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-marigold via-ivory to-gold bg-clip-text text-transparent"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
                        >
                          {m.year}
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-marigold/30 bg-maroon-deep/30 text-marigold shadow-[0_0_8px_rgba(232,192,122,0.12)] transition-all duration-500 group-hover:scale-110 group-hover:bg-maroon-deep/60 group-hover:text-ivory group-hover:shadow-[0_0_12px_rgba(232,192,122,0.3)]">
                          <IconComponent className="h-4.5 w-4.5" />
                        </div>
                      </div>

                      <h3 
                        className="text-lg sm:text-xl text-white font-medium text-left tracking-wide"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {m.title}
                      </h3>
                      
                      {/* Elegant gold separator */}
                      <div className="h-px w-full bg-gradient-to-r from-marigold/30 via-marigold/10 to-transparent my-3.5" />
                    </div>

                    <p 
                      className="text-sm sm:text-[15px] text-ivory/80 leading-relaxed text-left font-light"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {m.note}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Embedded CSS block for infinite marquee animation */}
      <style>{`
        @keyframes marquee-scroll-right {
          0% {
            transform: translateX(-33.3333%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-infinite-marquee {
          display: flex;
          width: max-content;
          animation: marquee-scroll-right 30s linear infinite;
        }

        .animate-infinite-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
});

