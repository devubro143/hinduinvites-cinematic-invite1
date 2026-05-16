import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { wedding } from "@/config/wedding";

export function MusicPlayer() {
  const { music } = wedding;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearFadeInterval = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  };

  const fadeIn = () => {
    if (!audioRef.current) return;
    clearFadeInterval();
    
    let vol = audioRef.current.volume;
    const targetVol = music.defaultVolume || 0.4;
    const step = 0.02;
    
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        clearFadeInterval();
        return;
      }
      
      vol = Math.min(targetVol, vol + step);
      audioRef.current.volume = vol;
      
      if (vol >= targetVol) {
        clearFadeInterval();
      }
    }, 50);
  };

  const fadeOut = (callback?: () => void) => {
    if (!audioRef.current) return;
    clearFadeInterval();
    
    let vol = audioRef.current.volume;
    const step = 0.05;
    
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        clearFadeInterval();
        return;
      }
      
      vol = Math.max(0, vol - step);
      audioRef.current.volume = vol;
      
      if (vol <= 0) {
        clearFadeInterval();
        audioRef.current.pause();
        if (callback) callback();
      }
    }, 50);
  };

  // 1. Initialize Audio Object
  useEffect(() => {
    if (!music.enabled || !music.src) return;

    const audio = new Audio(music.src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      clearFadeInterval();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [music.enabled, music.src]);

  // 2. Listen for Invitation Open
  useEffect(() => {
    const handleInvitationOpen = () => {
      setHasOpened(true);
      if (!audioRef.current) return;
      
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        fadeIn();
      }).catch(err => console.warn("Music play blocked:", err));
    };

    window.addEventListener("invitation:opened", handleInvitationOpen);
    return () => window.removeEventListener("invitation:opened", handleInvitationOpen);
  }, [music.defaultVolume]);

  // 3. Handle Visibility Change (Pause/Resume)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current || !hasOpened || isMuted) return;
      
      if (document.hidden) {
        fadeOut(() => setIsPlaying(false));
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          fadeIn();
        }).catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [hasOpened, isMuted, music.defaultVolume]);

  // 4. Handle External Audio Requests (e.g., from Video Premiere)
  useEffect(() => {
    const handleRequestPause = () => {
      if (!audioRef.current || !hasOpened) return;
      fadeOut(() => setIsPlaying(false));
    };

    const handleRequestResume = () => {
      if (!audioRef.current || !hasOpened || isMuted) return;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        fadeIn();
      }).catch(() => {});
    };

    window.addEventListener("music:request-pause", handleRequestPause);
    window.addEventListener("music:request-resume", handleRequestResume);
    return () => {
      window.removeEventListener("music:request-pause", handleRequestPause);
      window.removeEventListener("music:request-resume", handleRequestResume);
    };
  }, [hasOpened, isMuted, music.defaultVolume]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      setIsMuted(false);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        fadeIn();
      }).catch(() => {});
    } else {
      setIsMuted(true);
      fadeOut(() => setIsPlaying(false));
    }
  };

  if (!music.enabled || !music.src || !hasOpened) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-elegant transition-all duration-500 hover:scale-110 hover:bg-white/10 active:scale-95"
      >
        <span className={`absolute inset-0 rounded-full border border-accent/30 ${isPlaying ? "animate-ping opacity-20" : "opacity-0"}`} />
        
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-ivory/60 transition-colors group-hover:text-ivory" />
        ) : (
          <Volume2 className="h-5 w-5 text-accent animate-pulse transition-colors group-hover:text-marigold" />
        )}
      </button>
    </div>
  );
}
