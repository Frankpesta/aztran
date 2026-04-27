"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactElement } from "react";
import { CO_CEOS, NON_EXECUTIVE_DIRECTOR_BOARD } from "@/lib/team";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExpandableBio } from "@/components/ui/ExpandableBio";
import { cn } from "@/lib/utils";

type BoardProfile = {
  id: string;
  title: string;
  displayName: string;
  imageSrc: string;
  imageClassName: string;
  bioParagraphs: readonly string[];
};

/**
 * Board of directors: co–managing partners and non-executive director.
 */
export function BoardSection(): ReactElement {
  const ned = NON_EXECUTIVE_DIRECTOR_BOARD;

  const profiles: BoardProfile[] = [
    ...CO_CEOS.map((member) => ({
      id: member.id,
      title: member.title,
      displayName: member.fullName?.trim() || member.leadershipFocus,
      imageSrc: member.imageSrc,
      imageClassName:
        member.id === "victor-aluyi"
          ? "object-cover object-[center_18%]"
          : "object-cover object-[center_20%]",
      bioParagraphs: member.bioParagraphs,
    })),
    {
      id: ned.id,
      title: ned.title,
      displayName: ned.fullName,
      imageSrc: ned.imageSrc,
      // Bias toward upper third so the face stays in view.
      imageClassName: "object-cover object-[50%_8%]",
      bioParagraphs: ned.bioParagraphs,
    },
  ];

  return (
    <section
      id="board"
      className="relative scroll-mt-[calc(4.75rem+1rem)] overflow-hidden border-t border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_88%,var(--color-offwhite))] py-section dark:border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28] dark:opacity-18"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in srgb, var(--color-cyan) 10%, transparent), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-container px-4 md:px-8">
        <SectionLabel>Board</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="mt-4 max-w-3xl font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
        >
          Board of Directors
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.05 }}
          className="mt-4 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]"
        >
          Our board consists of seasoned investment professionals with more than 50 years of
          combined experience and deep expertise in global and local markets, risk management,
          and governance.
        </motion.p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {profiles.map((profile, i) => (
            <motion.article
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.6,
                ease: EASE_PREMIUM,
                delay: i * 0.06,
              }}
              className="flex flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[var(--color-white)] shadow-[0_20px_50px_-36px_color-mix(in_srgb,var(--color-navy)_25%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5]">
                <Image
                  src={profile.imageSrc}
                  alt={`Portrait of ${profile.displayName}, ${profile.title}`}
                  fill
                  className={cn(profile.imageClassName)}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/40 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="font-body text-label uppercase tracking-[0.2em] text-[var(--color-cyan)]">
                  Board · {profile.title}
                </p>
                <p className="mt-2 font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                  {profile.displayName}
                </p>
                <div className="mt-6 border-t border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pt-6 dark:border-[color-mix(in_srgb,var(--color-silver)_20%,transparent)]">
                  <ExpandableBio bioId={profile.id} paragraphs={profile.bioParagraphs} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
