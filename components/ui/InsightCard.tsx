import Link from "next/link";
import type { ReactElement } from "react";
import type { InsightDoc } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Card surface for insights grids with hover accent and typographic hierarchy.
 */
export function InsightCard({
  insight,
  className,
}: {
  insight: InsightDoc;
  className?: string;
}): ReactElement {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] bg-[var(--color-white)] p-7 shadow-[0_6px_28px_-12px_color-mix(in_srgb,var(--color-navy)_12%,transparent)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-[color-mix(in_srgb,var(--color-cyan)_45%,transparent)] hover:shadow-[0_24px_48px_-16px_color-mix(in_srgb,var(--color-navy)_18%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)] dark:hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      <p className="font-body text-caption uppercase tracking-[0.2em] text-[var(--color-cyan)]">
        {insight.category}
      </p>
      <h3 className="mt-3 font-display text-h3 leading-snug text-[var(--color-navy)] group-hover:text-[var(--color-cyan)] dark:text-[var(--color-offwhite)]">
        {insight.title}
      </h3>
      <p className="mt-2 font-body text-caption text-[var(--color-silver)]">
        {insight.displayDate}
      </p>
      <p className="mt-3 line-clamp-3 flex-1 font-body text-body text-[color-mix(in_srgb,var(--color-navy)_78%,transparent)] dark:text-[var(--color-silver)]">
        {insight.summary}
      </p>
      <span className="mt-4 inline-flex font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
        Read More →
      </span>
    </Link>
  );
}
