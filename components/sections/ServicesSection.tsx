"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { HOME_SERVICE_PREVIEW_COUNT, SERVICES } from "@/lib/services";

const PREVIEW = SERVICES.slice(0, HOME_SERVICE_PREVIEW_COUNT);

/**
 * Service preview grid with rich imagery, deep-link to full services page.
 */
export function ServicesSection(): ReactElement {
  return (
    <section className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-silver)_60%,transparent)] bg-[var(--color-white)] py-section dark:border-[color-mix(in_srgb,var(--color-silver)_25%,transparent)] dark:bg-[var(--color-navy)]">
      <div
        className="marketing-section-shine pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        aria-hidden
      />
      <div className="relative mx-auto max-w-container px-4 md:px-8">
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
