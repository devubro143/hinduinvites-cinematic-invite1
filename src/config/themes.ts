export type ThemeColors = {
  ivory: string;
  marigold: string;
  maroon: string;
  maroonDeep: string;
  gold: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
};

export type ThemeEffects = {
  glowIntensity: number; // 0 to 1
  shadowStrength: number; // 0 to 1
  borderRadius: string; // e.g., "0.5rem"
  glassmorphism: number; // 0 to 1 (blur/opacity)
  overlayDarkness: number; // 0 to 1
  particleDensity: number; // 0 to 100
  animationStyle: "classic" | "cinematic" | "gentle" | "dynamic";
};

export type ThemeTypography = {
  displayFont: string;
  bodyFont: string;
  letterSpacing?: string;
};

export type Theme = {
  id: string;
  name: string;
  colors: ThemeColors;
  effects: ThemeEffects;
  typography: ThemeTypography;
};

export const themes: Record<string, Theme> = {
  "royal-maroon": {
    id: "royal-maroon",
    name: "Royal Maroon",
    colors: {
      ivory: "oklch(0.975 0.015 85)",
      marigold: "oklch(0.79 0.14 70)",
      maroon: "oklch(0.38 0.12 30)",
      maroonDeep: "oklch(0.28 0.10 25)",
      gold: "oklch(0.72 0.11 80)",
      background: "oklch(0.975 0.015 85)",
      foreground: "oklch(0.28 0.10 25)",
      card: "oklch(0.99 0.008 85)",
      cardForeground: "oklch(0.28 0.10 25)",
      primary: "oklch(0.38 0.12 30)",
      primaryForeground: "oklch(0.975 0.015 85)",
      secondary: "oklch(0.94 0.025 80)",
      secondaryForeground: "oklch(0.28 0.10 25)",
      muted: "oklch(0.94 0.018 80)",
      mutedForeground: "oklch(0.5 0.05 40)",
      accent: "oklch(0.79 0.14 70)",
      accentForeground: "oklch(0.28 0.10 25)",
      border: "oklch(0.88 0.04 75)",
      input: "oklch(0.92 0.025 75)",
      ring: "oklch(0.79 0.14 70)",
    },
    effects: {
      glowIntensity: 0.6,
      shadowStrength: 0.4,
      borderRadius: "0.5rem",
      glassmorphism: 0.2,
      overlayDarkness: 0.45,
      particleDensity: 30,
      animationStyle: "cinematic",
    },
    typography: {
      displayFont: "'DM Serif Display', Georgia, serif",
      bodyFont: "'Fira Sans', system-ui, sans-serif",
    },
  },
  "ivory-gold": {
    id: "ivory-gold",
    name: "Ivory & Gold",
    colors: {
      ivory: "#FFFFFF",
      marigold: "#D4AF37",
      maroon: "#4A4A4A",
      maroonDeep: "#2A2A2A",
      gold: "#D4AF37",
      background: "#FFFFFF",
      foreground: "#2A2A2A",
      card: "#FDFDFD",
      cardForeground: "#2A2A2A",
      primary: "#D4AF37",
      primaryForeground: "#FFFFFF",
      secondary: "#F5F5F5",
      secondaryForeground: "#2A2A2A",
      muted: "#F5F5F5",
      mutedForeground: "#737373",
      accent: "#D4AF37",
      accentForeground: "#FFFFFF",
      border: "#E5E5E5",
      input: "#F5F5F5",
      ring: "#D4AF37",
    },
    effects: {
      glowIntensity: 0.3,
      shadowStrength: 0.2,
      borderRadius: "0px", // Sharp, editorial look
      glassmorphism: 0.1,
      overlayDarkness: 0.2,
      particleDensity: 10,
      animationStyle: "gentle",
    },
    typography: {
      displayFont: "'Playfair Display', serif",
      bodyFont: "'Inter', sans-serif",
    },
  },
  "dark-cinematic": {
    id: "dark-cinematic",
    name: "Dark Cinematic",
    colors: {
      ivory: "oklch(0.975 0.015 85)",
      marigold: "oklch(0.79 0.14 70)",
      maroon: "oklch(0.38 0.12 30)",
      maroonDeep: "oklch(0.28 0.10 25)",
      gold: "oklch(0.72 0.11 80)",
      background: "oklch(0.18 0.03 30)",
      foreground: "oklch(0.975 0.015 85)",
      card: "oklch(0.22 0.04 30)",
      cardForeground: "oklch(0.975 0.015 85)",
      primary: "oklch(0.79 0.14 70)",
      primaryForeground: "oklch(0.2 0.04 30)",
      secondary: "oklch(0.28 0.05 30)",
      secondaryForeground: "oklch(0.975 0.015 85)",
      muted: "oklch(0.28 0.04 30)",
      mutedForeground: "oklch(0.75 0.04 70)",
      accent: "oklch(0.79 0.14 70)",
      accentForeground: "oklch(0.2 0.04 30)",
      border: "oklch(1 0 0 / 12%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.79 0.14 70)",
    },
    effects: {
      glowIntensity: 0.9,
      shadowStrength: 0.7,
      borderRadius: "1rem",
      glassmorphism: 0.4,
      overlayDarkness: 0.7,
      particleDensity: 60,
      animationStyle: "dynamic",
    },
    typography: {
      displayFont: "'Cormorant Garamond', serif",
      bodyFont: "'Montserrat', sans-serif",
    },
  },
  "pastel-floral": {
    id: "pastel-floral",
    name: "Pastel Floral",
    colors: {
      ivory: "#FFF9FA",
      marigold: "#F8B4B4", // Dusty Rose
      maroon: "#6B4F4F",
      maroonDeep: "#483434",
      gold: "#E2B4B4",
      background: "#FFF9FA",
      foreground: "#483434",
      card: "#FFFFFF",
      cardForeground: "#483434",
      primary: "#F8B4B4",
      primaryForeground: "#FFFFFF",
      secondary: "#FDF0F1",
      secondaryForeground: "#483434",
      muted: "#FDF0F1",
      mutedForeground: "#9E8181",
      accent: "#F8B4B4",
      accentForeground: "#FFFFFF",
      border: "#F5E1E3",
      input: "#FDF0F1",
      ring: "#F8B4B4",
    },
    effects: {
      glowIntensity: 0.4,
      shadowStrength: 0.1,
      borderRadius: "2rem", // Very rounded
      glassmorphism: 0.15,
      overlayDarkness: 0.1,
      particleDensity: 20,
      animationStyle: "gentle",
    },
    typography: {
      displayFont: "'Rochester', cursive",
      bodyFont: "'Quicksand', sans-serif",
    },
  },
};
