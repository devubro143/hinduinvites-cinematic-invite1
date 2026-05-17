import { memo } from "react";
import { CinematicImage } from "@/components/CinematicImage";
import { MapPin, Compass } from "lucide-react";

interface RoyalVenueCardProps {
  /** The name of the venue (e.g. "The Leela Palace, Udaipur") */
  venue: string;
  /** The city/location of the venue (e.g. "Udaipur, Rajasthan") */
  city: string;
  /** Optional custom image path for the palace. If not provided, it falls back gracefully */
  venueImage?: string;
  /** Optional poetic editorial description of the palace */
  description?: string;
  /** Optional custom Google Maps redirection URL. If not provided, a robust API URL is auto-generated */
  mapsUrl?: string;
  /** Optional top badge text overlay (defaults to "Destined Palace Reveal") */
  badgeText?: string;
  /** Optional sub-headline category label (defaults to "Destination Wedding") */
  categoryLabel?: string;
}

export const RoyalVenueCard = memo(function RoyalVenueCard({
  venue,
  city,
  venueImage,
  description,
  mapsUrl,
  badgeText = "Destined Palace Reveal",
  categoryLabel = "Destination Wedding",
}: RoyalVenueCardProps) {
  // Construct a fallback Google Maps Search URL if none is provided
  const finalMapsUrl =
    mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${venue}, ${city}`
    )}`;

  // Graceful fallback for venue image
  const finalImage = venueImage || "/media/priya-aarav/gallery/1.jpg";

  // Graceful dynamic editorial description fallback
  const finalDescription =
    description ||
    `A spectacular palace rising majestically from the heart of ${city}. A sanctuary of timeless elegance, royal heritage, and poetic beauty chosen to host our sacred celebrations and bear witness to our eternal vows.`;

  return (
    <div className="animate-reveal mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-marigold/20 bg-[#160b0e]/75 backdrop-blur-xl shadow-elegant relative group transition-all duration-700 hover:border-marigold/45 hover:shadow-[0_0_60px_rgba(232,192,122,0.12)]">
      {/* Inner Gold Arch Ring Ornament */}
      <div className="absolute inset-2.5 rounded-[1.75rem] border border-marigold/15 pointer-events-none z-20" />

      {/* Main Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden min-h-[420px]">
        {/* Left Column: Breathtaking Cinematic Image Showcase */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[300px] overflow-hidden group/image">
          <div className="w-full h-full overflow-hidden bg-black/40">
            <CinematicImage
              src={finalImage}
              alt={venue}
              className="h-full w-full object-cover transition-transform duration-[3000ms] ease-out group-hover/image:scale-[1.04]"
            />
          </div>

          {/* Luxury Overlays: Cinematic Vignette and Gold Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#160b0e] via-transparent to-black/50 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(8,3,10,0.45)_100%)] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-transparent pointer-events-none z-10" />

          {/* Dynamic Palace Label Badge */}
          {badgeText && (
            <div className="absolute top-6 left-6 z-20 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-marigold/30 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-marigold font-semibold">
                {badgeText}
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Editorial Royal Plaque Details */}
        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between items-start gap-8 z-10 relative">
          {/* Background ambient lighting overlay inside the card */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(232,192,122,0.06)_0%,transparent_60%)] pointer-events-none z-0" />

          <div className="relative z-10 w-full">
            {categoryLabel && (
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-marigold font-bold block mb-3 opacity-90">
                {categoryLabel}
              </span>
            )}

            {/* Interactive Clickable Venue Title */}
            <a
              href={finalMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/title inline-block cursor-pointer focus:outline-none max-w-full"
              title="Open in Google Maps"
            >
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-slate-100 transition-colors duration-500 group-hover/title:text-accent font-medium leading-tight text-balance">
                {venue}
              </h3>
              {/* Underline shimmer effect */}
              <span className="block h-[1px] w-0 bg-gradient-to-r from-transparent via-marigold to-transparent transition-all duration-700 group-hover/title:w-full mt-2" />
            </a>

            {/* City / Province label with custom map-pin */}
            <p className="mt-4 text-xs sm:text-sm text-marigold/80 tracking-wide font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent animate-pulse" />
              {city}
            </p>
          </div>

          {/* Poetic Description */}
          <div className="relative z-10 w-full">
            <p className="text-sm leading-relaxed text-ivory/80 italic font-light font-body max-w-md">
              "{finalDescription}"
            </p>
          </div>

          {/* Luxury CTA Button */}
          <div className="relative z-10 w-full">
            <a
              href={finalMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-marigold/30 bg-maroon-deep/30 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-marigold backdrop-blur-md transition-all duration-500 hover:border-marigold/70 hover:bg-maroon/20 hover:shadow-[0_0_25px_rgba(232,192,122,0.2)] focus:outline-none group/btn overflow-hidden"
            >
              {/* Glass Shimmer Reflection */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-[200%] transition-transform duration-[1200ms] ease-out" />

              <Compass className="w-4 h-4 text-accent transition-transform duration-700 group-hover/btn:rotate-45" />
              <span>View Palace Location</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
