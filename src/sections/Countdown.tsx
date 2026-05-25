import { useState, useEffect, useMemo } from "react";
import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Countdown() {
  const isReducedMotion = useReducedMotion();
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClose = () => setDropdownOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [dropdownOpen]);

  // 1. Dynamic Emotional Anticipation Engine (Strict Day States)
  const getAnticipationText = (days: number) => {
    if (days <= 3) return "Forever Begins In Moments";
    if (days <= 10) return "Only A Few Sunrises Remain";
    if (days <= 30) return "The Royal Celebration Approaches";
    if (days <= 60) return "Every Heartbeat Leads To Forever";
    return "The Celebration Draws Near";
  };

  const getSubAnticipationText = (days: number) => {
    if (days === 0) return "The Wedding Day Is Officially Here!";
    if (days === 1) return "Only 1 Sunrise Remains Until Forever";
    return `Only ${days} Sunrises Remain`;
  };

  // 2. Dynamic Intensity System (Atmospheric Tension Build based on wedding date proximity)
  const intensity = useMemo(() => {
    const days = timeLeft.days;
    return {
      glow: days <= 3 
        ? "rgba(232, 192, 122, 0.24)" 
        : days <= 10 
        ? "rgba(232, 192, 122, 0.18)" 
        : "rgba(232, 192, 122, 0.12)",
      gradient: days <= 3 
        ? "radial-gradient(circle at 50% 50%, rgba(138, 3, 20, 0.38) 0%, rgba(8, 3, 10, 0.96) 75%, #050207 100%)" 
        : days <= 10 
        ? "radial-gradient(circle at 50% 50%, rgba(138, 3, 20, 0.28) 0%, rgba(8, 3, 10, 0.98) 75%, #050207 100%)"
        : "radial-gradient(circle at 50% 50%, rgba(138, 3, 20, 0.20) 0%, rgba(8, 3, 10, 1) 75%, #050207 100%)",
      particleCount: days <= 3 
        ? 30 
        : days <= 10 
        ? 24 
        : days <= 30 
        ? 18 
        : 12,
    };
  }, [timeLeft.days]);

  // ── Dynamic Prefilled Calendar URL Generators ─────────────────
  const getGoogleCalendarUrl = () => {
    const dateStr = wedding.weddingDate.replace(/-/g, ""); // e.g. "20260725"
    const startDate = new Date(wedding.weddingDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    const endDateStr = endDate.toISOString().split("T")[0].replace(/-/g, "");

    const title = encodeURIComponent(`Wedding: ${wedding.brideName} & ${wedding.groomName}`);
    const location = encodeURIComponent(`${wedding.venue || ""}, ${wedding.city || ""}`);
    const description = encodeURIComponent(`Join us for the wedding celebration of ${wedding.brideName} and ${wedding.groomName}.\n\nTagline: ${wedding.tagline || ""}\nHashtag: ${wedding.hashtag || ""}\n\nCinematic Wedding Invitation: ${window.location.origin}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${endDateStr}&details=${description}&location=${location}`;
  };

  const generateIcsFile = () => {
    const dateStr = wedding.weddingDate.replace(/-/g, ""); // e.g. "20260725"
    const startDate = new Date(wedding.weddingDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    const endDateStr = endDate.toISOString().split("T")[0].replace(/-/g, "");

    const title = `Wedding: ${wedding.brideName} & ${wedding.groomName}`;
    const location = `${wedding.venue || ""}, ${wedding.city || ""}`;
    const description = `Join us for the wedding celebration of ${wedding.brideName} and ${wedding.groomName}.\\n\\nTagline: ${wedding.tagline || ""}\\nHashtag: ${wedding.hashtag || ""}\\n\\nCinematic Wedding Invitation: ${window.location.origin}`;
    
    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//HinduInvites//Wedding Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:wedding-${wedding.coupleId}-${dateStr}`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${endDateStr}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
      "END:VCALENDAR"
    ];

    const blob = new Blob([icsLines.join("\r\n")], { type: "text/calendar;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `wedding-${wedding.coupleId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <section 
      id="countdown" 
      className="relative overflow-hidden px-6 py-12 sm:py-32 z-10"
      style={{ background: intensity.gradient }}
    >
      {/* 3. Slow Golden Dust Sweep (Moving slow spotlight across background) */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.14] bg-gradient-to-r from-transparent via-marigold/15 to-transparent -translate-x-full animate-sweep-slow z-0" />
      )}

      {/* 4. Sacred Circular Clockwork Centerpiece (Slow orbiting 140s mandala) */}
      {!isReducedMotion && (
        <svg 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-marigold pointer-events-none opacity-[0.05] select-none animate-spin" 
          style={{ animationDuration: "140s" }}
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

      {/* 5. Volumetric Glow backlights & Vignette Shadows */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 blur-[130px] mix-blend-screen z-0"
        style={{
          background: `radial-gradient(circle, ${intensity.glow} 0%, transparent 70%)`,
          width: "600px",
          height: "600px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,2,7,0.85)_100%)] pointer-events-none z-0" />

      {/* 6. Gold Embers / Sparks particles */}
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

      {/* 7. Centered Editorial Header Text */}
      <div className="relative z-10 mx-auto max-w-5xl text-center px-4">
        <p className="text-[10px] uppercase tracking-[0.55em] text-accent animate-reveal font-semibold">
          {getAnticipationText(timeLeft.days)}
        </p>
        
        <h2 className="mt-4 font-display text-4xl sm:text-6xl text-balance bg-gradient-to-r from-accent via-ivory to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(232,192,122,0.2)] font-medium leading-tight py-2 animate-reveal delay-[150ms]">
          {getSubAnticipationText(timeLeft.days)}
        </h2>
        
        {/* Heartbeat Divider pulsing every second */}
        <div className="my-8 flex items-center justify-center gap-4 animate-reveal delay-[300ms]">
          <div className="h-[1px] w-14 bg-gradient-to-r from-transparent to-marigold opacity-40" />
          <span className="text-marigold text-md animate-pulse duration-[1000ms] drop-shadow-[0_0_8px_rgba(232,192,122,0.5)]">ॐ</span>
          <div className="h-[1px] w-14 bg-gradient-to-l from-transparent to-marigold opacity-40" />
        </div>

        {/* 8. Mechanical Staggered Countdown Modules */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 relative">
          <CountdownCard 
            value={timeLeft.days} 
            label="Days" 
            delayClass="delay-[100ms]" 
          />
          <CountdownCard 
            value={timeLeft.hours} 
            label="Hours" 
            delayClass="delay-[250ms]" 
          />
          <CountdownCard 
            value={timeLeft.minutes} 
            label="Minutes" 
            delayClass="delay-[400ms]" 
            isFlip={!isReducedMotion}
          />
          <CountdownCard 
            value={timeLeft.seconds} 
            label="Seconds" 
            delayClass="delay-[550ms]" 
            isSeconds={true}
            isFlip={!isReducedMotion}
          />
        </div>

        {/* 9. Premium Royal "Save The Wedding Date" CTA */}
        <div className="mt-12 flex flex-col items-center justify-center relative z-30 animate-reveal delay-[700ms]">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-6 py-2.5 rounded-full border border-marigold/30 bg-gradient-to-b from-white/5 to-black/85 text-[10px] uppercase tracking-[0.25em] text-premium-gold font-medium transition-all duration-700 shadow-[0_0_15px_rgba(232,192,122,0.06)] hover:border-marigold/60 hover:shadow-[0_0_25px_rgba(232,192,122,0.22)] active:scale-[0.98] cursor-pointer flex items-center gap-2 group overflow-hidden"
            >
              {/* Volumetric glossy shimmer light sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none" />
              
              {/* Small glowing star icon */}
              <span className="text-[10px] text-marigold animate-pulse">✦</span>
              Save The Wedding Date
              <span className="text-[8px] text-marigold group-hover:translate-y-0.5 transition-transform duration-300">
                {dropdownOpen ? "▲" : "▼"}
              </span>
            </button>

            {/* Premium Gold Dropdown Selector */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-3 w-52 rounded-xl border border-marigold/20 bg-black/90 backdrop-blur-md p-1.5 shadow-[0_10px_30px_-5px_rgba(8,3,10,0.95),0_0_20px_rgba(232,192,122,0.12)] transition-all duration-500 ease-out z-40 ${
                dropdownOpen 
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
                  : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
              }`}
            >
              <div className="absolute inset-1 rounded-[8px] border border-marigold/5 pointer-events-none" />

              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[10px] uppercase tracking-wider text-ivory/80 hover:text-premium-gold hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <span className="text-marigold/70 text-xs">📅</span>
                Google Calendar
              </a>
              
              <button
                onClick={() => {
                  generateIcsFile();
                  setDropdownOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[10px] uppercase tracking-wider text-ivory/80 hover:text-premium-gold hover:bg-white/5 transition-all duration-300 cursor-pointer text-left"
              >
                <span className="text-marigold/70 text-xs">🍎</span>
                Apple / Outlook (.ics)
              </button>
            </div>
          </div>
        </div>

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
  delayClass,
  isSeconds = false,
  isFlip = false
}: { 
  value: number; 
  label: string; 
  delayClass: string; 
  isSeconds?: boolean;
  isFlip?: boolean;
}) {
  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border border-marigold/15 bg-gradient-to-b from-white/5 to-black/60 p-6 sm:p-8 backdrop-blur-[5px] transition-all duration-700 hover:border-marigold/45 hover:shadow-[0_0_25px_rgba(232,192,122,0.15)] flex flex-col items-center justify-center animate-reveal ${delayClass}`}
    >
      {/* Inner double border frame */}
      <div className="absolute inset-2.5 rounded-[10px] border border-marigold/10 pointer-events-none group-hover:border-marigold/25 transition-all duration-500" />

      {/* Glassy reflection light sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none z-10" />

      {/* Specific Seconds Bezel Layer */}
      {isSeconds && (
        <div 
          className="absolute pointer-events-none w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-dashed border-marigold/20 animate-spin z-0 opacity-40 group-hover:opacity-70 group-hover:scale-115 transition-all duration-[2000ms] ease-out"
          style={{ animationDuration: "10s" }}
        />
      )}

      {/* Seconds Breathing Aura Heartbeat Pulse */}
      {isSeconds && (
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,192,122,0.12)_0%,transparent_60%)] animate-pulse pointer-events-none z-0"
          style={{ animationDuration: "1s" }}
        />
      )}

      <div className="relative z-10 flex flex-col items-center w-full">
        {isFlip ? (
          <MechanicalDigit value={value} />
        ) : (
          <span className="font-display text-5xl sm:text-6xl text-ivory tracking-wider drop-shadow-[0_0_12px_rgba(250,246,239,0.35)] group-hover:drop-shadow-[0_0_20px_rgba(232,192,122,0.6)] group-hover:text-premium-gold transition-all duration-700 select-none">
            {value.toString().padStart(2, '0')}
          </span>
        )}
        
        {/* Label */}
        <span className="mt-3 text-[10px] uppercase tracking-[0.45em] text-marigold opacity-65 group-hover:opacity-100 group-hover:tracking-[0.5em] transition-all duration-500 font-medium select-none">
          {label}
        </span>
      </div>

      {/* Backlit Glow behind hovered card */}
      <div 
        className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, rgba(232, 192, 122, 0.08) 0%, transparent 60%)"
        }}
      />
    </div>
  );
}

// 9. Mechanical Swiss Clock digit roll component
function MechanicalDigit({ value }: { value: number }) {
  const [prevValue, setPrevValue] = useState(value);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setAnimating(false);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  const currentStr = value.toString().padStart(2, '0');
  const prevStr = prevValue.toString().padStart(2, '0');

  return (
    <div className="relative overflow-hidden h-[60px] sm:h-[72px] flex items-center justify-center w-full z-10 [perspective:400px]">
      {/* Old digit rolling out bottom */}
      {animating && (
        <span 
          className="absolute font-display text-5xl sm:text-6xl text-ivory tracking-wider animate-roll-out"
          style={{ textShadow: "0 0 15px rgba(250,246,239,0.3)" }}
        >
          {prevStr}
        </span>
      )}
      {/* New digit rolling in from top */}
      <span 
        className={`font-display text-5xl sm:text-6xl tracking-wider select-none transition-all duration-700 ${
          animating 
            ? "animate-roll-in text-premium-gold drop-shadow-[0_0_20px_rgba(232,192,122,0.8)]" 
            : "text-ivory drop-shadow-[0_0_12px_rgba(250,246,239,0.35)]"
        }`}
      >
        {currentStr}
      </span>
    </div>
  );
}
