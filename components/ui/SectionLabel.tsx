"use client";

import { motion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE_PREMIUM } from "@/lib/animations";

/**
 * Section kicker with animated accent rules.
 */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <motion.p
      className={cn(
        "flex items-center gap-3 font-body text-label uppercase tracking-[0.35em] text-[var(--color-cyan)]",
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      <motion.span
        className="h-px w-10 bg-[var(--color-cyan)]"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.55, ease: EASE_PREMIUM },
          },
        }}
        style={{ originX: 0 }}
        aria-hidden
      />
      <motion.span
        variants={{
          hidden: { opacity: 0, y: 6 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.45, ease: EASE_PREMIUM },
          },
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="h-px w-10 bg-[var(--color-cyan)]"
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.55, ease: EASE_PREMIUM },
          },
        }}
        style={{ originX: 1 }}
        aria-hidden
      />
    </motion.p>
  );
}
