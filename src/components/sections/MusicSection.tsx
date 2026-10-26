"use client";

import React, { useState } from "react";
import { FaClock, FaPause, FaPlay, FaSpotify } from "react-icons/fa6";
import { useMusic } from "@/context/MusicContext";
import { Track, TRACKLIST } from "@/data/music";

export function MusicSection() {
  const { currentTrack, isPlaying, playTrack } = useMusic();
  const [hoveredTrackId, setHoveredTrackId] = useState<string | null>(null);

  return (
    <section id="music" className="section-padding relative">
      <div className="container-width">
        {/* Section Heading */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] sm:text-sm">
              // MUSIC I&apos;M LISTENING TO
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              Favorite Tracks
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
              The high-focus rotation tracks that soundtrack my code builds, reverse engineering, and system optimizations.
            </p>
          </div>

          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[#0d0d14] px-4 py-2 font-mono text-xs text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-border-hover)] hover:bg-[#161014] hover:text-[#1ed760]"
          >
            <FaSpotify className="h-4 w-4 text-[#1ed760]" />
            <span>Open in Spotify</span>
          </a>
        </div>

        {/* Spotify Popular Tracklist Table Container */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#0d0d14] p-3 shadow-2xl transition-colors duration-200 sm:p-6">
          {/* Table Header */}
          <div className="flex items-center border-b border-[var(--color-border)] px-3 pb-3 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            <span className="w-8 text-center">#</span>
            <span className="flex-1 pl-4">Title</span>
            <span className="hidden flex-1 pl-4 md:block">Album</span>
            <span className="flex w-16 items-center justify-end pr-2 text-right">
              <FaClock className="h-3 w-3 opacity-60" aria-label="Duration" />
            </span>
          </div>

          {/* Table Track Rows */}
          <div className="mt-2 divide-y divide-transparent space-y-1">
            {TRACKLIST.map((track: Track) => {
              const isCurrent = currentTrack.id === track.id;
              const isThisPlaying = isCurrent && isPlaying;
              const isHovered = hoveredTrackId === track.id;

              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  onMouseEnter={() => setHoveredTrackId(track.id)}
                  onMouseLeave={() => setHoveredTrackId(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      playTrack(track);
                    }
                  }}
                  className={`group flex items-center rounded-xl px-3 py-3 text-left transition-colors duration-150 cursor-pointer outline-none ${
                    isCurrent
                      ? "bg-[#161014] border-l-2 border-[#1ed760]"
                      : "bg-[#0d0d14] hover:bg-[#161014]"
                  }`}
                >
                  {/* Column 1: Track Number or Play/Pause Button */}
                  <div className="flex w-8 shrink-0 items-center justify-center">
                    {isHovered ? (
                      <button
                        type="button"
                        aria-label={isThisPlaying ? "Pause" : "Play"}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-transform duration-150 hover:scale-110"
                      >
                        {isThisPlaying ? (
                          <FaPause className="h-3 w-3 text-[#1ed760]" />
                        ) : (
                          <FaPlay className="ml-0.5 h-3 w-3 text-white" />
                        )}
                      </button>
                    ) : isThisPlaying ? (
                      <div className="flex items-end gap-0.5" aria-hidden="true">
                        <span className="h-3.5 w-1 rounded-full bg-[#1ed760] animate-pulse" />
                        <span className="h-5 w-1 rounded-full bg-[#1ed760] animate-[pulse_0.75s_ease-in-out_infinite]" />
                        <span className="h-2.5 w-1 rounded-full bg-[#1ed760] animate-pulse" />
                      </div>
                    ) : (
                      <span
                        className={`font-mono text-sm transition-colors duration-150 ${
                          isCurrent
                            ? "text-[#1ed760] font-bold"
                            : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]"
                        }`}
                      >
                        {track.number}
                      </span>
                    )}
                  </div>

                  {/* Column 2: Album Cover Thumbnail + Title & Artist */}
                  <div className="flex flex-1 items-center gap-3.5 overflow-hidden pl-4">
                    {/* Album Thumbnail */}
                    <div
                      className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${track.coverGradient} border border-white/10 shadow-md`}
                    >
                      <FaSpotify className="h-5 w-5 text-white/40" />
                    </div>

                    {/* Title & Artist */}
                    <div className="flex min-w-0 flex-col">
                      <span
                        className={`truncate text-sm font-medium transition-colors duration-150 ${
                          isCurrent
                            ? "text-[#1ed760] font-semibold"
                            : "text-[var(--color-text-primary)] group-hover:text-white"
                        }`}
                      >
                        {track.title}
                      </span>
                      <span className="truncate text-xs text-[var(--color-text-secondary)]">
                        {track.artist}
                      </span>
                    </div>
                  </div>

                  {/* Column 3: Album Name */}
                  <div className="hidden flex-1 overflow-hidden pl-4 md:block">
                    <span className="truncate text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]">
                      {track.album}
                    </span>
                  </div>

                  {/* Column 4: Duration */}
                  <div className="w-16 shrink-0 pr-2 text-right">
                    <span className="font-mono text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]">
                      {track.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)]">
            <span className="font-mono">
              Demo audio: Deftones – Entombed (Instrumental)
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#1ed760]">
              ● Real-time synced
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
