"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactElement } from "react";

/**
 * Decorative SVG linework with a subtle “trace” animation (respects reduced motion).
 */
export function FooterTraceArt(): ReactElement {
  const reduce = useReducedMotion();
  const animClass = reduce ? "" : "footer-trace-line";

  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-1/2 h-[min(52vw,280px)] w-[min(140%,1200px)] -translate-x-1/2 text-[var(--color-cyan)] opacity-[0.22] dark:opacity-[0.28]"
      viewBox="0 0 1200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        className={animClass}
        style={{ animationDelay: "0s" }}
        d="M0 120 C180 40, 320 180, 480 88 S780 160, 920 72 S1120 140, 1200 96"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        className={animClass}
        style={{ animationDelay: "0.6s" }}
        d="M40 168 C200 100, 380 188, 560 112 S860 176, 1040 92 S1180 148, 1180 52"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
        opacity={0.65}
      />
      <path
        className={animClass}
        style={{ animationDelay: "1.2s" }}
        d="M80 52 L220 52 L280 112 L420 48 L520 132 L680 56 L780 124 L920 68 L1040 108 L1120 44"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.45}
      />
    </svg>
  );
}
