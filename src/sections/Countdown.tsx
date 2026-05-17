import { useState, useEffect, useMemo } from "react";
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

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  // 1. Dynamic Emotional Anticipation Engine
  const getAnticipationText = (days: number) => {
    if (days <= 3) return "The Celebration Draws Near";
    if (days <= 10) return "The Royal Wedding Awaits";
    if (days <= 30) return "Until Forever Begins";
    return "Every Moment Leads To This Day";
  };

  const getSubAnticipationText = (days: number) => {
    if (days === 0) return "The Wedding Day Is Officially Here!";
    if (days === 1) return "Only 1 Sunrise Remains Until Forever";
    return `Only ${days} Sunrises Remain`;
  };

  // 2. Dynamic Intensity System (Increases atmospheric energy as the wedding draws closer)
  const intensity = useMemo(() => {
    const days = timeLeft.days;
    return {
      glow: days <= 3 
        ? "rgba(232, 192, 122, 0.22)" 
        : days <= 10 
        ? "rgba(232, 192, 122, 0.16)" 
        : "rgba(232, 192, 122, 0.1)",
      gradient: days <= 3 
        ? "radial-gradient(circle at 50% 50%, rgba(138, 3, 20, 0.35) 0%, rgba(8, 3, 10, 0.95) 75%, #050207 100%)" 
        : days <= 10 
        ? "radial-gradient(circle at 50% 50%, rgba(138, 3, 20, 0.25) 0%, rgba(8, 3, 10, 0.98) 75%, #050207 100%)"
        : "radial-gradient(circle at 50% 50%, rgba(138, 3, 20, 0.18) 0%, rgba(8, 3, 10, 1) 75%, #050207 100%)",
      particleCount: days <= 3 
        ? 28 
        : days <= 10 
        ? 22 
        : days <= 30 
        ? 16 
        : 10,
    };
  }, [timeLeft.days]);

  return (
    <section 
      id="countdown" 
      className="relative overflow-hidden px-6 py-24 sm:py-32 z-10"
      style={{ background: intensity.gradient }}
    >
      {/* 3. Sacred Cinematic Centerpiece (Slow orbiting royal cosmic mandala) */}
      {!isReducedMotion && (
        <svg 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-marigold pointer-events-none opacity-[0.06] select-none animate-spin" 
          style={{ animationDuration: "160s" }}
          width="500" 
          height="500" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.2"
        >
          <circle cx="50" cy="50" r="46" strokeDasharray="1, 2" />
          <circle cx="50" cy="50" r="39" />
          <circle cx="50" cy="50" r="32" strokeDasharray="2, 2" />
          <circle cx="50" cy="50" r="22" />
          {Array.from({ length: 12 }).map((_, idx) => {
            const angle = (idx * 30 * Math.PI) / 180;
            const x1 = 50 + Math.cos(angle) * 46;
            const y1 = 50 + Math.sin(angle) * 46;
            return (
              <line key={idx} x1="50" y1="50" x2={x1} y2={y1} opacity="0.3" />
            );
          })}
        </svg>
      )}

      {/* 4. Ambient Halo Spotlight Backlighting */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 blur-[130px] mix-blend-screen"
        style={{
          background: `radial-gradient(circle, ${intensity.glow} 0%, transparent 70%)`,
          width: "600px",
          height: "600px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,2,7,0.85)_100%)] pointer-events-none" />

      {/* 5. Volumetric Sparkles & Embers Drift */}
      {!isReducedMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          {Array.from({ length: intensity.particleCount }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-accent opacity-25 animate-ember"
              style={{
                left: `${(i * 17) % 100}%`,
                top: `${(i * 13) % 100}%`,
                animationDuration: `${12 + (i % 6)}s`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 6. Text Header Area */}
      <div className="relative z-10 mx-auto max-w-5xl text-center px-4">
        <p className="text-[10px] uppercase tracking-[0.55em] text-accent animate-reveal font-semibold">
          {getAnticipationText(timeLeft.days)}
        </p>
        
        <h2 className="mt-4 font-display text-4xl sm:text-6xl text-balance bg-gradient-to-r from-accent via-ivory to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(232,192,122,0.2)] font-medium leading-tight py-2 animate-reveal delay-[150ms]">
          {getSubAnticipationText(timeLeft.days)}
        </h2>
        
        {/* Sacred Divider Ornament */}
        <div className="my-8 flex items-center justify-center gap-4 animate-reveal delay-[300ms]">
          <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-marigold opacity-40" />
          <span className="text-marigold text-md animate-pulse duration-[4000ms] drop-shadow-[0_0_8px_rgba(232,192,122,0.5)]">ॐ</span>
          <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-marigold opacity-40" />
        </div>

        {/* 7. Staggered Glassmorphic Countdown Cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 relative">
          <CountdownCard value={timeLeft.days} label="Days" delayClass="delay-[100ms]" />
          <CountdownCard value={timeLeft.hours} label="Hours" delayClass="delay-[250ms]" />
          <CountdownCard value={timeLeft.minutes} label="Minutes" delayClass="delay-[400ms]" />
          <CountdownCard value={timeLeft.seconds} label="Seconds" delayClass="delay-[550ms]" />
        </div>

        {/* Dynamic footer anticipation tag */}
        <p className="mt-16 text-[10px] italic tracking-widest text-marigold/60 animate-reveal delay-[800ms] select-none">
          Counting every heartbeat until {wedding.weddingDateDisplay}
        </p>
      </div>
    </section>
  );
}

function CountdownCard({ 
  value, 
  label, 
  delayClass 
}: { 
  value: number; 
  label: string; 
  delayClass: string; 
}) {
  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border border-marigold/15 bg-gradient-to-b from-white/5 to-black/60 p-6 sm:p-8 backdrop-blur-[5px] transition-all duration-700 hover:border-marigold/45 hover:shadow-[0_0_25px_rgba(232,192,122,0.15)] flex flex-col items-center justify-center animate-reveal ${delayClass}`}
    >
      {/* Inner double border frame */}
      <div className="absolute inset-2.5 rounded-[10px] border border-marigold/10 pointer-events-none group-hover:border-marigold/25 transition-all duration-500" />

      {/* Glassy shimmer light sweep sweep sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none z-10" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Soft Breathing Glow on Value */}
        <span className="font-display text-5xl sm:text-6xl text-ivory tracking-wider drop-shadow-[0_0_12px_rgba(250,246,239,0.35)] group-hover:drop-shadow-[0_0_20px_rgba(232,192,122,0.6)] group-hover:text-premium-gold transition-all duration-700 select-none">
          {value.toString().padStart(2, '0')}
        </span>
        
        {/* Subtitle / Unit label */}
        <span className="mt-3 text-[10px] uppercase tracking-[0.45em] text-marigold opacity-65 group-hover:opacity-100 group-hover:tracking-[0.5em] transition-all duration-500 font-medium select-none">
          {label}
        </span>
      </div>

      {/* Backlit Candlelight Glow behind hovered card */}
      <div 
        className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(232, 192, 122, 0.08) 0%, transparent 60%)"
        }}
      />
    </div>
  );
}
