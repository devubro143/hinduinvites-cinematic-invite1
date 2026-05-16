import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function InvitationCover() {
  const isReducedMotion = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    document.body.style.overflow = "";
    
    // Broadcast event to start music/scroll engine
    window.dispatchEvent(new CustomEvent("invitation:opened"));
    
    // Complete the hide after panels finish moving
    setTimeout(() => setHidden(true), 1800);
  };

  if (hidden) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
      aria-label="Tap to open invitation"
      className="fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden"
    >
      {/* Left Panel */}
      <div
        className="absolute inset-y-0 left-0 z-20 w-1/2 transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{
          transform: opening ? "translateX(-100%)" : "translateX(0)",
          background: "linear-gradient(110deg, #0f0406 0%, #1a0608 55%, #14060a 100%)",
          borderRight: "1px solid rgba(232,192,122,0.15)",
        }}
      >
        {/* Panel Depth Shadow */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-[1800ms] ${opening ? "opacity-100" : "opacity-0"}`} />
        
        {/* Center Divider Detail */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-marigold/40 to-transparent" />
      </div>

      {/* Right Panel */}
      <div
        className="absolute inset-y-0 right-0 z-20 w-1/2 transition-transform duration-[1800ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{
          transform: opening ? "translateX(100%)" : "translateX(0)",
          background: "linear-gradient(250deg, #0f0406 0%, #1a0608 55%, #14060a 100%)",
          borderLeft: "1px solid rgba(232,192,122,0.15)",
        }}
      >
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-[1800ms] ${opening ? "opacity-100" : "opacity-0"}`} />
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-marigold/40 to-transparent" />
      </div>

      {/* Cinematic Reveal Glow (Center) */}
      <div
        className={`pointer-events-none absolute inset-0 z-30 transition-all duration-[1200ms] ${
          opening ? "opacity-0 scale-150" : "opacity-100 scale-100"
        }`}
        style={{
          background: "radial-gradient(circle at center, rgba(232,192,122,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Center content */}
      <div
        className={`relative z-40 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-[1500ms] ${
          opening ? "scale-110 opacity-0 blur-sm" : mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          color: "var(--ivory)",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Top ornament */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-marigold to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.6em] text-marigold">
            {wedding.openingShlokaTranslit}
          </span>
          <span className="font-display text-2xl sm:text-3xl text-ivory">
            {wedding.openingShloka}
          </span>
        </div>

        {/* Frame */}
        <div className="relative rounded-[2px] px-8 py-10 sm:px-14 sm:py-14 border border-marigold/30 bg-black/10 backdrop-blur-[2px] shadow-[0_0_60px_-10px_rgba(232,192,122,0.15)]">
          {/* Corner accents */}
          {[
            "top-0 left-0",
            "top-0 right-0 rotate-90",
            "bottom-0 right-0 rotate-180",
            "bottom-0 left-0 -rotate-90",
          ].map((pos) => (
            <span
              key={pos}
              className={`absolute h-4 w-4 ${pos} border-t border-l border-marigold/60 m-[-1px]`}
            />
          ))}

          <p className="text-[10px] uppercase tracking-[0.6em] text-marigold opacity-80">
            The Wedding of
          </p>

          <h1 className="mt-5 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl text-premium-gold">
            {wedding.brideName}
            <span className="mx-3 inline-block italic text-marigold">
              &
            </span>
            {wedding.groomName}
          </h1>

          <p className="mt-5 text-sm italic text-ivory/70">
            {wedding.tagline}
          </p>

          <div className="mt-6 flex flex-col items-center gap-1">
            <span className="text-[10px] uppercase tracking-[0.5em] text-marigold">
              Save the Date
            </span>
            <span className="font-display text-xl sm:text-2xl text-ivory">
              {wedding.weddingDateDisplay}
            </span>
            <span className="text-xs text-ivory/60">
              {wedding.city}
            </span>
          </div>
        </div>

        {/* Interaction Trigger */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="absolute -inset-4 bg-marigold/10 rounded-full blur-xl animate-pulse group-hover:bg-marigold/20 transition-colors" />
            <span className="relative inline-flex items-center gap-4 rounded-full border border-marigold/40 bg-white/5 px-8 py-3 text-[10px] uppercase tracking-[0.4em] text-ivory backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-marigold animate-pulse" />
              Tap to Unveil the Celebration
              <span className="h-1.5 w-1.5 rounded-full bg-marigold animate-pulse" />
            </span>
          </div>
          <span className="text-[9px] tracking-[0.4em] text-ivory/40 uppercase">
            {wedding.hashtag}
          </span>
        </div>
      </div>

      {/* Floating Particles (Embers) */}
      {!isReducedMotion && !opening && (
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-marigold opacity-30 animate-ember"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 13) % 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${4 + (i % 4)}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes cover-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232,192,122,0.45); }
          50% { box-shadow: 0 0 0 14px rgba(232,192,122,0); }
        }
      `}</style>
    </div>
  );
}
