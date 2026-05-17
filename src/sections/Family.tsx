import { useState, memo } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Phone, MessageCircle } from "lucide-react";

// Sub-component for individual family member row to isolate the image error state cleanly
const FamilyMemberRow = memo(function FamilyMemberRow({ 
  member, 
  familyLetter,
  index,
}: { 
  member: { role: string; name: string; image?: string }; 
  familyLetter: string;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  // Look up if this family member has a matching coordinator contact in wedding.contacts (to offer Phone/WhatsApp quick actions)
  const contact = wedding.contacts?.find(
    (c: any) =>
      c.name.toLowerCase().includes(member.name.toLowerCase()) ||
      member.name.toLowerCase().includes(c.name.toLowerCase())
  );

  return (
    <div 
      className="flex items-center justify-between bg-maroon-deep/15 rounded-2xl p-5 border border-white/5 transition-all duration-500 hover:bg-maroon-deep/25 hover:border-marigold/30 hover:shadow-[0_0_20px_rgba(232,192,122,0.08)] group/member"
      style={{
        animation: `reveal-up 1.2s cubic-bezier(0.22, 1, 0.36, 1) both`,
        animationDelay: `${index * 120}ms`,
        willChange: "transform, opacity",
      }}
    >
      <div className="flex items-center gap-4">
        {/* Rounded Circle Photo Frame with Gold Border & Halo Glow */}
        <div className="relative h-14 w-14 rounded-full overflow-hidden border border-marigold/35 flex items-center justify-center bg-black/40 flex-shrink-0 shadow-[0_0_12px_rgba(232,192,122,0.12)] transition-all duration-500 group-hover/member:border-marigold/70 group-hover/member:shadow-[0_0_18px_rgba(232,192,122,0.25)]">
          {member.image && !imgError ? (
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover/member:scale-105"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <span className="font-display text-xl text-marigold font-bold">{familyLetter}</span>
          )}
          {/* Subtle golden reflection / radial lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover/member:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Member Details */}
        <div className="text-left">
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold block opacity-90 text-premium-gold select-none">
            {member.role}
          </span>
          <span className="text-base font-display font-medium text-slate-100 block mt-1 transition-colors duration-500 group-hover/member:text-accent">
            {member.name}
          </span>
        </div>
      </div>

      {/* Optional Contact Quick Actions for Coordinators */}
      {contact && (
        <div className="flex items-center gap-3 relative z-10">
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-marigold/20 bg-maroon-deep/30 text-marigold backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:text-accent hover:border-marigold/50 hover:bg-maroon/20 hover:shadow-[0_0_12px_rgba(232,192,122,0.15)]"
            aria-label={`Call ${contact.name}`}
            title={`Call ${contact.name}`}
          >
            <Phone className="h-4 w-4" />
          </a>
          {contact.whatsapp && (
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-marigold/20 bg-maroon-deep/30 text-marigold backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:text-accent hover:border-marigold/50 hover:bg-maroon/20 hover:shadow-[0_0_12px_rgba(232,192,122,0.15)]"
              aria-label={`WhatsApp ${contact.name}`}
              title={`WhatsApp ${contact.name}`}
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
});

export const Family = memo(function Family() {
  const { families } = wedding;

  // Extracted family initials for elegant serif placeholder fallbacks
  const brideFamilyLetter = families?.bride?.title?.replace("The ", "").charAt(0).toUpperCase() || "S";
  const groomFamilyLetter = families?.groom?.title?.replace("The ", "").charAt(0).toUpperCase() || "K";

  // Generate randomized embers/floating particles for ambient cinematic movement
  const embers = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    top: `${5 + Math.random() * 90}%`,
    size: `${Math.random() * 2.5 + 1}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 12 + 8}s`,
  }));

  return (
    <section 
      id="family" 
      className="px-6 py-24 sm:py-32 relative overflow-hidden bg-[#08030a] z-10"
    >
      {/* Background Gradients: Maroon Deep -> Wine -> Amber Glow -> Soft Champagne */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40 blur-[130px] mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(232, 192, 122, 0.18) 0%, rgba(138, 3, 20, 0.45) 55%, transparent 100%)"
        }}
      />
      {/* Subtle organic light pulse background shift */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none animate-pulse duration-[10000ms] bg-[radial-gradient(circle_at_20%_20%,rgba(138,3,20,0.2)_0%,transparent_60%),radial-gradient(circle_at_80%_80%,rgba(232,192,122,0.12)_0%,transparent_60%)]" />

      {/* Floating Sparkles / Embers */}
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute rounded-full bg-accent/30 pointer-events-none z-0 mix-blend-screen"
          style={{
            left: ember.left,
            top: ember.top,
            width: ember.size,
            height: ember.size,
            animation: `float-y ${ember.duration} ease-in-out infinite, ember 3s ease-in-out infinite`,
            animationDelay: ember.delay,
            willChange: "transform, opacity",
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="With Blessings"
          title="Our Families"
          subtitle="Two families, joined by love, blessed by tradition."
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 relative z-10">
          
          {/* Bride's Family Panel */}
          {families?.bride && (
            <div className="animate-reveal relative group rounded-[2.5rem] border border-marigold/20 bg-[#160b0e]/75 p-8 sm:p-10 shadow-elegant backdrop-blur-xl transition-all duration-700 hover:border-marigold/45 hover:shadow-[0_0_60px_rgba(232,192,122,0.12)]">
              
              {/* Inner Gold Arch Ring Ornament */}
              <div className="absolute inset-2.5 rounded-[2.25rem] border border-marigold/15 pointer-events-none z-20" />
              
              {/* Ambient Card Radial Glow */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(232,192,122,0.04)_0%,transparent_70%)] pointer-events-none rounded-[2.5rem]" />

              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-marigold font-bold mb-3 block text-left opacity-90 select-none">
                  Bride's Family
                </span>
                
                <h3 className="font-display text-3xl sm:text-4xl text-slate-100 mb-8 text-left text-premium-gold tracking-wide">
                  {families.bride.title}
                </h3>

                <div className="flex flex-col gap-5">
                  {families.bride.members.map((member: any, i: number) => (
                    <FamilyMemberRow
                      key={i}
                      member={member}
                      familyLetter={brideFamilyLetter}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Groom's Family Panel */}
          {families?.groom && (
            <div className="animate-reveal delay-2 relative group rounded-[2.5rem] border border-marigold/20 bg-[#160b0e]/75 p-8 sm:p-10 shadow-elegant backdrop-blur-xl transition-all duration-700 hover:border-marigold/45 hover:shadow-[0_0_60px_rgba(232,192,122,0.12)]">
              
              {/* Inner Gold Arch Ring Ornament */}
              <div className="absolute inset-2.5 rounded-[2.25rem] border border-marigold/15 pointer-events-none z-20" />
              
              {/* Ambient Card Radial Glow */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(232,192,122,0.04)_0%,transparent_70%)] pointer-events-none rounded-[2.5rem]" />

              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-marigold font-bold mb-3 block text-left opacity-90 select-none">
                  Groom's Family
                </span>
                
                <h3 className="font-display text-3xl sm:text-4xl text-slate-100 mb-8 text-left text-premium-gold tracking-wide">
                  {families.groom.title}
                </h3>

                <div className="flex flex-col gap-5">
                  {families.groom.members.map((member: any, i: number) => (
                    <FamilyMemberRow
                      key={i}
                      member={member}
                      familyLetter={groomFamilyLetter}
                      index={i}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
});
