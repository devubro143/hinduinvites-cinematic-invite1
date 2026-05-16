import type { WeddingEvent } from "@/config/wedding";
import { MapPin, Clock, Calendar } from "lucide-react";

export function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-4xl" aria-hidden>{event.icon}</span>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            0{index + 1}
          </span>
        </div>
        <h3 className="font-display text-3xl text-foreground sm:text-4xl">
          {event.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {event.description}
        </p>
        <div className="mt-6 space-y-2 text-sm text-foreground/80">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" /> {event.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" /> {event.time}
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>{event.venue}{event.city ? `, ${event.city}` : ""}</span>
          </div>
        </div>
        {event.mapsUrl && (
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View on Maps →
          </a>
        )}
      </div>
    </article>
  );
}
