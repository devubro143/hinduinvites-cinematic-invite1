import { memo, useMemo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { CinematicImage } from "@/components/CinematicImage";

export const Gallery = memo(function Gallery() {
  const { row1, row2 } = useMemo(() => {
    // 1. Extract unique images
    const uniqueImgs = Array.from(new Set(wedding.gallery));
    
    // 2. Deterministic Hash-Sort (Prevents React Hydration Mismatches between Server and Client)
    const sorted = [...uniqueImgs].sort((a, b) => {
      let hashA = 0, hashB = 0;
      for (let i = 0; i < a.length; i++) hashA = a.charCodeAt(i) + ((hashA << 5) - hashA);
      for (let i = 0; i < b.length; i++) hashB = b.charCodeAt(i) + ((hashB << 5) - hashB);
      return hashA - hashB;
    });

    // 3. Split unique images into completely disjoint sets (Row 1 and Row 2 have ZERO common images)
    // This mathematically guarantees that identical images will never align vertically when counter-scrolling!
    const mid = Math.ceil(sorted.length / 2);
    const set1 = sorted.slice(0, mid);
    const set2 = sorted.slice(mid);

    // Fallback in case unique set is too small to split
    const finalSet1 = set1.length > 0 ? set1 : sorted;
    const finalSet2 = set2.length > 0 ? set2 : sorted;

    return { row1: finalSet1, row2: finalSet2 };
  }, []);

  return (
    <section id="gallery" className="relative overflow-hidden px-0 py-24 sm:py-32">
      <div className="px-6">
        <SectionTitle
          eyebrow="Moments"
          title="A film of fleeting smiles"
          subtitle="Cinematic glimpses from our journey together."
        />
      </div>

      <div className="mt-16 space-y-6">
        {/* 4. Repeat exactly 4 times (Even multiplier guarantees a perfectly seamless -50% CSS marquee loop) */}
        {/* We pass customized animation durations to create a high-end parallax effect */}
        <MarqueeRow images={[...row1, ...row1, ...row1, ...row1]} direction="left" duration="48s" />
        <MarqueeRow images={[...row2, ...row2, ...row2, ...row2]} direction="right" duration="64s" />
      </div>
    </section>
  );
});

function MarqueeRow({ 
  images, 
  direction, 
  duration 
}: { 
  images: string[]; 
  direction: "left" | "right"; 
  duration: string;
}) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex w-max gap-6 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{ animationDuration: duration }}
      >
        {images.map((src, i) => (
          <figure
            key={`${src}-${i}`} // Stable, unique key for optimal React reconciliation
            className="relative h-64 w-80 shrink-0 overflow-hidden rounded-2xl shadow-soft sm:h-80 sm:w-96"
          >
            <CinematicImage
              src={src}
              alt={`Gallery moment ${i + 1}`}
              className="h-full w-full hover:scale-105 transition-transform duration-[1500ms]"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-accent/20" />
          </figure>
        ))}
      </div>
    </div>
  );
}
