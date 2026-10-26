import { NavLink, SocialLink, StatTickerItem } from "@/types";
import { profile } from "@/data/profile";
import { fetchGithubCommit } from "./github-commit-fetch";

export const OWNER_NAME = profile.shortName;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || profile.siteUrl || "http://localhost:3000";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Certificates", href: "/certificates" },
];

// Edit social links in src/data/profile.ts (otomatis filter yang masih kosong)
export const SOCIAL_LINKS: SocialLink[] = profile.socialLinks
  .filter((link) => Boolean(link.href && link.href.trim()))
  .map((link) => {
    if (link.label === "Email" && !link.href.startsWith("mailto:")) {
      return { ...link, href: `mailto:${link.href}` };
    }
    return link;
  });

export const CATEGORY_LABELS = {
  "web-development": "Web Development",
  security: "Security",
  ctf: "CTF",
  daily: "Daily",
} as const;

export const NAVBAR_BOOT_DEBUG =
  process.env.NEXT_PUBLIC_NAVBAR_BOOT_DEBUG === "true";

export const NAVBAR_BOOT_DEBUG_MS = 5000;

export const STATIC_STATS = {
  projects: "3+",
  years: 3,
  certificates: "99%",
} as const;

const activateGithubStat = process.env.NODE_ENV === "production";

export async function getStatTicker() {
  const commitCount = activateGithubStat ? await fetchGithubCommit() : 100;

  return [
    {
      id: "projects",
      value: STATIC_STATS.projects,
      description: "Projects",
      icon: "projects",
    },
    {
      id: "years",
      value: `${STATIC_STATS.years}+`,
      description: "years experience in the IT field",
      icon: "years",
    },
    {
      id: "commits",
      value: commitCount.toLocaleString(),
      description: "Total GitHub commits",
      icon: "commits",
    },
    {
      id: "certificates",
      value: `${STATIC_STATS.certificates}`,
      description: "Performance uptime",
      icon: "certificates",
    },
  ] satisfies StatTickerItem[];
}

export const skillGroups = [
  {
    title: "Engineering",
    items: ["TypeScript", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Security",
    items: ["Threat Modeling", "AppSec", "Authentication", "Hardening"],
  },
  {
    title: "Operations",
    items: ["Docker", "Linux", "Monitoring", "CI/CD"],
  },
  {
    title: "Workflow",
    items: ["Architecture", "Code Review", "Automation", "Testing"],
  },
];