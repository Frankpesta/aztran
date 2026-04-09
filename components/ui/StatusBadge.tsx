import type { ReactElement } from "react";
import { cn } from "@/lib/utils";
import type { PortfolioStatus } from "@/types";

const STYLES: Record<PortfolioStatus, string> = {
  active:
    "border-[var(--color-cyan)] text-[var(--color-cyan)] bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)]",
  exited:
    "border-[var(--color-silver)] text-[var(--color-silver)] bg-[color-mix(in_srgb,var(--color-silver)_12%,transparent)]",
  pipeline:
    "border-amber-400/80 text-amber-200 bg-amber-950/30",
};

/**
 * Compact status pill used on portfolio surfaces across marketing and admin tables.
 */
export function StatusBadge({
  status,
  className,
}: {
  status: PortfolioStatus;
  className?: string;
}): ReactElement {
  const label =
    status === "active"
      ? "Active"
      : status === "exited"
        ? "Exited"
        : "Pipeline";
  return (
    <span
      className={cn(
        "inline-flex rounded-sm border px-2 py-0.5 font-body text-caption uppercase tracking-wide",
        STYLES[status],
        className,
      )}
    >
      {label}
    </span>
  );
}
