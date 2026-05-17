import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChevronUp } from "lucide-react";

export function Footer() {
  const isReducedMotion = useReducedMotion();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative min-h-[80vh] overflow-hidden bg-[#08030a] px-6 py-32 text-ivory">
      {/* Background Atmosphere */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 20%, var(--maroon-deep) 0%, transparent 70%)"
        }}
      />

      {/* Slow Fading Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: isReducedMotion ? 6 : 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-accent opacity-20 animate-ember"
            style={{
              left: `${(i * 31) % 100}%`,
              top: `${(i * 17) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              animationDuration: `${10 + (i % 5) * 2}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Ornament */}
        <div className="mb-16 flex flex-col items-center gap-4 opacity-60">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-marigold to-transparent" />
          <span className="font-display text-2xl text-marigold">ॐ</span>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-marigold to-transparent" />
        </div>

        <p className="animate-reveal text-xs uppercase tracking-[0.6em] text-marigold">
          We look forward to seeing you
        </p>

        <h2 className="animate-reveal delay-1 mt-8 font-display text-5xl sm:text-7xl md:text-8xl leading-[1.1] sm:leading-none text-balance text-premium-gold max-w-xl mx-auto">
          <span className="block sm:inline">{wedding.brideName}</span>
          <span className="my-2 sm:my-0 mx-4 inline-block italic text-marigold">&</span>
          <span className="block sm:inline">{wedding.groomName}</span>
        </h2>

        <p className="animate-reveal delay-2 mt-8 text-sm italic opacity-70">
          {wedding.tagline}
        </p>

        <div className="animate-reveal delay-3 mt-12 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.5em] text-marigold">
            Save the Date
          </span>
          <p className="font-display text-2xl">{wedding.weddingDateDisplay}</p>
          <p className="text-xs opacity-50">{wedding.city}</p>
        </div>

        <p className="animate-reveal delay-4 mt-20 text-[10px] uppercase tracking-[0.8em] text-marigold">
          {wedding.hashtag}
        </p>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="group mt-24 inline-flex flex-col items-center gap-3 transition-opacity hover:opacity-100 opacity-60"
        >
          <span className="text-[9px] uppercase tracking-[0.4em]">Back to Top</span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-marigold/30 transition-all group-hover:border-marigold group-hover:bg-marigold/10">
            <ChevronUp className="h-4 w-4 text-marigold" />
          </div>
        </button>

        <div className="mt-20 border-t border-white/5 pt-10 text-[9px] uppercase tracking-[0.3em] opacity-30">
          Crafted with love · HinduInvites
        </div>
      </div>
    </footer>
  );
}
