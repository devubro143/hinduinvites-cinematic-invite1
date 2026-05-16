import { useState, useEffect } from "react";
import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Countdown() {
  const isReducedMotion = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(wedding.weddingDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-cinematic-deep px-6 py-24 sm:py-32">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,var(--maroon-deep)_0%,transparent_70%)]" />
      
      {/* Floating Petals / Particles */}
      {!isReducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-accent opacity-20 animate-ember"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 7) % 100}%`,
                animationDuration: `${10 + (i % 5)}s`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-marigold opacity-60">
          Until Forever
        </p>
        <h2 className="mt-6 font-display text-5xl text-ivory sm:text-7xl text-premium-gold">
          The Countdown
        </h2>
        
        {/* Ornament */}
        <div className="my-10 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-marigold/30" />
          <span className="text-marigold">★</span>
          <div className="h-px w-12 bg-marigold/30" />
        </div>

        {/* Countdown Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          <CountdownCard value={timeLeft.days} label="Days" />
          <CountdownCard value={timeLeft.hours} label="Hours" />
          <CountdownCard value={timeLeft.minutes} label="Minutes" />
          <CountdownCard value={timeLeft.seconds} label="Seconds" />
        </div>

        <p className="mt-16 text-[10px] italic tracking-widest text-marigold opacity-50">
          Counting every breath until {wedding.weddingDateDisplay}
        </p>
      </div>
    </section>
  );
}

function CountdownCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-marigold/20 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-marigold/40 hover:bg-white/10">
      <div className="relative z-10 flex flex-col items-center">
        <span className="font-display text-5xl text-ivory sm:text-6xl">
          {value.toString().padStart(2, '0')}
        </span>
        <span className="mt-2 text-[10px] uppercase tracking-[0.4em] text-marigold opacity-60 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
      </div>
      {/* Subtle Card Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-marigold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}
