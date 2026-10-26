"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ENTOMBED_LYRICS, LyricLine, Track, TRACKLIST } from "@/data/music";

interface MusicContextType {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTrack: Track;
  currentLyricIndex: number;
  activeLyricText: string;
  lyrics: LyricLine[];
  togglePlay: () => void;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  seekTo: (seconds: number) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track>(TRACKLIST[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(TRACKLIST[0].durationSeconds);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef<boolean>(false);

  const lyrics = useMemo<LyricLine[]>(() => {
    return ENTOMBED_LYRICS;
  }, []);

  const currentLyricIndex = 0;
  const activeLyricText = "...";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Aggressive instant autoplay execution
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let unlocked = false;

    const tryAutoplay = () => {
      if (userPausedRef.current || unlocked) return;
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            unlocked = true;
            setIsPlaying(true);
            cleanup();
          })
          .catch(() => {
            // Browser autoplay policy requires user gesture; await interaction
          });
      }
    };

    const handleInteraction = () => {
      if (userPausedRef.current) {
        cleanup();
        return;
      }
      tryAutoplay();
    };

    const cleanup = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("touchend", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("visibilitychange", handleInteraction);
    };

    // Execute immediately on page load
    tryAutoplay();

    // In case browser policy temporarily deferred it, listen for any interaction
    window.addEventListener("click", handleInteraction, { once: true, passive: true });
    window.addEventListener("keydown", handleInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    window.addEventListener("touchend", handleInteraction, { once: true, passive: true });
    window.addEventListener("pointerdown", handleInteraction, { once: true, passive: true });
    window.addEventListener("scroll", handleInteraction, { once: true, passive: true });
    document.addEventListener("visibilitychange", handleInteraction, { once: true, passive: true });

    return cleanup;
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    } else {
      userPausedRef.current = false;
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Audio play blocked by browser:", err);
          });
      }
    }
  }, []);

  const playTrack = useCallback(
    (track: Track) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (currentTrack.id === track.id) {
        togglePlay();
        return;
      }

      setCurrentTrack(track);
      if (track.audioSrc) {
        audio.src = track.audioSrc;
        audio.currentTime = 0;
        userPausedRef.current = false;
        audio.play().then(() => setIsPlaying(true)).catch((err) => {
          console.warn("Audio play error:", err);
        });
      }
    },
    [currentTrack.id, togglePlay]
  );

  const pauseTrack = useCallback(() => {
    userPausedRef.current = true;
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const seekTo = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(seconds, audio.duration || seconds));
    setCurrentTime(audio.currentTime);
  }, []);

  const value = useMemo(
    () => ({
      isPlaying,
      currentTime,
      duration,
      currentTrack,
      currentLyricIndex,
      activeLyricText,
      lyrics,
      togglePlay,
      playTrack,
      pauseTrack,
      seekTo,
    }),
    [
      isPlaying,
      currentTime,
      duration,
      currentTrack,
      currentLyricIndex,
      activeLyricText,
      lyrics,
      togglePlay,
      playTrack,
      pauseTrack,
      seekTo,
    ]
  );

  return (
    <MusicContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={currentTrack.audioSrc || "/song/entombed.mp3"}
        autoPlay
        playsInline
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
