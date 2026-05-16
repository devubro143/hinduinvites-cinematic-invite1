import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";

export function Location() {
  return (
    <section id="location" className="bg-secondary/40 px-6 py-24 sm:py-32">
      <SectionTitle
        eyebrow="Venue"
        title={wedding.venue}
        subtitle={wedding.city}
      />
      <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-border shadow-elegant">
        <iframe
          src={wedding.mapsEmbedUrl}
          title="Venue map"
          className="h-80 w-full sm:h-[28rem]"
          loading="lazy"
        />
      </div>
    </section>
  );
}
