"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { useMusic } from "@/context/MusicContext";

export function HeroPlayButton() {
  const { isPlaying, togglePlay, currentTrack } = useMusic();

  return (
    <button
      type="button"
      onClick={togglePlay}
      aria-label={isPlaying ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
      className="group inline-flex min-h-[44px] items-center gap-2 md:gap-2.5 rounded-full border border-[var(--color-border)] bg-[#0d0d14] px-3.5 md:px-5 py-2.5 md:py-3 text-sm font-semibold tracking-wide text-[var(--color-text-primary)] transition-all duration-200 hover:scale-[1.02] hover:border-[var(--color-border-hover)] hover:bg-[#161014] hover:text-white cursor-pointer"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          isPlaying
            ? "bg-[#ff2b3d] text-white shadow-[0_0_12px_rgba(255,43,61,0.5)]"
            : "bg-[var(--color-surface-hover)] text-[#ff2b3d] group-hover:bg-[#ff2b3d] group-hover:text-white"
        }`}
      >
        {isPlaying ? (
          <FaPause className="h-2.5 w-2.5" />
        ) : (
          <FaPlay className="ml-0.5 h-2.5 w-2.5" />
        )}
      </span>

      <span className="hidden md:flex items-center gap-1.5">
        <span>{isPlaying ? "Pause" : "Play"}</span>
        <span className="font-mono text-xs text-[var(--color-text-secondary)] group-hover:text-white">
          {currentTrack.title}
        </span>
      </span>

      <span className="flex items-end gap-[3px] h-4" aria-hidden="true">
        <span
          className={`w-[2.5px] rounded-full bg-[#ff2b3d] transition-all duration-200 ${
            isPlaying ? "h-2.5 animate-pulse" : "h-2.5 opacity-85 group-hover:opacity-100"
          }`}
        />
        <span
          className={`w-[2.5px] rounded-full bg-[#ff2b3d] transition-all duration-200 ${
            isPlaying
              ? "h-4 animate-[pulse_0.7s_ease-in-out_infinite]"
              : "h-4 opacity-85 group-hover:opacity-100"
          }`}
        />
        <span
          className={`w-[2.5px] rounded-full bg-[#ff2b3d] transition-all duration-200 ${
            isPlaying ? "h-2 animate-pulse" : "h-2 opacity-85 group-hover:opacity-100"
          }`}
        />
      </span>
    </button>
  );
}
