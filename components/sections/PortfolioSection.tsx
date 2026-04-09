"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Featured portfolio strip powered by Convex featured flags.
 */
export function PortfolioSection(): ReactElement {
  const items = useQuery(api.portfolio.getFeaturedPortfolio);

  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-section text-[var(--color-offwhite)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 0%, color-mix(in srgb, var(--color-cyan) 12%, transparent), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-container px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel className="text-[var(--color-cyan)]">
              Portfolio
            </SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.65, ease: EASE_PREMIUM }}
              className="mt-4 font-display text-h2"
            >
              Representative engagements
            </motion.h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 font-body text-label uppercase tracking-wide text-[var(--color-cyan)] transition-[gap,opacity] duration-300 hover:gap-3 hover:opacity-90"
          >
            View All
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items === undefined
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="aspect-[4/3] rounded-sm bg-[color-mix(in_srgb,var(--color-white)_12%,transparent)]"
                />
              ))
            : items.map((item: Doc<"portfolio">) => (
                <motion.article
                  key={item._id}
                  layout
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="group relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-white)_12%,transparent)] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.5)] ring-1 ring-[color-mix(in_srgb,var(--color-cyan)_15%,transparent)]"
                >
                  <div className="relative aspect-[4/3]">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-[color-mix(in_srgb,var(--color-cyan)_35%,var(--color-navy))]" />
                    )}
                    <div className="absolute inset-0 bg-[var(--color-navy-80)] opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="absolute left-3 top-3 font-body text-caption uppercase tracking-wide text-[var(--color-cyan)]">
                      {item.sector}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-2 p-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <h3 className="font-display text-h3 text-[var(--color-white)]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="absolute bottom-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                </motion.article>
              ))}
        </div>
      </div>
    </section>
  );
}
