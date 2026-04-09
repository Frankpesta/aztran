import type { Metadata } from "next";
import type { ReactElement } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { CoCEOSection } from "@/components/sections/CoCEOSection";
import { ContactCTABand } from "@/components/sections/ContactCTABand";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Eye, Handshake, Landmark, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mission, governance, and leadership of Aztran Global Investments Limited.",
};

const VALUES = [
  {
    title: "Discipline",
    desc: "Capital allocation follows documented policies, independent challenge, and audit-ready decision trails.",
    icon: Scale,
  },
  {
    title: "Alignment",
    desc: "Structures match incentives between principals, partners, and beneficiaries across each mandate.",
    icon: Handshake,
  },
  {
    title: "Transparency",
    desc: "Reporting prioritises measurable outcomes, timely disclosure, and clarity for oversight bodies.",
    icon: Eye,
  },
  {
    title: "Stewardship",
    desc: "Long-term responsibility guides how we engage stakeholders, markets, and the communities we touch.",
    icon: Landmark,
  },
] as const;

export default function AboutPage(): ReactElement {
  return (
    <>
      <PageHero
        title="About Aztran Global"
        subtitle="An SEC-registered partnership built for institutional discipline—led jointly at the chief executive level and organised for cross-border precision."
        imageSrc="/images/hero-bg.jpg"
        minHeightClass="min-h-[56vh]"
      />

      <CoCEOSection />

      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <SectionLabel className="justify-center md:justify-start">
            Mandate
          </SectionLabel>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
            <article className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[var(--color-white)] p-8 md:p-10 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]">
              <div
                className="absolute left-0 top-0 h-full w-1 bg-[var(--color-cyan)]"
                aria-hidden
              />
              <AnimatedHeading as="h2" className="font-display text-h2 pl-2">
                Mission
              </AnimatedHeading>
              <p className="mt-5 pl-2 font-body text-body leading-[1.8] text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
                We deploy and advise on institutional capital with uncompromising
                diligence—so each mandate reflects client risk tolerance, policy
                constraints, and regulatory context without compromise.
              </p>
            </article>
            <article className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_70%,var(--color-white))] p-8 md:p-10 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)]">
              <div
                className="absolute left-0 top-0 h-full w-1 bg-[color-mix(in_srgb,var(--color-cyan)_75%,var(--color-navy))]"
                aria-hidden
              />
              <AnimatedHeading
                as="h2"
                className="font-display text-h2 pl-2"
                delay={0.06}
              >
                Vision
              </AnimatedHeading>
              <p className="mt-5 pl-2 font-body text-body leading-[1.8] text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
                To be the trusted partner for complex transactions that demand
                institutional governance, regional expertise, and execution
                standards that match global best practice.
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
          <AnimatedHeading
            as="h2"
            className="font-display text-h2 text-[var(--color-white)]"
          >
            Our story
          </AnimatedHeading>
          <div className="mt-10 max-w-3xl">
            <blockquote className="border-l-2 border-[var(--color-cyan)] pl-6 font-display text-[clamp(20px,2.2vw,26px)] font-normal italic leading-relaxed text-[color-mix(in_srgb,var(--color-offwhite)_96%,white)]">
              Aztran concentrates multi-disciplinary expertise in one partnership
              capable of underwriting cross-border risk—without the noise of
              fragmented advisory lines.
            </blockquote>
            <div className="mt-10 space-y-5 font-body text-[15px] leading-[1.85] text-[color-mix(in_srgb,var(--color-silver)_95%,var(--color-offwhite))]">
              <p>
                The firm was formed around a simple premise: institutional clients
                deserve a single accountable desk for trading, treasury, and
                advisory—backed by governance that scales with ticket size.
              </p>
              <p>
                Investment, risk, and legal leadership stay represented through each
                stage of review, so decisions are challenged early and documented
                for boards, regulators, and counterparties alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <AnimatedHeading as="h2" className="font-display text-h2">
            Core values
          </AnimatedHeading>
          <p className="mt-4 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_72%,transparent)] dark:text-[var(--color-silver)]">
            Non-negotiables that shape how we work with capital, people, and
            institutions.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {VALUES.map((v) => (
              <article
                key={v.title}
                className="group rounded-xl border border-transparent p-1 transition-colors hover:border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)]"
              >
                <div className="rounded-lg bg-[color-mix(in_srgb,var(--color-cyan)_8%,transparent)] p-4 dark:bg-[color-mix(in_srgb,var(--color-cyan)_6%,transparent)]">
                  <v.icon
                    className="size-8 text-[var(--color-cyan)] transition-transform duration-300 group-hover:scale-105"
                    aria-hidden
                  />
                </div>
                <h3 className="mt-5 font-display text-h3">{v.title}</h3>
                <p className="mt-2 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_78%,transparent)] dark:text-[var(--color-silver)]">
                  {v.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTABand />
    </>
  );
}
