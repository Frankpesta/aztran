"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { ReactElement } from "react";
import { EASE_PREMIUM } from "@/lib/animations";
import { COMPANY_LEGAL_NAME } from "@/lib/brand";
import { HERO_PRIMARY_IMAGE, isRemoteHeroImage } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const HEADLINE = ["Trading", "Investments", "Capital"] as const;

const TRUST_PILLS = [
  "SEC-regulated",
  "Institutional grade",
  "Nigeria · Global markets",
] as const;

/**
 * Full-bleed hero: single building image with Ken Burns; light/dark veil stacks.
 */
export function HeroSection(): ReactElement {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[var(--color-navy)]">
      <div className="absolute inset-0" aria-hidden>
        <div
          className={cn(
            "absolute inset-[-6%]",
            !reduce && "marketing-hero-ken-burns",
          )}
        >
          <Image
            src={HERO_PRIMARY_IMAGE.src}
            alt={HERO_PRIMARY_IMAGE.alt}
            fill
            priority
            sizes="100vw"
            unoptimized={isRemoteHeroImage(HERO_PRIMARY_IMAGE.src)}
            className="object-cover object-center brightness-[1.06] contrast-[1.02] saturate-[1.12] dark:brightness-[0.88] dark:contrast-[1.06] dark:saturate-[1.05]"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] dark:hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_85%_at_50%_38%,color-mix(in_srgb,white_55%,transparent)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-cyan)_12%,white)]/55 via-transparent to-[color-mix(in_srgb,var(--color-cyan)_08%,white)]/35" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_28%,color-mix(in_srgb,white_50%,transparent)_55%,color-mix(in_srgb,white_88%,var(--color-offwhite))_92%,white_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,color-mix(in_srgb,var(--color-cyan)_06%,white)_0%,transparent_55%)] opacity-80" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] hidden dark:block"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy)]/75 via-[color-mix(in_srgb,var(--color-navy)_72%,black)]/88 to-[color-mix(in_srgb,var(--color-navy)_55%,black)]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_42%,transparent_22%,color-mix(in_srgb,var(--color-navy)_62%,black)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)]" />
        <div className="marketing-glow-orb absolute -left-28 top-1/4 size-[380px] rounded-full bg-[var(--color-cyan)] opacity-[0.09] blur-[100px]" />
        <div
          className="marketing-glow-orb absolute -right-24 bottom-1/4 size-[320px] rounded-full bg-[var(--color-cyan)] opacity-[0.06] blur-[90px]"
          style={{ animationDelay: "-2.5s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--color-cyan)_55%,white)] to-transparent marketing-hero-topline dark:via-[color-mix(in_srgb,var(--color-cyan)_70%,transparent)]"
        aria-hidden
      />

      {/* Clear fixed navbar (4.25rem / 4.75rem) + breathing room + safe area */}
      <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center px-4 pb-20 pt-[max(6.75rem,calc(4.25rem+1.75rem+env(safe-area-inset-top,0px)))] text-center sm:pt-[max(7rem,calc(4.25rem+2rem+env(safe-area-inset-top,0px)))] md:px-8 md:pb-24 md:pt-[max(8rem,calc(4.75rem+2.25rem+env(safe-area-inset-top,0px)))]">
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mx-auto flex max-w-[min(100%,28rem)] flex-wrap items-center justify-center gap-3 font-body text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-navy)_58%,var(--color-cyan))] sm:text-label sm:tracking-[0.32em] dark:text-[color-mix(in_srgb,var(--color-silver)_94%,white)]"
        >
          <motion.span
            className="h-px w-12 origin-left bg-[var(--color-cyan)] dark:opacity-90"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE_PREMIUM }}
            aria-hidden
          />
          {COMPANY_LEGAL_NAME}
          <motion.span
            className="h-px w-12 origin-right bg-[var(--color-cyan)] dark:opacity-90"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: EASE_PREMIUM }}
            aria-hidden
          />
        </motion.p>

        <motion.h1
          className="mt-8 flex max-w-full flex-wrap items-baseline justify-center gap-x-1.5 gap-y-1 font-display text-[clamp(2rem,5.5vw+0.5rem,4.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[var(--color-navy)] [text-shadow:0_2px_36px_color-mix(in_srgb,white_75%,transparent)] dark:font-medium dark:text-[var(--color-white)] dark:[text-shadow:0_4px_48px_rgba(0,0,0,0.55)]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: EASE_PREMIUM, delay: 0.06 }}
          aria-label="Trading · Investments · Capital"
        >
          {HEADLINE.map((word, index) => (
            <span key={word} className="inline-flex items-baseline gap-x-[0.14em]">
              {index > 0 ? (
                <span
                  className="select-none font-body text-[0.5em] font-normal text-[var(--color-cyan)] opacity-95 dark:text-[var(--color-cyan)]"
                  aria-hidden
                >
                  ·
                </span>
              ) : null}
              <span
                className={cn(
                  index === 1 &&
                    "bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-cyan)] to-[var(--color-navy)] bg-clip-text text-transparent [text-shadow:none] dark:from-[var(--color-white)] dark:via-[var(--color-cyan)] dark:to-[var(--color-white)]",
                )}
              >
                {word}
              </span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, ease: EASE_PREMIUM, delay: 0.14 }}
          className="mt-7 max-w-[34rem] font-body text-[1.0625rem] leading-[1.8] text-[color-mix(in_srgb,var(--color-navy)_76%,transparent)] md:text-[1.125rem] dark:text-[color-mix(in_srgb,var(--color-silver)_94%,white)] dark:[text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
        >
          Creating sustainable wealth for high net-worth individuals while optimizing returns on
          investible funds for corporates — with institutional clarity and discipline.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, ease: EASE_PREMIUM, delay: 0.22 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {TRUST_PILLS.map((label) => (
            <span
              key={label}
              className="rounded-full border border-[color-mix(in_srgb,var(--color-cyan)_38%,transparent)] bg-[color-mix(in_srgb,white_78%,transparent)] px-3.5 py-1.5 font-body text-caption uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-navy)_75%,transparent)] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] backdrop-blur-md dark:border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_45%,black)]/75 dark:text-[color-mix(in_srgb,var(--color-offwhite)_92%,transparent)] dark:shadow-none dark:backdrop-blur-xl"
            >
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM, delay: 0.3 }}
          className="mt-11 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5"
        >
          <Link
            href="/services"
            className="marketing-cta-primary inline-flex justify-center rounded-md bg-[var(--color-cyan)] px-10 py-3.5 text-center font-body text-label uppercase tracking-[0.12em] text-[var(--color-navy)] shadow-[0_14px_44px_-14px_color-mix(in_srgb,var(--color-cyan)_58%,transparent)] dark:shadow-[0_16px_48px_-12px_color-mix(in_srgb,var(--color-cyan)_45%,transparent)]"
          >
            Explore solutions
          </Link>
          <Link
            href="/about"
            className="inline-flex justify-center rounded-md border-2 border-[color-mix(in_srgb,var(--color-navy)_18%,transparent)] bg-[color-mix(in_srgb,white_82%,transparent)] px-10 py-3.5 text-center font-body text-label uppercase tracking-[0.12em] text-[var(--color-navy)] backdrop-blur-lg transition-[background-color,border-color,transform] hover:border-[color-mix(in_srgb,var(--color-cyan)_50%,var(--color-navy))] hover:bg-[color-mix(in_srgb,white_92%,var(--color-cyan))] dark:border-[color-mix(in_srgb,var(--color-white)_35%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_35%,black)]/55 dark:text-[var(--color-white)] dark:backdrop-blur-xl dark:hover:border-[var(--color-cyan)] dark:hover:bg-[color-mix(in_srgb,var(--color-navy)_25%,var(--color-cyan))]/40"
          >
            Our story
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.85 }}
          className="mt-16 flex flex-col items-center gap-2 text-[color-mix(in_srgb,var(--color-navy)_42%,transparent)] dark:text-[color-mix(in_srgb,var(--color-silver)_80%,transparent)]"
          aria-hidden
        >
          <span className="font-body text-caption uppercase tracking-[0.38em]">
            Discover
          </span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <ChevronDown className="size-6 text-[var(--color-cyan)] drop-shadow-[0_0_14px_color-mix(in_srgb,var(--color-cyan)_35%,transparent)]" />
          </motion.span>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-28 bg-gradient-to-t from-white to-transparent dark:from-[var(--color-navy)] dark:to-transparent"
        aria-hidden
      />
    </section>
  );
}
