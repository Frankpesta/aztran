import { create } from "zustand";

interface UiState {
  isScrolled: boolean;
  setScrolled: (value: boolean) => void;
  portfolioFilter: string;
  setPortfolioFilter: (value: string) => void;
  insightCategory: string;
  setInsightCategory: (value: string) => void;
  blogCategory: string;
  setBlogCategory: (value: string) => void;
}

/**
 * Client UI state for scroll-linked navigation, portfolio filters, and content listing category tabs.
 */
export const useUiStore = create<UiState>((set) => ({
  isScrolled: false,
  setScrolled: (isScrolled) => set({ isScrolled }),
  portfolioFilter: "All",
  setPortfolioFilter: (portfolioFilter) => set({ portfolioFilter }),
  insightCategory: "All",
  setInsightCategory: (insightCategory) => set({ insightCategory }),
  blogCategory: "All",
  setBlogCategory: (blogCategory) => set({ blogCategory }),
}));
