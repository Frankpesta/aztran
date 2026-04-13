"use client";

import { usePaginatedQuery, useQuery } from "convex/react";
import { useMemo, type ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { BlogCard } from "@/components/ui/BlogCard";
import { useUiStore } from "@/store/uiStore";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function BlogListing({
  hideCategoryTabs = false,
}: {
  /** When true, lists all published posts with no category filter row (e.g. `/insights/market-buzz`). */
  hideCategoryTabs?: boolean;
} = {}): ReactElement {
  const category = useUiStore((s) => s.blogCategory);
  const setCategory = useUiStore((s) => s.setBlogCategory);

  const categoryList = useQuery(
    api.blogPosts.getPublishedBlogCategories,
    hideCategoryTabs ? "skip" : {},
  );
  const { results, status, loadMore } = usePaginatedQuery(
    api.blogPosts.listPublishedBlogPostsPaginated,
    hideCategoryTabs
      ? {}
      : { category: category === "All" ? undefined : category },
    { initialNumItems: 9 },
  );

  const categories = useMemo(
    () => (hideCategoryTabs ? [] : ["All", ...(categoryList ?? [])]),
    [hideCategoryTabs, categoryList],
  );
  const loading = status === "LoadingFirstPage";

  return (
    <div>
      {!hideCategoryTabs ? (
        <div
          className="mb-10 flex flex-wrap gap-3 border-b border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pb-6 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]"
          role="tablist"
        >
          {categories.map((c) => {
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
            {results.map((post: Doc<"blogPosts">) => (
              <motion.div
                key={post._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {status === "CanLoadMore" ? (
        <div className="mt-10 flex justify-center">
          <Button type="button" variant="outline" onClick={() => loadMore(9)}>
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  );
}
