"use client";

import React from "react";
import { useMusic } from "@/context/MusicContext";

export function FloatingLyrics() {
  const { isPlaying, currentTrack, togglePlay } = useMusic();

  return (
    <div className="flex flex-col items-start select-none">
      <button
        type="button"
        onClick={togglePlay}
        className="group flex flex-col items-start text-left outline-none cursor-pointer"
        title={isPlaying ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
      >
        {/* Minimalist Instrumental "..." Typography */}
        <span
          className={`font-mono text-4xl sm:text-5xl lg:text-6xl tracking-[0.4em] transition-all duration-300 ${isPlaying
            ? "text-white animate-pulse drop-shadow-[0_0_24px_rgba(255,255,255,0.45)]"
            : "text-white/30 group-hover:text-white/80"
            }`}
        >
          ...
        </span>

        {/* Discreet Track & Instrumental Status */}
        <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)] transition-colors duration-200 group-hover:text-[var(--color-text-secondary)]">
          {currentTrack.title} • Instrumental
        </span>
      </button>
    </div>
  );
}
