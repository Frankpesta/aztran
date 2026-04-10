import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { InsightsListing } from "@/components/sections/InsightsListing";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Data-driven research cards on macro, fixed income, equities, and strategy from Aztran Global Investments.",
};

export default function InsightsPage(): ReactElement {
  return (
    <>
      <PageHero
        title="Insights"
        subtitle="Structured research briefs: inflation, rates, markets, and strategy—in concise institutional format."
        imageSrc="/images/hero-bg.jpg"
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <InsightsListing />
        </div>
      </section>
    </>
  );
}
