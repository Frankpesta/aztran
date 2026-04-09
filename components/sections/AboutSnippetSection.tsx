"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Two-column narrative block linking to the full About narrative.
 */
export function AboutSnippetSection(): ReactElement {
  return (
    <section className="relative overflow-hidden bg-[var(--color-offwhite)] py-section dark:bg-[color-mix(in_srgb,var(--color-navy)_96%,black)]">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 max-md:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 90% 50%, color-mix(in srgb, var(--color-cyan) 8%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="mx-auto grid max-w-container gap-12 px-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="relative border-l-4 border-[var(--color-cyan)] bg-[color-mix(in_srgb,var(--color-white)_55%,transparent)] py-8 pl-8 pr-6 shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--color-navy)_25%,transparent)] backdrop-blur-[2px] dark:bg-[color-mix(in_srgb,var(--color-navy)_40%,transparent)]"
        >
          <SectionLabel className="mb-6 justify-start">Who we are</SectionLabel>
          <blockquote className="font-display text-h2 leading-snug text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            We steward capital with the same precision we demand of our own risk
            frameworks.
          </blockquote>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE_PREMIUM, delay: 0.1 }}
          className="space-y-5 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_85%,transparent)] dark:text-[color-mix(in_srgb,var(--color-offwhite)_88%,transparent)]"
        >
          <p>
            Aztran Global Investments Limited provides advisory, capital formation,
            and portfolio management services to sovereign entities, pension systems,
            and sophisticated private institutions.
          </p>
          <p>
            Our mandate emphasises downside discipline, transparent reporting, and
            alignment of incentives across each engagement.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 font-body text-label uppercase tracking-wide text-[var(--color-cyan)] transition-[gap,opacity] duration-300 hover:gap-4 hover:opacity-95"
          >
            Read Our Story
            <span className="nav-underline h-px w-12 bg-[var(--color-cyan)]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
