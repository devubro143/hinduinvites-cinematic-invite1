import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { wedding } from "@/config/wedding";

export function MusicPlayer() {
  const { music } = wedding;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!music.enabled || !music.src) return;
    const a = audioRef.current;
    if (!a) return;
    a.volume = music.defaultVolume;

    const tryStart = () => {
      a.play().then(() => setPlaying(true)).catch(() => {});
      window.removeEventListener("click", tryStart);
      window.removeEventListener("touchstart", tryStart);
    };
    window.addEventListener("click", tryStart, { once: true });
    window.addEventListener("touchstart", tryStart, { once: true });

    const onVis = () => {
      if (document.hidden) a.pause();
      else if (playing) a.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!music.enabled || !music.src) return null;

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <>
      <audio ref={audioRef} src={music.src} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant transition hover:scale-105"
      >
        {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
      </button>
    </>
  );
}
