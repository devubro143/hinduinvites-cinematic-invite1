import { memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { RoyalVenueCard } from "@/components/RoyalVenueCard";

export const Location = memo(function Location() {
  // Generate randomized embers/floating particles for ambient cinematic movement
  const embers = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    size: `${Math.random() * 3 + 1.5}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 10 + 8}s`,
  }));

  return (
    <section 
      id="location" 
      className="relative overflow-hidden bg-[#08030a] px-6 py-24 sm:py-32 z-10"
    >
      {/* Background Gradients: Maroon Deep -> Wine -> Amber Glow -> Soft Champagne */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 blur-[130px] mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(232, 192, 122, 0.18) 0%, rgba(138, 3, 20, 0.45) 50%, transparent 100%)"
        }}
      />
      {/* Subtle organic light pulse background shift */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-pulse duration-[10000ms] bg-[radial-gradient(circle_at_30%_30%,rgba(138,3,20,0.25)_0%,transparent_60%),radial-gradient(circle_at_80%_80%,rgba(232,192,122,0.15)_0%,transparent_60%)]" />

      {/* Floating Sparkles / Embers */}
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute rounded-full bg-accent/35 pointer-events-none z-0 mix-blend-screen"
          style={{
            left: ember.left,
            top: ember.top,
            width: ember.size,
            height: ember.size,
            animation: `float-y ${ember.duration} ease-in-out infinite, ember 3s ease-in-out infinite`,
            animationDelay: ember.delay,
            willChange: "transform, opacity",
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="The Destination"
          title="Royal Celebration Venue"
          subtitle="A legendary sanctuary of heritage, chosen to host our sacred convergence."
        />

        {/* Reusable Royal Venue Card Centerpiece */}
        <div className="mt-16">
          <RoyalVenueCard
            venue={wedding.venue}
            city={wedding.city}
            venueImage={wedding.venueImage}
          />
        </div>
      </div>
    </section>
  );
});
