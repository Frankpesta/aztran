import type { ReactElement } from "react";
import type { StatDoc } from "@/types";

/**
 * Presents a single metric label and formatted value inside the cyan stats band.
 */
export function StatCard({
  stat,
  valueDisplay,
}: {
  stat: StatDoc;
  valueDisplay: string;
}): ReactElement {
  return (
    <div className="flex flex-col items-center px-4 text-center md:px-10">
      <p className="font-display text-5xl font-semibold text-[var(--color-navy)] md:text-6xl">
        {valueDisplay}
      </p>
      <p className="mt-2 max-w-[12rem] font-body text-label uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-navy)_70%,transparent)]">
        {stat.label}
      </p>
    </div>
  );
}
