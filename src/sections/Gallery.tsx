import { memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { CinematicImage } from "@/components/CinematicImage";

export const Gallery = memo(function Gallery() {
  const imgs = wedding.gallery;
  const half = Math.ceil(imgs.length / 2);
  const row1 = imgs.slice(0, half);
  const row2 = imgs.slice(half);

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
        <MarqueeRow images={[...row1, ...row1]} direction="left" />
        <MarqueeRow images={[...row2, ...row2]} direction="right" />
      </div>
    </section>
  );
});

function MarqueeRow({ images, direction }: { images: string[]; direction: "left" | "right" }) {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex w-max gap-6 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {images.map((src, i) => (
          <figure
            key={i}
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
