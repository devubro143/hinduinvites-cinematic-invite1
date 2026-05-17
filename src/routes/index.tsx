import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/sections/Hero";
import { Story } from "@/sections/Story";
import { Couple } from "@/sections/Couple";
import { Countdown } from "@/sections/Countdown";
import { Events } from "@/sections/Events";
import { Gallery } from "@/sections/Gallery";
import { Video } from "@/sections/Video";
import { Itinerary } from "@/sections/Itinerary";
import { Family } from "@/sections/Family";
import { Location } from "@/sections/Location";
import { RSVP } from "@/sections/RSVP";
import { Footer } from "@/sections/Footer";
import { MusicPlayer } from "@/components/MusicPlayer";
import { InvitationCover } from "@/components/InvitationCover";
import { wedding } from "@/config/wedding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: wedding.seo.title },
      { name: "description", content: wedding.seo.description },
      { property: "og:title", content: wedding.seo.title },
      { property: "og:description", content: wedding.seo.description },
      { property: "og:image", content: wedding.seo.ogImage },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <InvitationCover />
      <Hero />
      <Story />
      <Couple />
      <Countdown />
      <Events />
      <Gallery />
      <Video />
      <Itinerary />
      <Family />
      <Location />
      <RSVP />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
