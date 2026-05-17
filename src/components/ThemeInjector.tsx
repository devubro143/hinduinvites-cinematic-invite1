import { useEffect } from "react";
import { wedding } from "@/config/wedding";

export function ThemeInjector() {
  const { theme } = wedding;

  useEffect(() => {
    const root = document.documentElement;
    const { colors, effects, typography } = theme;

    // Apply colors
    Object.entries(colors).forEach(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      root.style.setProperty(`--${cssKey}`, value as string);
    });

    // Apply effects
    root.style.setProperty("--glow-intensity", effects.glowIntensity.toString());
    root.style.setProperty("--shadow-strength", effects.shadowStrength.toString());
    root.style.setProperty("--radius", effects.borderRadius);
    root.style.setProperty("--glassmorphism", effects.glassmorphism.toString());
    root.style.setProperty("--overlay-darkness", effects.overlayDarkness.toString());
    root.style.setProperty("--particle-density", effects.particleDensity.toString());
    
    // Apply typography
    root.style.setProperty("--font-display", typography.displayFont);
    root.style.setProperty("--font-body", typography.bodyFont);

    // Dynamic class for animation style
    const animationClasses = ["theme-anim-classic", "theme-anim-cinematic", "theme-anim-gentle", "theme-anim-dynamic"];
    root.classList.remove(...animationClasses);
    root.classList.add(`theme-anim-${effects.animationStyle}`);

    // Update class for dark mode if theme is inherently dark
    if (theme.id === "dark-cinematic") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
