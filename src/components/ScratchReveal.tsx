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

  const [isRevealed, setIsRevealed] = useState(false);
  const [dateRevealed, setDateRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 2 - 8;

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

    // "Break the Seal" label
    ctx.fillStyle = "rgba(232,192,122,0.55)";
    ctx.font = "italic 11px 'Playfair Display', serif";
    ctx.fillText("Break the Seal", cx, cy + 22);

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

    // Only count pixels inside the circular seal area
    for (let py = 0; py < canvas.height; py++) {
      for (let px = 0; px < canvas.width; px++) {
        const dx = px / dpr - cx;
        const dy = py / dpr - cy;
        if (dx * dx + dy * dy > radius * radius) continue;
        total++;
        if (pixels[(py * canvas.width + px) * 4 + 3] === 0) transparent++;
      }
    }

    const pct = total > 0 ? (transparent / total) * 100 : 0;
    setScratchPercent(pct);

    // Phase 1: At 20-30%, reveal the wedding date with sparkle burst
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

    // Phase 2: At 50%+, trigger full cinematic reveal
    if (pct > 50) {
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
    checkReveal();
  }, [isRevealed, cx, cy, radius, spawnSparkles, checkReveal]);

  // ── Input handlers ────────────────────────────────────────────
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true);
    const pt = getCanvasCoords(e.clientX, e.clientY);
    if (pt) scratch(pt.x, pt.y);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    const pt = getCanvasCoords(e.clientX, e.clientY);
    if (pt) scratch(pt.x, pt.y);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  return (
    <div className="relative flex flex-col items-center gap-5">
      {/* Scratch Container */}
      <div
        className="relative touch-none select-none"
        style={{ width, height, cursor: "crosshair" }}
      >
        {/* Layer 0: Underneath Content (wedding date reveal) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
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

        {/* Layer 2: Sparkle Canvas (overlays everything) */}
        <canvas
          ref={sparkleCanvasRef}
          className="absolute inset-0 z-20 pointer-events-none"
        />

        {/* Outer ambient glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: `
              0 0 30px 2px rgba(232,192,122,0.08),
              inset 0 0 20px 2px rgba(232,192,122,0.04)
            `,
          }}
        />
      </div>

      {/* Instruction Text */}
      <p
        className={`text-[9px] uppercase tracking-[0.35em] text-marigold transition-opacity duration-700 ${
          dateRevealed ? "opacity-60" : "opacity-35"
        }`}
      >
        {isRevealed
          ? ""
          : dateRevealed
            ? "Keep revealing to open the invitation…"
            : "Gently trace to break the seal"}
      </p>
    </div>
  );
}
