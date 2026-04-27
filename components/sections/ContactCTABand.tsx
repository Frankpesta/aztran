"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactElement } from "react";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Closing CTA — `tone="deep"` (navy) for interior pages; `tone="airy"` bright band for homepage.
 */
export function ContactCTABand({
  tone = "deep",
}: {
  tone?: "deep" | "airy";
} = {}): ReactElement {
  const reduce = useReducedMotion();
  const airy = tone === "airy";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-section text-center",
        airy
          ? "border-t border-[color-mix(in_srgb,var(--color-cyan)_22%,transparent)] bg-[linear-gradient(180deg,#ffffff_0%,#f2fbfc_42%,#ffffff_100%)] text-[var(--color-navy)] dark:border-[color-mix(in_srgb,var(--color-cyan)_22%,transparent)] dark:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-navy)_99%,black)_0%,color-mix(in_srgb,var(--color-navy)_93%,black)_38%,color-mix(in_srgb,var(--color-navy)_88%,black)_100%)] dark:text-[var(--color-offwhite)]"
          : "bg-[var(--color-navy)] text-[var(--color-offwhite)]",
      )}
    >
      {airy ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-90 dark:hidden"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 0%, color-mix(in srgb, var(--color-cyan) 14%, transparent), transparent 58%), radial-gradient(ellipse 60% 80% at 100% 80%, color-mix(in srgb, var(--color-cyan) 8%, transparent), transparent 50%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 hidden opacity-100 dark:block"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 50% 0%, color-mix(in srgb, var(--color-cyan) 18%, transparent), transparent 55%), radial-gradient(ellipse 55% 70% at 100% 100%, color-mix(in srgb, var(--color-cyan) 12%, transparent), transparent 50%)",
            }}
            aria-hidden
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-90 dark:opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 90% 120% at 50% 120%, color-mix(in srgb, var(--color-cyan) 22%, transparent), transparent 55%), radial-gradient(ellipse 60% 80% at 10% 20%, color-mix(in srgb, var(--color-cyan) 8%, transparent), transparent 45%)",
          }}
          aria-hidden
        />
      )}
      {!airy ? (
        <div
          className="marketing-glow-orb pointer-events-none absolute left-1/2 top-1/2 size-[min(90vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-cyan)] opacity-[0.07] blur-[120px]"
          aria-hidden
        />
      ) : (
        <div
          className="pointer-events-none absolute left-1/2 top-0 size-[min(100vw,520px)] -translate-x-1/2 rounded-full bg-[var(--color-cyan)] opacity-[0.09] blur-[100px] dark:opacity-[0.06]"
          aria-hidden
        />
      )}
      <motion.div
        className="relative mx-auto max-w-[640px] px-4"
        initial={{ opacity: 0, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.65, ease: EASE_PREMIUM }}
      >
        <motion.h2
          className={cn(
            "font-display text-h2",
            airy
              ? "font-semibold tracking-[-0.02em] text-[var(--color-navy)] dark:text-[var(--color-offwhite)]"
              : "italic [text-shadow:0_4px_40px_rgba(0,0,0,0.35)]",
          )}
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.06 }}
        >
          Ready to Begin a Conversation?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: EASE_PREMIUM, delay: 0.14 }}
          className="mt-10"
        >
          <Link
            href="/contact"
            className="marketing-cta-primary inline-flex rounded-md bg-[var(--color-cyan)] px-10 py-3.5 font-body text-[0.8125rem] font-semibold tracking-[0.06em] text-[var(--color-navy)] shadow-[0_14px_40px_-14px_color-mix(in_srgb,var(--color-cyan)_50%,transparent)]"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
