// =====================================================================
// HinduInvites — Master Wedding Config
// EDIT THIS FILE TO CUSTOMIZE THE INVITATION (5–10 min deploy)
// =====================================================================

import { themes } from "./themes";

/**
 * Switch entire wedding media by changing this identifier.
 * Assets must exist in public/couples/[coupleId]/
 */
const coupleId = "priya-aarav";

/**
 * Switch entire visual theme by changing this identifier.
 * Themes are defined in src/config/themes.ts
 */
const themeId: keyof typeof themes = "royal-maroon";

/**
 * Helper to build dynamic asset paths from the public/couples folder.
 */
const getAsset = (path: string) => `/couples/${coupleId}/${path}`;

export type WeddingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city?: string;
  description: string;
  mapsUrl?: string;
  icon?: string; // emoji or symbol
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

export const wedding = {
  coupleId,
  themeId,
  theme: themes[themeId],

  // — Couple —
  brideName: "Priya",
  groomName: "Aarav",
  brideFull: "Priya Sharma",
  groomFull: "Aarav Kapoor",
  hashtag: "#AaravWedsPriya",
  tagline: "Two souls. One sacred vow.",
  weddingDate: "2026-02-14",
  weddingDateDisplay: "14 February 2026",
  city: "Udaipur, Rajasthan",
  venue: "The Leela Palace, Udaipur",

  // — Hero / Opening —
  heroImage: getAsset("hero.jpg"),
  openingShloka: "ॐ गणेशाय नमः",
  openingShlokaTranslit: "Om Ganeshaya Namaḥ",
  openingShlokaMeaning:
    "We bow to Lord Ganesha — remover of obstacles — as we begin this sacred journey.",

  // — Story —
  story: {
    title: "Our Story",
    body:
      "From a quiet evening in Jaipur to a promise written under the desert stars — our journey has been a slow unfolding of laughter, late-night chai, and the kind of love that feels like home. Now, surrounded by the people who shaped us, we begin our forever.",
    moments: [
      { year: "2021", title: "First Meeting", note: "A monsoon evening in Jaipur." },
      { year: "2023", title: "The Proposal", note: "Under the stars in Jaisalmer." },
      { year: "2026", title: "Forever", note: "Sealed with seven sacred vows." },
    ],
  },

  // — Events Timeline —
  events: [
    {
      id: "haldi",
      title: "Haldi",
      date: "12 Feb 2026",
      time: "10:00 AM",
      venue: "Garden Lawns, The Leela Palace",
      city: "Udaipur",
      description: "A morning bathed in turmeric, blessings and joy.",
      mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Udaipur",
      icon: "🌼",
    },
    {
      id: "mehendi",
      title: "Mehendi",
      date: "12 Feb 2026",
      time: "4:00 PM",
      venue: "Courtyard Pavilion",
      city: "Udaipur",
      description: "Henna, music, and laughter as the love story is drawn into skin.",
      mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Udaipur",
      icon: "🌿",
    },
    {
      id: "sangeet",
      title: "Sangeet",
      date: "13 Feb 2026",
      time: "7:30 PM",
      venue: "Lakeside Ballroom",
      city: "Udaipur",
      description: "An evening of music, dance and unforgettable performances.",
      mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Udaipur",
      icon: "✦",
    },
    {
      id: "wedding",
      title: "Wedding",
      date: "14 Feb 2026",
      time: "8:00 PM",
      venue: "Mandap by the Lake",
      city: "Udaipur",
      description: "Seven vows around the sacred fire — the heart of our union.",
      mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Udaipur",
      icon: "🪔",
    },
    {
      id: "reception",
      title: "Reception",
      date: "15 Feb 2026",
      time: "7:00 PM",
      venue: "Grand Ballroom",
      city: "Udaipur",
      description: "A celebratory evening with the families we hold dear.",
      mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Udaipur",
      icon: "✺",
    },
  ] as WeddingEvent[],

  // — Gallery — (Automatically load numbered images from public/couples/[id]/gallery/)
  gallery: [
    getAsset("gallery/1.jpg"),
    getAsset("gallery/2.jpg"),
    getAsset("gallery/3.jpg"),
    getAsset("gallery/4.jpg"),
    getAsset("gallery/5.jpg"),
    getAsset("gallery/6.jpg"),
    getAsset("gallery/2.jpg"),
    getAsset("gallery/4.jpg"),
    getAsset("gallery/1.jpg"),
    getAsset("gallery/5.jpg"),
    getAsset("gallery/3.jpg"),
    getAsset("gallery/6.jpg"),
  ],

  // — Music — (Uses public/couples/[id]/music.mp3)
  music: {
    enabled: true,
    src: getAsset("music.mp3"),
    title: "Cinematic Shehnai",
    defaultVolume: 0.4,
  },

  // — Video — (Supports YouTube ID or local file path in public/couples/[id]/film.mp4)
  video: {
    enabled: true,
    youtubeId: "YkjOuYP8wjc", // leave empty if using local file
    localFile: getAsset("film.mp4"),
    title: "Our Pre-Wedding Film",
  },

  // — Family / Contacts —
  contacts: [
    { name: "Mr. & Mrs. Sharma", role: "Parents of the Bride", phone: "+91 98765 43210", whatsapp: "919876543210", side: "bride" },
    { name: "Mr. & Mrs. Kapoor", role: "Parents of the Groom", phone: "+91 98765 12345", whatsapp: "919876512345", side: "groom" },
    { name: "Rohan Sharma", role: "Bride's Brother · Coordinator", phone: "+91 90000 11111", whatsapp: "919000011111", side: "coordinator" },
    { name: "Aditi Kapoor", role: "Groom's Sister · Coordinator", phone: "+91 90000 22222", whatsapp: "919000022222", side: "coordinator" },
  ] as Contact[],

  // — Itinerary (multi-day) —
  itinerary: [
    {
      day: "Day 1 — Welcome",
      date: "11 Feb 2026",
      items: [
        { time: "3:00 PM", title: "Guest Check-in", note: "The Leela Palace, Udaipur" },
        { time: "8:00 PM", title: "Welcome Dinner", note: "Lakeside terrace" },
      ],
    },
    {
      day: "Day 2 — Haldi & Mehendi",
      date: "12 Feb 2026",
      items: [
        { time: "10:00 AM", title: "Haldi Ceremony" },
        { time: "4:00 PM", title: "Mehendi Afternoon" },
      ],
    },
    {
      day: "Day 3 — Sangeet",
      date: "13 Feb 2026",
      items: [
        { time: "11:00 AM", title: "Brunch & Relaxation" },
        { time: "7:30 PM", title: "Sangeet Night" },
      ],
    },
    {
      day: "Day 4 — Wedding",
      date: "14 Feb 2026",
      items: [
        { time: "5:00 PM", title: "Baraat Procession" },
        { time: "8:00 PM", title: "Wedding Ceremony" },
      ],
    },
    {
      day: "Day 5 — Reception",
      date: "15 Feb 2026",
      items: [
        { time: "12:00 PM", title: "Farewell Brunch" },
        { time: "7:00 PM", title: "Reception" },
      ],
    },
  ] as ItineraryDay[],

  // — RSVP —
  rsvp: {
    enabled: true,
    deadline: "1 February 2026",
    message: "Your presence is our greatest blessing.",
  },

  // — Maps —
  mapsEmbedUrl:
    "https://www.google.com/maps?q=The+Leela+Palace+Udaipur&output=embed",

  // — SEO & Social Sharing —
  seo: {
    title: "Priya & Aarav — Wedding Invitation",
    description: "Join us as we celebrate the union of Priya Sharma and Aarav Kapoor. February 14, 2026.",
    keywords: "wedding, invitation, Priya and Aarav, Hindu wedding, Udaipur wedding",
    ogImage: getAsset("hero.jpg"), 
    url: "https://priya-weds-aarav.com", 
    twitterHandle: "@HinduInvites",
  },
};

export type WeddingConfig = typeof wedding;
