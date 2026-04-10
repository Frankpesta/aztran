"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useState,
  type ReactElement,
} from "react";
import { EASE_PREMIUM } from "@/lib/animations";
import { COMPANY_LEGAL_NAME } from "@/lib/brand";
import {
  HERO_SLIDES,
  HERO_SLIDE_INTERVAL_MS,
  isRemoteHeroImage,
} from "@/lib/hero-slides";
import { cn } from "@/lib/utils";

const HEADLINE = ["Trading", "Investments", "Capital"] as const;

const TRUST_PILLS = [
  "SEC-regulated",
  "Institutional grade",
  "Nigeria · Global markets",
] as const;

/**
 * Full-bleed hero: slideshow (building + home images), scrims, centered content.
 */
export function HeroSection(): ReactElement {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const slideCount = HERO_SLIDES.length;

  const go = useCallback(
    (i: number) => {
      setActive(((i % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  useEffect(() => {
    if (reduce || slideCount <= 1) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % slideCount);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [reduce, slideCount]);

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[var(--color-navy)]">
      <div className="absolute inset-0" aria-hidden>
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[900ms] ease-out",
              i === active ? "z-[0] opacity-100" : "z-[0] opacity-0",
            )}
          >
            <div
              className={cn(
                "absolute inset-[-6%]",
                i === active && !reduce && "marketing-hero-ken-burns",
              )}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                unoptimized={isRemoteHeroImage(slide.src)}
                className="object-cover object-center brightness-[0.98] contrast-[1.04] saturate-[1.06] dark:brightness-[0.92] dark:contrast-[1.05] dark:saturate-[1.05]"
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] dark:hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[color-mix(in_srgb,white_10%,transparent)]" />
        <div
          className={cn(
            "absolute inset-0 bg-[radial-gradient(ellipse_96%_78%_at_50%_42%,color-mix(in_srgb,white_72%,transparent)_0%,color-mix(in_srgb,white_38%,transparent)_40%,color-mix(in_srgb,white_16%,transparent)_58%,transparent_78%)]",
            !reduce && "marketing-hero-light-scrim-fade",
          )}
        />
        <div className="absolute inset-y-0 left-0 w-[min(36%,16rem)] bg-gradient-to-r from-[color-mix(in_srgb,white_55%,transparent)] via-[color-mix(in_srgb,white_22%,transparent)] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[min(36%,16rem)] bg-gradient-to-l from-[color-mix(in_srgb,white_55%,transparent)] via-[color-mix(in_srgb,white_22%,transparent)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,white_42%,transparent)] via-[color-mix(in_srgb,white_14%,transparent)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-cyan)_06%,white)]/35 via-transparent to-[color-mix(in_srgb,var(--color-cyan)_04%,white)]/22" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_22%,color-mix(in_srgb,white_42%,transparent)_52%,color-mix(in_srgb,white_78%,var(--color-offwhite))_88%,white_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_48%_at_50%_100%,color-mix(in_srgb,var(--color-cyan)_05%,white)_0%,transparent_52%)] opacity-60" />
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
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy)]/52 via-[color-mix(in_srgb,var(--color-navy)_58%,black)]/72 to-[color-mix(in_srgb,var(--color-navy)_42%,black)]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_42%,transparent_28%,color-mix(in_srgb,var(--color-navy)_48%,black)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/32 via-transparent to-[color-mix(in_srgb,var(--color-cyan)_10%,transparent)]" />
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

      <nav
        className="absolute bottom-[5.5rem] left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-[6.25rem]"
        aria-label="Hero images"
      >
        {HERO_SLIDES.map((_, i) => (
          <button
            key={HERO_SLIDES[i].src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show hero image ${i + 1} of ${slideCount}`}
            aria-current={i === active ? "true" : undefined}
            className={cn(
              "h-2 rounded-full transition-[width,background-color,opacity] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cyan)]",
              i === active
                ? "w-8 bg-[var(--color-cyan)] opacity-100"
                : "w-2 bg-[color-mix(in_srgb,var(--color-navy)_45%,white)] opacity-70 hover:opacity-100 dark:bg-[color-mix(in_srgb,var(--color-white)_55%,transparent)]",
            )}
          />
        ))}
      </nav>

      <div className="relative z-10 mx-auto flex w-full max-w-[920px] flex-col items-center px-4 pb-20 pt-[max(6.75rem,calc(4.25rem+1.75rem+env(safe-area-inset-top,0px)))] text-center sm:pt-[max(7rem,calc(4.25rem+2rem+env(safe-area-inset-top,0px)))] md:px-8 md:pb-24 md:pt-[max(8rem,calc(4.75rem+2.25rem+env(safe-area-inset-top,0px)))]">
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mx-auto flex max-w-[min(100%,28rem)] flex-wrap items-center justify-center gap-3 font-body text-[10px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-navy)_82%,var(--color-cyan))] [text-shadow:0_0_20px_rgba(255,255,255,0.95),0_1px_14px_rgba(255,255,255,0.98)] sm:text-label sm:tracking-[0.32em] dark:text-[color-mix(in_srgb,var(--color-silver)_94%,white)] dark:[text-shadow:none]"
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
          className="mt-8 flex max-w-full flex-wrap items-baseline justify-center gap-x-1.5 gap-y-1 font-display text-[clamp(2rem,5.5vw+0.5rem,4.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] dark:font-medium"
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
                    "bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-cyan)] to-[var(--color-navy)] bg-clip-text text-transparent [text-shadow:none] [filter:drop-shadow(0_0_18px_rgba(255,255,255,0.98))_drop-shadow(0_2px_14px_rgba(255,255,255,0.92))] dark:from-[var(--color-white)] dark:via-[var(--color-cyan)] dark:to-[var(--color-white)] dark:[filter:none]",
                  index !== 1 &&
                    "text-[var(--color-navy)] [text-shadow:0_0_2px_rgba(255,255,255,0.98),0_1px_3px_rgba(255,255,255,0.95),0_4px_32px_rgba(255,255,255,0.9),0_8px_56px_rgba(255,255,255,0.65)] dark:text-[var(--color-white)] dark:[text-shadow:0_4px_48px_rgba(0,0,0,0.55)]",
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
          className="mt-7 max-w-[34rem] font-body text-[1.0625rem] leading-[1.8] text-[color-mix(in_srgb,var(--color-navy)_96%,transparent)] [text-shadow:0_0_16px_rgba(255,255,255,0.94),0_1px_18px_rgba(255,255,255,0.96)] md:text-[1.125rem] dark:text-[color-mix(in_srgb,var(--color-silver)_94%,white)] dark:[text-shadow:0_2px_24px_rgba(0,0,0,0.35)]"
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
              className="rounded-full border border-[color-mix(in_srgb,var(--color-cyan)_42%,transparent)] bg-[color-mix(in_srgb,white_94%,transparent)] px-3.5 py-1.5 font-body text-caption uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-navy)_92%,transparent)] shadow-[0_1px_0_rgba(255,255,255,0.98)_inset,0_2px_16px_rgba(255,255,255,0.75)] backdrop-blur-md dark:border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_45%,black)]/75 dark:text-[color-mix(in_srgb,var(--color-offwhite)_92%,transparent)] dark:shadow-none dark:backdrop-blur-xl"
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
          className="mt-16 flex flex-col items-center gap-2 text-[color-mix(in_srgb,var(--color-navy)_68%,transparent)] [text-shadow:0_0_12px_rgba(255,255,255,0.9),0_1px_12px_rgba(255,255,255,0.95)] dark:text-[color-mix(in_srgb,var(--color-silver)_80%,transparent)] dark:[text-shadow:none]"
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
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-36 bg-gradient-to-t from-white via-[color-mix(in_srgb,white_55%,transparent)] to-transparent dark:from-[var(--color-navy)] dark:via-transparent dark:to-transparent"
        aria-hidden
      />
    </section>
  );
}
