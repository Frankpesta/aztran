import Link from "next/link";
import type { ReactElement } from "react";
import type { ResearchFeedItem } from "@/types/research-feed";
import { InsightCard } from "@/components/ui/InsightCard";
import { cn } from "@/lib/utils";

const cardShell =
  "group flex h-full flex-col rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] bg-[var(--color-white)] p-7 shadow-[0_6px_28px_-12px_color-mix(in_srgb,var(--color-navy)_12%,transparent)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-[color-mix(in_srgb,var(--color-cyan)_45%,transparent)] hover:shadow-[0_24px_48px_-16px_color-mix(in_srgb,var(--color-navy)_18%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)] dark:hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)]";

/**
 * Unified card for mixed research feeds (insights, blog, structured market reports).
 */
export function ResearchFeedCard({
  item,
  className,
}: {
  item: ResearchFeedItem;
  className?: string;
}): ReactElement {
  if (item.kind === "insight") {
    return <InsightCard insight={item.doc} className={className} />;
  }

  if (item.kind === "blog") {
    const b = item.doc;
    return (
      <Link href={`/blog/${b.slug}`} className={cn(cardShell, className)}>
        <p className="font-body text-caption uppercase tracking-[0.2em] text-[var(--color-cyan)]">
          Blog · {b.category}
        </p>
        <h3 className="mt-3 font-display text-h3 leading-snug text-[var(--color-navy)] group-hover:text-[var(--color-cyan)] dark:text-[var(--color-offwhite)]">
          {b.title}
        </h3>
        <p className="mt-2 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_58%,transparent)] dark:text-[var(--color-silver)]">
          {b.displayDate}
        </p>
        <p className="mt-3 line-clamp-3 flex-1 font-body text-body text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
          {b.summary}
        </p>
        <span className="mt-4 inline-flex font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
          Read post →
        </span>
      </Link>
    );
  }

  const r = item.doc;
  return (
    <Link href={`/market-reports/${r.slug}`} className={cn(cardShell, className)}>
      <p className="font-body text-caption uppercase tracking-[0.2em] text-[var(--color-cyan)]">
        Desk report
      </p>
      <h3 className="mt-3 font-display text-h3 leading-snug text-[var(--color-navy)] group-hover:text-[var(--color-cyan)] dark:text-[var(--color-offwhite)]">
        {r.title}
      </h3>
      <p className="mt-2 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_58%,transparent)] dark:text-[var(--color-silver)]">
        {r.displayDate}
      </p>
      <p className="mt-3 line-clamp-3 flex-1 font-body text-body text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
        Structured market report with desk sections (money market, bills, bonds, equities,
        global).
      </p>
      <span className="mt-4 inline-flex font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
        Open report →
      </span>
    </Link>
  );
}
