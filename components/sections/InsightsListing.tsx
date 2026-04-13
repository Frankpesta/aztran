"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useMemo, type ReactElement } from "react";
import type { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { InsightCard } from "@/components/ui/InsightCard";
import { useUiStore } from "@/store/uiStore";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type InsightsListingProps = {
  /** When set, lists only this Convex category and hides the “All” filter row. */
  forcedCategory?: string;
};

/**
 * Featured hero plus category-filtered, paginated insights grid.
 */
export function InsightsListing({
  forcedCategory,
}: InsightsListingProps): ReactElement {
  const category = useUiStore((s) => s.insightCategory);
  const setCategory = useUiStore((s) => s.setInsightCategory);

  const featuredList = useQuery(api.insights.getFeaturedInsights);
  const categoryList = useQuery(
    api.insights.getPublishedInsightCategories,
    forcedCategory !== undefined ? "skip" : {},
  );
  const listCategory =
    forcedCategory !== undefined
      ? forcedCategory
      : category === "All"
        ? undefined
        : category;
  const { results, status, loadMore } = usePaginatedQuery(
    api.insights.listPublishedInsightsPaginated,
    { category: listCategory },
    { initialNumItems: 9 },
  );

  const categories = useMemo((): string[] => {
    const u = categoryList ?? [];
    return ["All", ...u];
  }, [categoryList]);

  /** Prefer a featured card; otherwise spotlight the newest item so a lone published insight still renders. */
  const hero = useMemo((): Doc<"insights"> | undefined => {
    if (forcedCategory !== undefined) return undefined;
    if (category !== "All") return undefined;
    const featured = featuredList?.[0];
    if (featured) return featured;
    return results[0];
  }, [forcedCategory, category, featuredList, results]);

  const gridItems = useMemo(() => {
    if (!results.length) return [];
    if (forcedCategory !== undefined) return results;
    if (category !== "All") return results;
    if (!hero) return results;
    const withoutHero = results.filter((r) => r._id !== hero._id);
    // Single published insight was both "hero" and only row → deduping left an empty grid.
    if (withoutHero.length > 0) return withoutHero;
    return [];
  }, [results, hero, category, forcedCategory]);

  const loading = status === "LoadingFirstPage";

  return (
    <div>
      {loading ? (
        <Skeleton className="mb-16 h-80 w-full" />
      ) : hero && category === "All" && forcedCategory === undefined ? (
        <Link
          href={`/insights/${hero.slug}`}
          className="group relative mb-16 block min-h-[320px] overflow-hidden rounded-sm"
        >
          {/* cover requires client URL — hero may only have storage id; listings use gradient if missing */}
          <div className="h-full min-h-[320px] w-full bg-[var(--color-navy)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy-80)] to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-[var(--color-white)] md:p-12">
            <p className="font-body text-label uppercase tracking-[0.25em] text-[var(--color-cyan)]">
              {hero.category}
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-h2">{hero.title}</h2>
            <p className="mt-4 font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
              Read insight →
            </p>
          </div>
        </Link>
      ) : null}

      {forcedCategory === undefined ? (
        <div
          className="mb-10 flex flex-wrap gap-3 border-b border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pb-6 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]"
          role="tablist"
          aria-label="Filter by category"
        >
          {categories.map((c: string) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c)}
                className={`rounded-sm px-4 py-2 font-body text-label uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-[var(--color-navy)] text-[var(--color-white)] dark:bg-[var(--color-cyan)] dark:text-[var(--color-navy)]"
                    : "text-[var(--color-navy)] hover:text-[var(--color-cyan)] dark:text-[var(--color-silver)]"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      ) : null}

      <AnimatePresence mode="popLayout">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-sm" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-3">
            {gridItems.map((insight: Doc<"insights">) => (
              <motion.div
                key={insight._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <InsightCard insight={insight} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {status === "CanLoadMore" ? (
        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => loadMore(9)}
            className="font-body text-label uppercase tracking-wide"
          >
            Load more
          </Button>
        </div>
      ) : null}

      {!loading && !hero && results.length === 0 ? (
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_80%,var(--color-white))] px-8 py-14 text-center dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]">
          <p className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            {forcedCategory !== undefined
              ? `No ${forcedCategory} insights yet`
              : "No published insights yet"}
          </p>
          <p className="mx-auto mt-4 max-w-md font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_72%,transparent)] dark:text-[var(--color-silver)]">
            {forcedCategory !== undefined ? (
              <>
                When your team publishes an insight with category{" "}
                <span className="font-medium">{forcedCategory}</span> from the admin
                dashboard, it will appear here. Draft items stay private until you publish
                them.
              </>
            ) : (
              <>
                When your team publishes an insight from the admin dashboard, it will
                appear here automatically. Draft items stay private until you publish them.
              </>
            )}
          </p>
        </div>
      ) : null}
    </div>
  );
}
