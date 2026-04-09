"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { ReactElement } from "react";
import { EASE_PREMIUM } from "@/lib/animations";

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
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy)]/80 via-[var(--color-navy)]/88 to-[color-mix(in_srgb,var(--color-navy)_95%,var(--color-cyan)_5%)]"
        aria-hidden
      />
      <div
        className="marketing-glow-orb pointer-events-none absolute -left-24 top-1/4 size-72 rounded-full bg-[var(--color-cyan)] opacity-[0.12] blur-[100px]"
        aria-hidden
      />
      <div
        className="marketing-glow-orb pointer-events-none absolute -right-20 bottom-1/4 size-64 rounded-full bg-[var(--color-cyan)] opacity-[0.1] blur-[90px]"
        style={{ animationDelay: "-3s" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
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
          className="flex items-center gap-3 font-body text-label uppercase tracking-[0.42em] text-[color-mix(in_srgb,var(--color-silver)_95%,white)]"
        >
          <motion.span
            className="h-px w-10 origin-left bg-[var(--color-cyan)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.65, ease: EASE_PREMIUM }}
            aria-hidden
          />
          Aztran Global Investments
          <motion.span
            className="h-px w-10 origin-right bg-[var(--color-cyan)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.65, ease: EASE_PREMIUM }}
            aria-hidden
          />
        </motion.p>

        <h1
          className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-5"
          aria-label="Trading . Investments . Capital"
        >
          {HEADLINE.map((word, index) => (
            <span key={word} className="inline-flex items-center gap-x-3 sm:gap-x-5">
              {index > 0 ? (
                <span
                  className="select-none bg-gradient-to-b from-[var(--color-cyan)] to-[color-mix(in_srgb,var(--color-cyan)_55%,white)] bg-clip-text font-light not-italic text-transparent opacity-90"
                  aria-hidden
                >
                  {" . "}
                </span>
              ) : null}
              <motion.span
                className="font-display text-hero font-normal italic leading-[1.05] text-[var(--color-white)] [text-shadow:0_2px_40px_rgba(0,0,0,0.35)]"
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
          className="mt-7 max-w-[640px] font-body text-[15px] leading-[1.75] text-[color-mix(in_srgb,var(--color-silver)_92%,white)] md:text-[16px]"
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
