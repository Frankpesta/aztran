"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/animations";

export type PageHeroBreadcrumbParent = {
  label: string;
  href: string;
};

/**
 * Interior page masthead: compact height, breadcrumbs, photography, and subtitle.
 */
export function PageHero({
  title,
  subtitle,
  imageSrc,
  breadcrumbParents,
  minHeightClass = "min-h-[26vh] md:min-h-[30vh]",
}: {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  /** Links before the current page (e.g. `{ label: "Services", href: "/services" }`). Home is always prefixed. */
  breadcrumbParents?: readonly PageHeroBreadcrumbParent[];
  minHeightClass?: string;
}): ReactElement {
  const reduce = useReducedMotion();
  const parents = breadcrumbParents ?? [];

  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-[var(--color-navy)] text-[var(--color-white)]",
        minHeightClass,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--color-cyan)_65%,transparent)] to-transparent opacity-90"
        aria-hidden
      />

      {imageSrc ? (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-[-4%] marketing-hero-ken-burns">
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-contain object-center brightness-[1.08] contrast-[1.08] saturate-[1.12] opacity-90"
                sizes="100vw"
                priority
              />
            </div>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy)]/48 via-[var(--color-navy)]/62 to-[color-mix(in_srgb,var(--color-navy)_72%,var(--color-cyan)_8%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_38%,transparent_18%,color-mix(in_srgb,var(--color-navy)_58%,black)_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-cyan)]/14 to-transparent"
            aria-hidden
          />
          <div
            className="marketing-glow-orb pointer-events-none absolute -left-20 top-1/3 size-56 rounded-full bg-[var(--color-cyan)] opacity-[0.07] blur-[80px]"
            aria-hidden
          />
          <div
            className="marketing-glow-orb pointer-events-none absolute -right-16 bottom-1/4 size-48 rounded-full bg-[var(--color-cyan)] opacity-[0.05] blur-[72px]"
            style={{ animationDelay: "-2.5s" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
            aria-hidden
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,color-mix(in_srgb,var(--color-cyan)_14%,transparent),transparent_50%)]"
          aria-hidden
        />
      )}

      <div className="relative z-10 mx-auto w-full max-w-container px-4 pb-10 pt-24 text-center md:px-8 md:pb-12 md:pt-28">
        <motion.nav
          className="mb-5 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 font-body text-caption sm:text-label"
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: reduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_PREMIUM }}
        >
          <Link
            href="/"
            className="rounded-sm text-[color-mix(in_srgb,var(--color-white)_92%,var(--color-cyan))] underline-offset-4 transition-colors hover:text-[var(--color-cyan)] hover:underline"
          >
            Home
          </Link>
          {parents.map((p) => (
            <span key={`${p.href}-${p.label}`} className="inline-flex items-center gap-1">
              <ChevronRight
                className="size-3.5 shrink-0 text-[color-mix(in_srgb,var(--color-cyan)_75%,white)] opacity-90"
                aria-hidden
              />
              <Link
                href={p.href}
                className="rounded-sm text-[color-mix(in_srgb,var(--color-white)_92%,var(--color-cyan))] underline-offset-4 transition-colors hover:text-[var(--color-cyan)] hover:underline"
              >
                {p.label}
              </Link>
            </span>
          ))}
        </motion.nav>

        <motion.h1
          className="mx-auto max-w-4xl font-display text-h1 font-medium tracking-[-0.02em] text-[var(--color-white)] [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.05 }}
        >
          {title}
        </motion.h1>

        {subtitle ? (
          <motion.div
            className="mx-auto mt-5 max-w-2xl md:mt-6"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_PREMIUM, delay: 0.1 }}
          >
            <p className="rounded-xl border border-[color-mix(in_srgb,var(--color-white)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-navy)_55%,black)] px-5 py-4 font-body text-body leading-[1.75] text-[color-mix(in_srgb,var(--color-white)_94%,var(--color-offwhite))] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md md:px-7 md:py-5">
              {subtitle}
            </p>
          </motion.div>
        ) : null}
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-16 bg-gradient-to-t from-[color-mix(in_srgb,var(--color-offwhite)_22%,transparent)] to-transparent dark:from-[color-mix(in_srgb,var(--color-navy)_45%,transparent)]"
        aria-hidden
      />
    </section>
  );
}
