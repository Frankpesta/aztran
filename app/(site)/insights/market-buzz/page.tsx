import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { InsightsListing } from "@/components/sections/InsightsListing";
import { INSIGHT_CATEGORIES } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Market Buzz",
  description:
    "Short-form market commentary and movers from Aztran Global Investments.",
};

export default function MarketBuzzInsightsPage(): ReactElement {
  return (
    <>
      <PageHero
        title="Market Buzz"
        subtitle="Quick takes, movers, and what our desk is watching—lightweight updates between deeper reports."
        imageSrc="/images/hero-bg.jpg"
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <InsightsListing forcedCategory={INSIGHT_CATEGORIES.marketBuzz} />
        </div>
      </section>
    </>
  );
}
