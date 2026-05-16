import { themes } from "./themes";
import { clientData } from "@/clients";
import { ACTIVE_CLIENT_ID } from "@/clients/active-client";

/**
 * HinduInvites Engine Loader
 * This file transforms raw client JSON into the typed engine config.
 */

const coupleId = ACTIVE_CLIENT_ID;
const themeId = clientData.themeId as keyof typeof themes;

/**
 * Helper to build dynamic asset paths from the public/clients folder.
 */
const getAsset = (path: string | undefined) => {
  if (!path) return "";
  // If path is already absolute (starts with http or /), return as is
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return `/clients/${coupleId}/${path}`;
};

export type WeddingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city?: string;
  description: string;
  mapsUrl?: string;
  icon?: string;
};

export type Contact = {
  name: string;
  role: string;
  phone: string;
  whatsapp?: string;
  side: "bride" | "groom" | "coordinator";
};

export type ItineraryDay = {
  day: string;
  date: string;
  items: { time: string; title: string; note?: string }[];
};

// Process the raw client data into the engine format
export const wedding = {
  ...clientData,
  coupleId,
  themeId,
  theme: themes[themeId],

  // Process asset paths
  heroImage: getAsset(clientData.heroImage),
  gallery: (clientData.gallery || []).map((img: string) => getAsset(img)),
  
  music: {
    ...clientData.music,
    src: getAsset(clientData.music.src),
  },

  video: {
    ...clientData.video,
    localFile: getAsset(clientData.video.localFile),
  },

  seo: {
    ...clientData.seo,
    ogImage: getAsset(clientData.seo.ogImage),
  },
};

export type WeddingConfig = typeof wedding;
