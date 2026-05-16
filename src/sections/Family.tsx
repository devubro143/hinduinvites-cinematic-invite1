import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Phone, MessageCircle } from "lucide-react";

export function Family() {
  return (
    <section id="family" className="px-6 py-24 sm:py-32">
      <SectionTitle
        eyebrow="With Blessings"
        title="Our Families"
        subtitle="Reach out to our families and coordinators for anything you need."
      />
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wedding.contacts.map((c) => (
          <div
            key={c.name}
            className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-2xl">
              {c.side === "bride" ? "🌸" : c.side === "groom" ? "✦" : "✺"}
            </div>
            <h3 className="font-display text-lg text-foreground">{c.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {c.role}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-110"
                aria-label={`Call ${c.name}`}
              >
                <Phone className="h-4 w-4" />
              </a>
              {c.whatsapp && (
                <a
                  href={`https://wa.me/${c.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-foreground transition hover:scale-110"
                  aria-label={`WhatsApp ${c.name}`}
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
