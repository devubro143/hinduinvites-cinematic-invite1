import { memo } from "react";
import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CinematicImage } from "@/components/CinematicImage";

export const Hero = memo(function Hero() {
  const { theme } = wedding;
  const isReducedMotion = useReducedMotion();
  const baseParticleCount = Math.floor(theme.effects.particleDensity / 2);
  const particleCount = isReducedMotion ? Math.min(baseParticleCount, 5) : baseParticleCount;

  const handleEnterCelebration = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo("#couple", {
        duration: 2.6, // Slow, prestigious, premium scroll speed
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exquisite luxury easing
        lock: true, // Lock user scroll during transition to ensure absolute visual smoothness
      });
    } else {
      const element = document.getElementById("couple");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background image with high-end cinematic overlays */}
      <div className="absolute inset-0 z-0">
        <CinematicImage
          src={wedding.heroImage}
          alt="Bride and groom"
          priority={true}
          className="h-full w-full object-cover scale-102 transform duration-[10000ms] animate-pulse"
          style={{ animationDuration: "16s" }}
        />
        {/* Deeper cinematic vignette layers */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-[#08030a]" 
          style={{ opacity: theme.effects.overlayDarkness + 0.1 }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Royal Gold Border Frame */}
      <div className="absolute inset-4 sm:inset-6 pointer-events-none z-20">
        <div className="absolute inset-0 border border-marigold/20" />
        <div className="absolute inset-0.5 border border-marigold/5" />
        {/* Delicate gold ornamental corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-marigold/40" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-marigold/40" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-marigold/40" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-marigold/40" />
      </div>

      {/* Soft floating embers */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {[...Array(particleCount)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent animate-ember"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${(i % 5) * 0.6}s`,
              animationDuration: `${5 + (i % 3) * 1.5}s`,
              boxShadow: "0 0 8px var(--marigold)",
            }}
          />
        ))}
      </div>

      {/* Immersive Layout Structure */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-12 md:py-16 text-center text-ivory">
        
        {/* TOP: Sacred Spiritual Shrine Header */}
        <div className="animate-reveal flex flex-col items-center pt-8 md:pt-12 select-none z-10">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.55em] text-marigold/95 font-semibold">
            {wedding.openingShlokaTranslit}
          </p>
          <p className="mt-2.5 font-display text-xl sm:text-2xl text-ivory/95 tracking-[0.05em]">
            {wedding.openingShloka}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 w-32 opacity-70">
            <div className="h-[0.5px] w-full bg-gradient-to-r from-transparent to-marigold/40" />
            <span className="text-marigold/80 text-xs">ॐ</span>
            <div className="h-[0.5px] w-full bg-gradient-to-l from-transparent to-marigold/40" />
          </div>
        </div>

        {/* MIDDLE: Clear space (couple faces clearly visible) */}
        <div className="flex-1 flex items-center justify-center pointer-events-none" />

        {/* BOTTOM: Luxury Floating Glass Crest Card */}
        <div className="w-full max-w-md sm:max-w-xl mx-auto rounded-3xl border border-marigold/25 bg-black/45 backdrop-blur-xl shadow-[0_0_80px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(232,192,122,0.08)] p-6 sm:p-8 flex flex-col items-center relative overflow-hidden select-none border-double border-2 animate-reveal delay-2 mb-6 md:mb-12">
          
          {/* Glass Card Corner Brackets */}
          <div className="absolute inset-2 pointer-events-none border border-marigold/5 rounded-2xl" />
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-marigold/35" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-marigold/35" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-marigold/35" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-marigold/35" />

          {/* Names Header (Serif Brand Style) */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-royal-gold tracking-wide text-center">
            {wedding.brideName}
            <span className="mx-3 inline-block italic font-light text-marigold/70 font-serif text-2xl sm:text-3xl">&amp;</span>
            {wedding.groomName}
          </h1>

          {/* Tagline */}
          <p className="mt-2 text-xs sm:text-sm italic text-ivory/80 max-w-xs sm:max-w-md text-center text-balance font-light leading-relaxed">
            {wedding.tagline}
          </p>

          {/* Decorative separator line */}
          <div className="flex items-center justify-center gap-3 my-4 w-full max-w-[160px]">
            <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-marigold/40" />
            <span className="text-marigold/60 text-[9px]">✦</span>
            <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-marigold/40" />
          </div>

          {/* Save the Date Info Panel */}
          <div className="flex flex-col items-center gap-1 w-full">
            <span className="text-[8.5px] uppercase tracking-[0.45em] text-marigold font-bold">
              Save the Date
            </span>
            <div className="flex items-center justify-center gap-4 mt-1">
              <span className="font-display text-lg sm:text-2xl text-slate-100 tracking-wide">
                {wedding.weddingDateDisplay}
              </span>
              <div className="h-3 w-px bg-marigold/30" />
              <span className="text-xs sm:text-sm text-ivory/70 tracking-wide font-light">
                {wedding.city}
              </span>
            </div>
            
            {/* Stately Days To Go Pill */}
            <div className="mt-3 flex items-center gap-2 px-4 py-1 rounded-full border border-marigold/15 bg-maroon-deep/20 text-[8px] uppercase tracking-[0.35em] text-marigold/90 font-bold shadow-[0_0_10px_rgba(232,192,122,0.05)] select-none">
              <span>{Math.max(0, Math.floor((new Date(wedding.weddingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} Days to Go</span>
            </div>
          </div>

          {/* Luxury CTA Button */}
          <a
            href="#couple"
            onClick={handleEnterCelebration}
            className="btn-luxury-shine w-full max-w-[280px] text-center px-8 py-3 rounded-full border border-marigold/80 bg-gradient-to-r from-maroon-deep via-maroon to-maroon-deep text-ivory hover:shadow-[0_0_25px_rgba(232,192,122,0.25)] hover:border-marigold transition-all duration-500 scale-100 hover:scale-105 active:scale-97 text-xs uppercase tracking-[0.25em] font-semibold mt-6 block cursor-pointer"
            style={{ color: "var(--ivory)" }}
          >
            Enter the Celebration
          </a>

        </div>

      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float pointer-events-none z-10 hidden sm:block">
        <div className="h-10 w-px bg-accent/60" />
      </div>
    </section>
  );
});
