import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { InsightsListing } from "@/components/sections/InsightsListing";
import { INSIGHT_CATEGORIES } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Macro Report",
  description:
    "Macro research and cross-asset views from Aztran Global Investments.",
};

export default function MacroReportInsightsPage(): ReactElement {
  return (
    <>
      <PageHero
        title="Macro Report"
        subtitle="Inflation, rates, liquidity, and the themes moving institutions—published as structured insight briefs."
        imageSrc="/images/hero-bg.jpg"
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <InsightsListing forcedCategory={INSIGHT_CATEGORIES.macroReport} />
        </div>
      </section>
    </>
  );
}
