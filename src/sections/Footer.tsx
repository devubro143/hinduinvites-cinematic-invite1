import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChevronUp } from "lucide-react";

export function Footer() {
  const isReducedMotion = useReducedMotion();
  
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 2.8, // Elite, smooth, prestigious returning transition
        easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // Gentle luxury easing
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative min-h-screen overflow-hidden bg-[#050106] px-6 py-24 sm:py-32 flex flex-col justify-between items-center text-ivory">
      {/* Cinematic Outro Background Vignette */}
      <div 
        className="absolute inset-0 opacity-60 pointer-events-none z-0 mix-blend-screen blur-[120px]"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(92, 32, 24, 0.4) 0%, rgba(12, 4, 13, 0.98) 75%, transparent 100%)"
        }}
      />

      {/* Floating Golden Embers / Star Dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
        {Array.from({ length: isReducedMotion ? 6 : 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gradient-to-b from-marigold to-amber-200 opacity-25 animate-ember"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              animationDuration: `${12 + (i % 4) * 2.5}s`,
              animationDelay: `${i * 0.4}s`,
              filter: "blur(0.3px) drop-shadow(0 0 4px rgba(232, 192, 122, 0.45))",
            }}
          />
        ))}
      </div>

      {/* Main Outro Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center justify-center flex-1 w-full my-auto">
        
        {/* Sacred Outro Icon & Divider */}
        <div className="mb-10 flex flex-col items-center gap-4 opacity-50 select-none">
          <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-marigold/40 to-transparent" />
          <span className="font-display text-xl text-marigold/70 font-semibold">ॐ</span>
          <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-marigold/40 to-transparent" />
        </div>

        {/* Emotionally Timeless Closing Tagline */}
        <p className="animate-reveal text-[10px] sm:text-xs uppercase tracking-[0.55em] text-marigold font-bold select-none">
          We look forward to celebrating with you
        </p>

        {/* Shimmering Couple Outro Signature */}
        <h2 className="animate-reveal delay-1 mt-6 font-display text-4xl sm:text-6xl md:text-7xl leading-tight text-royal-gold tracking-wide max-w-2xl mx-auto text-center select-none py-1">
          <span>{wedding.brideName}</span>
          <span className="mx-3.5 inline-block italic font-light text-marigold/70 font-serif text-2xl sm:text-4xl">&amp;</span>
          <span>{wedding.groomName}</span>
        </h2>

        {/* Blessing Statement */}
        <p className="animate-reveal delay-2 mt-5 text-xs sm:text-sm italic text-ivory/80 tracking-wide font-light max-w-sm sm:max-w-md mx-auto leading-relaxed select-none">
          "{wedding.tagline}"
        </p>

        {/* Luxury Save-The-Date Outro */}
        <div className="animate-reveal delay-3 mt-8 flex flex-col items-center gap-1.5 opacity-90 select-none">
          <span className="text-[8px] uppercase tracking-[0.45em] text-marigold font-bold">
            July Ceremony
          </span>
          <p className="font-display text-xl text-slate-100 tracking-wide">{wedding.weddingDateDisplay}</p>
          <p className="text-[10px] text-ivory/60 tracking-wider font-light">{wedding.city}</p>
        </div>

        {/* Wedding Couple Hashtag Outro */}
        <p className="animate-reveal delay-4 mt-12 text-[9px] uppercase tracking-[0.7em] text-marigold/80 font-bold select-none">
          {wedding.hashtag}
        </p>

        {/* Luxury Brand Separation Divider */}
        <div className="flex items-center justify-center gap-5 my-12 w-full max-w-[200px] opacity-35 select-none">
          <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-marigold/30" />
          <span className="text-marigold/60 text-[8px]">✦</span>
          <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-marigold/30" />
        </div>

        {/* ATELIER CREATIVE CREDITS — The Invisible Designer Outro */}
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Brand Signature Title (High Fashion style logo) */}
          <div className="animate-reveal delay-5 flex flex-col items-center">
            <span className="font-display text-xl sm:text-2xl tracking-[0.3em] text-royal-gold select-none font-serif opacity-95">
              HINDUINVITES
            </span>
            
            {/* Atelier Positioning Line */}
            <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.45em] text-marigold/80 font-bold mt-2 select-none">
              Luxury Digital Wedding Atelier
            </span>
          </div>

          {/* Luxury Brand Philosophy Statement */}
          <p className="animate-reveal delay-5 mt-4.5 text-[10px] sm:text-xs text-ivory/60 tracking-wide font-light max-w-sm sm:max-w-md mx-auto leading-relaxed italic text-center px-4 select-none">
            "Crafting highly immersive, premium digital celebration cards where timeless royal heritage meets modern cinematic storytelling."
          </p>

          {/* Subtly Exquisite Call To Action */}
          <a
            href="https://hinduinvites.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-shine animate-reveal delay-5 mt-7.5 inline-flex items-center gap-3 px-8 py-3 rounded-full border border-marigold/45 bg-gradient-to-r from-[#12070a] via-[#1b0507] to-[#12070a] text-[8.5px] sm:text-[9px] uppercase tracking-[0.35em] text-marigold hover:shadow-[0_0_20px_rgba(232,192,122,0.18)] hover:border-marigold transition-all duration-700 active:scale-97 font-bold relative group overflow-hidden select-none"
          >
            Discover Invitation Worlds
          </a>

        </div>

      </div>

      {/* Sleek Returning Path back to Top of Card */}
      <div className="relative z-10 w-full flex justify-center pb-2 select-none">
        <button
          onClick={scrollToTop}
          className="group animate-reveal delay-5 flex flex-col items-center gap-2.5 transition-all duration-500 hover:opacity-100 opacity-45 cursor-pointer"
        >
          <span className="text-[8px] uppercase tracking-[0.35em] text-ivory/80 group-hover:text-marigold transition-colors duration-300">
            Return to Cover
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-marigold/15 transition-all duration-500 group-hover:border-marigold group-hover:bg-marigold/10 shadow-[0_0_12px_rgba(232,192,122,0.03)] group-hover:shadow-[0_0_20px_rgba(232,192,122,0.15)] group-hover:scale-105 active:scale-95">
            <ChevronUp className="h-3.5 w-3.5 text-marigold/80 group-hover:text-marigold transition-colors" />
          </div>
        </button>
      </div>

    </footer>
  );
}
