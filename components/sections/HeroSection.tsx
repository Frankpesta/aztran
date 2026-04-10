"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { ReactElement } from "react";
import { EASE_PREMIUM } from "@/lib/animations";
import { COMPANY_LEGAL_NAME } from "@/lib/brand";

const HEADLINE = ["Trading", "Investments", "Capital"] as const;

/**
 * Full-viewport hero: living photography, ambient light, staggered type, premium CTAs.
 */
export function HeroSection(): ReactElement {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-[-6%] marketing-hero-ken-burns">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover brightness-[1.12] contrast-[1.12] saturate-[1.18]"
            sizes="100vw"
          />
        </div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy)]/36 via-[var(--color-navy)]/48 to-[color-mix(in_srgb,var(--color-navy)_62%,var(--color-cyan)_10%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_42%,transparent_28%,color-mix(in_srgb,var(--color-navy)_48%,black)_100%)]"
        aria-hidden
      />
      <div
        className="marketing-glow-orb pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-[var(--color-cyan)] opacity-[0.07] blur-[100px]"
        aria-hidden
      />
      <div
        className="marketing-glow-orb pointer-events-none absolute -right-20 bottom-1/4 size-64 rounded-full bg-[var(--color-cyan)] opacity-[0.06] blur-[90px]"
        style={{ animationDelay: "-3s" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-[860px] flex-col items-center px-4 pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM }}
          className="mx-auto flex max-w-[min(100%,26rem)] flex-wrap items-center justify-center gap-3 text-center font-body text-[10px] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-silver)_95%,white)] sm:max-w-none sm:text-label sm:tracking-[0.32em]"
        >
          <motion.span
            className="h-px w-10 origin-left bg-[var(--color-cyan)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.65, ease: EASE_PREMIUM }}
            aria-hidden
          />
          {COMPANY_LEGAL_NAME}
          <motion.span
            className="h-px w-10 origin-right bg-[var(--color-cyan)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.65, ease: EASE_PREMIUM }}
            aria-hidden
          />
        </motion.p>

        <h1
          className="mx-auto mt-7 flex max-w-full flex-nowrap items-center justify-center gap-x-[0.12em] text-nowrap px-1 font-display text-[clamp(1.35rem,calc(4.2vw+0.35rem),5.5rem)] font-normal leading-[1.05] tracking-[-0.01em]"
          aria-label="Trading | Investments | Capital"
        >
          {HEADLINE.map((word, index) => (
            <span
              key={word}
              className="inline-flex shrink-0 items-center gap-x-[0.12em] sm:gap-x-[0.18em]"
            >
              {index > 0 ? (
                <span
                  className="select-none bg-gradient-to-b from-[var(--color-cyan)] to-[color-mix(in_srgb,var(--color-cyan)_55%,white)] bg-clip-text font-display text-[0.58em] font-medium not-italic text-transparent opacity-95"
                  aria-hidden
                >
                  |
                </span>
              ) : null}
              <motion.span
                className="italic text-[var(--color-white)] [text-shadow:0_2px_28px_rgba(0,0,0,0.4)]"
                initial={{ opacity: 0, y: reduce ? 0 : 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0.01 : 0.7,
                  ease: EASE_PREMIUM,
                  delay: 0.12 + index * 0.1,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_PREMIUM, delay: 0.45 }}
          className="mt-7 max-w-[640px] font-body text-body leading-[1.75] text-[color-mix(in_srgb,var(--color-silver)_92%,white)]"
        >
          Creating sustainable wealth for high net-worth individuals while optimizing returns on
          investible funds for corporates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.58 }}
          className="mt-11 flex flex-col gap-4 sm:flex-row sm:gap-5"
        >
          <Link
            href="/services"
            className="marketing-cta-primary rounded-sm bg-[var(--color-cyan)] px-9 py-3.5 font-body text-label uppercase tracking-[0.12em] text-[var(--color-navy)]"
          >
            Explore our investments solutions
          </Link>
          <Link
            href="/about"
            className="rounded-sm border border-[color-mix(in_srgb,var(--color-white)_85%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_6%,transparent)] px-9 py-3.5 font-body text-label uppercase tracking-[0.12em] text-[var(--color-white)] backdrop-blur-sm transition-[background-color,transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--color-white)_14%,transparent)] hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)]"
          >
            Our story
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.35 }}
          className="mt-24 flex flex-col items-center gap-2 text-[var(--color-silver)]"
          aria-hidden
        >
          <span className="font-body text-caption uppercase tracking-[0.35em] text-[color-mix(in_srgb,var(--color-silver)_88%,var(--color-cyan))]">
            Discover
          </span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <ChevronDown className="size-6 text-[var(--color-cyan)] opacity-90 drop-shadow-[0_0_12px_color-mix(in_srgb,var(--color-cyan)_50%,transparent)]" />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
