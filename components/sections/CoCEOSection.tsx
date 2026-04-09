"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { ReactElement } from "react";
import { CO_CEOS } from "@/lib/team";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Featured co-CEO pairing: editorial layout, bios, and LinkedIn.
 */
export function CoCEOSection(): ReactElement {
  return (
    <section className="relative overflow-hidden border-y border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_55%,var(--color-offwhite))] py-section dark:border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_92%,black)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 10% 20%, color-mix(in srgb, var(--color-cyan) 14%, transparent), transparent 55%), radial-gradient(ellipse 55% 40% at 90% 80%, color-mix(in srgb, var(--color-navy) 12%, transparent), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-container px-4 md:px-8">
        <SectionLabel>Leadership</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="mt-4 max-w-3xl font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
          id="co-chief-executives"
        >
          Joint chief executive leadership
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.05 }}
          className="mt-4 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_75%,transparent)] dark:text-[var(--color-silver)]"
        >
          Aztran is led by two co-chief executive officers whose mandates are complementary:
          markets and capital on one side; governance and institutional advisory on the other.
        </motion.p>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          {CO_CEOS.map((ceo, i) => (
            <motion.article
              key={ceo.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.65,
                ease: EASE_PREMIUM,
                delay: i * 0.12,
              }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_50%,transparent)] bg-[var(--color-white)] shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--color-navy)_28%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)]"
              aria-labelledby={`${ceo.id}-heading`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[5/3]">
                <Image
                  src={ceo.imageSrc}
                  alt={
                    ceo.fullName?.trim()
                      ? `Portrait of ${ceo.fullName}`
                      : ""
                  }
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/50 via-transparent to-transparent opacity-80"
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-cyan)]" aria-hidden />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-label uppercase tracking-[0.24em] text-[var(--color-cyan)]">
                      {ceo.title}
                    </p>
                    <h3
                      id={`${ceo.id}-heading`}
                      className="mt-2 font-display text-h3 leading-snug text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
                    >
                      {ceo.fullName?.trim() || ceo.leadershipFocus}
                    </h3>
                    {ceo.fullName?.trim() ? (
                      <p className="mt-2 font-body text-body text-[color-mix(in_srgb,var(--color-navy)_65%,transparent)] dark:text-[var(--color-silver)]">
                        {ceo.leadershipFocus}
                      </p>
                    ) : null}
                  </div>
                  <Link
                    href={ceo.linkedInHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-lg border border-[color-mix(in_srgb,var(--color-cyan)_40%,transparent)] px-3 py-2 font-body text-caption uppercase tracking-wider text-[var(--color-cyan)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)]"
                    aria-label={`LinkedIn — ${ceo.fullName?.trim() || ceo.leadershipFocus}`}
                  >
                    <span className="inline-flex items-center gap-2">
                      LinkedIn
                      <ExternalLink className="size-3.5 opacity-90" aria-hidden />
                    </span>
                  </Link>
                </div>
                <div className="mt-6 space-y-4 border-t border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pt-6 dark:border-[color-mix(in_srgb,var(--color-silver)_20%,transparent)]">
                  {ceo.bioParagraphs.map((para) => (
                    <p
                      key={para.slice(0, 48)}
                      className="font-body text-[15px] leading-[1.75] text-[color-mix(in_srgb,var(--color-navy)_80%,transparent)] dark:text-[var(--color-silver)]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
