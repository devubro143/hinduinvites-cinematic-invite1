import { memo, useMemo } from "react";
import { wedding } from "@/config/wedding";
import { CinematicImage } from "@/components/CinematicImage";

export const Gallery = memo(function Gallery() {
  const { row1, row2 } = useMemo(() => {
    // 1. Extract unique images with explicit string type to avoid TS errors
    const uniqueImgs = Array.from(new Set<string>(wedding.gallery || []));
    
    // 2. Deterministic Hash-Sort with explicit string typing
    const sorted = [...uniqueImgs].sort((a: string, b: string) => {
      let hashA = 0, hashB = 0;
      for (let i = 0; i < a.length; i++) hashA = a.charCodeAt(i) + ((hashA << 5) - hashA);
      for (let i = 0; i < b.length; i++) hashB = b.charCodeAt(i) + ((hashB << 5) - hashB);
      return hashA - hashB;
    });

    // 3. Split unique images into completely disjoint sets
    const mid = Math.ceil(sorted.length / 2);
    const set1 = sorted.slice(0, mid);
    const set2 = sorted.slice(mid);

    const finalSet1 = set1.length > 0 ? set1 : sorted;
    const finalSet2 = set2.length > 0 ? set2 : sorted;

    return { row1: finalSet1, row2: finalSet2 };
  }, []);

  // Generate randomized embers/floating particles for ambient cinematic movement
  const embers = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 12 + 8}s`,
  }));

  return (
    <section 
      id="gallery" 
      className="relative overflow-hidden px-0 py-12 sm:py-32 bg-[#08030a] z-10"
    >
      {/* Background Gradients: Maroon Deep -> Wine -> Amber Glow -> Soft Champagne */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 blur-[130px] mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(232, 192, 122, 0.15) 0%, rgba(138, 3, 20, 0.4) 60%, transparent 100%)"
        }}
      />
      {/* Subtle organic light pulse background shift */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-pulse duration-[10000ms] bg-[radial-gradient(circle_at_15%_20%,rgba(138,3,20,0.2)_0%,transparent_50%),radial-gradient(circle_at_85%_80%,rgba(232,192,122,0.1)_0%,transparent_50%)]" />

      {/* Floating Sparkles / Embers */}
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute rounded-full bg-accent/30 pointer-events-none z-0 mix-blend-screen"
          style={{
            left: ember.left,
            top: ember.top,
            width: ember.size,
            height: ember.size,
            animation: `float-y ${ember.duration} ease-in-out infinite, ember 3s ease-in-out infinite`,
            animationDelay: ember.delay,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* Luxury Custom Title Section */}
      <div className="mx-auto max-w-2xl text-center relative z-10 px-6">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent font-semibold select-none">
          Moments
        </p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-balance bg-gradient-to-r from-accent via-ivory to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(232,192,122,0.2)] font-medium leading-tight py-2 select-none">
          A film of fleeting smiles
        </h2>
        
        {/* Shimmering Divider Ornament */}
        <div className="flex items-center justify-center gap-4 my-6 select-none">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-marigold opacity-50" />
          <span className="text-marigold text-lg animate-pulse duration-[3000ms] drop-shadow-[0_0_8px_rgba(232,192,122,0.6)]">✦</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-marigold opacity-50" />
        </div>
        
        <p className="text-base sm:text-lg text-muted-foreground text-balance italic font-light">
          Cinematic glimpses from our journey together.
        </p>
      </div>

      <div className="mt-8 sm:mt-16 space-y-8 relative z-10">
        {/* Repeat disjoint sets for seamless CSS marquee rows */}
        <MarqueeRow images={[...row1, ...row1, ...row1, ...row1]} direction="left" duration="52s" />
        <MarqueeRow images={[...row2, ...row2, ...row2, ...row2]} direction="right" duration="68s" />
      </div>
    </section>
  );
});

function MarqueeRow({ 
  images, 
  direction, 
  duration 
}: { 
  images: string[]; 
  direction: "left" | "right"; 
  duration: string;
}) {
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Edge vignette fade gradient overlays to give a cinema projector lens feel */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#08030a] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#08030a] to-transparent z-20 pointer-events-none" />

      <div
        className={`flex w-max gap-8 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ animationDuration: duration }}
      >
        {images.map((src, i) => {
          // Editorial alternating scale layout: alternate width dimensions to make the grid dynamic
          const isFeatured = i % 3 === 0;
          const cardWidthClass = isFeatured 
            ? "w-96 sm:w-[27rem] h-64 sm:h-80" 
            : "w-80 sm:w-96 h-64 sm:h-80";

          return (
            <div key={`${src}-${i}`} className="relative group shrink-0">
              
              {/* Backlit Glow Candlelight Pocket behind hovered cards */}
              <div className="absolute -inset-4 bg-[radial-gradient(circle_at_center,rgba(232,192,122,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0" />
              
              <figure
                className={`relative overflow-hidden rounded-2xl border border-marigold/20 bg-gradient-to-b from-[#1c070c]/50 to-black/80 p-2.5 shadow-[0_15px_35px_-15px_rgba(8,3,10,0.6)] transition-all duration-700 hover:border-marigold/50 hover:shadow-[0_20px_45px_-10px_rgba(232,192,122,0.15)] ${cardWidthClass}`}
              >
                {/* Inner gold border frame */}
                <div className="absolute inset-4 rounded-[12px] border border-marigold/15 pointer-events-none z-20 group-hover:border-marigold/40 transition-all duration-500" />
                
                {/* Image Showcase Container */}
                <div className="w-full h-full overflow-hidden rounded-[12px] bg-black/40 relative">
                  <CinematicImage
                    src={src}
                    alt={`Gallery moment ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle glassy reflection shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[1200ms] pointer-events-none z-10" />
                  
                  {/* Cinematic soft vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />
                </div>
              </figure>
            </div>
          );
        })}
      </div>
    </div>
  );
}
