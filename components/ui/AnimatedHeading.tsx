"use client";

import { motion } from "framer-motion";
import { createElement, type ReactElement, type ReactNode } from "react";
import { EASE_PREMIUM } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Display heading with a premium fade-up motion preset for hero and section titles.
 */
export function AnimatedHeading({
  children,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}): ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: EASE_PREMIUM, delay }}
    >
      {createElement(Tag, { className: cn(className) }, children)}
    </motion.div>
  );
}
