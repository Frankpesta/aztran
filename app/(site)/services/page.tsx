import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactCTABand } from "@/components/sections/ContactCTABand";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Asset management, global markets and brokerage, and institutional relationship coverage—with governance and transparency at the centre.",
};

export default function ServicesPage(): ReactElement {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="Asset management, global markets & brokerage, and dedicated brokerage coverage—structured for institutional mandates and regulatory scrutiny."
        imageSrc="/images/hero-bg.jpg"
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <SectionLabel>What we offer</SectionLabel>
          <AnimatedHeading as="h2" className="mt-4 max-w-3xl font-display text-h2">
            Three pillars, one disciplined operating model.
          </AnimatedHeading>
          <p className="mt-6 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
            Each line of business has a dedicated team, documented workflows, and clear
            accountability. Select a service to read how we work, who it fits, and what
            you can expect from day one.
          </p>
          <div className="mt-14 flex flex-col gap-12">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={i}
                variant="featured"
              />
            ))}
          </div>
        </div>
      </section>
      <ContactCTABand />
    </>
  );
}
