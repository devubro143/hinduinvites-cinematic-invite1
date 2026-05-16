import { useState, useEffect } from "react";

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function CinematicImage({ src, alt, className = "", priority = false }: CinematicImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state if src changes
    setIsLoaded(false);
    setError(false);

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-white/5 ${className}`}>
      {/* Placeholder / Blur state */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 animate-pulse bg-cinematic"
          style={{
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-marigold/10 to-transparent" />
        </div>
      )}

      {/* The Actual Image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={`h-full w-full object-cover transition-all duration-[1200ms] ease-out ${
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-lg"
        }`}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-[10px] uppercase tracking-widest text-marigold opacity-40">
          Image not found
        </div>
      )}
    </div>
  );
}
