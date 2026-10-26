import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { OWNER_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { profile } from "@/data/profile";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.fullName} | ${profile.role}`,
    template: `%s | ${profile.shortName}`,
  },
  description: profile.seoDescription,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: profile.googleVerification
    ? { google: profile.googleVerification }
    : undefined,
  icons: {
    icon: profile.logo,
    apple: profile.logo,
  },
  openGraph: {
    title: `${profile.fullName} | ${profile.role}`,
    description: profile.ogDescription,
    url: SITE_URL,
    siteName: OWNER_NAME,
    type: "website",
    images: [
      {
        url: new URL(profile.photo, SITE_URL).toString(),
        width: profile.photoWidth,
        height: profile.photoHeight,
        alt: `${profile.fullName} - ${profile.role}`,
      },
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    url: SITE_URL,
    image: new URL(profile.photo, SITE_URL).toString(),
    jobTitle: profile.role,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  });

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Analytics />
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personJsonLd }}
        />
      </head>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
