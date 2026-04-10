"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactElement } from "react";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";

/**
 * Closing CTA with radial atmosphere and motion-forward typography.
 */
export function ContactCTABand(): ReactElement {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-section text-center text-[var(--color-offwhite)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 90% 120% at 50% 120%, color-mix(in srgb, var(--color-cyan) 22%, transparent), transparent 55%), radial-gradient(ellipse 60% 80% at 10% 20%, color-mix(in srgb, var(--color-cyan) 8%, transparent), transparent 45%)",
        }}
        aria-hidden
      />
      <div
        className="marketing-glow-orb pointer-events-none absolute left-1/2 top-1/2 size-[min(90vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-cyan)] opacity-[0.07] blur-[120px]"
        aria-hidden
      />
      <motion.div
        className="relative mx-auto max-w-[640px] px-4"
        initial={{ opacity: 0, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      >
        <motion.h2
          className="font-display text-h2 italic [text-shadow:0_4px_40px_rgba(0,0,0,0.35)]"
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.06 }}
        >
          Ready to Begin a Conversation?
        </motion.h2>
        <motion.p
          className="mt-5 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-silver)_95%,white)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          Our office coordinates introductory briefings and diligence sessions by appointment.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: EASE_PREMIUM, delay: 0.2 }}
          className="mt-10"
        >
          <Link
            href="/contact"
            className="marketing-cta-primary inline-flex rounded-sm bg-[var(--color-cyan)] px-10 py-3.5 font-body text-label uppercase tracking-[0.12em] text-[var(--color-navy)]"
          >
            Contact the Firm
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
