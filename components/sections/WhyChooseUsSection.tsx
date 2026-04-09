"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  BriefcaseBusiness,
  ChartSpline,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactElement } from "react";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";

type WhyItem = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const ITEMS: readonly WhyItem[] = [
  {
    title: "SEC-Regulated",
    body: "Aztran Global Investments Limited is fully regulated by the Securities and Exchange Commission Nigeria, ensuring complete compliance and safeguarding your investments.",
    icon: BadgeCheck,
  },
  {
    title: "Proven Track Record",
    body: "With years of experience in managing diverse portfolios, we have consistently delivered strong returns and sustainable growth for our investors.",
    icon: TrendingUp,
  },
  {
    title: "Expert Fund Managers",
    body: "Our team of seasoned investment professionals uses rigorous research and market insights to make informed, strategic decisions for your wealth.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Diverse Investment Opportunities",
    body: "We offer a wide range of investment products across asset classes, designed to meet varying risk profiles and financial goals.",
    icon: ChartSpline,
  },
  {
    title: "Investor-Centric Approach",
    body: "From transparent reporting to personalized service, we prioritize your financial success and provide ongoing support throughout your investment journey.",
    icon: HeartHandshake,
  },
] as const;

/**
 * Trust pillars with icon tiles, gradient hover motion, and cyan accent choreography.
 */
export function WhyChooseUsSection(): ReactElement {
  return (
    <section className="border-t border-[color-mix(in_srgb,var(--color-silver)_60%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_100%,var(--color-white))] py-section dark:border-[color-mix(in_srgb,var(--color-silver)_25%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_96%,black)]">
      <div className="mx-auto max-w-container px-4 md:px-8">
        <SectionLabel>Why choose us</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="mt-4 max-w-2xl font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
        >
          Five reasons institutions and investors choose Aztran.
        </motion.h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                delay: i * 0.07,
                duration: 0.55,
                ease: EASE_PREMIUM,
              }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[var(--color-white)] p-7 shadow-[0_4px_24px_-8px_color-mix(in_srgb,var(--color-navy)_18%,transparent)] transition-[box-shadow,border-color,background-color,transform] duration-500 ease-out hover:border-[color-mix(in_srgb,var(--color-cyan)_50%,var(--color-silver))] hover:bg-[color-mix(in_srgb,var(--color-white)_88%,var(--color-cyan))] hover:shadow-[0_20px_50px_-12px_color-mix(in_srgb,var(--color-cyan)_30%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_92%,black)] dark:hover:border-[color-mix(in_srgb,var(--color-cyan)_45%,transparent)] dark:hover:bg-[color-mix(in_srgb,var(--color-navy)_85%,var(--color-cyan))]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, var(--color-cyan) 16%, transparent), transparent 55%)",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(90% 70% at 100% 100%, color-mix(in srgb, var(--color-navy) 12%, transparent), transparent 50%)",
                }}
                aria-hidden
              />

              <div className="relative flex size-14 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] text-[var(--color-cyan)] transition-all duration-500 group-hover:scale-110 group-hover:border-[var(--color-cyan)] group-hover:bg-[color-mix(in_srgb,var(--color-cyan)_22%,transparent)] group-hover:shadow-[0_0_28px_-4px_var(--color-cyan)]">
                <item.icon className="size-6" aria-hidden />
              </div>
              <h3 className="relative mt-4 font-display text-h3 text-[var(--color-navy)] transition-colors duration-300 group-hover:text-[color-mix(in_srgb,var(--color-navy)_82%,var(--color-cyan))] dark:text-[var(--color-offwhite)] dark:group-hover:text-[var(--color-white)]">
                {item.title}
              </h3>
              <p className="relative mt-3 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_72%,transparent)] dark:text-[var(--color-silver)]">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
