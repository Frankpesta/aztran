import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
// import { PortfolioStatsSection } from "@/components/sections/PortfolioStatsSection";
// import { PortfolioFeaturedSection } from "@/components/sections/PortfolioFeaturedSection";
// import { PortfolioDealsGrid } from "@/components/sections/PortfolioDealsGrid";
import { ContactCTABand } from "@/components/sections/ContactCTABand";

export const metadata: Metadata = {
  title: "Investment Portfolio",
  description:
    "Active mandates, realised investments, and pipeline opportunities across sectors.",
};

export default function PortfolioPage(): ReactElement {
  return (
    <>
      <PageHero title="Investment Portfolio" imageSrc="/images/hero-bg.jpg" />
      {/* Portfolio body temporarily hidden
      <PortfolioStatsSection />
      <PortfolioFeaturedSection />
      <PortfolioDealsGrid />
      */}
      <ContactCTABand />
    </>
  );
}
