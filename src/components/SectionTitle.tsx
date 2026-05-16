export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl text-premium-gold sm:text-5xl md:text-6xl text-balance">
        {title}
      </h2>
      <div className="divider-ornament my-6">
        <span className="text-lg">✦</span>
      </div>
      {subtitle && (
        <p className="text-base text-muted-foreground sm:text-lg text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
}
