import { wedding } from "@/config/wedding";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary px-6 py-20 text-primary-foreground">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-2xl" style={{ color: "var(--marigold)" }}>ॐ</p>
        <h2 className="mt-4 font-display text-5xl text-balance sm:text-6xl">
          {wedding.brideName} <span className="italic" style={{ color: "var(--marigold)" }}>&</span> {wedding.groomName}
        </h2>
        <p className="mt-4 text-sm uppercase tracking-[0.4em]" style={{ color: "var(--marigold)" }}>
          {wedding.weddingDateDisplay}
        </p>
        <p className="mt-6 italic opacity-80">{wedding.tagline}</p>
        <p className="mt-10 text-xs uppercase tracking-[0.5em]" style={{ color: "var(--marigold)" }}>
          {wedding.hashtag}
        </p>
        <p className="mt-12 text-xs opacity-60">
          Crafted with love · HinduInvites
        </p>
      </div>
    </footer>
  );
}
