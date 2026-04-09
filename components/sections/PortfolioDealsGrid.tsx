"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "convex/react";
import { useMemo, type ReactElement } from "react";
import type { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { usePortfolioFilter } from "@/hooks/usePortfolioFilter";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Filterable masonry-style grid of all portfolio records with layout transitions.
 */
export function PortfolioDealsGrid(): ReactElement {
  const { filter, setFilter } = usePortfolioFilter();
  const all = useQuery(api.portfolio.getAllPortfolio);

  const sectors = useMemo((): string[] => {
    if (!all) return ["All"];
    const uniq = Array.from(
      new Set<string>(all.map((p: Doc<"portfolio">) => p.sector)),
    ).sort((a, b) => a.localeCompare(b));
    return ["All", ...uniq];
  }, [all]);

  const filtered = useMemo((): Doc<"portfolio">[] => {
    if (!all) return [];
    if (filter === "All") return all;
    return all.filter((p: Doc<"portfolio">) => p.sector === filter);
  }, [all, filter]);

  return (
    <section className="bg-[var(--color-offwhite)] py-section dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)]">
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div
          className="flex flex-wrap gap-3 border-b border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pb-6 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]"
          role="tablist"
          aria-label="Filter by sector"
        >
          {sectors.map((s: string) => {
            const active = filter === s;
            return (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(s)}
                className={`rounded-sm px-4 py-2 font-body text-label uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-[var(--color-navy)] text-[var(--color-white)] dark:bg-[var(--color-cyan)] dark:text-[var(--color-navy)]"
                    : "text-[var(--color-navy)] hover:text-[var(--color-cyan)] dark:text-[var(--color-silver)]"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="popLayout">
          {all === undefined ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-sm" />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="mt-10 grid gap-6 md:grid-cols-3"
            >
              {filtered.map((item: Doc<"portfolio">) => (
                <motion.div key={item._id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <PortfolioCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
