"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { useScrollNavbar } from "@/hooks/useScrollNavbar";
import { useMusic } from "@/context/MusicContext";
import styles from "./NavbarLoader.module.css";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bootPhase, setBootPhase] = useState<"loading" | "capsule" | "normal">(
    "loading",
  );
  const [hasBootWaitCompleted, setHasBootWaitCompleted] = useState(false);

  const initialCapsuleWidth = "min(360px, calc(100% - 32px))";
  const isLoadingPhase = bootPhase === "loading";
  const isCapsulePhase = bootPhase === "capsule";
  const isNormalPhase = bootPhase === "normal";
  const isIntroPhase = !isNormalPhase;

  const { isScrolled } = useScrollNavbar(isNormalPhase);
  const capsuleWidth = isScrolled ? "min(700px, calc(100% - 32px))" : "100%";
  const capsuleRadius = capsuleWidth === "100%" ? "0px" : "999px";

  const { startAudio } = useMusic();

  const handleTapToEnter = useCallback(() => {
    if (bootPhase !== "loading") return;

    // Putar lagu saat pengguna mengetuk layar
    startAudio();

    // Jalankan animasi transisi logo dan navbar
    setHasBootWaitCompleted(true);
    setBootPhase("capsule");
  }, [bootPhase, startAudio]);

  useEffect(() => {
    if (bootPhase !== "loading") return;

    const handleEvent = () => {
      handleTapToEnter();
    };

    window.addEventListener("click", handleEvent, { once: true });
    window.addEventListener("touchend", handleEvent, { once: true });
    window.addEventListener("keydown", handleEvent, { once: true });

    return () => {
      window.removeEventListener("click", handleEvent);
      window.removeEventListener("touchend", handleEvent);
      window.removeEventListener("keydown", handleEvent);
    };
  }, [bootPhase, handleTapToEnter]);

  useEffect(() => {
    const root = document.documentElement;
    if (isNormalPhase) {
      root.dataset.appBootReady = "true";
      root.dataset.appBootPhase = "normal";
      window.dispatchEvent(new Event("app:boot-ready"));
      return;
    }
    root.dataset.appBootReady = "false";
  }, [isNormalPhase]);

  return (
    <motion.div className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <motion.header
        initial={{
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          y: 0,
        }}
        transition={{
          width: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          height: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          borderRadius: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        }}
        animate={{
          width: !hasBootWaitCompleted
            ? "100vw"
            : isCapsulePhase
              ? initialCapsuleWidth
              : capsuleWidth,
          height: !hasBootWaitCompleted ? "100vh" : "var(--nav-height)",
          borderRadius: !hasBootWaitCompleted
            ? "0px"
            : isCapsulePhase
              ? "999px"
              : capsuleRadius,
          y: isLoadingPhase ? 0 : isNormalPhase && isScrolled ? 12 : 0,
        }}
        onAnimationComplete={() => {
          if (bootPhase === "capsule") {
            setBootPhase("normal");
          }
        }}
        style={{
          transform: "translateZ(0)",
          willChange: "transform, width, height, border-radius",
        }}
        onClick={isLoadingPhase ? handleTapToEnter : undefined}
        onTouchEnd={isLoadingPhase ? handleTapToEnter : undefined}
        className={cn(
          "relative mx-auto flex flex-col items-center justify-between border",
          isNormalPhase ? "overflow-visible" : "overflow-hidden",
          isLoadingPhase && "z-[70] cursor-pointer select-none",
          "border-[var(--color-border)]",
          isNormalPhase ? "bg-[var(--color-surface)]/80" : "bg-[var(--color-surface)]",
          "transition-[box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          isLoadingPhase
            ? "shadow-[0_4px_14px_0_rgba(0,0,0,0.2)]"
            : isIntroPhase
              ? "shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] backdrop-blur-md"
              : "shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-2xl backdrop-saturate-150",
        )}
      >
        {/* Centered Logo & Flashing Dots with smooth slide-to-left transition */}
        <AnimatePresence>
          {!isNormalPhase ? (
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -140 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            >
              <Image
                src={profile.logo}
                alt={profile.shortName}
                width={120}
                height={35}
                priority
                className="h-8 w-auto object-contain"
              />
              {isLoadingPhase ? (
                <div className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 translate-y-11 flex-col items-center gap-2.5">
                  <span className={styles.loader} />
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-text-secondary)] animate-pulse select-none">
                    tap anywhere
                  </span>
                </div>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Inner Navbar Content */}
        <div
          className={cn(
            "mx-auto flex w-full items-center justify-between",
            isScrolled
              ? "h-[var(--nav-height)] px-3 sm:px-4 md:px-5"
              : "h-[var(--nav-height)] px-4 md:px-6",
          )}
        >
          {/* Logo on the left side (fades in as center logo slides out) */}
          <motion.div
            initial={false}
            animate={{ opacity: isNormalPhase ? 1 : 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-center"
          >
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="Go to home"
            >
              <Image
                src={profile.logo}
                alt={profile.shortName}
                width={110}
                height={32}
                priority
                className="ml-2 h-7 sm:h-8 w-auto object-contain"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.nav
            initial={false}
            animate={{ opacity: isNormalPhase ? 1 : 0 }}
            transition={{
              duration: 0.4,
              delay: isNormalPhase ? 0.1 : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="hidden items-center gap-2 lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-text-secondary)] transition-colors duration-150 hover:text-[#ff2b3d]",
                    active && "text-[var(--color-text-primary)] hover:text-[#ff2b3d]",
                  )}
                >
                  <AnimatePresence initial={false}>
                    {active ? (
                      <motion.span
                        key="nav-pill"
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-[var(--color-border-hover)] bg-[var(--color-accent-dim)]"
                        transition={{
                          duration: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    ) : null}
                  </AnimatePresence>
                  {link.label}
                </Link>
              );
            })}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[var(--color-text-primary)] lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            initial={false}
            animate={{ opacity: isNormalPhase ? 1 : 0 }}
            transition={{
              duration: 0.3,
              delay: isNormalPhase ? 0.1 : 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em]">
              Menu
            </span>
          </motion.button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileOpen && isNormalPhase ? (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute left-0 right-0 top-full z-40 mt-2 grid w-full gap-2 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 pb-4 pt-2 shadow-[0_10px_28px_rgba(0,0,0,0.35)] lg:hidden"
            >
              {NAV_LINKS.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex min-h-[44px] items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)] transition-colors duration-150 hover:text-[#ff2b3d]",
                      active &&
                      "border-[var(--color-border-hover)] bg-[var(--color-accent-dim)] text-[var(--color-accent)] hover:text-[#ff2b3d]",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </motion.header>
    </motion.div>
  );
}