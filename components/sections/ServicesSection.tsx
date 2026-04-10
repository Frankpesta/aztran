"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { HOME_SERVICE_PREVIEW_COUNT, SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

const PREVIEW = SERVICES.slice(0, HOME_SERVICE_PREVIEW_COUNT);

/**
 * Service preview grid with rich imagery, deep-link to full services page.
 */
export function ServicesSection({
  homepage = false,
}: {
  homepage?: boolean;
} = {}): ReactElement {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-t py-section dark:border-[color-mix(in_srgb,var(--color-silver)_25%,transparent)]",
        homepage
          ? "border-[color-mix(in_srgb,var(--color-cyan)_18%,transparent)] bg-[linear-gradient(180deg,#f7fcfd_0%,#ffffff_55%,#fafefe_100%)] dark:border-[color-mix(in_srgb,var(--color-cyan)_16%,transparent)] dark:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-navy)_97%,black)_0%,color-mix(in_srgb,var(--color-navy)_91%,black)_55%,color-mix(in_srgb,var(--color-navy)_88%,black)_100%)]"
          : "border-[color-mix(in_srgb,var(--color-silver)_60%,transparent)] bg-[var(--color-white)] dark:border-[color-mix(in_srgb,var(--color-silver)_25%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_96%,black)]",
      )}
    >
      <div
        className="marketing-section-shine pointer-events-none absolute inset-0 opacity-40 dark:opacity-[0.11]"
        aria-hidden
      />
      {homepage ? (
        <div
          className="pointer-events-none absolute -right-20 top-1/4 size-72 rounded-full bg-[var(--color-cyan)] opacity-[0.07] blur-[90px] dark:opacity-[0.11]"
          aria-hidden
        />
      ) : null}
      <div className="relative z-[1] mx-auto max-w-container px-4 md:px-8">
        <SectionLabel>Services</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="mt-4 max-w-2xl font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
        >
          Asset management, global markets, and brokerage—governed as a single
          institutional platform.
        </motion.h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PREVIEW.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          className="mt-12"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-body text-label uppercase tracking-wide text-[var(--color-cyan)] transition-all duration-300 hover:gap-3"
          >
            View all services
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
