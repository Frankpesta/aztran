"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/animations";

/**
 * Interior page masthead with photography, layered scrim, and gentle typography motion.
 */
export function PageHero({
  title,
  subtitle,
  imageSrc,
  minHeightClass = "min-h-[40vh]",
}: {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  minHeightClass?: string;
}): ReactElement {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[var(--color-navy)] text-[var(--color-white)]",
        minHeightClass,
      )}
    >
      {imageSrc ? (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-[-4%] marketing-hero-ken-burns">
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-cover opacity-70 brightness-[1.06] contrast-[1.08] saturate-[1.08]"
                sizes="100vw"
                priority
              />
            </div>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/78 via-[var(--color-navy)]/85 to-[var(--color-navy)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,transparent_0%,color-mix(in_srgb,var(--color-navy)_55%,black)_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--color-cyan)]/15 to-transparent"
            aria-hidden
          />
        </>
      ) : null}
      <div
        className="marketing-glow-orb pointer-events-none absolute top-1/3 left-1/4 size-40 -translate-x-1/2 rounded-full bg-[var(--color-cyan)] opacity-[0.08] blur-[80px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-container px-4 py-24 text-center md:px-8">
        <motion.h1
          className="font-display text-h1 [text-shadow:0_4px_32px_rgba(0,0,0,0.35)]"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            className="mx-auto mt-5 max-w-2xl font-body text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-silver)_95%,white)]"
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
