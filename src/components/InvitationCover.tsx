import { useEffect, useState, useCallback } from "react";
import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScratchReveal } from "./ScratchReveal";
import { GaneshaBlessing } from "./GaneshaBlessing";
import { useInvitationParams } from "@/hooks/useInvitationParams";

export function InvitationCover() {
  const { guest, side } = useInvitationParams();
  const isReducedMotion = useReducedMotion();
  const [loaderFinished, setLoaderFinished] = useState(() => {
    if (typeof window !== "undefined") {
      return !!(window as any).__loaderFinished;
    }
    return false;
  });

  useEffect(() => {
    if (loaderFinished) return;
    const handleFinished = () => setLoaderFinished(true);
    window.addEventListener("loader:finished", handleFinished);
    return () => window.removeEventListener("loader:finished", handleFinished);
  }, [loaderFinished]);

  const [blessingDone, setBlessingDone] = useState(false);
  const [ganeshaLoaded, setGaneshaLoaded] = useState(false);
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

  const handleBlessingComplete = useCallback(() => {
    setBlessingDone(true);
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    document.body.style.overflow = "";
    window.dispatchEvent(new CustomEvent("invitation:opened"));
    setTimeout(() => setHidden(true), 2000);
  };

  if (hidden) return null;

  // Delay rendering anything until the main loader has finished and exited
  // We render a solid fullscreen cover to prevent the main site from flashing underneath the loader
  if (!loaderFinished) {
    return (
      <div
        aria-label="Wedding invitation cover placeholder"
        className="fixed inset-0 z-[100] bg-cinematic-deep"
      />
    );
  }

  // Phase 1: Blessing sequence
  if (!blessingDone) {
    return <GaneshaBlessing onComplete={handleBlessingComplete} />;
  }

  // Phase 2: Scratch reveal + cover (existing flow, untouched)

  return (
    <div
      aria-label="Wedding invitation cover"
      className="fixed inset-0 z-[100] select-none overflow-hidden"
    >
      {/* Background Layer (for Desktop Zoom/Fade) */}
      <div 
        className={`absolute inset-0 z-0 bg-cinematic transition-all duration-[2000ms] ease-out ${
          opening ? "opacity-0 scale-110 md:scale-125" : "opacity-100 scale-100"
        }`}
      />

      {/* Left Panel (Mobile: Split / Desktop: Fade) */}
      <div
        className={`absolute inset-y-0 left-0 z-20 w-1/2 transition-all duration-[1800ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          opening ? "max-md:-translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
        style={{
          background: "linear-gradient(110deg, #0f0406 0%, #1a0608 55%, #14060a 100%)",
          borderRight: "1px solid rgba(232,192,122,0.15)",
        }}
      >
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-marigold/40 to-transparent" />
      </div>

      {/* Right Panel (Mobile: Split / Desktop: Fade) */}
      <div
        className={`absolute inset-y-0 right-0 z-20 w-1/2 transition-all duration-[1800ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          opening ? "max-md:translate-x-full opacity-0" : "translate-x-0 opacity-100"
        }`}
        style={{
          background: "linear-gradient(250deg, #0f0406 0%, #1a0608 55%, #14060a 100%)",
          borderLeft: "1px solid rgba(232,192,122,0.15)",
        }}
      >
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-marigold/40 to-transparent" />
      </div>

      {/* Cinematic Reveal Glow */}
      <div
        className={`pointer-events-none absolute inset-0 z-30 transition-all duration-[1500ms] ${
          opening ? "opacity-0 scale-150" : "opacity-100 scale-100"
        }`}
        style={{
          background: "radial-gradient(circle at center, rgba(232,192,122,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Center content */}
      <div
        className={`relative z-40 flex h-full w-full flex-col items-center justify-between px-4 sm:px-6 py-6 text-center transition-all duration-[1500ms] ${
          opening ? "scale-110 opacity-0 blur-sm" : mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          color: "var(--ivory)",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* UPPER SECTION: Subtle Mantra & Lord Ganesha Blessing */}
        <div className="flex-1 w-full flex flex-col justify-end items-center pb-4 sm:pb-6">
          <div className="flex flex-col items-center gap-1.5 animate-reveal">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-marigold/50 to-transparent" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-marigold/80 font-medium">
              {wedding.openingShlokaTranslit}
            </span>
            <span className="font-display text-lg sm:text-2xl text-ivory/95 tracking-[0.05em] mt-0.5">
              {wedding.openingShloka}
            </span>
          </div>

          {/* Lord Ganesha Image Container with Loader */}
          <div className="relative mt-3 sm:mt-4 flex items-center justify-center h-[95px] sm:h-[130px] w-[95px] sm:w-[130px]">
            {/* Subtle Gold Aura Glow behind Ganesha */}
            <div 
              className={`absolute pointer-events-none rounded-full blur-xl opacity-60 transition-opacity duration-1000 ${ganeshaLoaded ? 'animate-pulse' : ''}`}
              style={{
                width: "120px",
                height: "120px",
                background: "radial-gradient(circle, rgba(232,192,122,0.12) 0%, transparent 70%)",
                animationDuration: "6s"
              }}
            />

            {/* Sacred Gold Circular Loader (Renders while image is loading) */}
            {!ganeshaLoaded && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center animate-pulse">
                {/* Thin golden spinning ornamental circle */}
                <div 
                  className="w-10 h-10 rounded-full border border-marigold/15 border-t-marigold/70 animate-spin" 
                  style={{ animationDuration: '2.5s' }}
                />
                {/* Tiny central golden spark */}
                <div className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-marigold to-premium-gold shadow-[0_0_8px_var(--marigold)]" />
                <span className="text-[6.5px] tracking-[0.25em] uppercase text-marigold/45 mt-2 absolute -bottom-5">
                  Blessing...
                </span>
              </div>
            )}

            <img
              src={wedding.blessingImage}
              alt="Lord Ganesha"
              onLoad={() => setGaneshaLoaded(true)}
              className={`w-[95px] sm:w-[130px] object-contain drop-shadow-[0_0_20px_rgba(232,192,122,0.08)] relative z-10 transition-all duration-[1500ms] ease-out scale-95 hover:scale-100 ${
                ganeshaLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
              }`}
              loading="eager"
            />
          </div>
        </div>

        {/* MIDDLE SECTION: Sacred Scratch Seal (Primary Focus) */}
        {!opening ? (
          <div className="flex-none relative my-2 flex justify-center items-center scale-100 sm:scale-105 transition-transform duration-500">
            {/* Cinematic Radial Aura Glow under the seal */}
            <div 
              className="absolute z-0 bg-radial-glow opacity-75 pointer-events-none rounded-full blur-2xl animate-pulse"
              style={{
                background: "radial-gradient(circle, rgba(232,192,122,0.2) 0%, transparent 70%)",
                width: '260px',
                height: '260px',
                animationDuration: '8s'
              }}
            />
            <div className="relative z-10">
              <ScratchReveal onReveal={handleOpen} width={220} height={220} />
            </div>
          </div>
        ) : (
          <div className="flex-none h-[220px] w-[220px]" />
        )}

        {/* LOWER SECTION: Couple Details Card (framed elegantly beneath the seal) */}
        <div className="flex-1 w-full flex flex-col justify-start items-center pt-6 sm:pb-8">
          <div className="relative rounded-[2px] w-full max-w-[320px] sm:max-w-[420px] px-6 py-6 sm:px-10 sm:py-7 border border-marigold/30 bg-black/15 backdrop-blur-[3px] shadow-[0_0_60px_-10px_rgba(232,192,122,0.15)] transition-all duration-700">
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

            {/* Guest Personalization */}
            {guest && (
              <div className="mb-3 animate-reveal">
                <p className="text-[8px] uppercase tracking-[0.4em] text-marigold/60">
                  {side === "bride" ? "From the Bride's Family" : side === "groom" ? "From the Groom's Family" : "A Special Invitation for"}
                </p>
                <h2 className="mt-1 font-display text-lg text-premium-gold italic">
                  {guest.includes("&") || guest.toLowerCase().includes("family") ? `Dear ${guest}` : `Welcome ${guest}`}
                </h2>
                <div className="mt-2.5 flex justify-center">
                  <div className="h-px w-6 bg-gradient-to-r from-transparent via-marigold/30 to-transparent" />
                </div>
              </div>
            )}

            <p className="text-[8px] uppercase tracking-[0.45em] text-marigold opacity-80">
              The Wedding of
            </p>

            <h1 className="mt-2.5 font-display text-3xl leading-[1.05] sm:text-4xl md:text-5xl text-premium-gold">
              {wedding.brideName}
              <span className="mx-2.5 inline-block italic text-marigold text-2xl sm:text-3xl">
                &
              </span>
              {wedding.groomName}
            </h1>

            <p className="mt-2.5 text-xs italic text-ivory/70 max-w-[280px] sm:max-w-md mx-auto">
              {wedding.tagline}
            </p>

            <div className="mt-4 flex flex-col items-center gap-0.5">
              <span className="text-[8px] uppercase tracking-[0.4em] text-marigold">
                Save the Date
              </span>
              <span className="font-display text-base sm:text-lg text-ivory">
                {wedding.weddingDateDisplay}
              </span>
              <span className="text-[10px] text-ivory/60">
                {wedding.city}
              </span>
            </div>
          </div>

          {/* Hashtag underneath Details Card */}
          <div className={`mt-4 flex flex-col items-center transition-opacity duration-1000 ${opening ? "opacity-0" : "opacity-100"}`}>
            <span className="text-[8px] tracking-[0.35em] text-ivory/35 uppercase">
              {wedding.hashtag}
            </span>
          </div>
        </div>
      </div>

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
    </div>
  );
}
