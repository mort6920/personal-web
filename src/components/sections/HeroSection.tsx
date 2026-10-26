"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { HeroPlayButton } from "@/components/music/HeroPlayButton";
import { profile } from "@/data/profile";

const STATUS_MESSAGES = profile.heroStatus.map((status) => status.text);

export function HeroSection() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % STATUS_MESSAGES.length);
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      {/* Main Hero Content: Exactly in its original centered position */}
      <div className="relative z-20 flex min-h-[100vh] items-center">
        <div className="container-width flex w-full flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
          {/* Status Badge: auto-sizing pill with text visible on all devices */}
          <div className="animate-hero-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-accent-dim)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)] sm:text-xs sm:tracking-[0.16em]">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#ff2b3d] shadow-[0_0_8px_rgba(255,43,61,0.6)]" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={STATUS_MESSAGES[statusIndex]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="whitespace-nowrap"
              >
                {STATUS_MESSAGES[statusIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <h1 className="animate-hero-fade-in-up animation-delay-120 text-gradient text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl xl:text-8xl">
            Hi, I&apos;m {profile.shortName}
          </h1>

          <p className="animate-hero-fade-in-up animation-delay-240 mt-5 max-w-2xl text-base text-[var(--color-text-secondary)] lg:text-xl">
            {profile.role}
          </p>

          <p className="animate-hero-fade-in-up animation-delay-360 mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base lg:text-lg">
            {profile.heroIntro}
          </p>

          {/* Mobile Buttons & Music Layout (< md) matching sketch */}
          <div className="animate-hero-fade-in-up animation-delay-480 mt-8 flex flex-col items-center justify-center gap-3 w-full max-w-xs md:hidden">
            {/* Row 1: Get in Touch & Download CV side by side */}
            <div className="flex w-full items-center justify-center gap-3">
              <Button href="#contact" variant="primary" className="flex-1">
                Get in Touch
              </Button>
              {profile.cv ? (
                <Button href={profile.cv} variant="outlined" download className="flex-1">
                  Download CV
                </Button>
              ) : null}
            </div>

            {/* Row 2: Play Button centered */}
            <div className="flex w-full justify-center">
              <HeroPlayButton />
            </div>
          </div>

          {/* Desktop Layout (md+) — 100% UNTOUCHED ORIGINAL DESKTOP */}
          <div className="animate-hero-fade-in-up animation-delay-480 mt-8 hidden md:flex flex-wrap justify-center gap-3">
            <Button href="#contact" variant="primary">
              Get in Touch
            </Button>
            <HeroPlayButton />
            {profile.cv ? (
              <Button href={profile.cv} variant="outlined" download>
                Download CV
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
