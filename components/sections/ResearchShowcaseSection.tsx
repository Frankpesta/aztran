"use client";

import { useQuery } from "convex/react";
import type { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { InsightCard } from "@/components/ui/InsightCard";
import { BlogCard } from "@/components/ui/BlogCard";
import { MarketReportCard } from "@/components/ui/MarketReportCard";
import { Skeleton } from "@/components/ui/skeleton";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
 * Three auto-scrolling rows highlighting insights, blog, and market reports.
 */
export function ResearchShowcaseSection({
  homepage = false,
}: {
  homepage?: boolean;
} = {}): ReactElement {
  const insights = useQuery(api.insights.getHomeInsights, { limit: 8 });
  const blog = useQuery(api.blogPosts.getHomeBlogPosts, { limit: 8 });
  const reports = useQuery(api.marketReports.getHomeMarketReports, { limit: 8 });

  const loading =
    insights === undefined || blog === undefined || reports === undefined;

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
              Insights, commentary, and markets
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
            {insights.length > 0 ? (
              <MarqueeRow label="Insights" href="/insights" durationClass="animate-marquee-slow">
                {insights.map((item: Doc<"insights">) => (
                  <MarqueeCardShell key={item._id}>
                    <InsightCard insight={item} className="h-full" />
                  </MarqueeCardShell>
                ))}
              </MarqueeRow>
            ) : null}
            {blog.length > 0 ? (
              <MarqueeRow label="Blog" href="/blog" durationClass="animate-marquee-medium">
                {blog.map((item: Doc<"blogPosts">) => (
                  <MarqueeCardShell key={item._id}>
                    <BlogCard post={item} className="h-full" />
                  </MarqueeCardShell>
                ))}
              </MarqueeRow>
            ) : null}
            {reports.length > 0 ? (
              <MarqueeRow
                label="Market reports"
                href="/market-reports"
                durationClass="animate-marquee-fast"
              >
                {reports.map((item: Doc<"marketReports">) => (
                  <MarqueeCardShell key={item._id}>
                    <MarketReportCard report={item} className="h-full" />
                  </MarqueeCardShell>
                ))}
              </MarqueeRow>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
