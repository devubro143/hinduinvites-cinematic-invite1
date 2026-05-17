import { wedding } from "@/config/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ChevronUp } from "lucide-react";

export function Footer() {
  const isReducedMotion = useReducedMotion();
  
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 2.8, // Elite, smooth, prestigious returning transition
        easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // Gentle luxury easing
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Prefilled luxurious WhatsApp conversion message, properly URL-encoded
  const encodedMessage = encodeURIComponent(
    "Hello HinduInvites,\n\nWe just experienced one of your wedding invitation websites and were genuinely impressed by the cinematic presentation and luxury feel.\n\nWe would love to explore a similar premium digital invitation experience for our wedding.\n\nPlease share more details regarding pricing, customization, and the complete process.\n\nLooking forward to creating something unforgettable together."
  );
  const whatsappUrl = `https://wa.me/919376813483?text=${encodedMessage}`;

  return (
    <footer className="relative min-h-screen overflow-hidden bg-[#050106] px-6 py-24 sm:py-32 flex flex-col justify-between items-center text-ivory select-none">
      
      {/* Cinematic Outro Background Vignette & Ambient Glow */}
      <div 
        className="absolute inset-0 opacity-70 pointer-events-none z-0 mix-blend-screen blur-[120px]"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(92, 32, 24, 0.45) 0%, rgba(12, 4, 13, 0.99) 75%, transparent 100%)"
        }}
      />

      {/* Floating Golden Embers / Star Dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
        {Array.from({ length: isReducedMotion ? 6 : 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-gradient-to-b from-marigold to-amber-200 opacity-25 animate-ember"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              animationDuration: `${12 + (i % 4) * 2.5}s`,
              animationDelay: `${i * 0.4}s`,
              filter: "blur(0.3px) drop-shadow(0 0 4px rgba(232, 192, 122, 0.45))",
            }}
          />
        ))}
      </div>

      {/* 🌌 BACKGROUND EXPERIENCE: Subtle floating abstract invitation previews */}
      {!isReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Card 1: Left Float */}
          <div 
            className="absolute left-[-15%] sm:left-[2%] top-[35%] w-32 sm:w-44 h-48 sm:h-64 rounded-3xl border border-marigold/10 bg-[#160b0e]/25 backdrop-blur-[4px] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.85)] rotate-[-6deg] animate-float opacity-20"
            style={{ animationDuration: "22s", animationDelay: "1s" }}
          >
            <div className="absolute inset-2 rounded-2xl border border-marigold/5 flex flex-col justify-between p-4">
              <div className="w-6 h-6 rounded-full border border-marigold/20 flex items-center justify-center text-[8px] text-marigold/40">ॐ</div>
              <div className="space-y-1">
                <div className="h-1.5 w-12 bg-marigold/15 rounded-full" />
                <div className="h-1.5 w-16 bg-marigold/10 rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 2: Right Float */}
          <div 
            className="absolute right-[-15%] sm:right-[2%] top-[18%] w-32 sm:w-44 h-48 sm:h-64 rounded-3xl border border-marigold/10 bg-[#160b0e]/25 backdrop-blur-[4px] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.85)] rotate-[8deg] animate-float opacity-15"
            style={{ animationDuration: "28s", animationDelay: "3s" }}
          >
            <div className="absolute inset-2 rounded-2xl border border-marigold/5 flex flex-col justify-between p-4">
              <div className="w-6 h-6 rounded-full border border-marigold/20 flex items-center justify-center text-[8px] text-marigold/40">✦</div>
              <div className="space-y-1">
                <div className="h-1.5 w-16 bg-marigold/15 rounded-full" />
                <div className="h-1.5 w-10 bg-marigold/10 rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 3: Bottom Left Float */}
          <div 
            className="absolute left-[15%] bottom-[-5%] w-24 sm:w-36 h-36 sm:h-52 rounded-2xl border border-marigold/5 bg-[#160b0e]/15 backdrop-blur-[6px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)] rotate-[-12deg] animate-float opacity-10"
            style={{ animationDuration: "34s", animationDelay: "5s" }}
          >
            <div className="absolute inset-1.5 rounded-xl border border-marigold/5" />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto max-w-4xl text-center flex flex-col items-center justify-center flex-1 w-full my-auto">
        
        {/* ====================================================
            LAYER 1 — EMOTIONAL CLOSURE
            ==================================================== */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Sacred Outro Icon & Divider */}
          <div className="mb-10 flex flex-col items-center gap-4 opacity-50 select-none">
            <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-marigold/40 to-transparent" />
            <span className="font-display text-xl text-marigold/70 font-semibold">ॐ</span>
            <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-marigold/40 to-transparent" />
          </div>

          {/* Timeless Welcoming */}
          <p className="animate-reveal text-[10px] sm:text-xs uppercase tracking-[0.55em] text-marigold font-bold">
            We look forward to celebrating with you
          </p>

          {/* Shimmering Couple Outro Signature */}
          <h2 className="animate-reveal delay-1 mt-6 font-display text-4xl sm:text-6xl md:text-7xl leading-tight text-royal-gold tracking-wide max-w-2xl mx-auto text-center py-1">
            <span>{wedding.brideName}</span>
            <span className="mx-3.5 inline-block italic font-light text-marigold/70 font-serif text-2xl sm:text-4xl">&amp;</span>
            <span>{wedding.groomName}</span>
          </h2>

          {/* Blessing Statement */}
          <p className="animate-reveal delay-2 mt-5 text-xs sm:text-sm italic text-ivory/80 tracking-wide font-light max-w-sm sm:max-w-md mx-auto leading-relaxed">
            "{wedding.tagline}"
          </p>

          {/* Luxury Save-The-Date Outro Info */}
          <div className="animate-reveal delay-3 mt-8 flex flex-col items-center gap-1.5 opacity-90">
            <span className="text-[8px] uppercase tracking-[0.45em] text-marigold font-bold">
              Wedding Date
            </span>
            <p className="font-display text-xl text-slate-100 tracking-wide">{wedding.weddingDateDisplay}</p>
            <p className="text-[10px] text-ivory/60 tracking-wider font-light">{wedding.city}</p>
          </div>

          {/* Couple's Official Hashtag */}
          <p className="animate-reveal delay-4 mt-12 text-[9px] uppercase tracking-[0.7em] text-marigold/80 font-bold select-none">
            {wedding.hashtag}
          </p>
        </div>

        {/* Elegant spacing and design bridge */}
        <div className="flex items-center justify-center gap-5 my-14 w-full max-w-[200px] opacity-30 select-none">
          <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent to-marigold/30" />
          <span className="text-marigold/60 text-[8px]">✦</span>
          <div className="h-[0.5px] flex-1 bg-gradient-to-l from-transparent to-marigold/30" />
        </div>

        {/* ====================================================
            LAYER 2 — CINEMATIC BRAND REVEAL
            ==================================================== */}
        <div className="flex flex-col items-center justify-center text-center">
          {/* Brand Signature Title (High Fashion style logo) */}
          <div className="animate-reveal delay-5 flex flex-col items-center">
            <span className="font-display text-2xl sm:text-3.5xl tracking-[0.35em] text-royal-gold select-none font-serif opacity-95">
              HINDUINVITES
            </span>
            
            {/* Atelier Positioning Subtitle */}
            <span className="text-[8px] sm:text-[9.5px] uppercase tracking-[0.5em] text-marigold/80 font-bold mt-2.5">
              India’s Luxury Digital Wedding Atelier
            </span>
          </div>

          {/* Luxury Brand Philosophy Statement */}
          <p className="animate-reveal delay-5 mt-4.5 text-[10px] sm:text-xs text-ivory/60 tracking-wide font-light max-w-sm sm:max-w-md mx-auto leading-relaxed italic px-4">
            "Crafting highly immersive, premium digital celebration cards where timeless royal heritage meets modern cinematic storytelling."
          </p>
        </div>

        {/* ====================================================
            LAYER 3 — PREMIUM CONVERSION EXPERIENCE (WhatsApp CTA)
            ==================================================== */}
        <div className="animate-reveal delay-5 flex flex-col items-center w-full">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-shine w-full max-w-[320px] py-4 px-8 mt-8 rounded-full border border-marigold bg-gradient-to-r from-maroon-deep via-maroon to-maroon-deep text-[9.5px] sm:text-[10px] uppercase tracking-[0.25em] font-semibold text-ivory flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(232,192,122,0.15),inset_0_0_12px_rgba(250,246,239,0.05)] hover:shadow-[0_0_50px_rgba(232,192,122,0.45),inset_0_0_20px_rgba(250,246,239,0.15)] hover:border-marigold transition-all duration-500 scale-100 hover:scale-[1.03] active:scale-97 cursor-pointer z-10"
            style={{ color: "var(--ivory)" }}
          >
            <span>Begin Our Celebration</span>
            <span className="text-xs">→</span>
          </a>
        </div>

      </div>

      {/* Sleek Returning Path back to Top of Card */}
      <div className="relative z-10 w-full flex justify-center pb-2 select-none">
        <button
          onClick={scrollToTop}
          className="group animate-reveal delay-5 flex flex-col items-center gap-2.5 transition-all duration-500 hover:opacity-100 opacity-45 cursor-pointer"
        >
          <span className="text-[8px] uppercase tracking-[0.35em] text-ivory/80 group-hover:text-marigold transition-colors duration-300">
            Return to Cover
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-marigold/15 transition-all duration-500 group-hover:border-marigold group-hover:bg-marigold/10 shadow-[0_0_12px_rgba(232,192,122,0.03)] group-hover:shadow-[0_0_20px_rgba(232,192,122,0.15)] group-hover:scale-105 active:scale-95">
            <ChevronUp className="h-3.5 w-3.5 text-marigold/80 group-hover:text-marigold transition-colors" />
          </div>
        </button>
      </div>

    </footer>
  );
}

