import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GaneshaBlessingProps {
  /** Called when the blessing sequence completes and is ready to hand off */
  onComplete: () => void;
}

/**
 * GaneshaBlessing — A calm, cinematic sacred blessing moment.
 *
 * Appears after the app loader finishes, before the scratch reveal.
 * Auto-advances through three phases:
 *   1. Fade-in + subtle scale  (~1.2s)
 *   2. Calm hold              (~1.5s)
 *   3. Fade-out + blur        (~0.8s)
 * Total: ~3.5 seconds
 *
 * Completely self-contained. Does not touch any other component.
 */
export function GaneshaBlessing({ onComplete }: GaneshaBlessingProps) {
  const isReducedMotion = useReducedMotion();

  // Phases: "entering" → "holding" → "leaving" → done
  const [phase, setPhase] = useState<"entering" | "holding" | "leaving" | "done">("entering");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // We must wait one frame so the browser paints the initial opacity-0 state
    // before we transition to opacity-1. Without this, the transition is skipped.
    requestAnimationFrame(() => {
      if (isReducedMotion) {
        timers.push(setTimeout(() => setPhase("holding"), 100));
        timers.push(setTimeout(() => setPhase("leaving"), 1100));
        timers.push(setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 1500));
      } else {
        // Phase 1: entering → holding (1.2s)
        timers.push(setTimeout(() => setPhase("holding"), 50));
        // Phase 2: holding → leaving (1.2 + 1.5 = 2.7s)
        timers.push(setTimeout(() => setPhase("leaving"), 2700));
        // Phase 3: leaving → done (2.7 + 0.8 = 3.5s)
        timers.push(setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 3500));
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete, isReducedMotion]);

  if (phase === "done") return null;

  // CSS classes per phase
  const contentClasses = (() => {
    switch (phase) {
      case "entering":
        return "opacity-0 scale-[0.96]";
      case "holding":
        return "opacity-100 scale-100";
      case "leaving":
        return "opacity-0 scale-[1.02] blur-[2px]";
      default:
        return "";
    }
  })();

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-cinematic-deep">
      {/* Subtle radial amber glow behind the deity */}
      <div
        className={`absolute transition-opacity ${
          phase === "holding" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(232,192,122,0.08) 0%, rgba(232,192,122,0.03) 40%, transparent 70%)",
          transitionDuration: "1.5s",
        }}
      />

      {/* Main content block */}
      <div
        className={`relative flex flex-col items-center gap-6 px-8 text-center transition-all ${contentClasses}`}
        style={{
          transitionDuration: phase === "entering" ? "1.2s" : phase === "leaving" ? "0.8s" : "0.3s",
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Deity Image */}
        <div className="relative">
          <img
            src={wedding.blessingImage}
            alt="Lord Ganesha — Sacred Blessing"
            className="w-[160px] sm:w-[220px] md:w-[280px] object-contain drop-shadow-[0_0_40px_rgba(232,192,122,0.12)]"
            loading="eager"
          />
        </div>

        {/* Mantra */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-marigold/30 to-transparent" />

          <p className="font-display text-2xl sm:text-3xl text-premium-gold">
            {wedding.openingShloka}
          </p>

          <p className="text-[9px] uppercase tracking-[0.5em] text-marigold/50">
            {wedding.openingShlokaTranslit}
          </p>

          <div className="h-px w-12 bg-gradient-to-r from-transparent via-marigold/30 to-transparent" />
        </div>

        {/* Subtle meaning text */}
        <p className="max-w-xs text-[10px] italic leading-relaxed text-ivory/40">
          {wedding.openingShlokaMeaning}
        </p>
      </div>

      {/* Subtle ambient embers (very restrained) */}
      {!isReducedMotion && phase !== "leaving" && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-0.5 w-0.5 rounded-full bg-marigold opacity-20 animate-ember"
              style={{
                left: `${20 + (i * 11) % 60}%`,
                top: `${30 + (i * 13) % 40}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${5 + (i % 3)}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
