"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePaginatedQuery, useQuery } from "convex/react";
import { useCallback, useMemo, type ReactElement } from "react";
import type { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { InsightCard } from "@/components/ui/InsightCard";
import { ResearchFeedCard } from "@/components/ui/ResearchFeedCard";
import { useUiStore, type InsightHubTab } from "@/store/uiStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { ResearchFeedItem } from "@/types/research-feed";

const HUB_TABS: readonly { id: InsightHubTab; label: string }[] = [
  { id: "macro_report", label: "Macro Report" },
  { id: "market_report", label: "Market Report" },
  { id: "market_buzz", label: "Market Buzz" },
] as const;

type InsightsListingProps = {
  /** When set, lists only this Convex category and hides hub tabs. */
  forcedCategory?: string;
};

/**
 * Insights hub: Macro Report, Market Report, and Market Buzz; optional forced category for sub-routes.
 */
export function InsightsListing({
  forcedCategory,
}: InsightsListingProps): ReactElement {
  const hubTab = useUiStore((s) => s.insightHubTab);
  const setHubTab = useUiStore((s) => s.setInsightHubTab);
  const researchFeedLimit = useUiStore((s) => s.researchFeedLimit);
  const setResearchFeedLimit = useUiStore((s) => s.setResearchFeedLimit);

  const onSelectTab = useCallback(
    (id: InsightHubTab) => {
      setHubTab(id);
      setResearchFeedLimit(18);
    },
    [setHubTab, setResearchFeedLimit],
  );

  const mergedMarket = useQuery(
    api.researchFeed.getMergedMarketLaneFeed,
    forcedCategory === undefined && hubTab === "market_report"
      ? { limit: researchFeedLimit }
      : "skip",
  );
  const mergedBuzz = useQuery(
    api.researchFeed.getMergedBuzzLaneFeed,
    forcedCategory === undefined && hubTab === "market_buzz"
      ? { limit: researchFeedLimit }
      : "skip",
  );
  const macroFeed = useQuery(
    api.researchFeed.getMacroInsightsFeed,
    forcedCategory === undefined && hubTab === "macro_report"
      ? { limit: researchFeedLimit }
      : "skip",
  );

  const { results, status, loadMore } = usePaginatedQuery(
    api.insights.listPublishedInsightsPaginated,
    forcedCategory !== undefined ? { category: forcedCategory } : "skip",
    { initialNumItems: 9 },
  );

  const insightResults = forcedCategory !== undefined ? (results ?? []) : [];

  const mergedItems: ResearchFeedItem[] | undefined = useMemo(() => {
    if (forcedCategory !== undefined) return undefined;
    if (hubTab === "market_report") return mergedMarket;
    if (hubTab === "market_buzz") return mergedBuzz;
    if (hubTab === "macro_report") return macroFeed;
    return undefined;
  }, [forcedCategory, hubTab, mergedMarket, mergedBuzz, macroFeed]);

  const loadingMerged =
    forcedCategory === undefined &&
    (hubTab === "market_report" ||
      hubTab === "market_buzz" ||
      hubTab === "macro_report") &&
    mergedItems === undefined;

  const loadingInsights =
    forcedCategory !== undefined && status === "LoadingFirstPage";

  const loading = loadingMerged || loadingInsights;

  const showHubTabs = forcedCategory === undefined;

  const canLoadMoreMerged =
    showHubTabs &&
    mergedItems !== undefined &&
    mergedItems.length >= researchFeedLimit;

  const emptyMerged =
    !loadingMerged &&
    mergedItems !== undefined &&
    mergedItems.length === 0;

  const emptyInsightsOnly =
    !loadingInsights &&
    forcedCategory !== undefined &&
    insightResults.length === 0;

  return (
    <div>
      {loadingInsights ? (
        <Skeleton className="mb-16 h-80 w-full" />
      ) : null}

      {showHubTabs ? (
        <div
          className="mb-10 flex flex-wrap gap-3 border-b border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pb-6 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]"
          role="tablist"
          aria-label="Research categories"
        >
          {HUB_TABS.map(({ id, label }) => {
            const active = hubTab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectTab(id)}
                className={`rounded-sm px-4 py-2 font-body text-label uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-[var(--color-navy)] text-[var(--color-white)] dark:bg-[var(--color-cyan)] dark:text-[var(--color-navy)]"
                    : "text-[var(--color-navy)] hover:text-[var(--color-cyan)] dark:text-[var(--color-silver)]"
                }`}
              >
                {label}
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
        ) : forcedCategory !== undefined ? (
          <motion.div layout className="grid gap-6 md:grid-cols-3">
            {insightResults.map((insight: Doc<"insights">) => (
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
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-3">
            {(mergedItems ?? []).map((item: ResearchFeedItem) => (
              <motion.div
                key={`${item.kind}-${item.doc._id}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ResearchFeedCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {forcedCategory !== undefined && status === "CanLoadMore" ? (
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

      {canLoadMoreMerged ? (
        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setResearchFeedLimit(researchFeedLimit + 18)}
            className="font-body text-label uppercase tracking-wide"
          >
            Load more
          </Button>
        </div>
      ) : null}

      {emptyMerged ? (
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_80%,var(--color-white))] px-8 py-14 text-center dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]">
          <p className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Coming soon
          </p>
          <p className="mx-auto mt-3 max-w-sm font-body text-body text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
            Check back shortly for updates.
          </p>
        </div>
      ) : null}

      {emptyInsightsOnly ? (
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_80%,var(--color-white))] px-8 py-14 text-center dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]">
          <p className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Coming soon
          </p>
          <p className="mx-auto mt-3 max-w-sm font-body text-body text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
            Check back shortly for updates.
          </p>
        </div>
      ) : null}
    </div>
  );
}
