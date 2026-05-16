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
    // Allow main site music/animations to begin
    window.dispatchEvent(new CustomEvent("invitation:opened"));
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
      className={`fixed inset-0 z-[100] cursor-pointer select-none transition-opacity duration-[1400ms] ease-out ${
        opening ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse at center, var(--maroon-deep) 0%, #14060a 60%, #08030a 100%)",
      }}
    >
      {/* Doors / curtain split */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 transition-transform duration-[1600ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{
          transform: opening ? "translateX(-100%)" : "translateX(0)",
          background:
            "linear-gradient(110deg, #1a0608 0%, var(--maroon-deep) 55%, #2a0d0a 100%)",
          borderRight: "1px solid rgba(232,192,122,0.35)",
          boxShadow: "inset -40px 0 80px -40px rgba(0,0,0,0.7)",
        }}
      >
        <div
          className="absolute right-0 top-0 h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--marigold), transparent)",
          }}
        />
      </div>
      <div
        className="absolute inset-y-0 right-0 w-1/2 transition-transform duration-[1600ms] ease-[cubic-bezier(0.77,0,0.18,1)]"
        style={{
          transform: opening ? "translateX(100%)" : "translateX(0)",
          background:
            "linear-gradient(250deg, #1a0608 0%, var(--maroon-deep) 55%, #2a0d0a 100%)",
          borderLeft: "1px solid rgba(232,192,122,0.35)",
          boxShadow: "inset 40px 0 80px -40px rgba(0,0,0,0.7)",
        }}
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-[1400ms]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at center, rgba(232,192,122,0.18), transparent 70%)",
          opacity: opening ? 0 : 1,
        }}
      />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ 
          length: isReducedMotion ? 4 : Math.floor(wedding.theme.effects.particleDensity) 
        }).map((_, i) => {
          const left = (i * 53) % 100;
          const delay = (i % 7) * 0.7;
          const size = (i % 4) + 2;
          const duration = 6 + (i % 5);
          return (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                bottom: `-10px`,
                width: `${size}px`,
                height: `${size}px`,
                background:
                  "radial-gradient(circle, rgba(232,192,122,0.95), rgba(232,192,122,0) 70%)",
                animation: `cover-rise ${duration}s ease-in ${delay}s infinite`,
                opacity: 0.8,
                willChange: "transform, opacity",
              }}
            />
          );
        })}
      </div>

      {/* Center content */}
      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center px-6 text-center transition-all duration-[1400ms] ${
          opening ? "scale-110 opacity-0" : mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{
          color: "var(--ivory)",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Top ornament */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div
            className="h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--marigold), transparent)",
            }}
          />
          <span
            className="text-xs uppercase tracking-[0.5em]"
            style={{ color: "var(--marigold)" }}
          >
            {wedding.openingShlokaTranslit}
          </span>
          <span
            className="font-display text-2xl sm:text-3xl"
            style={{ color: "var(--marigold)" }}
          >
            {wedding.openingShloka}
          </span>
        </div>

        {/* Frame */}
        <div
          className="relative rounded-[2px] px-8 py-10 sm:px-14 sm:py-14"
          style={{
            border: "1px solid rgba(232,192,122,0.5)",
            boxShadow:
              "0 0 60px -10px rgba(232,192,122,0.25), inset 0 0 40px rgba(232,192,122,0.05)",
          }}
        >
          {/* Corner accents */}
          {[
            "top-0 left-0",
            "top-0 right-0 rotate-90",
            "bottom-0 right-0 rotate-180",
            "bottom-0 left-0 -rotate-90",
          ].map((pos) => (
            <span
              key={pos}
              className={`absolute h-4 w-4 ${pos}`}
              style={{
                borderTop: "1px solid var(--marigold)",
                borderLeft: "1px solid var(--marigold)",
                margin: "-1px",
              }}
            />
          ))}

          <p
            className="text-[10px] uppercase tracking-[0.6em] opacity-80"
            style={{ color: "var(--marigold)" }}
          >
            The Wedding of
          </p>

          <h1
            className="mt-5 font-display text-5xl leading-[0.95] sm:text-6xl md:text-7xl"
            style={{ color: "var(--ivory)" }}
          >
            {wedding.brideName}
            <span
              className="mx-3 inline-block italic"
              style={{ color: "var(--marigold)" }}
            >
              &
            </span>
            {wedding.groomName}
          </h1>

          <p
            className="mt-5 text-sm italic"
            style={{ color: "rgba(250,246,239,0.8)" }}
          >
            {wedding.tagline}
          </p>

          <div className="mt-6 flex flex-col items-center gap-1">
            <span
              className="text-[10px] uppercase tracking-[0.5em]"
              style={{ color: "var(--marigold)" }}
            >
              Save the Date
            </span>
            <span
              className="font-display text-xl sm:text-2xl"
              style={{ color: "var(--ivory)" }}
            >
              {wedding.weddingDateDisplay}
            </span>
            <span
              className="text-xs"
              style={{ color: "rgba(250,246,239,0.7)" }}
            >
              {wedding.city}
            </span>
          </div>
        </div>

        {/* Tap to open */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <span
            className="inline-flex items-center gap-3 rounded-full px-8 py-3 text-xs uppercase tracking-[0.4em] backdrop-blur-sm"
            style={{
              border: "1px solid rgba(232,192,122,0.6)",
              background: "rgba(232,192,122,0.08)",
              color: "var(--ivory)",
              animation: "cover-pulse 2.4s ease-in-out infinite",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--marigold)" }}
            />
            Tap to Open Invitation
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--marigold)" }}
            />
          </span>
          <span
            className="text-[10px] tracking-[0.3em] opacity-60"
            style={{ color: "var(--ivory)" }}
          >
            {wedding.hashtag}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes cover-rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          15% { opacity: 0.9; }
          100% { transform: translateY(-110vh) scale(0.6); opacity: 0; }
        }
        @keyframes cover-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232,192,122,0.45); }
          50% { box-shadow: 0 0 0 14px rgba(232,192,122,0); }
        }
      `}</style>
    </div>
  );
}
