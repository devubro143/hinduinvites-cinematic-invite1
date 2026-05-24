import { useRef, useEffect, useState, useCallback } from "react";
import { wedding } from "@/config/wedding";

interface ScratchRevealProps {
  onReveal: () => void;
  width?: number;
  height?: number;
}

// Sparkle particle system (isolated, self-contained)
interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function ScratchReveal({ onReveal, width = 220, height = 220 }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const sparkleCanvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const lastCheckTime = useRef<number>(0); // Added to throttle pixel scanning for buttery-smooth FPS
  const canvasRectRef = useRef<DOMRect | null>(null); // Added to cache bounding box coordinates and eliminate layout thrashing

  const [isRevealed, setIsRevealed] = useState(false);
  const [dateRevealed, setDateRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  // ── New premium interaction states & refs ─────────────────────
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const customCursorRef = useRef<HTMLDivElement>(null);
  const hintElRef = useRef<HTMLDivElement>(null);

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 8;

  // ── Detect mobile/touch devices ────────────────────────────────
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(pointer: coarse)").matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── Draw the ceremonial seal ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    contextRef.current = ctx;

    // Base fill – deep ceremonial maroon
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    bg.addColorStop(0, "#3a1210");
    bg.addColorStop(0.6, "#2a0d0a");
    bg.addColorStop(1, "#1a0608");
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = bg;
    ctx.fill();

    // Textured noise overlay – makes it feel like a real metallic foil
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const noise = (Math.random() - 0.5) * 18;
      d[i] = Math.min(255, Math.max(0, d[i] + noise));
      d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise));
      d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    // Gold double-ring border
    ctx.strokeStyle = "rgba(232,192,122,0.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 6, 0, Math.PI * 2);
    ctx.stroke();

    // Inner ornamental rays
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = "#e8c07a";
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 20, cy + Math.sin(a) * 20);
      ctx.lineTo(cx + Math.cos(a) * (radius - 12), cy + Math.sin(a) * (radius - 12));
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Central OM symbol
    ctx.fillStyle = "rgba(232,192,122,0.35)";
    ctx.font = "32px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ॐ", cx, cy - 8);

    // "Scratch to open invitation" label
    ctx.fillStyle = "rgba(232, 192, 122, 0.85)"; // Highlighted premium gold
    ctx.font = "italic 9.5px 'Playfair Display', serif";
    ctx.fillText("Scratch to open invitation", cx, cy + 22);

    // Set composite for scratching
    ctx.globalCompositeOperation = "destination-out";
  }, [width, height, cx, cy, radius]);

  // ── Sparkle animation loop ────────────────────────────────────
  useEffect(() => {
    const sCanvas = sparkleCanvasRef.current;
    if (!sCanvas) return;

    const dpr = window.devicePixelRatio || 1;
    sCanvas.width = width * dpr;
    sCanvas.height = height * dpr;
    sCanvas.style.width = `${width}px`;
    sCanvas.style.height = `${height}px`;

    const sCtx = sCanvas.getContext("2d");
    if (!sCtx) return;
    sCtx.scale(dpr, dpr);

    const animate = () => {
      sCtx.clearRect(0, 0, width, height);
      const alive: Sparkle[] = [];

      for (const s of sparklesRef.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02; // subtle gravity
        s.life -= 1;

        if (s.life <= 0) continue;

        const alpha = s.life / s.maxLife;
        sCtx.beginPath();
        sCtx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
        sCtx.fillStyle = `rgba(232,192,122,${alpha * 0.9})`;
        sCtx.fill();

        // tiny glow
        sCtx.beginPath();
        sCtx.arc(s.x, s.y, s.size * alpha * 2.5, 0, Math.PI * 2);
        sCtx.fillStyle = `rgba(232,192,122,${alpha * 0.15})`;
        sCtx.fill();

        alive.push(s);
      }

      sparklesRef.current = alive;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height]);

  // ── Spawn sparkles at scratch point ───────────────────────────
  const spawnSparkles = useCallback((x: number, y: number, count = 3) => {
    for (let i = 0; i < count; i++) {
      sparklesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3 - 1,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        size: 1.5 + Math.random() * 1.5,
      });
    }
  }, []);

  // ── Idle Swipe Hint Loop Animation ─────────────────────────────
  useEffect(() => {
    if (hasInteracted || isRevealed) {
      setShowHint(false);
      return;
    }

    let hintAnimationId: number;
    let loopTimeout: NodeJS.Timeout;
    let initialTimeout: NodeJS.Timeout;

    const runHintSequence = () => {
      if (hasInteracted || isRevealed) return;

      setShowHint(true);
      const duration = 2800; // Slowed down from 2200 to 2800 for extremely smooth luxury feel
      const startTime = performance.now();

      const animateHint = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);

        // Path: Wider horizontal sweeping motion across the center of the orb for better discoverability
        const theta = t * Math.PI * 2.5; // 1.25 full sweep cycles
        const x = cx + Math.sin(theta - Math.PI / 2) * 65; // Increased width from 55 to 65
        const y = cy + 12 + Math.cos(theta) * 6; // Subtle natural curve

        // Smoothly position hint pointer element via DOM directly for high performance
        if (hintElRef.current) {
          hintElRef.current.style.left = `${x}px`;
          hintElRef.current.style.top = `${y}px`;

          // Elegant fading in at start, fading out at end
          let opacity = 0;
          if (t < 0.15) {
            opacity = t / 0.15;
          } else if (t > 0.8) {
            opacity = (1 - t) / 0.2;
          } else {
            opacity = 1;
          }
          hintElRef.current.style.opacity = `${opacity * 0.9}`;
        }

        // Spawn dust particles only during active swiping motion
        if (t > 0.1 && t < 0.9 && Math.random() < 0.3) {
          spawnSparkles(x, y, 1);
        }

        if (t < 1 && !hasInteracted && !isRevealed) {
          hintAnimationId = requestAnimationFrame(animateHint);
        } else {
          setShowHint(false);
          // Loop every 7 seconds (2.8s animation + 4.2s idle wait = 7.0s cycle)
          if (!hasInteracted && !isRevealed) {
            loopTimeout = setTimeout(runHintSequence, 4200);
          }
        }
      };

      hintAnimationId = requestAnimationFrame(animateHint);
    };

    // First appearance automatically after 2.5 seconds idle
    initialTimeout = setTimeout(runHintSequence, 2500);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(loopTimeout);
      cancelAnimationFrame(hintAnimationId);
    };
  }, [hasInteracted, isRevealed, cx, cy, spawnSparkles]);

  // ── Spawn soft drifting particles on hover/touch ───────────────
  useEffect(() => {
    const active = isHovered || isDrawing;
    if (!active || isRevealed) return;

    const interval = setInterval(() => {
      // Spawn 1-2 tiny, very slow-drifting sparkles inside the seal
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * radius * 0.85;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      sparklesRef.current.push({
        x: px,
        y: py,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.15 - Math.random() * 0.35, // float upwards very slowly
        life: 45 + Math.random() * 25,
        maxLife: 70,
        size: 0.7 + Math.random() * 0.9,
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isHovered, isDrawing, isRevealed, cx, cy, radius]);

  // ── Measure reveal percentage ─────────────────────────────────
  const checkReveal = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let total = 0;
    let transparent = 0;

    // Downsample the grid scan loop by stepping 8px to reduce CPU load by 64x (Guarantees zero micro-stutter/jank!)
    const step = 8;
    for (let py = 0; py < canvas.height; py += step) {
      for (let px = 0; px < canvas.width; px += step) {
        const dx = px / dpr - cx;
        const dy = py / dpr - cy;
        if (dx * dx + dy * dy > radius * radius) continue;
        total++;
        if (pixels[(py * canvas.width + px) * 4 + 3] === 0) transparent++;
      }
    }

    const pct = total > 0 ? (transparent / total) * 100 : 0;
    setScratchPercent(pct);

    // Phase 1: At 22%+, reveal the wedding date with sparkle burst
    if (pct > 22 && !dateRevealed) {
      setDateRevealed(true);
      // Sparkle burst from center
      for (let i = 0; i < 25; i++) {
        sparklesRef.current.push({
          x: cx,
          y: cy,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6 - 2,
          life: 40 + Math.random() * 30,
          maxLife: 70,
          size: 2 + Math.random() * 2,
        });
      }
    }

    // Phase 2: Open at 30%-70% scratch range (Trigger reveal dynamically at 35% for incredibly smooth cinematic transition!)
    if (pct > 35) {
      setIsRevealed(true);
      onReveal();
    }
  }, [isRevealed, dateRevealed, cx, cy, radius, onReveal]);

  // ── Scratch stroke (realistic brush) ──────────────────────────
  const scratch = useCallback((x: number, y: number) => {
    const ctx = contextRef.current;
    if (!ctx || isRevealed) return;

    // Constrain to circle
    const dx = x - cx;
    const dy = y - cy;
    if (dx * dx + dy * dy > radius * radius) return;

    if (lastPoint.current) {
      // Draw a thick line between previous and current point for smooth strokes
      ctx.lineWidth = 28;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Also stamp a circle at point for coverage
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.fill();

    lastPoint.current = { x, y };
    spawnSparkles(x, y, 2);

    // Throttle checkReveal scan to run at most once every 130ms during drag moves (Guarantees zero-lag performance!)
    const now = performance.now();
    if (now - lastCheckTime.current > 130) {
      checkReveal();
      lastCheckTime.current = now;
    }
  }, [isRevealed, cx, cy, radius, spawnSparkles, checkReveal]);

  // ── High-Performance Caching Coordinate Retriever ──────────────
  const getCanvasCoords = (clientX: number, clientY: number) => {
    let rect = canvasRectRef.current;
    if (!rect) {
      // Fetch and cache bounding client rect only once per drag/hover lifecycle to completely prevent layout thrashing
      rect = canvasRef.current?.getBoundingClientRect() || null;
      canvasRectRef.current = rect;
    }
    if (!rect) return null;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true);
    setHasInteracted(true);
    
    // Cache bounding box immediately on click/touch to prevent synchronous layout recalculations
    canvasRectRef.current = canvasRef.current?.getBoundingClientRect() || null;
    
    // Synchronously dispatch unlock gesture to authorize audio playback on mobile browsers
    window.dispatchEvent(new CustomEvent("music:unlock"));
    const pt = getCanvasCoords(e.clientX, e.clientY);
    if (pt) scratch(pt.x, pt.y);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    setHasInteracted(true);
    const pt = getCanvasCoords(e.clientX, e.clientY);
    if (pt) scratch(pt.x, pt.y);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    lastPoint.current = null;
    canvasRectRef.current = null; // Clear cached rect when scratch stroke completes
    checkReveal(); // Run one final precise check to ensure perfect opening when touch/click releases
  };

  // ── Custom Desktop Cursor Movement Handler ─────────────────────
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || isRevealed) return;
    const pt = getCanvasCoords(e.clientX, e.clientY);
    if (!pt) return;

    if (customCursorRef.current) {
      customCursorRef.current.style.left = `${pt.x}px`;
      customCursorRef.current.style.top = `${pt.y}px`;
      customCursorRef.current.style.opacity = "1";
    }

    // Spawn tiny dust trail sparkles behind cursor
    if (Math.random() < 0.25) {
      sparklesRef.current.push({
        x: pt.x,
        y: pt.y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        life: 15 + Math.random() * 15,
        maxLife: 30,
        size: 0.6 + Math.random() * 0.8,
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-3"> {/* Reduced gap from 5 to 3 to connect text and orb */}
      {/* Self-contained CSS Styles for Premium Animations */}
      <style>{`
        /* 1. Mobile-First Responsive Scaling and Spacing */
        @media (max-width: 767px) {
          .orb-responsive-container {
            transform: scale(1.15); /* Increased size by 15% on mobile */
          }
          .orb-responsive-container.orb-active-state {
            transform: scale(1.17); /* Gentle scale on mobile scratch/touch */
          }
        }
        @media (min-width: 768px) {
          .orb-responsive-container {
            transform: scale(1);
          }
          .orb-responsive-container.orb-active-state {
            transform: scale(1.015);
          }
        }

        /* 2. Slow Breathing Glow (Optimized for Inner Warmth) */
        @keyframes orb-glow-breathing {
          0% {
            box-shadow: 
              0 0 12px 1px rgba(232, 192, 122, 0.04), 
              inset 0 0 22px 4px rgba(232, 192, 122, 0.12),
              inset 0 0 40px 10px rgba(232, 192, 122, 0.06);
            opacity: 0.95;
          }
          50% {
            box-shadow: 
              0 0 18px 2px rgba(232, 192, 122, 0.08), 
              inset 0 0 32px 6px rgba(232, 192, 122, 0.22),
              inset 0 0 50px 15px rgba(232, 192, 122, 0.12);
            opacity: 1;
          }
          100% {
            box-shadow: 
              0 0 12px 1px rgba(232, 192, 122, 0.04), 
              inset 0 0 22px 4px rgba(232, 192, 122, 0.12),
              inset 0 0 40px 10px rgba(232, 192, 122, 0.06);
            opacity: 0.95;
          }
        }

        .orb-glow-breath {
          animation: orb-glow-breathing 4.5s ease-in-out infinite;
        }

        .orb-glow-active {
          box-shadow: 
            0 0 24px 3px rgba(232, 192, 122, 0.12),
            inset 0 0 38px 8px rgba(232, 192, 122, 0.32),
            inset 0 0 60px 20px rgba(232, 192, 122, 0.18);
          filter: brightness(1.12);
        }

        /* 3. Sacred Central Om Focus Ring Animation */
        @keyframes sacred-center-ring {
          0% {
            transform: scale(0.96);
            opacity: 0.25;
            border-color: rgba(232, 192, 122, 0.15);
          }
          50% {
            transform: scale(1.04);
            opacity: 0.55;
            border-color: rgba(232, 192, 122, 0.4);
          }
          100% {
            transform: scale(0.96);
            opacity: 0.25;
            border-color: rgba(232, 192, 122, 0.15);
          }
        }

        /* 4. Silk/Metallic Surface Sweep Reflection */
        @keyframes sacred-silk-sweep {
          0% {
            transform: translate(-30%, -30%);
          }
          100% {
            transform: translate(30%, 30%);
          }
        }

        /* 5. Elegant Swipe Hint Subtle Ripple */
        @keyframes hint-ripple {
          0% {
            transform: scale(0.85);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        .hint-ripple-effect {
          animation: hint-ripple 2.4s cubic-bezier(0.25, 0, 0, 1) infinite;
        }

        /* 6. Cinematic Shimmer Pass for Text */
        @keyframes text-shimmer-glow {
          0% {
            background-position: -200px center;
            text-shadow: 0 0 4px rgba(232, 192, 122, 0.25);
            opacity: 0.6;
          }
          50% {
            background-position: 200px center;
            text-shadow: 0 0 12px rgba(232, 192, 122, 0.65), 0 0 3px rgba(245, 158, 11, 0.4);
            opacity: 0.95;
          }
          100% {
            background-position: -200px center;
            text-shadow: 0 0 4px rgba(232, 192, 122, 0.25);
            opacity: 0.6;
          }
        }

        .instruction-shimmer {
          background: linear-gradient(
            90deg,
            rgba(232, 192, 122, 0.7) 0%,
            rgba(255, 230, 180, 0.95) 45%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 230, 180, 0.95) 55%,
            rgba(232, 192, 122, 0.7) 100%
          );
          background-size: 350px auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer-glow 5.5s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      {/* Scratch Container Wrapper (Handles scaling dynamically) */}
      <div
        className={`relative touch-none select-none transition-all duration-700 ease-out orb-responsive-container ${
          (isHovered || isDrawing) && !isRevealed ? "orb-active-state" : ""
        }`}
        style={{
          width,
          height,
          cursor: isHovered && !isMobile && !isRevealed ? "none" : "crosshair",
        }}
        onMouseEnter={() => {
          if (!isMobile) {
            setIsHovered(true);
            // Cache bounding box immediately on hover enter to prevent layout thrashing inside mousemove
            canvasRectRef.current = canvasRef.current?.getBoundingClientRect() || null;
          }
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          canvasRectRef.current = null; // Clear cached rect on hover exit
          if (customCursorRef.current) {
            customCursorRef.current.style.opacity = "0";
          }
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Soft Golden Background Aura behind the entire seal */}
        <div
          className={`absolute inset-[-15px] rounded-full pointer-events-none transition-opacity duration-[1000ms] ${
            (isHovered || isDrawing) && !isRevealed ? "opacity-100" : "opacity-60"
          }`}
          style={{
            background: "radial-gradient(circle, rgba(232,192,122,0.14) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        {/* Layer 0: Underneath Content (wedding date reveal) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Soft radial glow underneath */}
          <div
            className={`absolute inset-0 rounded-full transition-opacity duration-700 ${
              dateRevealed ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: "radial-gradient(circle, rgba(232,192,122,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Wedding Date Text — reveals at Phase 1 */}
          <div
            className={`relative flex flex-col items-center gap-1 transition-all duration-700 ${
              dateRevealed ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <span className="text-[9px] uppercase tracking-[0.5em] text-marigold/70">
              Save the Date
            </span>
            <span className="font-display text-xl text-premium-gold">
              {wedding.weddingDateDisplay}
            </span>
            <span className="text-[9px] text-ivory/50">{wedding.city}</span>
          </div>
        </div>

        {/* Layer 1: Scratch Canvas (the foil) */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`absolute inset-0 z-10 rounded-full transition-opacity duration-1000 ${
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ touchAction: "none" }}
        />

        {/* Sacred Center Om Focus Container (Ultra-subtle inner radial glow + slow pulsing focus ring) */}
        {!isRevealed && (
          <div
            className="absolute pointer-events-none z-15 transition-all duration-700 ease-in-out"
            style={{
              left: "50%",
              top: "50%",
              width: "72px",
              height: "72px",
              transform: `translate(-50%, -50%) translateY(-8px) scale(${isHovered || isDrawing ? 1.05 : 1})`,
              opacity: Math.max(0, 1 - scratchPercent / 20),
            }}
          >
            {/* Inner radial gold illumination */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(232,192,122,0.2) 0%, rgba(232,192,122,0.05) 50%, transparent 80%)",
              }}
            />
            {/* Animated soft focus ring */}
            <div 
              className="absolute inset-2 rounded-full border border-premium-gold/25"
              style={{
                animation: "sacred-center-ring 6s ease-in-out infinite",
              }}
            />
            {/* Second outer soft border ring */}
            <div 
              className="absolute inset-3 rounded-full border border-premium-gold/5 opacity-40"
            />
          </div>
        )}

        {/* Dynamic HTML Glowing Om Symbol (Default opacity is now 0.25 for stronger focus) */}
        <div
          className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none transition-all duration-500"
          style={{
            opacity: isRevealed
              ? 0
              : Math.max(0, (1 - scratchPercent / 20) * ((isHovered || isDrawing) ? 0.9 : 0.25)),
          }}
        >
          <span 
            className="font-serif text-[32px] text-premium-gold select-none filter drop-shadow-[0_0_10px_#e8c07a] transition-all duration-300"
            style={{
              transform: "translateY(-8px)", // Matches the canvas Om vertical position
            }}
          >
            ॐ
          </span>
        </div>

        {/* Sacred Silk/Metallic Reflection Overlay (Diag Glossy Shimmer) */}
        {!isRevealed && (
          <div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-12"
            style={{
              opacity: Math.max(0, 1 - scratchPercent / 45), // Slowly fades as scratch progresses
            }}
          >
            <div 
              className="absolute inset-[-100%] pointer-events-none"
              style={{
                background: "linear-gradient(135deg, transparent 35%, rgba(255, 245, 220, 0.07) 48%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 245, 220, 0.07) 52%, transparent 65%)",
                animation: "sacred-silk-sweep 9s linear infinite",
              }}
            />
          </div>
        )}

        {/* Layer 2: Sparkle Canvas (overlays everything) */}
        <canvas
          ref={sparkleCanvasRef}
          className="absolute inset-0 z-20 pointer-events-none"
        />

        {/* Outer ambient glow ring with warm inner glow illumination */}
        <div
          className={`absolute inset-0 rounded-full pointer-events-none transition-all duration-[800ms] ${
            (isHovered || isDrawing) && !isRevealed ? "orb-glow-active" : "orb-glow-breath"
          }`}
        />

        {/* Custom luxury cursor for desktop hover */}
        {!isMobile && !isRevealed && (
          <div
            ref={customCursorRef}
            className="absolute pointer-events-none z-50 rounded-full opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid rgba(232, 192, 122, 0.55)",
              background: "radial-gradient(circle, rgba(232, 192, 122, 0.22) 0%, transparent 75%)",
              transform: "translate(-50%, -50%)",
              left: 0,
              top: 0,
              boxShadow: "0 0 12px 1px rgba(232, 192, 122, 0.18)",
            }}
          />
        )}

        {/* Elegant Translucent Swipe Hint Pointer with Ripples */}
        {showHint && (
          <div
            ref={hintElRef}
            className="absolute pointer-events-none z-30 transition-opacity duration-300"
            style={{
              width: "42px", // Increased width from 38px
              height: "42px",
              transform: "translate(-50%, -50%)",
              opacity: 0,
            }}
          >
            {/* Outer Slow Ripple Glow */}
            <div className="absolute inset-[-6px] rounded-full border border-premium-gold/20 hint-ripple-effect" />
            <div className="absolute inset-0 rounded-full border border-premium-gold/45 bg-radial-gradient(circle, rgba(232,192,122,0.3) 0%, transparent 70%) animate-pulse" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-premium-gold shadow-[0_0_8px_#e8c07a]" />
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-premium-gold/85 absolute top-3.5 left-3.5"
              fill="rgba(232, 192, 122, 0.15)" 
              stroke="currentColor" 
              strokeWidth="1.25"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286 2.672ZM12 2.25V4.5m5.303.197-1.591 1.591M21.75 12h-2.25m-.197 5.303-1.591-1.591M12 21.75V19.5m-5.303-.197 1.591-1.591M2.25 12h2.25m.197-5.303 1.591 1.591" 
              />
            </svg>
          </div>
        )}
      </div>

      {/* Instruction Text (Tracking adjusted to 0.24em on mobile, closer positioning with gap-3) */}
      <p
        className={`text-[9.5px] uppercase tracking-[0.24em] transition-all duration-700 instruction-shimmer ${
          isRevealed ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        {isRevealed
          ? ""
          : dateRevealed
            ? "Keep revealing to open the invitation…"
            : "Gently Scratch to Open your Invitation"}
      </p>
    </div>
  );
}
