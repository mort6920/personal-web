"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 50;

export function useScrollNavbar(enabled = true) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsScrolled(false);
      return;
    }

    let prevScrolled = false;
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const currentScroll = scrollY > SCROLL_THRESHOLD;
      if (currentScroll !== prevScrolled) {
        prevScrolled = currentScroll;
        setIsScrolled(currentScroll);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [enabled]);

  return { isScrolled };
}
