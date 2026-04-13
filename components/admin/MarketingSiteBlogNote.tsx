import type { ReactElement } from "react";

/**
 * Shown on blog admin screens: where posts appear vs Insights / Market Buzz lanes.
 */
export function MarketingSiteBlogNote(): ReactElement {
  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 font-body text-[13px] leading-relaxed text-white/80">
      <p className="font-medium text-amber-200/95">Marketing site note</p>
      <p className="mt-1.5">
        Blog posts publish to{" "}
        <code className="rounded bg-black/30 px-1 py-0.5 text-[12px]">/blog/[slug]</code>{" "}
        (the main nav points visitors to{" "}
        <code className="rounded bg-black/30 px-1 py-0.5 text-[12px]">/insights</code>{" "}
        instead). The homepage research strip and{" "}
        <code className="rounded bg-black/30 px-1 py-0.5 text-[12px]">
          /insights/market-buzz
        </code>{" "}
        only list Insights (admin → Insights) with category Market Buzz—not this blog
        collection.
      </p>
    </div>
  );
}
