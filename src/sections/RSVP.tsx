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
    console.log("RSVP", form);
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="relative px-6 py-24 sm:py-32 overflow-hidden bg-[#08030a]">
      {/* Luxury Closing Farewell Background Atmosphere (Cream -> Rose Gold -> Maroon Edge) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08030a] via-black to-[#050106] pointer-events-none z-0" />
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30 blur-[130px] mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(232, 192, 122, 0.24) 0%, rgba(138, 3, 20, 0.48) 60%, transparent 100%)"
        }}
      />
      {/* Intimate ambient rose-gold circles floating in the corner */}
      <div className="absolute left-1/4 top-1/3 z-0 pointer-events-none opacity-15 blur-[100px] h-[300px] w-[300px] rounded-full bg-gradient-to-r from-amber-200 to-rose-400" />
      <div className="absolute right-1/4 bottom-1/4 z-0 pointer-events-none opacity-10 blur-[120px] h-[350px] w-[350px] rounded-full bg-gradient-to-r from-rose-500 to-maroon-deep" />

      <div className="relative z-10">
        <SectionTitle
          eyebrow="RSVP"
          title="Will you join us?"
          subtitle={`${wedding.rsvp.message} Kindly respond by ${wedding.rsvp.deadline}.`}
        />

        <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-marigold/20 bg-gradient-to-b from-maroon-deep/20 to-black/65 p-8 shadow-elegant sm:p-10 backdrop-blur-md transition-all duration-500 hover:border-marigold/35">
          {submitted ? (
            <div className="text-center animate-reveal">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-marigold/30 bg-maroon-deep/30 text-marigold shadow-[0_0_15px_rgba(232,192,122,0.25)] mb-6 animate-pulse">
                <Heart className="h-6 w-6 text-marigold fill-marigold" />
              </div>
              <h3 className="font-display text-3xl text-slate-100">
                Thank you, {form.name}
              </h3>
              <p className="mt-3 text-sm text-ivory/80 leading-relaxed max-w-sm mx-auto font-medium">
                Your blessings have reached us. We are absolutely thrilled to celebrate these sacred moments with you.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field label="Your Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-marigold/20 bg-[#0c040d]/70 px-4 py-3 text-slate-100 placeholder-white/20 outline-none ring-marigold/20 focus:border-marigold focus:ring-2 transition-all duration-300"
                />
              </Field>
              <Field label="Number of Guests">
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={form.count}
                  onChange={(e) => setForm({ ...form, count: +e.target.value })}
                  className="w-full rounded-lg border border-marigold/20 bg-[#0c040d]/70 px-4 py-3 text-slate-100 outline-none ring-marigold/20 focus:border-marigold focus:ring-2 transition-all duration-300"
                />
              </Field>
              <Field label="A Blessing or Message">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share your wishes for our new beginning..."
                  className="w-full rounded-lg border border-marigold/20 bg-[#0c040d]/70 px-4 py-3 text-slate-100 placeholder-white/25 outline-none ring-marigold/20 focus:border-marigold focus:ring-2 transition-all duration-300"
                />
              </Field>
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-maroon-deep via-accent to-maroon-deep px-8 py-4 text-xs uppercase tracking-[0.3em] text-ivory border border-marigold/30 shadow-soft transition-all duration-300 hover:scale-[1.01] hover:border-marigold hover:shadow-[0_0_20px_rgba(232,192,122,0.25)] active:scale-95 font-semibold"
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
    <label className="block text-left">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.25em] text-marigold/95 font-semibold">
        {label}
      </span>
      {children}
    </label>
  );
}
