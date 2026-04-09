"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/uiStore";

const THRESHOLD = 24;

/**
 * Tracks window scroll and mirrors the threshold-crossing state into `useUiStore`.
 */
export function useNavbarScroll(): void {
  const setScrolled = useUiStore((s) => s.setScrolled);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setScrolled]);
}
