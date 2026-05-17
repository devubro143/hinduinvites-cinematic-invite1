import { memo, useState, useEffect, useRef } from "react";
import { wedding } from "@/config/wedding";
import { Lock, Sparkles, FolderPlus, ShieldCheck, ArrowRight } from "lucide-react";

export const MemoryVault = memo(function MemoryVault() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Generate unique randomized golden particles
  const [particles] = useState(() =>
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 80 + 10}%`,
      size: `${Math.random() * 4 + 2}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 14 + 10}s`,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Safe fallback for background blurred image from gallery
  const bgImage = wedding.gallery && wedding.gallery.length > 0 
    ? wedding.gallery[0] 
    : wedding.heroImage;

  // Staggered reveal CSS helper
  const revealClass = (delayClass: string) => `
    transform transition-all duration-[1200ms] ${delayClass} cubic-bezier(0.16, 1, 0.3, 1)
    ${isVisible ? "opacity-100 translate-y-0 filter blur-0" : "opacity-0 translate-y-12 filter blur-[4px]"}
  `;

  // Gallery URL configured in wedding or falling back to a safe placeholder
  const galleryUrl = (wedding as any).galleryUrl || "https://photos.google.com";

  return (
    <section 
      ref={sectionRef}
      id="memory-vault" 
      className="relative px-6 py-20 sm:py-36 overflow-hidden bg-[#08030a]"
    >
      {/* 1. Cinematic Background Blurred Image */}
      {bgImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center scale-110 opacity-10 blur-3xl transition-opacity duration-1000 pointer-events-none"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* 2. Soft Ambient Vignette & Moving Gradients */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-ember"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--maroon-deep) 0%, transparent 65%)"
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#08030a] via-transparent to-[#08030a] pointer-events-none" />
      <div className="absolute inset-0 z-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.95)] pointer-events-none" />

      {/* 3. Floating Golden Dust Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Lock Icon Badge */}
        <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-marigold/20 bg-black/60 text-marigold shadow-[0_0_15px_rgba(232,192,122,0.15)] ${revealClass("delay-[100ms]")}`}>
          <Lock className="h-5 w-5 animate-pulse" />
        </div>

        {/* SMALL LABEL */}
        <p 
          className={`text-[10px] sm:text-xs uppercase tracking-[0.6em] text-marigold font-semibold select-none drop-shadow-[0_0_8px_rgba(232,192,122,0.35)] ${revealClass("delay-[200ms]")}`}
        >
          Private Collection
        </p>

        {/* MAIN HEADING */}
        <h2 
          className={`text-3xl sm:text-5xl md:text-6xl font-medium mt-4 tracking-wide select-none ${revealClass("delay-[400ms]")}`}
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            background: "linear-gradient(135deg, #f6e6c2 0%, #e8c07a 40%, #c59f5b 75%, #f6e6c2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6))"
          }}
        >
          Explore The Wedding Gallery →
        </h2>

        {/* DESCRIPTION TEXT */}
        <p 
          className={`text-sm sm:text-lg text-ivory/80 max-w-lg mx-auto leading-relaxed mt-5 italic font-light ${revealClass("delay-[600ms]")}`}
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          “Celebrate, preserve, and share your favorite moments from the festivities.”
        </p>

        {/* UPLOAD INSTRUCTION CONTAINER (Premium Glassmorphic Box) */}
        <div 
          className={`w-full max-w-xl mx-auto mt-10 p-6 sm:p-8 rounded-2xl border border-marigold/10 bg-gradient-to-b from-[#1b0a13]/50 to-[#0b0409]/75 backdrop-blur-md shadow-elegant flex flex-col gap-5 ${revealClass("delay-[800ms]")}`}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-marigold/20 bg-maroon-deep/30 text-marigold shrink-0">
              <FolderPlus className="h-4.5 w-4.5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs uppercase tracking-widest text-marigold font-semibold mb-1">Upload Guide</h4>
              <p className="text-sm text-ivory/70 font-light leading-relaxed">
                Create a folder with your name before uploading photos or videos.
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-marigold/15 to-transparent" />

          <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-marigold/20 bg-maroon-deep/30 text-marigold shrink-0">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs uppercase tracking-widest text-marigold font-semibold mb-1">Preservation Policy</h4>
              <p className="text-sm text-ivory/70 font-light leading-relaxed">
                Please help us preserve everyone’s memories by avoiding modification or deletion of existing media.
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON EXPERIENCE */}
        <div className={`mt-10 ${revealClass("delay-[1000ms]")}`}>
          <a
            href={galleryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block relative group"
          >
            {/* Ambient gold glow pulse behind button */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-marigold via-gold to-marigold rounded-full blur-md opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-500 animate-pulse" />

            <div className="relative inline-flex items-center justify-center px-10 py-4.5 rounded-full overflow-hidden border border-[#e8c07a]/30 bg-gradient-to-b from-[#1b0a13] to-black text-marigold font-serif tracking-[0.2em] uppercase text-xs sm:text-sm font-semibold transition-all duration-500 hover:-translate-y-1 hover:border-marigold hover:text-white active:scale-95 shadow-[0_10px_30px_-10px_rgba(232,192,122,0.3)]">
              {/* Shimmer sweep effect */}
              <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-25deg] transition-all duration-1000 group-hover:left-[150%] pointer-events-none" />
              
              <span className="flex items-center gap-2">
                Enter The Gallery
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </span>
            </div>
          </a>
        </div>

      </div>

      {/* Embedded CSS for custom floating particle mechanics */}
      <style>{`
        @keyframes particle-drift {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--particle-opacity, 0.4);
          }
          90% {
            opacity: var(--particle-opacity, 0.4);
          }
          100% {
            transform: translateY(-20vh) translateX(40px) rotate(360deg);
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          background: radial-gradient(circle, var(--marigold) 0%, transparent 75%);
          border-radius: 50%;
          pointer-events: none;
          animation: particle-drift infinite linear;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
});
