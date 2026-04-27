/**
 * Public marketing navigation. Insight category strings must match Convex `insights.category`.
 */
export const INSIGHT_CATEGORIES = {
  macroReport: "Macro Report",
  marketReport: "Market Report",
  marketBuzz: "Market Buzz",
} as const;

/** Legacy `insights.category` values so older documents remain editable in admin. */
export const LEGACY_INSIGHT_CATEGORIES = [
  "Inflation",
  "Fixed Income",
  "Equities",
  "FX",
  "Commodities",
  "Economic Update",
  "Strategy",
] as const;

/**
 * Insight editor dropdown: public IA lanes first (must match strings above exactly),
 * then legacy options.
 */
export const INSIGHT_CATEGORY_ADMIN_OPTIONS: readonly string[] = [
  INSIGHT_CATEGORIES.macroReport,
  INSIGHT_CATEGORIES.marketReport,
  INSIGHT_CATEGORIES.marketBuzz,
  ...LEGACY_INSIGHT_CATEGORIES,
];

export type AboutNavItem = {
  href: string;
  label: string;
  description: string;
  /** Emphasize label in the dropdown (e.g. Core Values). */
  emphasize?: boolean;
};

export const ABOUT_NAV: readonly AboutNavItem[] = [
  {
    href: "/about#about-us",
    label: "About Us",
    description: "Who we are and how we serve institutional capital.",
  },
  {
    href: "/about#leadership",
    label: "Leadership",
    description: "Co–managing partners and executive depth.",
  },
  {
    href: "/about#board",
    label: "Board",
    description: "Governance, co–managing partners, and independent oversight.",
  },
  {
    href: "/about#company-history",
    label: "Company's History",
    description: "Mandate, licensing, and how Aztran took shape.",
  },
  {
    href: "/about#mission-vision",
    label: "Mission and Vision",
    description: "Purpose, direction, and long-term ambition.",
  },
  {
    href: "/about#core-values",
    label: "Core Values",
    description: "Integrity, empathy, excellence, and how we operate.",
    emphasize: true,
  },
  {
    href: "/about#regulatory-compliance",
    label: "Regulatory and Compliance",
    description: "SEC Nigeria licensing and investor protection standards.",
  },
] as const;

export type ServiceNavItem = {
  href: string;
  label: string;
  description: string;
};

export const SERVICES_NAV: readonly ServiceNavItem[] = [
  {
    href: "/services/asset-management",
    label: "Asset Management",
    description:
      "USD & NGN backed mandates, portfolio and alternative investing, family office, and goal-based investing.",
  },
  {
    href: "/services/global-markets-trading",
    label: "Global Markets & Brokerage",
    description:
      "Government securities, global and local equities, ETFs, OTC, and brokerage.",
  },
  {
    href: "/services/brokerage-services",
    label: "Advisory",
    description:
      "Debt and equity capital markets, structured finance, and portfolio investing.",
  },
] as const;

export type InsightNavItem = {
  href: string;
  label: string;
  description: string;
  category: (typeof INSIGHT_CATEGORIES)[keyof typeof INSIGHT_CATEGORIES];
};

export const INSIGHTS_NAV: readonly InsightNavItem[] = [
  {
    href: "/insights/macro-report",
    label: "Macro Report",
    description: "Themes, rates, inflation, and cross-asset context.",
    category: INSIGHT_CATEGORIES.macroReport,
  },
  {
    href: "/insights/market-report",
    label: "Market Report",
    description: "Daily and monthly market wraps and flow.",
    category: INSIGHT_CATEGORIES.marketReport,
  },
  {
    href: "/insights/market-buzz",
    label: "Market Buzz",
    description: "Quick takes, movers, and what the desk is watching.",
    category: INSIGHT_CATEGORIES.marketBuzz,
  },
] as const;
