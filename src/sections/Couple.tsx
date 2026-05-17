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
    <section id="couple" className="relative px-6 py-24 sm:py-32 overflow-hidden bg-background">
      <SectionTitle
        eyebrow="The Blessed Union"
        title="The Bride & Groom"
        subtitle="Two paths designed by destiny, converging into a single eternal journey."
      />

      <div className="mx-auto mt-16 max-w-5xl grid gap-12 sm:grid-cols-2 sm:gap-16">
        {/* Bride Card */}
        <div className="animate-reveal flex flex-col items-center text-center">
          {/* Elegant Arch Frame */}
          <div className="relative group w-64 aspect-[9/14] sm:w-72 overflow-hidden rounded-t-[12rem] border-2 border-marigold/30 p-2 bg-maroon-deep/10 shadow-soft transition-all duration-700 hover:border-marigold/60 hover:shadow-elegant">
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
            
            {/* Subtle Royal Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(13,4,6,0.6)_100%)] pointer-events-none" />
          </div>

          <div className="mt-8 max-w-md">
            <span className="text-[10px] uppercase tracking-[0.4em] text-marigold">The Bride</span>
            <h3 className="font-display text-3xl sm:text-4xl text-foreground mt-2">{bride.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic px-4">
              "{bride.bio}"
            </p>
          </div>
        </div>

        {/* Groom Card */}
        <div className="animate-reveal delay-2 flex flex-col items-center text-center">
          {/* Elegant Arch Frame */}
          <div className="relative group w-64 aspect-[9/14] sm:w-72 overflow-hidden rounded-t-[12rem] border-2 border-marigold/30 p-2 bg-maroon-deep/10 shadow-soft transition-all duration-700 hover:border-marigold/60 hover:shadow-elegant">
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
            
            {/* Subtle Royal Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(13,4,6,0.6)_100%)] pointer-events-none" />
          </div>

          <div className="mt-8 max-w-md">
            <span className="text-[10px] uppercase tracking-[0.4em] text-marigold">The Groom</span>
            <h3 className="font-display text-3xl sm:text-4xl text-foreground mt-2">{groom.name}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground italic px-4">
              "{groom.bio}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
