import { useMemo } from "react";

export function useInvitationParams() {
  const params = useMemo(() => {
    if (typeof window === "undefined") return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  }, []);

  const guest = useMemo(() => {
    const raw = params.get("guest");
    if (!raw) return null;
    
    // Decode and sanitize (e.g. "Rahul%20Family" -> "Rahul Family")
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }, [params]);

  const side = useMemo(() => {
    const raw = params.get("side");
    if (!raw) return null;
    return raw.toLowerCase() === "bride" ? "bride" : "groom";
  }, [params]);

  return { guest, side };
}
