import { useState } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Heart } from "lucide-react";

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", count: 1, message: "" });

  if (!wedding.rsvp.enabled) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: post to backend / Lovable Cloud
    console.log("RSVP", form);
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="relative">
        <SectionTitle
          eyebrow="RSVP"
          title="Will you join us?"
          subtitle={`${wedding.rsvp.message} Kindly respond by ${wedding.rsvp.deadline}.`}
        />

        <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-border bg-card p-8 shadow-elegant sm:p-10">
          {submitted ? (
            <div className="text-center">
              <Heart className="mx-auto h-10 w-10 text-accent" />
              <h3 className="mt-4 font-display text-3xl text-foreground">
                Thank you, {form.name}
              </h3>
              <p className="mt-2 text-muted-foreground">
                Your blessings have reached us. We can't wait to celebrate with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Your Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none ring-ring/40 focus:ring-2"
                />
              </Field>
              <Field label="Number of Guests">
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={form.count}
                  onChange={(e) => setForm({ ...form, count: +e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none ring-ring/40 focus:ring-2"
                />
              </Field>
              <Field label="A Blessing or Message">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share your wishes for the couple..."
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground outline-none ring-ring/40 focus:ring-2"
                />
              </Field>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-8 py-4 text-sm uppercase tracking-[0.3em] text-primary-foreground shadow-soft transition hover:scale-[1.02] hover:shadow-elegant"
              >
                Accept Invitation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
