import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSnippetSection } from "@/components/sections/AboutSnippetSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { ResearchShowcaseSection } from "@/components/sections/ResearchShowcaseSection";
import { ContactCTABand } from "@/components/sections/ContactCTABand";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Trading, investments, and capital for HNWI and corporates—SEC-regulated wealth and treasury solutions from Aztran Global Investments.",
};

export default function HomePage(): React.ReactElement {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSnippetSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <ResearchShowcaseSection />
      <ContactCTABand />
    </>
  );
}
