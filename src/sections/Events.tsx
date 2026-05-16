import { memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { EventCard } from "@/components/EventCard";

export const Events = memo(function Events() {
  return (
    <section id="events" className="relative bg-secondary/40 px-6 py-24 sm:py-32">
      <SectionTitle
        eyebrow="Wedding Events"
        title="Five days. One love story."
        subtitle="Join us as we celebrate every sacred ritual and joyful moment."
      />
      <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wedding.events.map((e, i) => (
          <EventCard key={e.id} event={e} index={i} />
        ))}
      </div>
    </section>
  );
});
