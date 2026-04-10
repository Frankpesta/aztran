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
  Eye,
  Handshake,
  Heart,
  Lightbulb,
  Quote,
  Scale,
  Shield,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: `Who we are, mission, vision, and regulatory standing of ${COMPANY_LEGAL_NAME}.`,
};

const CORE_VALUES = [
  {
    title: "Integrity",
    icon: Shield,
    description:
      "We say what we mean and follow through. That means clear disclosures, candid conversations about risk, and decisions that hold up to regulatory scrutiny and client expectations alike.",
  },
  {
    title: "Empathy",
    icon: Heart,
    description:
      "We listen before we structure. Your mandate, constraints, and stakeholders shape our recommendations—so strategy reflects what success actually looks like for you.",
  },
  {
    title: "Excellence",
    icon: Award,
    description:
      "Rigorous research, disciplined execution, and continuous improvement. We hold our process, reporting, and outcomes to institutional standards—every day.",
  },
  {
    title: "Collaboration",
    icon: Handshake,
    description:
      "We work as one team with clients and partners: shared context, constructive challenge, and execution with aligned ownership—not siloed advice.",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    description:
      "We pair proven market practice with thoughtful structures and tools where they improve clarity, access, or efficiency—without shortcuts on compliance or governance.",
  },
  {
    title: "Responsibility",
    icon: Scale,
    description:
      "Stewardship of capital and trust. We weigh long-term impact on clients, market integrity, and the communities where we operate.",
  },
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

      <section className="relative overflow-hidden py-section">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.22]"
          style={{
            backgroundImage: `
              linear-gradient(120deg, color-mix(in srgb, var(--color-cyan) 8%, transparent) 0%, transparent 45%),
              linear-gradient(300deg, color-mix(in srgb, var(--color-navy) 6%, transparent) 0%, transparent 40%)
            `,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
          style={{
            backgroundImage:
              "linear-gradient(color-mix(in srgb, var(--color-silver) 14%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-silver) 14%, transparent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-container px-4 md:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_38%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_88%,var(--color-offwhite))] p-8 shadow-[0_28px_80px_-40px_color-mix(in_srgb,var(--color-navy)_35%,transparent)] backdrop-blur-sm dark:border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)] md:p-12">
            <SectionLabel className="justify-center md:justify-start">Who we are</SectionLabel>
            <AnimatedHeading
              as="h2"
              className="mx-auto mt-5 max-w-2xl text-center font-display text-h2 text-[var(--color-navy)] md:mx-0 md:text-left dark:text-[var(--color-offwhite)]"
            >
              A financial services group specializing in portfolio management and strategic
              trading.
            </AnimatedHeading>
            <div className="mx-auto mt-8 h-px max-w-xs bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent opacity-80 md:mx-0" />
            <p className="mx-auto mt-8 max-w-2xl text-center font-body text-body leading-[1.85] text-[color-mix(in_srgb,var(--color-navy)_78%,transparent)] md:text-left dark:text-[color-mix(in_srgb,var(--color-offwhite)_88%,transparent)]">
              We serve institutions and investors who expect depth in markets, discipline in
              execution, and transparency in how capital is deployed.
            </p>
          </div>
        </div>
      </section>

      <CoCEOSection />

      <section className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[var(--color-offwhite)] py-section dark:border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_96%,black)]">
        <div
          className="pointer-events-none absolute -right-24 top-1/4 size-[420px] rounded-full bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 size-[360px] rounded-full bg-[color-mix(in_srgb,var(--color-navy)_08%,transparent)] blur-[100px] dark:bg-[color-mix(in_srgb,var(--color-cyan)_06%,transparent)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-container px-4 md:px-8">
          <SectionLabel>Company story</SectionLabel>
          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-3xl font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
            delay={0.04}
          >
            Licensed for funds and portfolio management
          </AnimatedHeading>
          <p className="mt-4 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_72%,transparent)] dark:text-[var(--color-silver)]">
            From mandate to markets: how we think about capital, clients, and Nigeria&apos;s
            long-term growth.
          </p>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <aside className="lg:col-span-5">
              <div className="sticky top-28 space-y-6">
                <div className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_38%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_08%,var(--color-white))] p-8 shadow-[0_20px_50px_-28px_color-mix(in_srgb,var(--color-navy)_22%,transparent)] dark:border-[color-mix(in_srgb,var(--color-cyan)_28%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_92%,black)]">
                  <Quote
                    className="size-10 text-[var(--color-cyan)] opacity-90"
                    aria-hidden
                  />
                  <p className="mt-4 font-display text-[clamp(1.15rem,2.2vw,1.45rem)] italic leading-snug text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                    Creating sustainable wealth for high net-worth individuals while
                    optimizing returns on investible funds for corporates—and deepening
                    capital formation for Nigeria&apos;s economy.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["SEC-licensed", "Portfolio & funds", "Institutional focus"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_70%,transparent)] px-3 py-1 font-body text-caption uppercase tracking-wider text-[var(--color-navy)] dark:border-[color-mix(in_srgb,var(--color-cyan)_25%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_80%,transparent)] dark:text-[var(--color-silver)]"
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <ol className="relative space-y-0 border-l border-[color-mix(in_srgb,var(--color-cyan)_45%,transparent)] pl-6 font-body text-caption uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-navy)_55%,transparent)] dark:text-[var(--color-silver)]">
                  {[
                    "Mandate & licensing",
                    "Markets & execution",
                    "Partnership & values",
                  ].map((step, i) => (
                    <li key={step} className="relative pb-8 last:pb-0">
                      <span className="absolute -left-[calc(0.25rem+5px)] top-1.5 size-2.5 rounded-full border-2 border-[var(--color-cyan)] bg-[var(--color-offwhite)] dark:bg-[var(--color-navy)]" />
                      <span className="text-[var(--color-cyan)]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="mt-1 block font-body text-caption normal-case leading-snug tracking-normal text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[color-mix(in_srgb,var(--color-offwhite)_88%,transparent)]">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div className="lg:col-span-7">
              <div className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-[calc(100%-0.5rem)] before:w-px before:bg-gradient-to-b before:from-[var(--color-cyan)] before:via-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] before:to-transparent md:pl-8">
                <div className="max-w-3xl space-y-6 font-body text-body leading-[1.9] text-[color-mix(in_srgb,var(--color-navy)_85%,transparent)] dark:text-[color-mix(in_srgb,var(--color-offwhite)_90%,transparent)]">
                  <p>
                    Aztran Limited is an investment firm licensed by the Securities and
                    Exchange Commission as a fund and portfolio manager. It was born out of
                    the need to create sustainable wealth for high net-worth individuals
                    while optimizing returns on investible funds for corporates (private and
                    government). The need to create deep capital formation for the Nigerian
                    economy that would address the nation&apos;s infrastructure challenge
                    remains an overarching purpose for us.
                  </p>
                  <p>
                    It is our firm belief that creating sustainable wealth generation
                    platforms within the financial services industry would be pivotal to
                    unlocking long-term capital that exists in Nigeria—which would be
                    essential in addressing the challenge of capital formation that continues
                    to challenge our economy.
                  </p>
                  <p>
                    We combine deep market expertise, innovative solutions, and a
                    client-focused approach to deliver exceptional value in trading,
                    investments, and advisory services. With a young, dynamic team of
                    highly knowledgeable partners, we bring a fresh perspective to financial
                    solutions while upholding global standards of excellence.
                  </p>
                  <p>
                    Our leadership team combines over three decades of collective
                    experience across global financial markets to deliver unparalleled
                    value to clients.
                  </p>
                  <p>
                    Our mission is to empower individuals and institutions with the tools,
                    insights, and strategies needed to achieve financial growth and
                    sustainability.
                  </p>
                  <p>
                    Guided by our commitment to integrity, empathy, excellence, innovation,
                    collaboration and responsibility, we create long-lasting partnerships
                    that optimise value for our stakeholders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-section">
        <div
          className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-35"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 20% 10%, color-mix(in srgb, var(--color-cyan) 10%, transparent), transparent), radial-gradient(ellipse 45% 35% at 85% 90%, color-mix(in srgb, var(--color-navy) 8%, transparent), transparent)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-container px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            <article className="group relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[var(--color-white)] p-8 shadow-[0_24px_70px_-36px_color-mix(in_srgb,var(--color-navy)_25%,transparent)] transition-shadow duration-500 hover:shadow-[0_28px_80px_-32px_color-mix(in_srgb,var(--color-navy)_30%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)] md:p-10">
              <div
                className="absolute left-0 top-0 h-full w-1 bg-[var(--color-cyan)]"
                aria-hidden
              />
              <div className="flex items-start gap-4 pl-2">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--color-cyan)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_10%,transparent)] text-[var(--color-cyan)] transition-transform duration-500 group-hover:scale-105">
                  <Target className="size-6" aria-hidden />
                </div>
                <AnimatedHeading as="h2" className="font-display text-h2">
                  Mission
                </AnimatedHeading>
              </div>
              <p className="mt-6 pl-2 font-body text-body leading-[1.85] text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)] md:pl-[4.5rem]">
                Harnessing the power of global capital markets to drive sustainable economic
                growth in Africa, whilst delivering outstanding advice and service to our
                clients.
              </p>
            </article>
            <article className="group relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_70%,var(--color-white))] p-8 shadow-[0_24px_70px_-36px_color-mix(in_srgb,var(--color-navy)_18%,transparent)] transition-shadow duration-500 hover:shadow-[0_28px_80px_-32px_color-mix(in_srgb,var(--color-navy)_22%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)] md:p-10">
              <div
                className="absolute left-0 top-0 h-full w-1 bg-[color-mix(in_srgb,var(--color-cyan)_75%,var(--color-navy))]"
                aria-hidden
              />
              <div className="flex items-start gap-4 pl-2">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--color-cyan)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_10%,transparent)] text-[var(--color-cyan)] transition-transform duration-500 group-hover:scale-105">
                  <Eye className="size-6" aria-hidden />
                </div>
                <AnimatedHeading as="h2" className="font-display text-h2" delay={0.06}>
                  Vision
                </AnimatedHeading>
              </div>
              <p className="mt-6 pl-2 font-body text-body leading-[1.85] text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)] md:pl-[4.5rem]">
                Empowering minds, building sustainable wealth.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] bg-[var(--color-navy)] py-section text-[var(--color-offwhite)] dark:border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 85% 0%, color-mix(in srgb, var(--color-cyan) 22%, transparent), transparent 55%), radial-gradient(ellipse 40% 35% at 10% 100%, color-mix(in srgb, var(--color-white) 6%, transparent), transparent 50%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-container px-4 md:px-8">
          <AnimatedHeading as="h2" className="font-display text-h2 text-[var(--color-white)]">
            Core values
          </AnimatedHeading>
          <p className="mt-4 max-w-2xl font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-silver)_95%,var(--color-offwhite))]">
            The principles that shape how we advise, execute, and partner with every client.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((v) => (
              <article
                key={v.title}
                className="group relative overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_06%,transparent)] p-6 backdrop-blur-sm transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--color-cyan)_38%,transparent)]"
              >
                <div className="flex size-12 items-center justify-center rounded-lg border border-[color-mix(in_srgb,var(--color-cyan)_40%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] text-[var(--color-cyan)] transition-transform duration-500 group-hover:scale-105">
                  <v.icon className="size-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-h3 text-[var(--color-white)]">
                  {v.title}
                </h3>
                <p className="mt-3 font-body text-body leading-[1.75] text-[color-mix(in_srgb,var(--color-silver)_96%,var(--color-offwhite))]">
                  {v.description}
                </p>
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
          <article className="relative mt-10 max-w-3xl overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_06%,var(--color-offwhite))] p-8 shadow-[0_20px_60px_-40px_color-mix(in_srgb,var(--color-navy)_20%,transparent)] md:p-10 dark:bg-[color-mix(in_srgb,var(--color-navy)_92%,black)]">
            <div
              className="absolute left-0 top-0 h-full w-1 bg-[var(--color-cyan)]"
              aria-hidden
            />
            <p className="pl-2 font-body text-body leading-[1.85] text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
              {COMPANY_LEGAL_NAME} is duly regulated by the Securities and Exchange
              Commission Nigeria (SEC), the apex regulatory authority overseeing
              Nigeria&apos;s capital market. Our operations adhere strictly to all
              compliance, transparency, and investor protection requirements as mandated by
              the Commission.
            </p>
          </article>
        </div>
      </section>

      <ContactCTABand />
    </>
  );
}
