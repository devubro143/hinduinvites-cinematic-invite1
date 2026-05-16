import { memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";

export const Story = memo(function Story() {
  const { story } = wedding;
  return (
    <section id="story" className="relative px-6 py-24 sm:py-32">
      <SectionTitle eyebrow="Our Journey" title={story.title} subtitle={story.body} />

      <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
        {story.moments.map((m, i) => (
          <div
            key={m.year}
            className="group rounded-2xl border border-border bg-card p-8 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <p className="font-display text-3xl text-accent">{m.year}</p>
            <h3 className="mt-2 font-display text-xl text-foreground">{m.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{m.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
});
