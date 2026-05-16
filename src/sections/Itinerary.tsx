import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";

export function Itinerary() {
  return (
    <section id="itinerary" className="bg-secondary/40 px-6 py-24 sm:py-32">
      <SectionTitle
        eyebrow="Itinerary"
        title="Five days with us"
        subtitle="A guide to every ceremony, every meal, every memory."
      />
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wedding.itinerary.map((day) => (
          <div
            key={day.day}
            className="rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              {day.date}
            </p>
            <h3 className="mt-2 font-display text-2xl text-foreground">
              {day.day}
            </h3>
            <ul className="mt-5 space-y-3">
              {day.items.map((it) => (
                <li
                  key={it.title}
                  className="flex items-start gap-3 border-t border-border/60 pt-3 text-sm"
                >
                  <span className="w-20 shrink-0 font-medium text-accent">
                    {it.time}
                  </span>
                  <span>
                    <span className="text-foreground">{it.title}</span>
                    {it.note && (
                      <span className="block text-muted-foreground">{it.note}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
