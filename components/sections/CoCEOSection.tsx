"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactElement } from "react";
import { CO_CEOS } from "@/lib/team";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Featured co–managing partners: editorial layout and bios.
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
          id="co-managing-partners"
        >
          Co–managing partner leadership
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.05 }}
          className="mt-4 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_86%,transparent)] dark:text-[var(--color-silver)]"
        >
          Aztran is led by two co–managing partners with complementary mandates:
          investments, trading, and capital formation on one side; governance, risk, and
          institutional advisory on the other.
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
              <div className="relative aspect-[4/5] max-h-[min(440px,70vw)] w-full overflow-hidden sm:aspect-[3/4] sm:max-h-[480px]">
                <Image
                  src={ceo.imageSrc}
                  alt={
                    ceo.fullName?.trim()
                      ? `Portrait of ${ceo.fullName}`
                      : ""
                  }
                  fill
                  className="object-cover object-[center_12%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/45 via-transparent to-transparent opacity-90"
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-cyan)]" aria-hidden />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
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
                </div>
                <div className="mt-6 space-y-4 border-t border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pt-6 dark:border-[color-mix(in_srgb,var(--color-silver)_20%,transparent)]">
                  {ceo.bioParagraphs.map((para) => (
                    <p
                      key={para.slice(0, 48)}
                      className="font-body text-body leading-[1.75] text-[color-mix(in_srgb,var(--color-navy)_90%,transparent)] dark:text-[var(--color-silver)]"
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
