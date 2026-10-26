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

const STORAGE_KEY = "wndr_audio_preference";

interface MusicContextType {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTrack: Track;
  currentLyricIndex: number;
  activeLyricText: string;
  lyrics: LyricLine[];
  startAudio: () => Promise<void>;
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

  // Baca preferensi tersimpan di localStorage saat mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.userPaused === "boolean") {
          userPausedRef.current = parsed.userPaused;
        }
      }
    } catch {
      // Abaikan jika localStorage tidak diizinkan
    }
  }, []);

  const savePreference = useCallback((paused: boolean) => {
    userPausedRef.current = paused;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ userPaused: paused, lastUpdated: Date.now() })
      );
    } catch {
      // Abaikan jika localStorage tidak tersedia
    }
  }, []);

  const lyrics = useMemo<LyricLine[]>(() => {
    return ENTOMBED_LYRICS;
  }, []);

  const currentLyricIndex = 0;
  const activeLyricText = "...";

  // Event listener audio HTML5
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

  // Dipanggil saat pengguna melakukan "tap anywhere" pada loading screen atau interaksi di mobile
  const startAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve();

    userPausedRef.current = false;
    savePreference(false);

    // Buka kunci AudioContext untuk mesin audio browser mobile
    if (typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          const ctx = new AudioCtx();
          if (ctx.state === "suspended") {
            ctx.resume().catch(() => {});
          }
        } catch {}
      }
    }

    const targetSrc = currentTrack.audioSrc || "/song/entombed-2.mp3";
    if (!audio.src || !audio.src.includes("entombed")) {
      audio.src = targetSrc;
    }

    try {
      audio.volume = 0.8;
    } catch {}

    try {
      if (audio.readyState === 0) {
        audio.load();
      }
    } catch {}

    const promise = audio.play();
    if (promise !== undefined) {
      return promise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio play blocked by browser policy:", err);
        });
    }
    return Promise.resolve();
  }, [currentTrack.audioSrc, savePreference]);

  // Listener interaksi global di mobile: jika lagu belum berjalan, sentuhan/klik berikutnya akan memutar
  useEffect(() => {
    if (isPlaying) return;

    const handleGlobalUnlock = () => {
      if (userPausedRef.current) return;
      startAudio();
    };

    window.addEventListener("click", handleGlobalUnlock, { passive: true });
    window.addEventListener("touchend", handleGlobalUnlock, { passive: true });

    return () => {
      window.removeEventListener("click", handleGlobalUnlock);
      window.removeEventListener("touchend", handleGlobalUnlock);
    };
  }, [isPlaying, startAudio]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      savePreference(true);
      audio.pause();
      setIsPlaying(false);
    } else {
      savePreference(false);
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
  }, [savePreference]);

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
        savePreference(false);
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Audio play error:", err);
          });
      }
    },
    [currentTrack.id, togglePlay, savePreference]
  );

  const pauseTrack = useCallback(() => {
    savePreference(true);
    audioRef.current?.pause();
    setIsPlaying(false);
  }, [savePreference]);

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
      startAudio,
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
      startAudio,
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
        src={currentTrack.audioSrc || "/song/entombed-2.mp3"}
        playsInline
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  );
}

const defaultMusicContext: MusicContextType = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  currentTrack: TRACKLIST[0],
  currentLyricIndex: 0,
  activeLyricText: "...",
  lyrics: ENTOMBED_LYRICS,
  startAudio: () => Promise.resolve(),
  togglePlay: () => {},
  playTrack: () => {},
  pauseTrack: () => {},
  seekTo: () => {},
};

export function useMusic() {
  const context = useContext(MusicContext);
  return context || defaultMusicContext;
}
