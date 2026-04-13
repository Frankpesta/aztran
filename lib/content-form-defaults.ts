import type { Id } from "@/convex/_generated/dataModel";

export const BLOG_CATEGORIES = [
  "Market Buzz",
  "Company News",
  "Market Education",
  "Thought Leadership",
  "Events",
] as const;

export function emptyNarrative() {
  return { body: "", outlook: "" };
}

export function defaultMarketReportPayload(): {
  slug: string;
  title: string;
  reportDate: string;
  displayDate: string;
  status: "draft";
  moneyMarket: {
    systemLiquiditySummary?: string;
    rates: Array<{
      label: string;
      today: number;
      prev: number;
      change: number;
    }>;
    narrative: ReturnType<typeof emptyNarrative>;
  };
  treasuryBills: {
    averageBenchmarkRate?: number;
    benchmarkRates: Array<{
      maturityDate: string;
      dtm: number;
      discRateToday: number;
      discRatePrev: number;
      changeInDiscRate: number;
    }>;
    narrative: ReturnType<typeof emptyNarrative>;
  };
  fgnBonds: {
    averageBenchmarkYield?: number;
    bonds: Array<{
      maturityDate: string;
      coupon: number;
      ttm: number;
      yieldToday: number;
      yieldPrev: number;
      changeInYield: number;
    }>;
    narrative: ReturnType<typeof emptyNarrative>;
  };
  ssaEurobonds: {
    bonds: Array<{
      sovereign: string;
      maturityDate: string;
      coupon: number;
      ttm: number;
      yieldToday: number;
      yieldPrev: number;
      changeInYield: number;
    }>;
    narrative: ReturnType<typeof emptyNarrative>;
  };
  localEquities: {
    asiLevel?: number;
    asiChangePercent?: number;
    ytdReturn?: number;
    marketCap?: string;
    turnoverValue?: string;
    volumeTraded?: string;
    marketBreadthRatio?: number;
    gainers?: number;
    losers?: number;
    topGainers: Array<{
      ticker: string;
      open: number;
      close: number;
      changePercent: number;
    }>;
    topLosers: Array<{
      ticker: string;
      open: number;
      close: number;
      changePercent: number;
    }>;
    narrative: ReturnType<typeof emptyNarrative>;
  };
  globalMarkets: {
    isIntradayNote?: boolean;
    indices: Array<{
      region: string;
      index: string;
      open: number;
      closeOrIntraday: number;
      changePercent: number;
      isIntraday?: boolean;
    }>;
    narrative: ReturnType<typeof emptyNarrative>;
  };
  sources?: string;
  disclaimer?: string;
} {
  const n = emptyNarrative();
  return {
    slug: "",
    title: "",
    reportDate: new Date().toISOString().slice(0, 10),
    displayDate: "",
    status: "draft",
    moneyMarket: { rates: [], narrative: n },
    treasuryBills: { benchmarkRates: [], narrative: n },
    fgnBonds: { bonds: [], narrative: n },
    ssaEurobonds: { bonds: [], narrative: n },
    localEquities: { topGainers: [], topLosers: [], narrative: n },
    globalMarkets: { indices: [], narrative: n },
  };
}

export function estimateInsightReadMinutes(
  sections: { bullets: string[] }[],
): number {
  const words = sections
    .flatMap((s) => s.bullets)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function estimateBlogReadMinutes(intro: string, sections: { paragraphs: string[] }[]): number {
  const text = [
    intro,
    ...sections.flatMap((s) => s.paragraphs),
  ].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export type StorageId = Id<"_storage">;
