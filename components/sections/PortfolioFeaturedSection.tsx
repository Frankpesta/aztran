"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Dual-column showcase for the two most prominent portfolio positions.
 */
export function PortfolioFeaturedSection(): ReactElement {
  const featured = useQuery(api.portfolio.getFeaturedPortfolio);
  const topTwo = featured?.slice(0, 2) ?? [];

  if (featured === undefined) {
    return (
      <section className="py-section">
        <div className="mx-auto max-w-container space-y-10 px-4 md:px-8">
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </section>
    );
  }

  if (topTwo.length === 0) {
    return <section className="py-section" aria-hidden />;
  }

  return (
    <section className="py-section">
      <div className="mx-auto max-w-container space-y-20 px-4 md:px-8">
        {topTwo.map((item: Doc<"portfolio">, index: number) => {
          const imageLeft = index % 2 === 0;
          return (
            <div
              key={item._id}
              className="grid gap-10 md:grid-cols-2 md:items-center"
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden rounded-sm ${imageLeft ? "" : "md:order-2"}`}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="h-full w-full bg-[color-mix(in_srgb,var(--color-navy)_75%,var(--color-cyan))]" />
                )}
              </div>
              <div
                className={`space-y-4 text-[var(--color-navy)] dark:text-[var(--color-offwhite)] ${imageLeft ? "" : "md:order-1"}`}
              >
                <p className="font-body text-label uppercase tracking-[0.2em] text-[var(--color-cyan)]">
                  {item.sector} · {item.region}
                </p>
                <h2 className="font-display text-h2">{item.title}</h2>
                <p className="font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
                  {item.description}
                </p>
                <ul className="list-disc space-y-2 pl-5 font-body text-body text-[color-mix(in_srgb,var(--color-navy)_85%,transparent)] dark:text-[var(--color-silver)]">
                  {item.highlights.map((h: string) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 pt-2 font-body text-caption uppercase tracking-wide text-[var(--color-silver)]">
                  {item.dealSize ? <span>Deal size: {item.dealSize}</span> : null}
                  {item.returnRate ? <span>{item.returnRate}</span> : null}
                  <span>{item.year}</span>
                  <StatusBadge status={item.status} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
