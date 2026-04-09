"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactElement } from "react";
import type { PortfolioDoc } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

/**
 * Portfolio grid tile with imagery, dual badges, and hover diligence overlay.
 */
export function PortfolioCard({
  item,
  className,
}: {
  item: PortfolioDoc;
  className?: string;
}): ReactElement {
  return (
    <motion.div
      layout
      className={cn(
        "group relative overflow-hidden rounded-sm bg-[var(--color-navy)] shadow-md",
        className,
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[4/3]">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt=""
            fill
            className="object-cover transition-opacity group-hover:opacity-40"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-[color-mix(in_srgb,var(--color-navy)_65%,var(--color-cyan))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-transparent to-transparent opacity-80" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-sm bg-[var(--color-navy-95)] px-2 py-0.5 font-body text-caption uppercase tracking-wide text-[var(--color-cyan)]">
            {item.sector}
          </span>
          <span className="rounded-sm bg-[var(--color-navy-95)] px-2 py-0.5 font-body text-caption uppercase tracking-wide text-[var(--color-silver)]">
            {item.region}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <StatusBadge status={item.status} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity group-hover:opacity-100">
          {item.dealSize ? (
            <p className="font-body text-caption text-[var(--color-offwhite)]">
              Deal size: {item.dealSize}
            </p>
          ) : null}
          {item.returnRate ? (
            <p className="font-body text-caption text-[var(--color-cyan)]">
              {item.returnRate}
            </p>
          ) : null}
        </div>
      </div>
      <div className="p-4">
        <p className="font-body text-caption text-[var(--color-silver)]">
          {item.year}
        </p>
        <h3 className="mt-1 font-display text-h3 text-[var(--color-offwhite)]">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}
