import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site-metadata";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSnippetSection } from "@/components/sections/AboutSnippetSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ResearchShowcaseSection } from "@/components/sections/ResearchShowcaseSection";
import { ContactCTABand } from "@/components/sections/ContactCTABand";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
};

export default function HomePage(): React.ReactElement {
  return (
    <>
      <HeroSection />
      <AboutSnippetSection homepage />
      <ServicesSection homepage />
      <WhyChooseUsSection homepage />
      <ResearchShowcaseSection homepage />
      <ContactCTABand tone="airy" />
    </>
  );
}
