import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { InsightsListing } from "@/components/sections/InsightsListing";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Macro reports, market reports, and market buzz from Aztran Global Investments.",
};

export default function InsightsPage(): ReactElement {
  return (
    <>
      <PageHero title="Insights" imageSrc="/images/hero-bg.jpg" />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <InsightsListing />
        </div>
      </section>
    </>
  );
}
