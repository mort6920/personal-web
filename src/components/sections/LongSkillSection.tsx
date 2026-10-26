"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { projects } from "@/data/projects";
import { techIcons } from "@/lib/techIcons";
import { useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { techItems, securityValues } from "@/data/techItems";

export function LongSkillsSection() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(marqueeRef, { amount: 0.2 });

  const rows = [techItems.slice(0, 14), techItems.slice(14)];

  // Faster on mobile (shorter duration) so it still feels lively on small screens
  const trackStyles: CSSProperties[] = [
    { "--marquee-duration": "30s", "--marquee-duration-mobile": "20s" } as CSSProperties,
    { "--marquee-duration": "30s", "--marquee-duration-mobile": "20s" } as CSSProperties,
  ];

  return (
    <AnimatedSection id="skills" className="bg-[var(--color-bg-secondary)]">
      <div className="container-width">
        <SectionHeader
          label="skills"
          title="The Architecture"
          description="Core technologies that I use and study to automate complex workflows."
        />

        <div className="mt-10">
          <div ref={marqueeRef} className="min-w-0 space-y-4 sm:space-y-6">
            {rows.map((row, rowIndex) => (
              <div key={'skills-row-' + rowIndex} className="marquee">
                <div
                  className="marquee-track"
                  data-direction={rowIndex % 2 === 1 ? "right" : "left"}
                  data-paused={isInView ? "false" : "true"}
                  style={trackStyles[rowIndex]}
                >
                  {[...row, ...row].map((item, itemIndex) => {
                    const iconEntry = techIcons[item.key];
                    const matchKeys = item.matchKeys ?? [item.key];
                    const relatedProjects = projects.filter((project) =>
                      matchKeys.some((key) => project.stack.includes(key))
                    );

                    return (
                      <div
                        key={item.key + '-' + itemIndex}
                        className="group relative marquee-item"
                      >
                        <button
                          type="button"
                          className="flex flex-col items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2 py-1.5 sm:py-2"
                          aria-label={'Projects using ' + item.label}
                        >
                          <span className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 items-center justify-center">
                            {iconEntry ? (
                              <iconEntry.icon
                                className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 transition-colors duration-200"
                                style={{ color: iconEntry.color }}
                              />
                            ) : (
                              <span className="px-1.5 text-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                                {item.badge ?? item.label}
                              </span>
                            )}
                          </span>

                          <span className="hidden xs:block text-center font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-colors duration-200 group-hover:text-[var(--color-text-primary)]">
                            {item.label}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
