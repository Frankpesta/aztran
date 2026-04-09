"use client";

import { useQuery } from "convex/react";
import { motion, useInView } from "framer-motion";
import anime from "animejs";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { StatDoc } from "@/types";
import type { Doc } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";

function AnimatedStatValue({
  stat,
}: {
  stat: StatDoc;
}): ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started || !ref.current) return;
    const el = ref.current;
    const numeric = stat.numericValue;
    if (numeric === undefined || Number.isNaN(numeric)) {
      el.textContent = stat.value;
      setStarted(true);
      return;
    }
    if (!Number.isInteger(numeric)) {
      el.textContent = stat.value;
      setStarted(true);
      return;
    }
    const prefix = stat.prefix ?? "";
    const suffix = stat.suffix ?? "";
    el.textContent = `${prefix}0${suffix}`;
    const state = { v: 0 };
    anime({
      targets: state,
      v: numeric,
      round: 1,
      duration: 1800,
      easing: "easeOutExpo",
      update() {
        el.textContent = `${prefix}${state.v}${suffix}`;
      },
      complete: () => setStarted(true),
    });
  }, [inView, stat, started]);

  const initial =
    stat.numericValue !== undefined && Number.isInteger(stat.numericValue)
      ? `${stat.prefix ?? ""}0${stat.suffix ?? ""}`
      : stat.value;

  return <span ref={ref}>{initial}</span>;
}

/**
 * Home page cyan metrics band backed by Convex `getVisibleStats` with count-up motion.
 */
export function StatsSection(): ReactElement {
  const stats = useQuery(api.stats.getVisibleStats);

  if (stats === undefined) {
    return (
      <section className="bg-[var(--color-cyan)] py-16">
        <div className="mx-auto flex max-w-container flex-col gap-8 px-4 md:flex-row md:justify-between md:px-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-24 flex-1 bg-[color-mix(in_srgb,var(--color-navy)_12%,transparent)]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (stats.length === 0) {
    return <section className="bg-[var(--color-cyan)] py-16" aria-hidden />;
  }

  return (
    <section className="relative overflow-hidden bg-[var(--color-cyan)] py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "repeating-linear-gradient(-12deg, transparent, transparent 40px, color-mix(in srgb, var(--color-navy) 4%, transparent) 40px, color-mix(in srgb, var(--color-navy) 4%, transparent) 41px)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-container grid-cols-1 gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:px-8">
        {stats.map((stat: Doc<"stats">, index: number) => (
          <motion.div
            key={stat._id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.55, ease: EASE_PREMIUM, delay: index * 0.08 }}
            className="flex flex-col items-center text-center lg:border-l lg:border-[color-mix(in_srgb,var(--color-navy)_18%,transparent)] lg:px-6 first:lg:border-l-0"
          >
            <p className="font-display text-5xl font-semibold tabular-nums text-[var(--color-navy)] drop-shadow-[0_2px_0_color-mix(in_srgb,var(--color-white)_35%,transparent)] md:text-6xl">
              <AnimatedStatValue stat={stat} />
            </p>
            <p className="mt-3 max-w-[14rem] font-body text-label uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-navy)_68%,transparent)]">
              {stat.label}
            </p>
            {index < stats.length - 1 ? (
              <div className="mt-8 h-px w-full bg-[color-mix(in_srgb,var(--color-navy)_18%,transparent)] lg:hidden" />
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
