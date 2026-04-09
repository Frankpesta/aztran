"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactElement } from "react";
import { EASE_PREMIUM, VIEWPORT } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ServiceOffering } from "@/lib/services";

type ServiceCardProps = {
  service: ServiceOffering;
  index?: number;
  /** Taller hero-style cards on the main services page */
  variant?: "default" | "featured";
};

export function ServiceCard({
  service,
  index = 0,
  variant = "default",
}: ServiceCardProps): ReactElement {
  const reduce = useReducedMotion();
  const href = `/services/${service.slug}`;
  const featured = variant === "featured";

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        delay: reduce ? 0 : index * 0.1,
        duration: 0.62,
        ease: EASE_PREMIUM,
      }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -10,
              transition: { duration: 0.35, ease: EASE_PREMIUM },
            }
      }
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-[color-mix(in_srgb,var(--color-silver)_42%,transparent)] bg-[var(--color-white)] shadow-[0_12px_48px_-18px_color-mix(in_srgb,var(--color-navy)_22%,transparent)] transition-[box-shadow,border-color] duration-500 ease-out hover:border-[color-mix(in_srgb,var(--color-cyan)_55%,transparent)] hover:shadow-[0_36px_72px_-20px_color-mix(in_srgb,var(--color-navy)_38%,transparent),0_0_0_1px_color-mix(in_srgb,var(--color-cyan)_35%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_20%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_92%,black)] dark:hover:shadow-[0_36px_72px_-24px_rgba(0,0,0,0.55),0_0_0_1px_color-mix(in_srgb,var(--color-cyan)_32%,transparent)]",
        featured && "lg:min-h-[520px]",
      )}
    >
      <motion.div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[var(--color-cyan)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-[0.2]"
        aria-hidden
        animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
        transition={
          reduce
            ? undefined
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 size-56 rounded-full bg-[var(--color-navy)] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-[0.2] dark:group-hover:opacity-[0.28]"
        aria-hidden
      />

      <Link
        href={href}
        className="relative flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-white)] dark:focus-visible:ring-offset-[var(--color-navy)]"
      >
        <div
          className={cn(
            "relative w-full overflow-hidden",
            featured
              ? "aspect-[21/10] min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]"
              : "aspect-[16/10] min-h-[200px]",
          )}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={reduce ? undefined : { scale: 1.06 }}
            transition={{ duration: 0.75, ease: EASE_PREMIUM }}
          >
            <Image
              src={service.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, min(1200px, 85vw)"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/82 via-[var(--color-navy)]/25 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-[var(--color-cyan)]/22"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-navy)]/90 to-transparent"
            aria-hidden
          />
        </div>

        <div
          className={cn(
            "relative flex flex-1 flex-col",
            featured ? "p-8 pt-7 md:p-10 md:pt-8" : "p-6 pt-5 md:p-8",
          )}
        >
          <motion.div
            className="h-1 rounded-full bg-gradient-to-r from-[var(--color-cyan)] to-[color-mix(in_srgb,var(--color-cyan)_35%,var(--color-navy))]"
            initial={false}
            whileHover={reduce ? undefined : { scaleX: 1.04 }}
            style={{ width: "3.5rem" }}
            transition={{ duration: 0.35 }}
          />

          <span
            className={cn(
              "mt-5 font-display font-semibold tracking-tight transition-colors duration-300",
              featured ? "text-[clamp(1.5rem,2.5vw,2.25rem)]" : "text-h3",
              service.titleClassName,
            )}
          >
            {service.title}
          </span>
          <p
            className={cn(
              "mt-4 flex-1 font-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_72%,transparent)] dark:text-[var(--color-silver)]",
              featured ? "text-[15px] md:text-base max-w-prose" : "text-body",
            )}
          >
            {service.summary}
          </p>

          <span className="mt-8 inline-flex items-center gap-2 self-start font-body text-label uppercase tracking-[0.14em] text-[var(--color-cyan)] transition-all duration-300 group-hover:gap-3">
            Explore service
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
