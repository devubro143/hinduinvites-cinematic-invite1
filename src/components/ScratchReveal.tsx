import { useRef, useEffect, useState } from "react";

interface ScratchRevealProps {
  onReveal: () => void;
  width?: number;
  height?: number;
}

export function ScratchReveal({ onReveal, width = 300, height = 300 }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    contextRef.current = ctx;

    // 1. Draw the "Ceremonial Seal" (The layer to be scratched)
    const drawSeal = () => {
      // Background of the seal
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
      gradient.addColorStop(0, "#2a0d0a"); // Deep Maroon
      gradient.addColorStop(1, "#1a0608"); // Darker Maroon
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(width/2, height/2, width/2 - 10, 0, Math.PI * 2);
      ctx.fill();

      // Gold Border
      ctx.strokeStyle = "#e8c07a"; // Marigold
      ctx.lineWidth = 2;
      ctx.stroke();

      // Subtle Pattern (Optional)
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = "#e8c07a";
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(width/2, height/2);
        const angle = (i * Math.PI) / 4;
        ctx.lineTo(
          width/2 + Math.cos(angle) * (width/2 - 20),
          height/2 + Math.sin(angle) * (width/2 - 20)
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // "Seal" Text/Icon
      ctx.fillStyle = "#e8c07a";
      ctx.font = "italic 14px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText("BREAK THE SEAL", width/2, height/2 + 5);
      
      // Setup for scratching
      ctx.globalCompositeOperation = "destination-out";
    };

    drawSeal();
  }, [width, height]);

  const checkReveal = () => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    // Check transparency percentage
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    
    // Once 40-50% is revealed, trigger the auto-reveal
    if (percentage > 40) {
      setIsRevealed(true);
      onReveal();
    }
  };

  const scratch = (x: number, y: number) => {
    const ctx = contextRef.current;
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    checkReveal();
  };

  const handleMouseDown = () => setIsDrawing(true);
  const handleMouseUp = () => setIsDrawing(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    scratch(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  return (
    <div className="relative group flex flex-col items-center gap-6">
      <div className="relative cursor-crosshair">
        {/* Underneath Layer (The "Button" or Glow) */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-marigold/20 blur-2xl animate-pulse" />
        </div>

        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className={`relative z-10 transition-opacity duration-1000 ${isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        />
      </div>

      <p className="text-[9px] uppercase tracking-[0.4em] text-marigold opacity-40 animate-pulse">
        Trace to Unveil the Sacred Vow
      </p>
    </div>
  );
}
