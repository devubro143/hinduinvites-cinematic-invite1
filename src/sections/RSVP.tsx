import { useState, useEffect } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Heart } from "lucide-react";
import type { RSVPConfig } from "@/config/rsvp";

const buttonLoadingPhrases = [
  "Sending Blessings...",
  "Reserving Your Presence...",
  "Preparing Celebration..."
];

export function RSVP() {
  const [config, setConfig] = useState<RSVPConfig | null>(null);
  const [submissionStep, setSubmissionStep] = useState<"idle" | "submitting" | "confirmed" | "error">("idle");
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [isMessageManuallyEdited, setIsMessageManuallyEdited] = useState(false);
  const [textareaGlow, setTextareaGlow] = useState(false);

  // Initialize bridal names and default blessing templates dynamically
  const brideName = wedding.bride?.name || "Bride";
  const groomName = wedding.groom?.name || "Groom";
  const defaultBlessing = `Congratulations ${brideName} & ${groomName} ✨\nWishing you both a lifetime filled with love, happiness, and togetherness.`;

  const [form, setForm] = useState({
    attendance: "attending" as "attending" | "declining",
    name: "",
    phone: "",
    category: "Friends",
    count: 1,
    attendingAllEvents: true,
    selectedEvents: [] as string[],
    message: defaultBlessing,
  });
  
  // Dynamic particle states
  const [particles, setParticles] = useState<{ id: number; left: string; size: string; delay: string; duration: string; driftX: string }[]>([]);
  const [burstParticles, setBurstParticles] = useState<{ id: number; driftX: string; driftY: string; delay: string; duration: string }[]>([]);
  const [btnParticles, setBtnParticles] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  // Dynamically load the RSVP configuration
  useEffect(() => {
    import("@/config/rsvp")
      .then((m) => {
        const loadedConfig = m.default || m;
        setConfig(loadedConfig);
        
        // Populate events from config or wedding settings
        const allEventIds = wedding.events.map((e: any) => e.id);
        
        // Apply configured default guest count if available
        const limit = loadedConfig.guestLimit;
        setForm((prev) => ({ 
          ...prev, 
          count: limit?.default || 1,
          selectedEvents: allEventIds
        }));
      })
      .catch((err) => {
        console.error("Failed to dynamically load RSVP configuration:", err);
      });
  }, []);

  // Prefill and dynamically personalize blessing signature
  useEffect(() => {
    if (!isMessageManuallyEdited) {
      const signature = form.name.trim() ? `\n\n— ${form.name.trim()}` : "";
      setForm((prev) => ({
        ...prev,
        message: `${defaultBlessing}${signature}`,
      }));
    }
  }, [form.name, isMessageManuallyEdited, defaultBlessing]);

  // Flash border gold glow pulse when auto-personalization signature updates
  useEffect(() => {
    if (form.name.trim() && !isMessageManuallyEdited) {
      setTextareaGlow(true);
      const timer = setTimeout(() => setTextareaGlow(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [form.name, isMessageManuallyEdited]);

  // Cycle through dynamic emotional button loading phrases sequentially
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (submissionStep === "submitting") {
      interval = setInterval(() => {
        setLoadingIndex((prev) => (prev + 1) % buttonLoadingPhrases.length);
      }, 1000);
    } else {
      setLoadingIndex(0);
    }
    return () => clearInterval(interval);
  }, [submissionStep]);

  // Generate background gold drifting particles upon submitting
  useEffect(() => {
    if (submissionStep === "submitting" || submissionStep === "confirmed") {
      const newParticles = Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 5 + 3}px`,
        delay: `${Math.random() * 4}s`,
        duration: `${Math.random() * 6 + 5}s`,
        driftX: `${(Math.random() - 0.5) * 120}px`,
      }));
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [submissionStep]);

  // Generate gold micro-particles rising inside the button itself
  useEffect(() => {
    if (submissionStep === "submitting") {
      const list = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${15 + Math.random() * 70}%`,
        size: `${Math.random() * 3 + 1.5}px`,
        delay: `${Math.random() * 1.5}s`,
        duration: `${Math.random() * 1.2 + 0.8}s`,
      }));
      setBtnParticles(list);
    } else {
      setBtnParticles([]);
    }
  }, [submissionStep]);

  // Generate subtle golden sparkle burst upon successful confirmation
  useEffect(() => {
    if (submissionStep === "confirmed") {
      const burst = Array.from({ length: 32 }).map((_, i) => {
        const angle = (i / 32) * 2 * Math.PI + (Math.random() - 0.5) * 0.15;
        const velocity = Math.random() * 150 + 70;
        const driftX = `${Math.cos(angle) * velocity}px`;
        const driftY = `${Math.sin(angle) * velocity + 50}px`;
        return {
          id: i,
          driftX,
          driftY,
          delay: `${Math.random() * 0.18}s`,
          duration: `${Math.random() * 1.6 + 1.2}s`,
        };
      });
      setBurstParticles(burst);
    } else {
      setBurstParticles([]);
    }
  }, [submissionStep]);

  // Determine if the RSVP engine is enabled
  const isEnabled = config ? config.enabled : wedding.rsvp.enabled;
  if (!isEnabled) return null;

  // Toggle single event chip selections
  const handleEventChipToggle = (eventId: string) => {
    if (form.attendingAllEvents) {
      setForm((prev) => ({
        ...prev,
        attendingAllEvents: false,
        selectedEvents: [eventId],
      }));
    } else {
      setForm((prev) => {
        const isSelected = prev.selectedEvents.includes(eventId);
        let nextSelected: string[] = [];
        if (isSelected) {
          nextSelected = prev.selectedEvents.filter((id: string) => id !== eventId);
        } else {
          nextSelected = [...prev.selectedEvents, eventId];
        }
        
        const allEventIds = wedding.events.map((e: any) => e.id);
        const allSelected = allEventIds.every((id: string) => nextSelected.includes(id));

        return {
          ...prev,
          selectedEvents: nextSelected,
          attendingAllEvents: allSelected,
        };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config || submissionStep !== "idle") return;

    setSubmissionStep("submitting");
    setError(null);

    const isAttending = form.attendance === "attending";
    const selectedEventTitles = wedding.events
      .filter((ev: any) => form.selectedEvents.includes(ev.id))
      .map((ev: any) => ev.title);

    // Build highly detailed structured composite message matching existing sheets column structure
    const compositeMessage = [
      `[Status: ${isAttending ? "✨ Joyfully Attending" : "🌙 Regretfully Declining"}]`,
      `Phone: ${form.phone}`,
      `Category: ${form.category}`,
      isAttending ? `Events: ${selectedEventTitles.length ? selectedEventTitles.join(", ") : "None Selected"}` : null,
      "",
      "Blessing Message:",
      form.message || "None"
    ]
      .filter(Boolean)
      .join("\n");

    const payload = {
      guestName: form.name,
      guestsCount: isAttending ? form.count : 0,
      message: compositeMessage,
      timestamp: new Date().toISOString(),
      coupleId: wedding.coupleId || "default",
    };

    try {
      const isPlaceholder = config.appsScriptUrl.includes("RsvpPlaceholder");

      // 1. Submit JSON in text/plain format with mode: 'no-cors' to prevent Google Apps Script CORS preflight blocks
      if (config.appsScriptUrl && !isPlaceholder) {
        await fetch(config.appsScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify({
            guestName: payload.guestName,
            guestsCount: payload.guestsCount,
            message: payload.message,
          }),
        });
      }

      // 2. Submit to Telegram channel if enabled
      if (config.telegram?.enabled && config.telegram.botToken && config.telegram.chatId) {
        let msgText = config.telegram.customMessageTemplate || 
          "✨ *New RSVP Received* ✨\n\n👤 *Name:* {name}\n👥 *Guests:* {count}\n💌 *Message:* {message}";
        
        msgText = msgText
          .replace("{name}", payload.guestName)
          .replace("{count}", String(payload.guestsCount))
          .replace("{message}", payload.message);

        const tgUrl = `https://api.telegram.org/bot${config.telegram.botToken}/sendMessage`;
        await fetch(tgUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: config.telegram.chatId,
            text: msgText,
            parse_mode: "Markdown",
          }),
        });
      }

      // 3. Trigger analytics events if enabled
      if (config.analytics?.enabled && typeof window !== "undefined") {
        const eventName = config.analytics.eventName || "RSVP_Submission";
        if ((window as any).gtag) {
          (window as any).gtag("event", eventName, {
            guest_name: payload.guestName,
            guest_count: payload.guestsCount,
          });
        }
        const customEvent = new CustomEvent(eventName, { detail: payload });
        window.dispatchEvent(customEvent);
      }

      // Ensure emotional anticipation loading animation breathes deeply
      await new Promise((resolve) => setTimeout(resolve, 3200));

      // Reset form states cleanly
      setIsMessageManuallyEdited(false);
      setTextareaGlow(false);
      setForm({
        attendance: "attending",
        name: "",
        phone: "",
        category: "Friends",
        count: config?.guestLimit?.default ?? 1,
        attendingAllEvents: true,
        selectedEvents: wedding.events.map((ev: any) => ev.id),
        message: defaultBlessing,
      });

      setSubmissionStep("confirmed");
    } catch (err: any) {
      console.error("RSVP Submission failed:", err);
      setError(config?.errorMessage || "Unable to send blessings right now.");
      setSubmissionStep("error");
    }
  };

  // Configure dynamic labels and fallback text
  const labels = {
    eyebrow: config?.labels?.eyebrow ?? "RSVP",
    title: config?.labels?.title ?? "Will you join us?",
    nameLabel: config?.labels?.nameLabel ?? "Your Name",
    namePlaceholder: config?.labels?.namePlaceholder ?? "Enter your full name",
    guestsLabel: config?.labels?.guestsLabel ?? "Number of Guests",
    messageLabel: config?.labels?.messageLabel ?? "A Blessing or Message",
    messagePlaceholder: config?.labels?.messagePlaceholder ?? "Share your wishes for our new beginning...",
  };

  const deadlineText = config?.labels?.deadlineMessage
    ? config.labels.deadlineMessage.replace("{deadline}", wedding.rsvp.deadline || "1 February 2026")
    : `Kindly respond by ${wedding.rsvp.deadline || "1 February 2026"}.`;
  
  const finalSubtitle = config?.labels?.subtitle
    ? `${config.labels.subtitle} ${deadlineText}`
    : `${wedding.rsvp.message || "Your presence is our greatest blessing."} ${deadlineText}`;

  const minGuests = config?.guestLimit?.min ?? 1;
  const maxGuests = config?.guestLimit?.max ?? 20;

  return (
    <section id="rsvp" className="relative px-6 py-24 sm:py-32 overflow-hidden bg-[#08030a]">
      {/* Dynamic inline styles for golden cinematic elements */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes luxury-drift {
          0% {
            transform: translateY(120px) translateX(0) scale(0.5);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-580px) translateX(var(--drift-x, 40px)) scale(1.4);
            opacity: 0;
          }
        }
        @keyframes luxury-burst {
          0% {
            transform: translate(-50%, -50%) scale(0.1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--drift-x, 0px)), calc(-50% + var(--drift-y, 0px))) scale(1.5);
            opacity: 0;
          }
        }
        @keyframes gold-pulse-slow {
          0%, 100% {
            box-shadow: 0 0 25px rgba(232, 192, 122, 0.15), inset 0 0 15px rgba(232, 192, 122, 0.08);
            border-color: rgba(232, 192, 122, 0.25);
            filter: brightness(1);
          }
          50% {
            box-shadow: 0 0 45px rgba(232, 192, 122, 0.45), inset 0 0 25px rgba(232, 192, 122, 0.25);
            border-color: rgba(232, 192, 122, 0.55);
            filter: brightness(1.15);
          }
        }
        @keyframes luxury-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .luxury-shimmer-text {
          background: linear-gradient(90deg, #faf6ef 0%, #e8c07a 25%, #faf6ef 50%, #e8c07a 75%, #faf6ef 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: luxury-shimmer 6s linear infinite;
        }
        .luxury-gold-glow {
          filter: drop-shadow(0 0 15px rgba(232, 192, 122, 0.4));
        }
        .cinematic-reveal-slow {
          animation: reveal-up-slow 2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes reveal-up-slow {
          from { opacity: 0; transform: translateY(30px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        
        /* Submit Button Loading Animation keyframes */
        @keyframes btn-particle-drift {
          0% { transform: translateY(22px); opacity: 0; }
          20% { opacity: 0.85; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-38px); opacity: 0; }
        }
        @keyframes button-sweep {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes fade-in-text {
          0% { opacity: 0; transform: translateY(3px); filter: blur(0.5px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes button-pulse-gold {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(232, 192, 122, 0.15);
            border-color: rgba(232, 192, 122, 0.25);
          }
          50% {
            box-shadow: 0 6px 30px rgba(232, 192, 122, 0.45);
            border-color: rgba(232, 192, 122, 0.55);
          }
        }
        .animate-fade-in-text {
          animation: fade-in-text 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .button-pulse-active {
          animation: button-pulse-gold 1.8s ease-in-out infinite;
        }
        @keyframes textarea-glow-pulse {
          0% {
            box-shadow: 0 0 5px rgba(232, 192, 122, 0.05);
            border-color: rgba(232, 192, 122, 0.2);
          }
          50% {
            box-shadow: 0 0 18px rgba(232, 192, 122, 0.35);
            border-color: rgba(232, 192, 122, 0.55);
          }
          100% {
            box-shadow: 0 0 5px rgba(232, 192, 122, 0.05);
            border-color: rgba(232, 192, 122, 0.2);
          }
        }
        .animate-textarea-glow {
          animation: textarea-glow-pulse 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        @keyframes active-celebration-pulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(232, 192, 122, 0.15), border-color: rgba(232, 192, 122, 0.25);
          }
          50% {
            box-shadow: 0 0 30px rgba(232, 192, 122, 0.45), border-color: rgba(232, 192, 122, 0.65);
          }
        }
        .animate-celebration-pulse {
          animation: active-celebration-pulse 2.2s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-gold-burst, .luxury-shimmer-text, .cinematic-reveal-slow, span[style*="animation"] {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
          .animate-celebration-pulse {
            animation: none !important;
          }
        }
      `}} />

      {/* Luxury Closing Farewell Background Atmosphere (Cream -> Rose Gold -> Maroon Edge) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08030a] via-black to-[#050106] pointer-events-none z-0" />
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen transition-all duration-[3000ms] ease-out"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(232, 192, 122, 0.24) 0%, rgba(138, 3, 20, 0.48) 60%, transparent 100%)",
          transform: (submissionStep === "submitting" || submissionStep === "confirmed") ? "scale(1.4)" : "scale(1.0)",
          opacity: (submissionStep === "submitting" || submissionStep === "confirmed") ? 0.85 : 0.3,
          filter: "blur(130px)",
        }}
      />
      {/* Intimate ambient rose-gold circles floating in the corner */}
      <div className="absolute left-1/4 top-1/3 z-0 pointer-events-none opacity-15 blur-[100px] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-amber-200 to-rose-400" />
      <div className="absolute right-1/4 bottom-1/4 z-0 pointer-events-none opacity-10 blur-[120px] h-[350px] w-[350px] rounded-full bg-gradient-to-r from-rose-500 to-maroon-deep" />

      {/* Hardware Accelerated Gold Particles drifting upward (active during submission & success) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute bottom-0 rounded-full bg-gradient-to-b from-marigold to-amber-300 pointer-events-none z-10"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `luxury-drift ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
              opacity: 0,
              filter: "blur(0.5px) drop-shadow(0 0 4px rgba(232, 192, 122, 0.65))",
              "--drift-x": p.driftX,
            } as any}
          />
        ))}
      </div>

      <div className="relative z-10">
        <SectionTitle
          eyebrow={labels.eyebrow}
          title={labels.title}
          subtitle={finalSubtitle}
        />

        <div 
          className="mx-auto mt-12 max-w-xl rounded-3xl border bg-gradient-to-b from-maroon-deep/20 to-black/65 p-6 shadow-elegant sm:p-10 backdrop-blur-md transition-all duration-1000 ease-out hover:border-marigold/35 relative overflow-hidden"
          style={{
            borderColor: (submissionStep === "submitting" || submissionStep === "confirmed") ? "rgba(232, 192, 122, 0.45)" : (submissionStep === "error") ? "rgba(239, 68, 68, 0.35)" : "rgba(232, 192, 122, 0.2)",
            boxShadow: (submissionStep === "submitting" || submissionStep === "confirmed") ? "0 25px 60px rgba(92, 32, 24, 0.45), 0 0 35px rgba(232, 192, 122, 0.2)" : (submissionStep === "error") ? "0 20px 50px rgba(239, 68, 68, 0.15)" : "var(--shadow-elegant)",
          }}
        >
          {submissionStep === "confirmed" ? (
            <div className="text-center py-8 space-y-6 cinematic-reveal-slow relative z-10">
              
              {/* Gold Confetti/Sparkle Burst Particles (Fires from the heart) */}
              <div className="absolute left-1/2 top-[40px] pointer-events-none z-0">
                {burstParticles.map((bp) => (
                  <span
                    key={bp.id}
                    className="absolute rounded-full bg-gradient-to-b from-marigold to-amber-200"
                    style={{
                      width: `${Math.random() * 5 + 3}px`,
                      height: `${Math.random() * 5 + 3}px`,
                      left: 0,
                      top: 0,
                      animation: `luxury-burst ${bp.duration} cubic-bezier(0.16, 1, 0.3, 1) both`,
                      animationDelay: bp.delay,
                      filter: "blur(0.3px) drop-shadow(0 0 3px rgba(232, 192, 122, 0.75))",
                      "--drift-x": bp.driftX,
                      "--drift-y": bp.driftY,
                    } as any}
                  />
                ))}
              </div>

              {/* Envelope Seal Animation Container */}
              <div 
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-marigold/30 bg-maroon-deep/40 text-marigold luxury-gold-glow mb-2 relative z-10"
                style={{
                  animation: "gold-pulse-slow 4s ease-in-out infinite"
                }}
              >
                <Heart className="h-9 w-9 text-marigold fill-marigold animate-pulse" />
              </div>
              
              <h3 className="font-display text-2xl leading-relaxed text-slate-100 luxury-shimmer-text px-2">
                Your blessings have gracefully reached the family ✨
              </h3>
              
              <p className="text-sm sm:text-base text-ivory/90 leading-relaxed max-w-sm mx-auto font-body italic tracking-wide px-4">
                "We look forward to celebrating with you."
              </p>
              
              <div className="divider-ornament opacity-40 max-w-[150px] mx-auto mt-4" />
            </div>
          ) : submissionStep === "error" ? (
            <div className="text-center py-8 space-y-6 cinematic-reveal-slow relative z-10 animate-reveal">
              <div 
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-500/25 bg-red-950/20 text-red-400 mb-2 relative z-10"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(239, 68, 68, 0.25))"
                }}
              >
                <Heart className="h-9 w-9 text-red-400/80 fill-red-950/40" />
              </div>
              
              <h3 className="font-display text-2xl leading-relaxed text-slate-100 px-2">
                Unable to send blessings right now
              </h3>
              
              <p className="text-sm text-ivory/80 leading-relaxed max-w-sm mx-auto font-body italic tracking-wide px-4">
                We encountered a brief network hiccup. Please try sending your blessings again.
              </p>

              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setSubmissionStep("idle");
                }}
                className="mx-auto block px-8 py-3.5 rounded-full border border-marigold/30 text-xs uppercase tracking-[0.25em] text-marigold bg-maroon-deep/30 hover:bg-maroon-deep/50 hover:border-marigold hover:shadow-[0_0_20px_rgba(232,192,122,0.2)] transition-all duration-300 active:scale-95 font-semibold"
              >
                Retry Sending
              </button>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="space-y-6 transition-all duration-1000 ease-out"
              style={{
                opacity: submissionStep === "submitting" ? 0.35 : 1,
                pointerEvents: submissionStep === "submitting" ? "none" : "auto",
                filter: submissionStep === "submitting" ? "blur(1px)" : "none",
              }}
            >
              {/* SECTION 1 — ATTENDANCE CONFIRMATION (Segmented Controls) */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-black/45 rounded-xl border border-marigold/10 relative overflow-hidden">
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, attendance: "attending" }))}
                  className={`rounded-lg py-3 px-4 text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 flex flex-col items-center justify-center gap-1 active:scale-95 ${
                    form.attendance === "attending"
                      ? "bg-gradient-to-r from-maroon-deep to-accent/90 border border-marigold/40 text-ivory shadow-[0_0_15px_rgba(232,192,122,0.2)] font-semibold"
                      : "bg-transparent border border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="text-xs">✨</span>
                  <span>Joyfully Attending</span>
                </button>
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, attendance: "declining" }))}
                  className={`rounded-lg py-3 px-4 text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 flex flex-col items-center justify-center gap-1 active:scale-95 ${
                    form.attendance === "declining"
                      ? "bg-gradient-to-r from-[#200508] to-[#0c010d] border border-red-500/30 text-slate-200 shadow-[0_0_15px_rgba(239,68,68,0.1)] font-semibold"
                      : "bg-transparent border border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <span className="text-xs">🌙</span>
                  <span>Regretfully Declining</span>
                </button>
              </div>

              {/* SECTION 2 — GUEST DETAILS */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={labels.nameLabel}>
                    <input
                      required
                      type="text"
                      placeholder={labels.namePlaceholder}
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-lg border border-marigold/20 bg-[#0c040d]/70 px-4 py-3 text-slate-100 placeholder-white/20 outline-none ring-marigold/20 focus:border-marigold focus:ring-2 transition-all duration-300"
                    />
                  </Field>

                  <Field label="Phone Number">
                    <input
                      required
                      type="tel"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      placeholder="Enter mobile number"
                      value={form.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setForm((prev) => ({ ...prev, phone: val }));
                      }}
                      className="w-full rounded-lg border border-marigold/20 bg-[#0c040d]/70 px-4 py-3 text-slate-100 placeholder-white/20 outline-none ring-marigold/20 focus:border-marigold focus:ring-2 transition-all duration-300"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Guest Category">
                    <div className="relative">
                      <select
                        value={form.category}
                        onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                        className="w-full appearance-none rounded-lg border border-marigold/20 bg-[#0c040d]/70 px-4 py-3 text-slate-100 placeholder-white/20 outline-none ring-marigold/20 focus:border-marigold focus:ring-2 transition-all duration-300 pr-10"
                      >
                        <option value="Bride Side Family" className="bg-[#0c040d] text-slate-100">Bride Side Family</option>
                        <option value="Groom Side Family" className="bg-[#0c040d] text-slate-100">Groom Side Family</option>
                        <option value="Friends" className="bg-[#0c040d] text-slate-100">Friends</option>
                        <option value="Neighbours" className="bg-[#0c040d] text-slate-100">Neighbours</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-marigold">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </Field>

                  {form.attendance === "attending" && (
                    <Field label={labels.guestsLabel}>
                      <input
                        required
                        type="number"
                        min={minGuests}
                        max={maxGuests}
                        value={form.count}
                        onChange={(e) => setForm((prev) => ({ ...prev, count: +e.target.value }))}
                        className="w-full rounded-lg border border-marigold/20 bg-[#0c040d]/70 px-4 py-3 text-slate-100 outline-none ring-marigold/20 focus:border-marigold focus:ring-2 transition-all duration-300"
                      />
                    </Field>
                  )}
                </div>
              </div>

              {/* SECTION 3 — EVENT ATTENDANCE (Expandable conditional on joyfully attending) */}
              {form.attendance === "attending" && (
                <div className="space-y-4 pt-2 transition-all duration-500 ease-in-out">
                  <label className="block text-left">
                    <span className="block text-[10px] uppercase tracking-[0.25em] text-marigold/95 font-semibold mb-2">
                      Event Attendance
                    </span>
                    
                    {/* Attending All Toggle Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => {
                          const nextAttendingAll = !prev.attendingAllEvents;
                          return {
                            ...prev,
                            attendingAllEvents: nextAttendingAll,
                            selectedEvents: nextAttendingAll ? wedding.events.map((ev: any) => ev.id) : [],
                          };
                        });
                      }}
                      className={`w-full rounded-xl border py-3 px-5 text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-500 flex items-center justify-between overflow-hidden relative group active:scale-[0.98] ${
                        form.attendingAllEvents
                          ? "bg-gradient-to-r from-maroon-deep via-accent to-maroon-deep border-marigold text-ivory shadow-[0_0_22px_rgba(232,192,122,0.3)] font-bold animate-celebration-pulse"
                          : "bg-[#0c040d]/60 border-marigold/20 text-slate-300 hover:border-marigold/50 hover:bg-black/50"
                      }`}
                    >
                      {form.attendingAllEvents && (
                        <>
                          <div className="absolute inset-0 bg-marigold/[0.04] pointer-events-none" />
                          <div 
                            className="absolute top-0 left-0 w-[50%] h-full pointer-events-none"
                            style={{
                              background: "linear-gradient(90deg, transparent, rgba(250, 246, 239, 0.25), transparent)",
                              animation: "button-sweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                            }}
                          />
                        </>
                      )}
                      
                      <span className="relative z-10 flex items-center gap-1.5">
                        <span>✨</span>
                        <span>Attending All Celebrations</span>
                      </span>
                      <span className="text-[10px] tracking-widest opacity-80 relative z-10 bg-black/40 px-2 py-0.5 rounded-md border border-marigold/10">
                        {form.attendingAllEvents ? "ROYAL ACCEPTED" : "SELECT DAYS"}
                      </span>
                    </button>
                  </label>

                  {/* 2-column event responsive cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {wedding.events.map((e: any, idx: number) => {
                      const isSelected = form.selectedEvents.includes(e.id);
                      return (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => handleEventChipToggle(e.id)}
                          className={`relative rounded-xl py-3.5 px-4 text-[9px] sm:text-[10px] uppercase tracking-widest border transition-all duration-500 overflow-hidden active:scale-[0.97] backdrop-blur-md group ${
                            isSelected
                              ? "bg-gradient-to-br from-maroon-deep via-[#580c1f] to-accent/95 border-marigold text-ivory shadow-[0_6px_20px_rgba(232,192,122,0.22),inset_0_0_12px_rgba(232,192,122,0.2)] font-bold scale-[1.02] z-10"
                              : "bg-gradient-to-br from-[#120305]/80 to-[#22070a]/90 border-marigold/15 text-slate-400 hover:border-marigold/45 hover:text-slate-200 hover:scale-[1.01]"
                          }`}
                        >
                          {/* Ambient radial glow behind selected chip */}
                          {isSelected && (
                            <div 
                              className="absolute inset-0 opacity-30 pointer-events-none rounded-xl"
                              style={{
                                background: "radial-gradient(circle at center, rgba(232, 192, 122, 0.4) 0%, transparent 75%)"
                              }}
                            />
                          )}

                          {/* Hover spotlight micro interaction overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-transparent via-marigold/30 to-transparent" />

                          {/* Dynamic golden floating ping sparkle pin */}
                          {isSelected && (
                            <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5 pointer-events-none">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-marigold opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-300"></span>
                            </span>
                          )}

                          <span className="relative z-10 flex items-center justify-center gap-1.5">
                            <span>{e.icon}</span>
                            <span>{e.title}</span>
                          </span>

                          {/* Continuous or sequential sweep travel shimmer */}
                          {isSelected && (
                            <div 
                              className="absolute top-0 left-0 w-[50%] h-full pointer-events-none"
                              style={{
                                background: "linear-gradient(90deg, transparent, rgba(250, 246, 239, 0.2), transparent)",
                                animation: "button-sweep 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                                animationDelay: `${idx * 180}ms`
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 4 — BLESSINGS */}
              <Field label={labels.messageLabel}>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setIsMessageManuallyEdited(true);
                    setForm((prev) => ({ ...prev, message: e.target.value }));
                  }}
                  placeholder={labels.messagePlaceholder}
                  className={`w-full rounded-lg border bg-[#0c040d]/70 px-4 py-3 text-slate-100 placeholder-white/25 outline-none ring-marigold/20 focus:border-marigold focus:ring-2 transition-all duration-300 text-sm sm:text-base leading-relaxed ${
                    textareaGlow ? "border-marigold animate-textarea-glow" : "border-marigold/20"
                  }`}
                />
              </Field>

              {error && (
                <div className="text-center p-3 rounded-lg border border-red-500/30 bg-red-950/20 text-red-200/90 text-xs font-sans tracking-wide animate-reveal">
                  {error}
                </div>
              )}

              {/* SECTION 5 — FINAL SUBMIT EXPERIENCE */}
              <button
                type="submit"
                disabled={submissionStep !== "idle"}
                className={`w-full rounded-full px-8 py-4 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-ivory border shadow-soft font-semibold transition-all duration-1000 relative overflow-hidden active:scale-95 ${
                  submissionStep === "submitting"
                    ? "max-w-[85%] mx-auto bg-gradient-to-r from-[#200508] to-[#0c010d] border-marigold/45 shadow-[0_0_25px_rgba(232,192,122,0.35)] cursor-not-allowed button-pulse-active"
                    : "bg-gradient-to-r from-maroon-deep via-accent to-maroon-deep border-marigold/30 hover:scale-[1.01] hover:border-marigold hover:shadow-[0_0_20px_rgba(232,192,122,0.25)]"
                }`}
              >
                {/* Gold micro-particles drifting up inside the button itself */}
                {submissionStep === "submitting" && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {btnParticles.map((bp) => (
                      <span
                        key={bp.id}
                        className="absolute rounded-full bg-gradient-to-b from-marigold to-amber-200"
                        style={{
                          left: bp.left,
                          width: bp.size,
                          height: bp.size,
                          bottom: "0px",
                          animation: `btn-particle-drift ${bp.duration} ease-in-out infinite`,
                          animationDelay: bp.delay,
                          opacity: 0,
                          filter: "blur(0.3px) drop-shadow(0 0 2px rgba(232, 192, 122, 0.6))",
                        }}
                      />
                    ))}
                    {/* Linear sweep shimmer effect */}
                    <div 
                      className="absolute top-0 left-0 w-[50%] h-full pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(232, 192, 122, 0.22), transparent)",
                        animation: "button-sweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                      }}
                    />
                  </div>
                )}

                <span className="relative z-10">
                  {submissionStep === "submitting" ? (
                    <span key={loadingIndex} className="animate-fade-in-text tracking-[0.25em] text-[10px] text-marigold font-medium block">
                      {buttonLoadingPhrases[loadingIndex]}
                    </span>
                  ) : (
                    form.attendance === "attending" ? "Confirm Royal Attendance ✨" : "Send Your Blessings"
                  )}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-marigold/95 font-semibold">
        {label}
      </span>
      {children}
    </label>
  );
}
