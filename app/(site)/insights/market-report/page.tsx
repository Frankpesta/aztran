import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { InsightsListing } from "@/components/sections/InsightsListing";
import { INSIGHT_CATEGORIES } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Market Report",
  description:
    "Daily and monthly market reports: flows, levels, and desk colour from Aztran Global Investments.",
};

export default function MarketReportInsightsPage(): ReactElement {
  return (
    <>
      <PageHero title="Market Report" imageSrc="/images/hero-bg.jpg" />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <InsightsListing forcedCategory={INSIGHT_CATEGORIES.marketReport} />
        </div>
      </section>
    </>
  );
}
