"use client";

import { useQuery } from "convex/react";
import { useMemo, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InsightCard } from "@/components/ui/InsightCard";
import { Skeleton } from "@/components/ui/skeleton";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { INSIGHT_CATEGORIES } from "@/lib/site-nav";

function MarqueeRow({
  label,
  href,
  children,
  durationClass,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
  durationClass: string;
}): ReactElement {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <p className="font-body text-label uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-navy)_58%,transparent)] dark:text-[var(--color-silver)]">
          {label}
        </p>
        <Link
          href={href}
          className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)] transition-[gap] hover:gap-1"
        >
          View all →
        </Link>
      </div>
      <div className="relative overflow-hidden py-1">
        <div
          className={`flex w-max gap-6 ${durationClass} motion-reduce:transform-none motion-reduce:animate-none`}
        >
          {children}
          {children}
        </div>
      </div>
    </div>
  );
}

function MarqueeCardShell({ children }: { children: ReactNode }): ReactElement {
  return <div className="w-[min(100vw-2rem,340px)] shrink-0">{children}</div>;
}

/**
 * Auto-scrolling rows by insight category (macro, market report, market buzz).
 */
export function ResearchShowcaseSection({
  homepage = false,
}: {
  homepage?: boolean;
} = {}): ReactElement {
  /** `getHomeInsights` is on every deployment; filter client-side so the page works before `getHomeInsightsByCategory` is pushed. */
  const homeInsights = useQuery(api.insights.getHomeInsights, { limit: 96 });

  const { macro, market, buzz } = useMemo(() => {
    const rows = homeInsights ?? [];
    const pick = (category: string): Doc<"insights">[] =>
      rows
        .filter((i) => i.category === category)
        .sort((a, b) => b.referenceDate.localeCompare(a.referenceDate))
        .slice(0, 8);
    return {
      macro: pick(INSIGHT_CATEGORIES.macroReport),
      market: pick(INSIGHT_CATEGORIES.marketReport),
      buzz: pick(INSIGHT_CATEGORIES.marketBuzz),
    };
  }, [homeInsights]);

  const loading = homeInsights === undefined;

  return (
    <section
      className={cn(
        "relative overflow-hidden py-section",
        homepage
          ? "border-t border-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] bg-[linear-gradient(180deg,#eef8fa_0%,#ffffff_100%)] dark:border-[color-mix(in_srgb,var(--color-cyan)_18%,transparent)] dark:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-navy)_98%,black)_0%,color-mix(in_srgb,var(--color-navy)_90%,black)_100%)]"
          : "bg-[var(--color-offwhite)] dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)]",
      )}
    >
      {homepage ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 55% 40% at 100% 0%, color-mix(in srgb, var(--color-cyan) 12%, transparent), transparent 70%), radial-gradient(ellipse 50% 45% at 0% 100%, color-mix(in srgb, var(--color-cyan) 8%, transparent), transparent 65%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(color-mix(in srgb, var(--color-navy) 8%, transparent) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />
        </>
      ) : null}
      <div className="relative z-[1] mx-auto max-w-container px-4 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Research</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.65, ease: EASE_PREMIUM }}
              className="mt-4 font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
            >
              Insights across macro, markets, and buzz
            </motion.h2>
          </div>
        </div>

        {loading ? (
          <div className="mt-12 space-y-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="mt-12 space-y-12">
            {macro.length > 0 ? (
              <MarqueeRow
                label="Macro Report"
                href="/insights/macro-report"
                durationClass="animate-marquee-slow"
              >
                {macro.map((item: Doc<"insights">) => (
                  <MarqueeCardShell key={item._id}>
                    <InsightCard insight={item} className="h-full" />
                  </MarqueeCardShell>
                ))}
              </MarqueeRow>
            ) : null}
            {market.length > 0 ? (
              <MarqueeRow
                label="Market Report"
                href="/insights/market-report"
                durationClass="animate-marquee-medium"
              >
                {market.map((item: Doc<"insights">) => (
                  <MarqueeCardShell key={item._id}>
                    <InsightCard insight={item} className="h-full" />
                  </MarqueeCardShell>
                ))}
              </MarqueeRow>
            ) : null}
            {buzz.length > 0 ? (
              <MarqueeRow
                label="Market Buzz"
                href="/insights/market-buzz"
                durationClass="animate-marquee-fast"
              >
                {buzz.map((item: Doc<"insights">) => (
                  <MarqueeCardShell key={item._id}>
                    <InsightCard insight={item} className="h-full" />
                  </MarqueeCardShell>
                ))}
              </MarqueeRow>
            ) : null}
            {!loading &&
            macro.length === 0 &&
            market.length === 0 &&
            buzz.length === 0 ? (
              <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_85%,var(--color-white))] px-8 py-14 text-center dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]">
                <p className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                  Research highlights on the way
                </p>
                <p className="mx-auto mt-4 max-w-lg font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_72%,transparent)] dark:text-[var(--color-silver)]">
                  Macro reports, market wraps, and desk commentary will rotate through this
                  showcase as new briefs are published. In the meantime, the insights hub
                  holds our full research library.
                </p>
                <Link
                  href="/insights"
                  className="mt-8 inline-flex items-center gap-1 font-body text-label font-semibold uppercase tracking-wide text-[var(--color-cyan)] transition-[gap,color] hover:gap-2"
                >
                  Explore insights →
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
