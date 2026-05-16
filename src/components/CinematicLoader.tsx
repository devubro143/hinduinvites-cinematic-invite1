import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CinematicLoader() {
  const isReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [showMantra, setShowMantra] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMantra(true), 400);
    
    // Start exit animation faster if reduced motion is preferred
    const timer2 = setTimeout(() => setExiting(true), isReducedMotion ? 1200 : 2400);
    
    // Remove from DOM
    const timer3 = setTimeout(() => setMounted(false), isReducedMotion ? 1800 : 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isReducedMotion]);

  if (!mounted) return null;

  const particleCount = isReducedMotion ? 4 : 15;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-background ${
        exiting ? "animate-loader-exit" : ""
      }`}
      style={{
        transition: isReducedMotion ? "none" : "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Background Glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-1000"
        style={{
          background: "radial-gradient(circle at center, var(--marigold) 0%, transparent 70%)",
          opacity: showMantra ? 0.25 : 0,
          display: isReducedMotion ? "none" : "block"
        }}
      />

      {/* Ambient Particles */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(particleCount)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-accent opacity-40 animate-ember"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 29) % 100}%`,
              animationDelay: `${i * 0.2}s`,
              willChange: "transform, opacity"
            }}
          />
        ))}
      </div>

      {/* Central Mantra / Logo Reveal */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${
          showMantra ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
        }`}
      >
        <span className="font-display text-5xl text-accent sm:text-6xl" style={{ color: "var(--marigold)" }}>
          ॐ
        </span>
        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-[10px] uppercase tracking-[0.6em] text-accent/80">
            {wedding.openingShlokaTranslit}
          </p>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        </div>
      </div>

      {/* Loading Progress (Subtle) */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 overflow-hidden">
        <div 
          className="h-[1px] bg-accent/20 transition-all duration-[2400ms] ease-out"
          style={{ 
            width: showMantra ? "100px" : "0px",
            background: "linear-gradient(90deg, transparent, var(--marigold), transparent)"
          }}
        />
      </div>

      <style>{`
        @keyframes loader-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-loader-exit {
          animation: loader-fade-out 1s forwards;
        }
      `}</style>
    </div>
  );
}
