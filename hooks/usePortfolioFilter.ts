"use client";

import { useUiStore } from "@/store/uiStore";

/**
 * Convenience hook for the portfolio sector filter driven by Zustand.
 */
export function usePortfolioFilter(): {
  filter: string;
  setFilter: (value: string) => void;
} {
  const filter = useUiStore((s) => s.portfolioFilter);
  const setFilter = useUiStore((s) => s.setPortfolioFilter);
  return { filter, setFilter };
}
