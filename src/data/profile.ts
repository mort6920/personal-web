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
  shortName: "windra",
  /** TODO: Role / tagline — shown under the hero name and in SEO. */
  role: "Technical IT and device optimizer",

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
    "Technical IT and A Device Optimization Engineer specializing in system performance across the entire spectrum from low-level to high-level operations. I build robust and responsive processing mechanisms, with a focus on automated tune-ups and real-time memory optimization.",

  // ---------- About (home page) ----------
  /** TODO */
  aboutTitle: "Just a tech.",
  /** TODO */
  aboutParagraphs: [
    "My approach is simple: maximize hardware efficiency without compromising system durability. I thrive on complex technical challenges where hardware integration, BIOS/firmware configuration, and real-time system refinement work in tandem.",
    "I combine expertise in hardware assembly and diagnostics with software optimization techniques to deliver systems that are responsive, stable, and free from bottlenecks.",
  ],

  // ---------- Detailed About (/about page) ----------
  /** TODO */
  detailedAboutParagraphs: [
    "Hi, I’m Windra. I am an IT Engineer and Device Optimizer with a background in Computer Engineering and Networking (TKJ), dedicated to maximizing hardware performance and designing efficient systems. My approach to device optimization is rooted in a deep understanding of both hardware and software architecture, ensuring that every system I fine-tune remains responsive, stable, and free from bottlenecks.",
    "Whether I am performing remote hardware optimization, exploring software engineering, or delving into cybersecurity, my focus remains on enhancing system efficiency and performance reliability. Beyond my technical routine, I enjoy solving complex problems where physical architecture, execution speed, and security intersect.",
    "Through hands-on professional experience and intensive self-directed learning, I have developed the ability to adapt quickly and resolve technical challenges under pressure. I am committed to continuously increasing my professional value, leveraging modern technology and an efficiency-driven mindset to deliver robust, reliable device solutions.",
  ],
  /** TODO */
  timelineTitle: "Technical Developments and Track Record",
  /** TODO */
  timelineDescription:
    "Developing technical expertise through practical field experience, self-directed learning, and accelerated software development. This timeline illustrates a journey spanning from the fundamentals of computer networking to the execution of system optimization and software engineering.",

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
