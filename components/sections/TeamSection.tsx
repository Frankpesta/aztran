"use client";

import { motion } from "framer-motion";
import type { ReactElement } from "react";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import { TEAM_MEMBERS } from "@/lib/team";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Leadership grid with staggered entrance motion.
 * Renders nothing when {@link TEAM_MEMBERS} is empty (e.g. co–managing partners only on About).
 */
export function TeamSection(): ReactElement | null {
  if (TEAM_MEMBERS.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--color-offwhite)] py-section dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)]">
      <div className="mx-auto max-w-container px-4 md:px-8">
        <SectionLabel>Leadership</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.65, ease: EASE_PREMIUM }}
          className="mt-4 font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
        >
          Team and governance
        </motion.h2>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                delay: i * 0.08,
                duration: 0.55,
                ease: EASE_PREMIUM,
              }}
            >
              <TeamMemberCard member={member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
