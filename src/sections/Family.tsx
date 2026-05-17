import { useState } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Phone, MessageCircle } from "lucide-react";

// Sub-component for individual family member row to isolate the image error state cleanly
function FamilyMemberRow({ 
  member, 
  familyLetter 
}: { 
  member: { role: string; name: string; image?: string }; 
  familyLetter: string;
}) {
  const [imgError, setImgError] = useState(false);

  // Look up if this family member has a matching coordinator contact in wedding.contacts (to offer Phone/WhatsApp quick actions)
  const contact = wedding.contacts?.find(
    (c) =>
      c.name.toLowerCase().includes(member.name.toLowerCase()) ||
      member.name.toLowerCase().includes(c.name.toLowerCase())
  );

  return (
    <div className="flex items-center justify-between bg-maroon-deep/10 rounded-xl p-4 border border-white/5 transition-all duration-300 hover:bg-maroon-deep/15 hover:border-marigold/10">
      <div className="flex items-center gap-4">
        {/* Rounded Circle Photo Frame with Gold Border */}
        <div className="h-12 w-12 rounded-full overflow-hidden border border-marigold/35 flex items-center justify-center bg-black/25 flex-shrink-0 shadow-[0_0_8px_rgba(232,192,122,0.08)]">
          {member.image && !imgError ? (
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="font-display text-lg text-marigold font-bold">{familyLetter}</span>
          )}
        </div>

        {/* Member Details */}
        <div className="text-left">
          <span className="text-[8px] uppercase tracking-[0.25em] text-marigold font-semibold block">
            {member.role}
          </span>
          <span className="text-sm font-medium text-foreground block mt-0.5">
            {member.name}
          </span>
        </div>
      </div>

      {/* Optional Contact Quick Actions for Coordinators */}
      {contact && (
        <div className="flex items-center gap-2">
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-accent transition hover:scale-110 hover:bg-primary"
            aria-label={`Call ${contact.name}`}
          >
            <Phone className="h-3.5 w-3.5" />
          </a>
          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-foreground transition hover:scale-110 hover:bg-accent"
              aria-label={`WhatsApp ${contact.name}`}
            >
              <MessageCircle className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function Family() {
  const { families } = wedding;

  // Extracted family initials for elegant serif placeholder fallbacks
  const brideFamilyLetter = families?.bride?.title?.replace("The ", "").charAt(0).toUpperCase() || "S";
  const groomFamilyLetter = families?.groom?.title?.replace("The ", "").charAt(0).toUpperCase() || "K";

  return (
    <section id="family" className="px-6 py-24 sm:py-32 relative overflow-hidden bg-background">
      <SectionTitle
        eyebrow="With Blessings"
        title="Our Families"
        subtitle="Two families, joined by love, blessed by tradition."
      />

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 relative z-10">
        {/* Bride's Family Card */}
        {families?.bride && (
          <div className="relative group rounded-2xl border border-marigold/15 bg-card/45 p-6 sm:p-8 shadow-soft backdrop-blur-[2px] transition-all duration-500 hover:border-marigold/30 hover:shadow-elegant">
            {/* Ambient inner card glow */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(232,192,122,0.03)_0%,transparent_70%)] pointer-events-none rounded-2xl" />

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-marigold/70 font-semibold mb-2 block text-left">
                Bride's Family
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-8 text-left">
                {families.bride.title}
              </h3>

              <div className="flex flex-col gap-4">
                {families.bride.members.map((member, i) => (
                  <FamilyMemberRow
                    key={i}
                    member={member}
                    familyLetter={brideFamilyLetter}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Groom's Family Card */}
        {families?.groom && (
          <div className="relative group rounded-2xl border border-marigold/15 bg-card/45 p-6 sm:p-8 shadow-soft backdrop-blur-[2px] transition-all duration-500 hover:border-marigold/30 hover:shadow-elegant">
            {/* Ambient inner card glow */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(232,192,122,0.03)_0%,transparent_70%)] pointer-events-none rounded-2xl" />

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-marigold/70 font-semibold mb-2 block text-left">
                Groom's Family
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-8 text-left">
                {families.groom.title}
              </h3>

              <div className="flex flex-col gap-4">
                {families.groom.members.map((member, i) => (
                  <FamilyMemberRow
                    key={i}
                    member={member}
                    familyLetter={groomFamilyLetter}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
