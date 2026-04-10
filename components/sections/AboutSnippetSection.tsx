"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HOME_ABOUT_IMAGE } from "@/lib/home-assets";
import { cn } from "@/lib/utils";

/**
 * Two-column narrative block linking to the full About narrative.
 */
export function AboutSnippetSection({
  homepage = false,
}: {
  homepage?: boolean;
} = {}): ReactElement {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-section",
        homepage
          ? "bg-[linear-gradient(180deg,#ffffff_0%,#f9fdfd_100%)] dark:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-navy)_98%,black)_0%,color-mix(in_srgb,var(--color-navy)_91%,black)_100%)]"
          : "bg-[var(--color-offwhite)] dark:bg-[color-mix(in_srgb,var(--color-navy)_96%,black)]",
      )}
    >
      {homepage ? (
        <>
          <div
            className="pointer-events-none absolute -left-24 top-1/4 size-[min(100vw,28rem)] rounded-full bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] blur-[100px] dark:bg-[color-mix(in_srgb,var(--color-cyan)_16%,transparent)] dark:opacity-70"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-0 size-[min(90vw,22rem)] rounded-full bg-[color-mix(in_srgb,var(--color-navy)_10%,var(--color-cyan))] opacity-50 blur-[80px] dark:opacity-35"
            aria-hidden
          />
        </>
      ) : null}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 max-md:hidden"
        style={{
          background: homepage
            ? "radial-gradient(ellipse 80% 70% at 90% 50%, color-mix(in srgb, var(--color-cyan) 14%, transparent), transparent 72%)"
            : "radial-gradient(ellipse 80% 70% at 90% 50%, color-mix(in srgb, var(--color-cyan) 8%, transparent), transparent 70%)",
        }}
        aria-hidden
      />
      {homepage ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in srgb, var(--color-navy) 6%, transparent) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
          aria-hidden
        />
      ) : null}
      <div className="relative z-[1] mx-auto grid max-w-container gap-12 px-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="relative border-l-4 border-[var(--color-cyan)] bg-[color-mix(in_srgb,var(--color-white)_55%,transparent)] py-8 pl-8 pr-6 shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--color-navy)_25%,transparent)] backdrop-blur-[2px] dark:bg-[color-mix(in_srgb,var(--color-navy)_40%,transparent)]"
        >
          <SectionLabel className="mb-6 justify-start">Who we are</SectionLabel>
          <blockquote className="font-display text-h2 leading-snug text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            A financial services group specializing in portfolio management and
            strategic trading.
          </blockquote>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE_PREMIUM, delay: 0.1 }}
          className="space-y-8 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_92%,transparent)] dark:text-[color-mix(in_srgb,var(--color-offwhite)_88%,transparent)]"
        >
          {homepage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.05 }}
              className="relative aspect-[16/10] w-full max-w-lg overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_28%,transparent)] shadow-[0_28px_70px_-28px_color-mix(in_srgb,var(--color-navy)_35%,transparent)] md:max-w-none dark:border-[color-mix(in_srgb,var(--color-cyan)_22%,transparent)] dark:shadow-[0_28px_70px_-28px_rgba(0,0,0,0.5)]"
            >
              <Image
                src={HOME_ABOUT_IMAGE}
                alt=""
                fill
                className="object-cover brightness-[1.03] contrast-[1.02] saturate-[1.06] dark:brightness-[0.88] dark:saturate-[1.02]"
                sizes="(min-width: 768px) 42vw, 100vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] via-transparent to-transparent opacity-90 dark:from-[color-mix(in_srgb,var(--color-navy)_55%,transparent)] dark:opacity-80"
                aria-hidden
              />
              <div
                className="absolute inset-0 ring-1 ring-inset ring-[color-mix(in_srgb,white_25%,transparent)] dark:ring-[color-mix(in_srgb,var(--color-white)_08%,transparent)]"
                aria-hidden
              />
            </motion.div>
          ) : null}
          <div className="space-y-5">
          <p>
            Aztran Limited is an investment firm licensed by the Securities and Exchange
            Commission as a fund and portfolio manager—focused on sustainable wealth for
            high net-worth individuals and optimized returns on investible funds for
            corporates (private and government).
          </p>
          <p>
            We combine deep market expertise with a client-focused approach to trading,
            investments, and advisory—guided by integrity, empathy, excellence,
            innovation, collaboration, and responsibility.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-3 font-body text-label uppercase tracking-wide text-[var(--color-cyan)] transition-[gap,opacity] duration-300 hover:gap-4 hover:opacity-95"
          >
            Read Our Story
            <span className="nav-underline h-px w-12 bg-[var(--color-cyan)]" />
          </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
