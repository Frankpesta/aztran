import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { CoCEOSection } from "@/components/sections/CoCEOSection";
import { ContactCTABand } from "@/components/sections/ContactCTABand";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { COMPANY_LEGAL_NAME } from "@/lib/brand";
import {
  Award,
  Handshake,
  Heart,
  Lightbulb,
  Scale,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: `Who we are, mission, vision, and regulatory standing of ${COMPANY_LEGAL_NAME}.`,
};

const CORE_VALUES = [
  { title: "Integrity", icon: Shield },
  { title: "Empathy", icon: Heart },
  { title: "Excellence", icon: Award },
  { title: "Collaboration", icon: Handshake },
  { title: "Innovation", icon: Lightbulb },
  { title: "Responsibility", icon: Scale },
] as const;

export default function AboutPage(): ReactElement {
  return (
    <>
      <PageHero
        title="About us"
        subtitle="A financial services group specializing in portfolio management and strategic trading—licensed by the Securities and Exchange Commission Nigeria."
        imageSrc="/images/hero-bg.jpg"
        minHeightClass="min-h-[56vh]"
      />

      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <SectionLabel className="justify-center md:justify-start">Who we are</SectionLabel>
          <AnimatedHeading
            as="h2"
            className="mx-auto mt-4 max-w-3xl text-center font-display text-h2 text-[var(--color-navy)] md:text-left dark:text-[var(--color-offwhite)]"
          >
            A financial services group specializing in portfolio management and strategic
            trading.
          </AnimatedHeading>
        </div>
      </section>

      <CoCEOSection />

      <section className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[var(--color-offwhite)] py-section dark:border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_96%,black)]">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <SectionLabel>Company story</SectionLabel>
          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-3xl font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
            delay={0.04}
          >
            Licensed for funds and portfolio management
          </AnimatedHeading>
          <div className="mt-10 max-w-3xl space-y-5 font-body text-[15px] leading-[1.85] text-[color-mix(in_srgb,var(--color-navy)_85%,transparent)] dark:text-[color-mix(in_srgb,var(--color-offwhite)_90%,transparent)]">
            <p>
              Aztran Limited is an investment firm licensed by the Securities and Exchange
              Commission as a fund and portfolio manager. It was born out of the need to
              create sustainable wealth for high net-worth individuals while optimizing
              returns on investible funds for corporates (private and government). The need
              to create deep capital formation for the Nigerian economy that would address
              the nation&apos;s infrastructure challenge remains an overarching purpose for us.
            </p>
            <p>
              It is our firm belief that creating sustainable wealth generation platforms
              within the financial services industry would be pivotal to unlocking long-term
              capital that exists in Nigeria—which would be essential in addressing the
              challenge of capital formation that continues to challenge our economy.
            </p>
            <p>
              We combine deep market expertise, innovative solutions, and a client-focused
              approach to deliver exceptional value in trading, investments, and advisory
              services. With a young, dynamic team of highly knowledgeable partners, we bring
              a fresh perspective to financial solutions while upholding global standards of
              excellence.
            </p>
            <p>
              Our leadership team combines over three decades of collective experience
              across global financial markets to deliver unparalleled value to clients.
            </p>
            <p>
              Our mission is to empower individuals and institutions with the tools,
              insights, and strategies needed to achieve financial growth and sustainability.
            </p>
            <p>
              Guided by our commitment to integrity, empathy, excellence, innovation,
              collaboration and responsibility, we create long-lasting partnerships that
              optimise value for our stakeholders.
            </p>
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <article className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[var(--color-white)] p-8 md:p-10 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]">
              <div
                className="absolute left-0 top-0 h-full w-1 bg-[var(--color-cyan)]"
                aria-hidden
              />
              <AnimatedHeading as="h2" className="font-display text-h2 pl-2">
                Mission
              </AnimatedHeading>
              <p className="mt-5 pl-2 font-body text-body leading-[1.8] text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
                Harnessing the power of global capital markets to drive sustainable economic
                growth in Africa, whilst delivering outstanding advice and service to our
                clients.
              </p>
            </article>
            <article className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_70%,var(--color-white))] p-8 md:p-10 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)]">
              <div
                className="absolute left-0 top-0 h-full w-1 bg-[color-mix(in_srgb,var(--color-cyan)_75%,var(--color-navy))]"
                aria-hidden
              />
              <AnimatedHeading as="h2" className="font-display text-h2 pl-2" delay={0.06}>
                Vision
              </AnimatedHeading>
              <p className="mt-5 pl-2 font-body text-body leading-[1.8] text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
                Empowering minds, building sustainable wealth.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[var(--color-navy)] py-section text-[var(--color-offwhite)] dark:border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 0%, color-mix(in srgb, var(--color-cyan) 18%, transparent), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-container px-4 md:px-8">
          <AnimatedHeading as="h2" className="font-display text-h2 text-[var(--color-white)]">
            Core values
          </AnimatedHeading>
          <p className="mt-4 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-silver)_95%,var(--color-offwhite))]">
            Guided by integrity, empathy, excellence, innovation, collaboration, and
            responsibility.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((v) => (
              <article
                key={v.title}
                className="rounded-xl border border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_06%,transparent)] p-6 backdrop-blur-sm"
              >
                <div className="flex size-12 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--color-cyan)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] text-[var(--color-cyan)]">
                  <v.icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-h3 text-[var(--color-white)]">
                  {v.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <SectionLabel>Regulatory & compliance</SectionLabel>
          <AnimatedHeading as="h2" className="mt-4 max-w-3xl font-display text-h2">
            Securities and Exchange Commission Nigeria
          </AnimatedHeading>
          <article className="relative mt-10 max-w-3xl overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_06%,var(--color-offwhite))] p-8 md:p-10 dark:bg-[color-mix(in_srgb,var(--color-navy)_92%,black)]">
            <div
              className="absolute left-0 top-0 h-full w-1 bg-[var(--color-cyan)]"
              aria-hidden
            />
            <p className="pl-2 font-body text-body leading-[1.85] text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
              {COMPANY_LEGAL_NAME} is duly regulated by the Securities and Exchange
              Commission Nigeria (SEC), the apex regulatory authority overseeing
              Nigeria&apos;s capital market. Our operations adhere strictly to all
              compliance, transparency, and investor protection requirements as mandated
              by the Commission.
            </p>
          </article>
        </div>
      </section>

      <ContactCTABand />
    </>
  );
}
