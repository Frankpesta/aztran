import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { MarketReportsListing } from "@/components/sections/MarketReportsListing";

export const metadata: Metadata = {
  title: "Market Reports",
  description:
    "Daily market snapshots: money markets, bills, bonds, equities, and global indices.",
};

export default function MarketReportsPage(): ReactElement {
  return (
    <>
      <PageHero
        title="Market Reports"
        subtitle="Fixed income, liquidity, local equities, and global benchmarks—in one institutional view."
        imageSrc="/images/hero-bg.jpg"
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <MarketReportsListing />
        </div>
      </section>
    </>
  );
}
