import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { BlogListing } from "@/components/sections/BlogListing";

export const metadata: Metadata = {
  title: "Market Buzz",
  description:
    "Short-form market commentary and movers from Aztran Global Investments.",
};

export default function MarketBuzzInsightsPage(): ReactElement {
  return (
    <>
      <PageHero title="Market Buzz" imageSrc="/images/hero-bg.jpg" />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <BlogListing hideCategoryTabs />
        </div>
      </section>
    </>
  );
}
