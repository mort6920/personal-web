"use client";

import { useEffect, useState } from "react";

interface GithubCommitCounterProps {
  initialCount: string | number;
}

export function GithubCommitCounter({ initialCount }: GithubCommitCounterProps) {
  const [commits, setCommits] = useState<string | number>(initialCount);

  useEffect(() => {
    let isMounted = true;

    async function fetchLiveCommits() {
      try {
        const res = await fetch("/api/github-commits");
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && typeof data.commits === "number" && data.commits > 0) {
          setCommits(data.commits.toLocaleString());
        }
      } catch {
        // keep initial count on error
      }
    }

    fetchLiveCommits();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <p className="font-mono text-lg uppercase tracking-[0.08em] text-[var(--color-text-primary)] transition-colors duration-200 group-hover:text-[#ff2b3d]">
      {commits}
    </p>
  );
}
