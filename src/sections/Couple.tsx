import { memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { CinematicImage } from "@/components/CinematicImage";

export const Couple = memo(function Couple() {
  const { bride, groom } = wedding;

  // High-end defaults (using existing media gallery) if bride.jpg/groom.jpg are not uploaded yet
  const brideImg = bride.image || "/media/priya-aarav/gallery/2.jpg";
  const groomImg = groom.image || "/media/priya-aarav/gallery/3.jpg";

  return (
    <section id="couple" className="relative px-6 py-24 sm:py-32 overflow-hidden bg-[#08030a]">
      {/* Editorial Spotlight Backdrop (Maroon -> Wine -> Soft Amber) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30 blur-[130px] mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(232, 192, 122, 0.22) 0%, rgba(138, 3, 20, 0.45) 55%, transparent 100%)"
        }}
      />
      {/* Subtle organic light pulse background shift */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-pulse duration-[8000ms] bg-[radial-gradient(circle_at_30%_30%,rgba(138,3,20,0.25)_0%,transparent_60%)]" />

      <SectionTitle
        eyebrow="The Blessed Union"
        title="The Bride & Groom"
        subtitle="Two paths designed by destiny, converging into a single eternal journey."
      />

      <div className="mx-auto mt-16 max-w-5xl grid gap-12 sm:grid-cols-2 sm:gap-16 relative z-10">
        {/* Bride Card */}
        <div className="animate-reveal flex flex-col items-center text-center">
          {/* Elegant Arch Frame with inner gold border and shadow glows */}
          <div className="relative group w-64 aspect-[9/14] sm:w-72 overflow-hidden rounded-t-[12rem] border-2 border-marigold/30 p-2 bg-maroon-deep/15 shadow-[0_0_20px_rgba(232,192,122,0.05)] transition-all duration-700 hover:border-marigold/60 hover:shadow-elegant">
            {/* Inner Gold Arch Ring */}
            <div className="absolute inset-2 rounded-t-[11.5rem] border border-marigold/15 pointer-events-none z-10" />
            
            {/* Image Container with crop safety */}
            <div className="w-full h-full overflow-hidden rounded-t-[11rem] bg-black/40">
              <CinematicImage
                src={brideImg}
                alt={bride.name}
                className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
            </div>
            
            {/* Subtle Royal Radial Glow overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(8,3,10,0.75)_100%)] pointer-events-none" />
          </div>

          <div className="mt-8 max-w-md">
            <span className="text-[10px] uppercase tracking-[0.4em] text-marigold font-semibold">The Bride</span>
            <h3 className="font-display text-3xl sm:text-4xl text-slate-100 mt-2">{bride.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory/80 italic px-4 font-medium">
              "{bride.bio}"
            </p>
          </div>
        </div>

        {/* Groom Card */}
        <div className="animate-reveal delay-2 flex flex-col items-center text-center">
          {/* Elegant Arch Frame with inner gold border and shadow glows */}
          <div className="relative group w-64 aspect-[9/14] sm:w-72 overflow-hidden rounded-t-[12rem] border-2 border-marigold/30 p-2 bg-maroon-deep/15 shadow-[0_0_20px_rgba(232,192,122,0.05)] transition-all duration-700 hover:border-marigold/60 hover:shadow-elegant">
            {/* Inner Gold Arch Ring */}
            <div className="absolute inset-2 rounded-t-[11.5rem] border border-marigold/15 pointer-events-none z-10" />
            
            {/* Image Container with crop safety */}
            <div className="w-full h-full overflow-hidden rounded-t-[11rem] bg-black/40">
              <CinematicImage
                src={groomImg}
                alt={groom.name}
                className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
            </div>
            
            {/* Subtle Royal Radial Glow overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(8,3,10,0.75)_100%)] pointer-events-none" />
          </div>

          <div className="mt-8 max-w-md">
            <span className="text-[10px] uppercase tracking-[0.4em] text-marigold font-semibold">The Groom</span>
            <h3 className="font-display text-3xl sm:text-4xl text-slate-100 mt-2">{groom.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-ivory/80 italic px-4 font-medium">
              "{groom.bio}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
