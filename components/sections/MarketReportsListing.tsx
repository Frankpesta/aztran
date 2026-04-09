"use client";

import { usePaginatedQuery } from "convex/react";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { MarketReportCard } from "@/components/ui/MarketReportCard";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function MarketReportsListing(): ReactElement {
  const { results, status, loadMore } = usePaginatedQuery(
    api.marketReports.listPublishedMarketReportsPaginated,
    {},
    { initialNumItems: 9 },
  );

  const loading = status === "LoadingFirstPage";

  return (
    <div>
      <AnimatePresence mode="popLayout">
        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-sm" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-3">
            {results.map((report: Doc<"marketReports">) => (
              <motion.div
                key={report._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <MarketReportCard report={report} />
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
