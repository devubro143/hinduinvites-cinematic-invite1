import { useState, useEffect, useRef } from "react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "@/components/SectionTitle";
import { Play } from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export function Video() {
  const { video } = wedding;
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const [apiReady, setApiReady] = useState(false);
  
  // Load YouTube API in background
  useEffect(() => {
    if (!video.enabled || !video.youtubeId) return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setApiReady(true);
      };
    } else {
      setApiReady(true);
    }
  }, [video.enabled, video.youtubeId]);

  // Handle state tracking once iframe is present
  useEffect(() => {
    if (isPlaying && apiReady && video.youtubeId && !playerRef.current) {
      const initPlayer = () => {
        try {
          playerRef.current = new window.YT.Player("youtube-player-iframe", {
            events: {
              onStateChange: (event: any) => {
                if (event.data === 1) { // Playing
                  window.dispatchEvent(new CustomEvent("music:request-pause"));
                } else if (event.data === 2 || event.data === 0) { // Paused or Ended
                  window.dispatchEvent(new CustomEvent("music:request-resume"));
                }
              },
            },
          });
        } catch (e) {
          console.warn("YT API Init Error:", e);
        }
      };

      // Slight delay to ensure iframe is in DOM
      const timer = setTimeout(initPlayer, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, apiReady, video.youtubeId]);

  const handlePlay = () => {
    setIsPlaying(true);
    // Immediate feedback for ambient music
    window.dispatchEvent(new CustomEvent("music:request-pause"));
  };

  if (!video.enabled) return null;

  return (
    <section id="video" className="relative px-6 py-24 sm:py-32 overflow-hidden bg-background">
      <SectionTitle eyebrow="The Premiere" title={video.title} />
      
      <div className="mx-auto mt-16 max-w-5xl relative group">
        <div 
          className={`absolute -inset-4 bg-maroon/20 blur-3xl rounded-[3rem] transition-opacity duration-1000 ${
            isPlaying ? "opacity-40" : "opacity-0 group-hover:opacity-20"
          }`} 
        />

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)]">
          {!isPlaying ? (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center">
              <img
                src={wedding.heroImage}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <button
                onClick={handlePlay}
                className="group/play relative z-40 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 hover:scale-110 hover:bg-white/20 active:scale-95"
              >
                <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-0 group-hover/play:opacity-100 transition-opacity" />
                <Play className="h-10 w-10 text-ivory fill-ivory translate-x-1 transition-transform group-hover/play:scale-110" />
              </button>

              <div className="absolute bottom-10 left-0 right-0 px-10 text-center">
                <p className="text-[10px] uppercase tracking-[0.6em] text-marigold mb-2">Exclusive Premiere</p>
                <h3 className="font-display text-3xl sm:text-4xl text-ivory">{video.title}</h3>
                <div className="mt-4 flex items-center justify-center gap-6 opacity-60">
                  <span className="text-[9px] uppercase tracking-[0.3em]">Cinematography</span>
                  <div className="h-px w-8 bg-white/20" />
                  <span className="text-[9px] uppercase tracking-[0.3em]">Love Story</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-fade h-full w-full">
              {video.youtubeId ? (
                <iframe
                  id="youtube-player-iframe"
                  className="absolute inset-0 h-full w-full border-0"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : video.localFile ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  poster={wedding.heroImage}
                  onPlay={() => window.dispatchEvent(new CustomEvent("music:request-pause"))}
                  onPause={() => window.dispatchEvent(new CustomEvent("music:request-resume"))}
                  onEnded={() => window.dispatchEvent(new CustomEvent("music:request-resume"))}
                >
                  <source src={video.localFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>
          )}
        </div>

        <div className="mt-8 text-center opacity-40">
          <p className="text-[10px] uppercase tracking-[0.4em]">Experience in full screen for best quality</p>
        </div>
      </div>
    </section>
  );
}
