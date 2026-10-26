import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getStatTicker } from "@/lib/constants";
import { profile } from "@/data/profile";
import { StatTickerIcon } from "@/types";
import { ReactNode } from "react";
import Image from "next/image";
import { FiActivity, FiCode, FiFolder, FiGitCommit } from "react-icons/fi";

const statIconClassName = "h-4 w-4 text-[var(--color-accent)]";

const STAT_ICON_MAP: Record<StatTickerIcon, ReactNode> = {
  projects: <FiFolder className={statIconClassName} aria-hidden="true" />,
  years: <FiCode className={statIconClassName} aria-hidden="true" />,
  commits: <FiGitCommit className={statIconClassName} aria-hidden="true" />,
  certificates: <FiActivity className={statIconClassName} aria-hidden="true" />,
};

export async function AboutSection() {
  const statTicker = await getStatTicker();

  return (
    <AnimatedSection id="about" className="bg-[var(--color-bg-secondary)]">
      <div className="container-width grid gap-10 lg:grid-cols-5">
        <div className="order-last lg:order-first lg:col-span-3">
          <SectionHeader
            label="about"
            title={profile.aboutTitle}
          />
          {profile.aboutParagraphs.map((paragraph, index) => (
            <p key={index} className="max-w-2xl text-sm text-[var(--color-text-secondary)] lg:text-base mb-5">
              {paragraph}
            </p>
          ))}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {statTicker.map((fact) => (
              <div key={fact.id} className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 transition-all duration-300 hover:border-[var(--color-border-hover)] hover:shadow-2xl hover:shadow-[var(--color-accent-dim)]">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-dim)]">
                  {STAT_ICON_MAP[fact.icon]}
                </div>
                <p className="font-mono text-lg uppercase tracking-[0.08em] text-[var(--color-text-primary)] transition-colors duration-200 group-hover:text-[#ff2b3d]">
                  {fact.value}
                </p>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] transition-colors duration-200 group-hover:text-[#ffffffff]">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-first lg:order-last lg:col-span-2 flex align-middle">
          <div className="relative mx-auto flex w-full max-w-[16.5rem] overflow-hidden rounded-3xl transition-colors duration-[250ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:border-[var(--color-text-primary)] sm:max-w-[19rem] md:max-w-[22rem] lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[9/10] w-full">
              <Image
                src={profile.photo}
                alt={`${profile.shortName} portrait`}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 22rem, (min-width: 640px) 19rem, 16.5rem"
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 ease-in-out cursor-pointer"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
