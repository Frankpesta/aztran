"use client";

import { useInView } from "framer-motion";
import { useRef, type RefObject } from "react";
import { VIEWPORT } from "@/lib/animations";

/**
 * Scroll intersection helper aligned with the global `VIEWPORT` animation preset.
 */
export function useScrollAnimation(): {
  ref: RefObject<HTMLElement | null>;
  inView: boolean;
} {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, VIEWPORT);
  return { ref, inView };
}
