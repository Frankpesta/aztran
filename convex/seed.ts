import { internalMutation } from "./_generated/server";

/**
 * Populates demo content on an empty deployment. Run with `npx convex run seed:seedAll`.
 */
export const seedAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existingStats = await ctx.db.query("stats").first();
    if (existingStats !== null) {
      return { skipped: true as const };
    }

    await ctx.db.insert("stats", {
      key: "aum",
      label: "Assets Under Management",
      value: "$2.4B",
      numericValue: 2.4,
      prefix: "$",
      suffix: "B",
      sortOrder: 0,
      isVisible: true,
    });
    await ctx.db.insert("stats", {
      key: "deals_closed",
      label: "Deals Closed",
      value: "47+",
      numericValue: 47,
      suffix: "+",
      sortOrder: 1,
      isVisible: true,
    });
    await ctx.db.insert("stats", {
      key: "years_active",
      label: "Years Active",
      value: "12+",
      numericValue: 12,
      suffix: "+",
      sortOrder: 2,
      isVisible: true,
    });
    await ctx.db.insert("stats", {
      key: "countries",
      label: "Countries",
      value: "18",
      numericValue: 18,
      sortOrder: 3,
      isVisible: true,
    });

    const now = Date.now();
    const isoToday = new Date(now).toISOString().slice(0, 10);
    const n = { body: "", outlook: "" };

    await ctx.db.insert("insights", {
      title: "Nigeria Inflation — Sample Data Card",
      slug: "nigeria-inflation-sample-data-card",
      referenceDate: isoToday,
      displayDate: new Date(now).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
      }),
      category: "Inflation",
      tags: ["inflation", "NBS", "sample"],
      sources: ["NBS", "Aztran Research"],
      status: "published",
      isFeatured: true,
      metrics: [
        {
          label: "Headline Inflation",
          yoyValue: "15.06%",
          yoyContext: "From 26.27% prior year",
          momValue: "2.01%",
          momContext: "From -2.88% prior month",
        },
      ],
      sections: [
        {
          heading: "Headline Inflation",
          bullets: [
            "Illustrative figures for layout review—replace with live NBS data.",
            "Food and energy remain key contributors in most regimes.",
          ],
        },
        {
          heading: "Outlook",
          bullets: [
            "Policy path and base effects will dominate the next two prints.",
          ],
        },
      ],
      summary:
        "Sample inflation insight demonstrating metrics, sections, and card copy.",
      readTimeMinutes: 3,
      publishedAt: now,
    });

    await ctx.db.insert("blogPosts", {
      title: "The Week in Markets — Editorial Sample",
      slug: "the-week-in-markets-editorial-sample",
      seriesName: "Market Buzz",
      referenceDate: isoToday,
      displayDate: new Date(now).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: "Aztran Research Team",
      category: "Market Buzz",
      tags: ["rates", "liquidity", "sample"],
      status: "published",
      isFeatured: true,
      intro:
        "This is sample editorial intro copy. Replace with your opening paragraphs before the first sub-heading.",
      sections: [
        {
          heading: "Policy & Rates",
          paragraphs: [
            "Central bank guidance continues to anchor front-end yields.",
            "Illustrative paragraph two for layout testing.",
          ],
        },
        {
          heading: "Credit",
          paragraphs: ["Spreads remain selective; quality pockets offer convexity."],
        },
      ],
      summary: "Sample blog post for the new section-based layout.",
      readTimeMinutes: 4,
      publishedAt: now,
    });

    await ctx.db.insert("marketReports", {
      slug: `daily-market-report-${isoToday}`,
      title: `Daily Market Report — ${isoToday}`,
      reportDate: isoToday,
      displayDate: new Date(now).toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
      }),
      status: "published",
      publishedAt: now,
      moneyMarket: {
        systemLiquiditySummary: "Illustrative liquidity commentary.",
        rates: [
          { label: "Overnight Policy Rate (%)", today: 27.5, prev: 27.5, change: 0 },
        ],
        narrative: n,
      },
      treasuryBills: {
        benchmarkRates: [
          {
            maturityDate: isoToday,
            dtm: 90,
            discRateToday: 18.2,
            discRatePrev: 18.0,
            changeInDiscRate: 0.2,
          },
        ],
        narrative: n,
      },
      fgnBonds: {
        bonds: [
          {
            maturityDate: "2037-01-01",
            coupon: 14.2,
            ttm: 11.5,
            yieldToday: 18.1,
            yieldPrev: 17.9,
            changeInYield: 0.2,
          },
        ],
        narrative: n,
      },
      ssaEurobonds: {
        bonds: [
          {
            sovereign: "Republic Of Nigeria",
            maturityDate: "2051-01-01",
            coupon: 8.3,
            ttm: 25,
            yieldToday: 9.2,
            yieldPrev: 9.0,
            changeInYield: 0.2,
          },
        ],
        narrative: n,
      },
      localEquities: {
        topGainers: [
          { ticker: "STUB", open: 100, close: 105, changePercent: 5 },
        ],
        topLosers: [
          { ticker: "DEMO", open: 50, close: 48, changePercent: -4 },
        ],
        narrative: n,
      },
      globalMarkets: {
        indices: [
          {
            region: "U.S",
            index: "S&P 500",
            open: 5200,
            closeOrIntraday: 5240,
            changePercent: 0.4,
          },
        ],
        narrative: n,
      },
      sources: "Illustrative sources",
      disclaimer: "Illustrative only — not investment advice.",
    });

    const portfolioItems: Array<{
      title: string;
      slug: string;
      sector: string;
      region: string;
      description: string;
      highlights: string[];
      dealSize?: string;
      returnRate?: string;
      status: "active" | "exited" | "pipeline";
      year: number;
      featured: boolean;
      sortOrder: number;
    }> = [
      {
        title: "Urban Logistics Portfolio",
        slug: "urban-logistics-portfolio",
        sector: "Real Estate",
        region: "West Africa",
        description:
          "Institutional-grade logistics assets positioned for long-duration cash yield.",
        highlights: [
          "Stabilised occupancy across core nodes",
          "Inflation-linked lease structures",
          "Operator alignment and governance oversight",
        ],
        dealSize: "₦500M",
        returnRate: "18% IRR",
        status: "active",
        year: 2023,
        featured: true,
        sortOrder: 0,
      },
      {
        title: "Grid-Linked Solar Programme",
        slug: "grid-linked-solar-programme",
        sector: "Energy",
        region: "Pan-Africa",
        description:
          "Distributed generation assets with contracted offtake and ESG reporting integration.",
        highlights: [
          "Long-term offtake agreements",
          "Technical partnership with tier-one OEM",
          "Structured downside protection",
        ],
        dealSize: "USD 120M",
        returnRate: "14% IRR",
        status: "active",
        year: 2022,
        featured: true,
        sortOrder: 1,
      },
      {
        title: "Toll-Road Concession",
        slug: "toll-road-concession",
        sector: "Infrastructure",
        region: "West Africa",
        description:
          "Public-private partnership with availability-based revenue features.",
        highlights: [
          "Government counterparty strength",
          "Lifecycle maintenance reserve",
          "Independent technical advisor",
        ],
        status: "active",
        year: 2021,
        featured: false,
        sortOrder: 2,
      },
      {
        title: "Mid-Market Buyout Platform",
        slug: "mid-market-buyout-platform",
        sector: "Private Equity",
        region: "Global",
        description:
          "Control positions in defensible sectors with operational value creation plans.",
        highlights: [
          "Three assets realised above underwriting",
          "Execution certainty across exits",
        ],
        returnRate: "2.1x MOIC",
        status: "exited",
        year: 2019,
        featured: false,
        sortOrder: 3,
      },
      {
        title: "Technology Growth Facility",
        slug: "technology-growth-facility",
        sector: "Technology",
        region: "Pan-Africa",
        description:
          "Structured growth capital for enterprise software and payments infrastructure.",
        highlights: ["Pipeline underwriting in progress"],
        status: "pipeline",
        year: 2026,
        featured: false,
        sortOrder: 4,
      },
    ];

    for (const item of portfolioItems) {
      await ctx.db.insert("portfolio", item);
    }

    return { skipped: false as const };
  },
});
