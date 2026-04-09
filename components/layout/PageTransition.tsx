"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_PREMIUM } from "@/lib/animations";

/**
 * Applies a consistent enter transition to routed page content inside the root layout.
 */
export function PageTransition({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: EASE_PREMIUM,
      }}
    >
      {children}
    </motion.div>
  );
}
