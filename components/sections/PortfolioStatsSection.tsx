"use client";

import { useQuery } from "convex/react";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Dark portfolio-page metrics row combining live Convex stats with portfolio aggregates.
 */
export function PortfolioStatsSection(): ReactElement {
  const stats = useQuery(api.stats.getVisibleStats);
  const summary = useQuery(api.portfolio.getPortfolioSummary);

  if (stats === undefined || summary === undefined) {
    return (
      <section className="bg-[var(--color-navy)] py-20 text-[var(--color-offwhite)]">
        <div className="mx-auto grid max-w-container gap-8 px-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-16 bg-[color-mix(in_srgb,var(--color-white)_10%,transparent)]"
            />
          ))}
        </div>
      </section>
    );
  }

  const extra = [
    { label: "Total Deals", value: String(summary.totalDeals) },
    { label: "Active Positions", value: String(summary.activePositions) },
    { label: "Sectors Covered", value: String(summary.sectorsCovered) },
    { label: "Regions Active", value: String(summary.regionsActive) },
  ];

  return (
    <section className="bg-[var(--color-navy)] py-20 text-[var(--color-offwhite)]">
      <div className="mx-auto max-w-container space-y-16 px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s: Doc<"stats">) => (
            <div key={s._id} className="text-center md:text-left">
              <p className="font-display text-5xl text-[var(--color-cyan)] md:text-6xl">
                {s.value}
              </p>
              <p className="mt-2 font-body text-label uppercase tracking-[0.2em] text-[var(--color-silver)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-10 border-t border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] pt-12 md:grid-cols-2 lg:grid-cols-4">
          {extra.map((row) => (
            <div key={row.label} className="text-center md:text-left">
              <p className="font-display text-4xl text-[var(--color-white)]">
                {row.value}
              </p>
              <p className="mt-2 font-body text-label uppercase tracking-[0.2em] text-[var(--color-silver)]">
                {row.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
