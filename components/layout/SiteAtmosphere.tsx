"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactElement } from "react";

/**
 * Subtle fixed gradient mesh behind public pages (no pointer capture).
 */
export function SiteAtmosphere(): ReactElement {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 min-h-full overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-[var(--color-offwhite)] dark:bg-[var(--color-navy)]"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 120% 80% at 10% -10%, color-mix(in srgb, var(--color-cyan) 14%, transparent), transparent 55%)",
            "radial-gradient(ellipse 90% 60% at 95% 15%, color-mix(in srgb, var(--color-navy) 8%, transparent), transparent 50%)",
            "radial-gradient(ellipse 70% 50% at 50% 100%, color-mix(in srgb, var(--color-cyan) 8%, transparent), transparent 45%)",
          ].join(", "),
        }}
      />
      {!reduce ? (
        <>
          <motion.div
            className="absolute -left-1/4 top-1/3 size-[min(55vw,520px)] rounded-full bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] blur-[100px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-1/4 bottom-0 size-[min(45vw,420px)] rounded-full bg-[color-mix(in_srgb,var(--color-navy)_18%,transparent)] blur-[90px] dark:bg-[color-mix(in_srgb,var(--color-cyan)_10%,transparent)]"
            animate={{ x: [0, -35, 0], y: [0, 25, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      ) : null}
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay dark:opacity-[0.2]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
