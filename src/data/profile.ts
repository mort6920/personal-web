import { SocialLink } from "@/types";

/**
 * ============================================================
 *  PROFILE — single source of truth for all personal content.
 * ============================================================
 * Edit the values below to personalize the site. Components only
 * READ from this file; no styling or animation lives here.
 *
 * Every field marked `TODO` still contains the original template
 * owner's data and must be replaced with your own.
 *
 * Related data files:
 *  - src/data/projects.ts      → project list
 *  - src/data/certificates.ts  → certificate list
 *  - src/data/experiences.ts   → experience timeline (/about)
 *  - src/data/techItems.ts     → skills / tech stack
 *  - src/lib/constants.ts      → stats numbers, nav links
 *
 * Media assets live in /public (URL paths omit "public"):
 *  - photo → public/assets/<file>   e.g. "/assets/profile.webp"
 *  - cv    → public/assets/cv/<file>
 *  - favicon → replace src/app/icon.png and src/app/favicon.ico
 */
export const profile = {
  // ---------- Identity ----------
  /** TODO: Full name — used in SEO title, JSON-LD, OG image alt. */
  fullName: "windra liansyah",
  /** TODO: Short / nickname — used in hero, about, footer, alt texts. */
  shortName: "Windra",
  /** TODO: Role / tagline — shown under the hero name and in SEO. */
  role: "IT Engineer | AI-Native Workflow",

  // ---------- Site ----------
  /** TODO: Production domain (overridden by NEXT_PUBLIC_SITE_URL env). */
  siteUrl: "https://windraliansyah.site",
  /** TODO: Google Search Console verification token, or "" to disable. */
  googleVerification: "",

  // ---------- Media ----------
  /** TODO: Profile photo path (portrait, approx. 2:3). */
  photo: "/assets/windra.webp",
  photoWidth: 650,
  photoHeight: 975,
  /** Logo shown in navbar & footer. */
  logo: "/assets/logo wndr original.png",
  /** TODO: CV file path for the "Download CV" button. */
  cv: "/assets/cv/cv windra1.pdf",

  // ---------- Hero ----------
  /**
   * TODO: Rotating status badge messages.
   * `width` controls the animated badge width — roughly match text length
   * (longer text → larger ch value).
   */
  heroStatus: [
    { text: "Available for new opportunities", width: "clamp(14rem, 70vw, 45ch)" },
    { text: "Currently studying cybersec", width: "clamp(12.5rem, 62vw, 37ch)" },
  ],
  /** TODO: Hero intro paragraph. */
  heroIntro:
    "IT Engineer with a degree in Computer and Network Engineering. combined my knowledge of hardware and networking fundamentals with AI-assisted workflows for troubleshooting, device optimization, and web development. Using AI as a tool to streamline my work. I always verify the results and take full responsibility for the technical decisions.",

  // ---------- About (home page) ----------
  /** TODO */
  aboutTitle: "Just a tech.",
  /** TODO */
  aboutParagraphs: [
    "My approach is simple: get the most out of the hardware without sacrificing stability. I enjoy troubleshooting problems that span hardware, BIOS settings, drivers, and system configuration.",
    "I combine hands-on experience in PC assembly and diagnostics with software optimization, to make systems faster, more stable, and less prone to bottlenecks. I configure BIOS settings and use AI to speed up diagnosis, verifying each fix before applying it.",
  ],

  // ---------- Detailed About (/about page) ----------
  /** TODO */
  detailedAboutParagraphs: [
    "Hi, I'm Windra, an IT Engineer and Device Optimizer with a background in Computer Engineering and Networking. I've optimized Windows devices, focusing on getting the most performance out of the hardware while keeping systems stable and responsive.",
    "My work covers motherboard BIOS configuration, driver and GPU setup, and Windows tuning such as debloating, registry, and service optimization. I mostly support clients remotely, and I also train others on optimization workflows.",
    "I use AI as a working tool to trace errors faster and build web projects more quickly, and I verify every fix before applying it. I'm self-taught, adapt quickly, and stay professional under pressure, while continuing to learn web development and cybersecurity fundamentals.",
  ],
  /** TODO */
  timelineTitle: "Technical Developments and Track Record",
  /** TODO */
  timelineDescription:
    "A self-taught journey from content creation and networking fundamentals to Windows optimization and software engineering.",

  // ---------- SEO ----------
  /** TODO */
  seoDescription:
    "Portfolio of Windra Budi Liansyah, an IT Engineer and Device Optimizer specializing in system efficiency, hardware optimization, and robust web engineering.",
  /** TODO */
  ogDescription:
    "A portfolio showcasing work in modern system optimization and engineering, featuring projects in device tweaking, software automation, and relevant professional certifications.",

  // ---------- Links & integrations ----------
  /** TODO: GitHub username — used for the total-commits stat. */
  githubUsername: "mort6920",
  /** TODO: "<user>/<repo>" of this website — used for the footer commit link. */
  siteRepo: "https://github.com/mort6920/personal-web.git",
  /** TODO: Social links shown in footer & contact section. */
  socialLinks: [
    { label: "GitHub", href: "https://github.com/mort6920" },
    { label: "LinkedIn", href: "" },
    { label: "Email", href: "winlian44@gmail.com" },
  ] as SocialLink[],

  // ---------- Contact form (Resend) ----------
  /** TODO: Sender address — must be on a domain verified in Resend. */
  contactFromEmail: "",
  /** TODO: Fallback inbox if CONTACT_EMAIL_TO env is not set. */
  contactToEmail: "winlian44@gmail.com",
};
