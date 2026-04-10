"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Landmark, PieChart } from "lucide-react";
import type { ReactElement } from "react";
import { useId } from "react";
import { EASE_PREMIUM } from "@/lib/animations";
import { cn } from "@/lib/utils";

const PILLARS = [
  {
    title: "Trading",
    subtitle: "Execution & liquidity",
    Icon: Activity,
  },
  {
    title: "Investments",
    subtitle: "Portfolio construction",
    Icon: PieChart,
  },
  {
    title: "Capital",
    subtitle: "Mandates & growth",
    Icon: Landmark,
  },
] as const;

/**
 * Decorative infographic for the marketing hero (lg+). Layered SVGs + glass cards.
 */
export function HeroRightInfographic({
  className,
}: {
  className?: string;
}): ReactElement {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const gradCyan = `hri-cyan-${uid}`;
  const gradSpine = `hri-spine-${uid}`;
  const gradOrb = `hri-orb-${uid}`;
  const filterGlow = `hri-glow-${uid}`;
  const filterSoft = `hri-soft-${uid}`;
  const patternDots = `hri-dots-${uid}`;

  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-[420px] flex-col justify-center xl:max-w-[480px] xl:justify-self-end",
        className,
      )}
      aria-hidden
    >
      {/* Full-bleed ornamental SVG field */}
      <svg
        className="pointer-events-none absolute -inset-8 -z-10 h-[calc(100%+4rem)] w-[calc(100%+4rem)] overflow-visible"
        viewBox="0 0 440 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={gradCyan} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0CC0DF" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#0CC0DF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#001F3F" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={gradSpine} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0CC0DF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#0CC0DF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#001F3F" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id={gradOrb} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0CC0DF" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#0CC0DF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#001F3F" stopOpacity="0" />
          </radialGradient>
          <pattern
            id={patternDots}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#001F3F" fillOpacity="0.06" />
          </pattern>
          <filter
            id={filterGlow}
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={filterSoft} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>

        <rect width="440" height="520" fill={`url(#${patternDots})`} opacity="0.9" />

        <ellipse
          cx="320"
          cy="120"
          rx="140"
          ry="100"
          fill="none"
          stroke="#0CC0DF"
          strokeOpacity="0.15"
          strokeWidth="1.25"
          transform="rotate(-18 320 120)"
        />
        <ellipse
          cx="300"
          cy="400"
          rx="160"
          ry="120"
          fill="none"
          stroke="#001F3F"
          strokeOpacity="0.12"
          strokeWidth="1"
          transform="rotate(8 300 400)"
        />

        <path
          d="M380 40 C260 100 200 200 240 280 C280 360 360 420 400 480"
          stroke={`url(#${gradCyan})`}
          strokeWidth="32"
          strokeLinecap="round"
          filter={`url(#${filterSoft})`}
          opacity="0.45"
        />

        <circle cx="110" cy="260" r="120" fill={`url(#${gradOrb})`} />
        <circle cx="360" cy="140" r="90" fill={`url(#${gradOrb})`} opacity="0.7" />

        <path
          d="M218 48 C150 120 280 160 200 248 C120 336 260 380 222 468"
          stroke="#001F3F"
          strokeOpacity="0.14"
          strokeWidth="10"
          strokeLinecap="round"
          filter={`url(#${filterSoft})`}
        />
        <path
          d="M218 48 C150 120 280 160 200 248 C120 336 260 380 222 468"
          stroke={`url(#${gradSpine})`}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeDasharray="10 14"
          filter={`url(#${filterGlow})`}
        />

        {[
          { cx: 218, cy: 48 },
          { cx: 200, cy: 248 },
          { cx: 222, cy: 468 },
        ].map(({ cx, cy }, i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r="18"
              fill="white"
              fillOpacity="0.85"
              className="dark:fill-[color-mix(in_srgb,var(--color-navy)_70%,black)]"
            />
            <circle
              cx={cx}
              cy={cy}
              r="14"
              stroke="#0CC0DF"
              strokeWidth="1.5"
              strokeOpacity="0.7"
              fill="none"
            />
            <circle cx={cx} cy={cy} r="5" fill="#0CC0DF" fillOpacity="0.85" />
          </g>
        ))}

        <path
          d="M40 120 L72 120 L56 88 Z"
          fill="#0CC0DF"
          fillOpacity="0.12"
        />
        <path
          d="M400 320 L368 352 L400 384 L432 352 Z"
          stroke="#001F3F"
          strokeOpacity="0.18"
          strokeWidth="1.25"
          fill="#0CC0DF"
          fillOpacity="0.06"
        />
      </svg>

      <div className="relative z-[1] flex flex-col gap-8">
        {PILLARS.map(({ title, subtitle, Icon }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: reduce ? 0 : i % 2 === 0 ? 32 : -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.68,
              delay: reduce ? 0 : 0.18 + i * 0.11,
              ease: EASE_PREMIUM,
            }}
            whileHover={
              reduce
                ? undefined
                : { y: -4, transition: { duration: 0.35, ease: EASE_PREMIUM } }
            }
            className={cn(
              "group relative flex max-w-[min(100%,300px)] gap-4 overflow-hidden rounded-3xl border-2 px-5 py-5 shadow-[0_24px_64px_-20px_rgba(0,31,63,0.38),0_0_0_1px_rgba(12,192,223,0.12)_inset] backdrop-blur-xl transition-shadow duration-500",
              i % 2 === 0 ? "self-end" : "self-start",
              "border-[color-mix(in_srgb,var(--color-cyan)_42%,var(--color-navy)_18%)] bg-[color-mix(in_srgb,white_78%,transparent)] dark:border-[color-mix(in_srgb,var(--color-cyan)_38%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_52%,black)]/82 dark:shadow-[0_28px_72px_-18px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.06)]",
            )}
          >
            <div
              className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-[var(--color-cyan)] opacity-[0.14] blur-2xl transition-opacity duration-500 group-hover:opacity-[0.22] dark:opacity-[0.18]"
              aria-hidden
            />
            <svg
              className="pointer-events-none absolute right-3 top-3 size-10 text-[var(--color-cyan)] opacity-[0.2] dark:opacity-[0.28]"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden
            >
              <path
                d="M20 4 L36 20 L20 36 L4 20 Z"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[color-mix(in_srgb,var(--color-cyan)_28%,transparent)] to-[color-mix(in_srgb,var(--color-navy)_15%,transparent)] text-[var(--color-cyan)] shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--color-cyan)_45%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--color-cyan)_45%,transparent)] dark:from-[color-mix(in_srgb,var(--color-cyan)_18%,transparent)] dark:to-[color-mix(in_srgb,var(--color-navy)_40%,black)] dark:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.5)]">
              <Icon className="size-[22px]" strokeWidth={1.65} aria-hidden />
            </span>
            <div className="relative min-w-0 pt-0.5">
              <p className="font-display text-xl font-semibold tracking-tight text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                {title}
              </p>
              <p className="mt-1 font-body text-[13px] leading-snug text-[color-mix(in_srgb,var(--color-navy)_68%,transparent)] dark:text-[color-mix(in_srgb,var(--color-silver)_88%,transparent)]">
                {subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 size-[280px] -translate-x-1/2 rounded-full bg-[var(--color-cyan)] opacity-[0.09] blur-[80px] dark:opacity-[0.14]"
        aria-hidden
      />
    </div>
  );
}
