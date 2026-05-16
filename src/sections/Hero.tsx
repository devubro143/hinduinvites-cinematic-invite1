import { memo } from "react";
import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Hero = memo(function Hero() {
  const { theme } = wedding;
  const isReducedMotion = useReducedMotion();
  const baseParticleCount = Math.floor(theme.effects.particleDensity / 2);
  const particleCount = isReducedMotion ? Math.min(baseParticleCount, 5) : baseParticleCount;

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={wedding.heroImage}
          alt="Bride and groom"
          width={1080}
          height={1920}
          loading="eager"
          className="h-full w-full object-cover animate-fade"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" 
          style={{ opacity: theme.effects.overlayDarkness }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* Soft floating embers */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(particleCount)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-accent animate-ember"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${(i % 5) * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-ivory">
        <p className="animate-reveal text-xs uppercase tracking-[0.5em] text-accent" style={{ color: "var(--marigold)" }}>
          {wedding.openingShlokaTranslit}
        </p>
        <p className="animate-reveal delay-1 mt-2 font-display text-2xl sm:text-3xl" style={{ color: "var(--ivory)" }}>
          {wedding.openingShloka}
        </p>

        <div className="divider-ornament my-8 w-full max-w-xs animate-reveal delay-2">
          <span className="text-lg" style={{ color: "var(--marigold)" }}>ॐ</span>
        </div>

        <h1
          className="animate-reveal delay-2 font-display text-6xl leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl text-balance"
          style={{ color: "var(--ivory)" }}
        >
          {wedding.brideName}
          <span className="mx-4 inline-block italic text-accent" style={{ color: "var(--marigold)" }}>
            &
          </span>
          {wedding.groomName}
        </h1>

        <p
          className="animate-reveal delay-3 mt-6 max-w-md text-base sm:text-lg italic"
          style={{ color: "rgba(250,246,239,0.85)" }}
        >
          {wedding.tagline}
        </p>

        <div className="animate-reveal delay-4 mt-10 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: "var(--marigold)" }}>
            Save the Date
          </span>
          <span className="font-display text-2xl sm:text-3xl" style={{ color: "var(--ivory)" }}>
            {wedding.weddingDateDisplay}
          </span>
          <span className="text-sm" style={{ color: "rgba(250,246,239,0.75)" }}>
            {wedding.city}
          </span>
        </div>

        <a
          href="#events"
          className="animate-reveal delay-5 mt-12 inline-flex items-center gap-2 rounded-full border border-accent/60 px-8 py-3 text-sm uppercase tracking-[0.3em] backdrop-blur transition hover:bg-accent hover:text-foreground"
          style={{ color: "var(--ivory)" }}
        >
          Enter the Celebration
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float">
        <div className="h-10 w-px bg-accent/60" />
      </div>
    </section>
  );
});
