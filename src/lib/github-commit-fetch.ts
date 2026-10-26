import { unstable_cache } from "next/cache";
import { profile } from "@/data/profile";

const GITHUB_USERNAME = profile.githubUsername;

export async function fetchGithubCommitRaw(): Promise<number> {
  const token =
    process.env.GITHUB_TOKEN ||
    process.env.GITHUB_PAT ||
    process.env.GH_TOKEN;

  const headers: HeadersInit = {
    "User-Agent": "Portfolio-App",
    "Accept": "application/vnd.github.cloak-preview+json, application/vnd.github+json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // 1. First attempt: Search API (searches commits authored across all GitHub repositories)
  let searchTotal = 0;
  try {
    const searchRes = await fetch(
      `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`,
      {
        headers,
        next: { revalidate: 300 },
      }
    );
    if (searchRes.ok) {
      const data = await searchRes.json();
      if (typeof data.total_count === "number") {
        searchTotal = data.total_count;
      }
    }
  } catch {
    // Continue to repo fallback
  }

  // 2. Second attempt: User repos iteration
  let repoTotal = 0;
  try {
    const reposUrl = token
      ? `https://api.github.com/user/repos?per_page=100&affiliation=owner`
      : `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;

    const repoRes = await fetch(reposUrl, {
      headers,
      next: { revalidate: 300 },
    });

    if (repoRes.ok) {
      const repos: { name: string; owner?: { login: string } }[] = await repoRes.json();
      if (Array.isArray(repos) && repos.length > 0) {
        const commitCounts = await Promise.all(
          repos.map(async (repo): Promise<number> => {
            try {
              const owner = repo.owner?.login || GITHUB_USERNAME;
              const r = await fetch(
                `https://api.github.com/repos/${owner}/${repo.name}/commits?per_page=1&author=${GITHUB_USERNAME}`,
                {
                  headers,
                  next: { revalidate: 300 },
                }
              );
              if (!r.ok) return 0;
              const link = r.headers.get("link");
              const match = link?.match(/page=(\d+)>; rel="last"/);
              if (match) return parseInt(match[1], 10);
              const commits = await r.json();
              return Array.isArray(commits) ? commits.length : 0;
            } catch {
              return 0;
            }
          })
        );
        repoTotal = commitCounts.reduce((a, b) => a + b, 0);
      }
    }
  } catch {
    // Ignore error
  }

  const finalTotal = Math.max(searchTotal, repoTotal);
  // Return live total, or fallback to 22 if unauthenticated rate limit occurs
  return finalTotal > 0 ? finalTotal : 22;
}

export const fetchGithubCommit = unstable_cache(
  fetchGithubCommitRaw,
  ["github-total-commits"],
  { revalidate: 300, tags: ["github-commits"] }
);