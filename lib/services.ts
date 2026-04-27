export type ServiceSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  /** Optional image shown below the section heading on the service detail page. */
  imageSrc?: string;
  imageAlt?: string;
};

export type ServicePageContent = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  headline: string;
  lead: string;
  /** Extra overview paragraphs after `lead`, shown before detail sections and the solutions list. */
  introBeforeServices?: readonly string[];
  sections: ServiceSection[];
  /** Sidebar list heading; defaults to “Capabilities” on the detail page. */
  capabilitiesHeading?: string;
  capabilities: string[];
};

export type ServiceOffering = {
  slug: string;
  title: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  /** Tailwind classes for the service title (primary brand emphasis). */
  titleClassName: string;
  page: ServicePageContent;
};

export const SERVICES: readonly ServiceOffering[] = [
  {
    slug: "asset-management",
    title: "Asset Management",
    summary:
      "SEC Licensed fund and portfolio management—preserving capital, generating consistent returns, and building long-term wealth across diversified mandates.",
    imageSrc:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=88",
    imageAlt: "Institutional finance documents and strategy review",
    titleClassName:
      "text-[var(--color-navy)] group-hover:text-[color-mix(in_srgb,var(--color-navy)_45%,var(--color-cyan))] dark:text-[var(--color-offwhite)] dark:group-hover:text-[var(--color-cyan)]",
    page: {
      metaTitle: "Asset Management",
      metaDescription:
        "SEC Licensed asset management: USD and NGN backed strategies, alternatives, portfolio management, family office, and goal-based investing.",
      heroEyebrow: "Service",
      headline: "Asset Management",
      capabilitiesHeading: "Our Solutions & Services",
      lead:
        "Licensed by the SEC as a fund and portfolio manager, we build institutional-grade portfolios that blend local and global fixed income, disciplined public-market investing, and carefully selected alternatives—governed by clear mandates, transparent reporting, and a long-term partnership mindset.",
      sections: [
        {
          title: "USD Backed Investment",
          imageSrc: "/images/debt-equity.jpeg",
          imageAlt: "Global fixed income and dollar-denominated mandates",
          paragraphs: [
            "Our USD backed strategies focus on high-quality sovereign and investment-grade corporate paper traded in international markets. We focus on liquidity, issuer resilience, and clarity of cash flows so clients can access dollar income and duration management without sacrificing governance.",
          ],
        },
        {
          title: "NGN Backed Investment",
          imageSrc:
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1600&q=88",
          imageAlt: "Nigerian naira fixed income and domestic allocation",
          paragraphs: [
            "Our NGN strategies focus on high-yield government securities, top-tier bank placements, commercial paper, and blue-chip risk assets within the local market.",
          ],
        },
        {
          title: "Portfolio Management",
          imageSrc:
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=88",
          imageAlt: "Institutional portfolio management and reporting",
          paragraphs: [
            "This begins with a risk profile assessment that then dovetails into strategic asset allocation and evolves through tactical tilts grounded in research. We combine top-down macro analysis with bottom-up securities selection to build a well-diversified portfolio that aligns risk appetite with return objectives.",
          ],
        },
        {
          title: "Alternative Investment",
          imageSrc:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=88",
          imageAlt: "Alternative investments and private market opportunities",
          paragraphs: [
            "Beyond the traditional asset space, we explore opportunities through a sector-agnostic approach that exposes us to the real economy, taking advantage of untapped opportunities within the real sector.",
          ],
        },
        {
          title: "Family Office",
          imageSrc:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=88",
          imageAlt: "Family office advisory and consolidated wealth view",
          paragraphs: [
            "For families and founders, we provide a consolidated investment view across entities and generations—coordinating asset allocation, liquidity waterfalls, and governance so capital serves both near-term needs and multi-decade objectives.",
            "We work alongside legal and tax advisors where required, always with a single-minded focus: alignment of the portfolio with family values, succession realities, and the risk tolerance of those who ultimately bear the outcome.",
          ],
        },
        {
          title: "Goal-Based Investing",
          imageSrc:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=88",
          imageAlt: "Goal-based investing and milestone planning",
          paragraphs: [
            "Build a dedicated fund towards a cherished goal—whether it's a child's education, homeownership, travel, or other important life milestones. Each plan is structured around a clear timeline and tailored growth strategy, ensuring your investments remain aligned with your objectives. With a disciplined, forward-looking approach, you can steadily accumulate capital and turn future plans into tangible outcomes.",
          ],
        },
      ],
      capabilities: [
        "USD Backed Investment",
        "NGN Backed Investment",
        "Portfolio Management",
        "Alternative Investment",
        "Family Office",
        "Goal-Based Investing",
      ],
    },
  },
  {
    slug: "global-markets-trading",
    title: "Global Markets & Brokerage",
    summary:
      "The Group’s multi-currency treasury: brokerage, execution across local and international securities, ALM, and large-ticket liquidity when markets move.",
    imageSrc:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=88",
    imageAlt: "Market data and global trading visualization",
    titleClassName:
      "text-[var(--color-cyan)] dark:text-[var(--color-cyan)] group-hover:text-[color-mix(in_srgb,var(--color-cyan)_85%,var(--color-navy))]",
    page: {
      metaTitle: "Global Markets & Brokerage",
      metaDescription:
        "Global markets and brokerage: government securities (bonds and Treasury Bills), local and global equities, ETFs including derivatives and commodities, OTC markets, and full-service brokerage.",
      heroEyebrow: "Service",
      headline: "Global Markets & Brokerage",
      capabilitiesHeading: "Our Solutions & Services",
      lead:
        "Our Global Markets, Trading, and Brokerage division is the Group’s multi-currency execution and liquidity hub, connecting clients to fixed income securities, listed and OTC equity markets, exchange-traded structures, and high-touch brokerage coverage backed by real-time market intelligence.",
      introBeforeServices: [
        "Asset and Liability Management (ALM) sits alongside trading, monitoring liquidity and capital deployment across the Group. Through a deep network of institutional counterparties, we deliver pricing, flow colour, and execution quality—even when markets gap or volatility spikes.",
      ],
      sections: [
        {
          title: "Government Securities (Bond and Treasury Bills)",
          imageSrc:
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=88",
          imageAlt: "Government securities, bonds, and Treasury Bills",
          paragraphs: [
            "We facilitate access to Federal Government of Nigeria (FGN) bonds and Treasury Bills and other eligible government instruments where permitted—with emphasis on transparency of pricing, settlement discipline, and regulatory compliance. Bonds and Treasury Bills remain core building blocks for institutional cash and duration; our process integrates auction calendars, secondary-market liquidity, and duration management so treasuries and funds can deploy naira and hard-currency government risk with clarity.",
            "We support end-to-end workflow—from indication and order placement through settlement and corporate actions—with clear communication around yields, day-count conventions, and roll schedules. Where international exposure is accessed through permitted channels, we align execution with custodial rails and investment-policy constraints, ensuring every trade is deliberate, sized, and documented.",
          ],
        },
        {
          title: "Equities (Global and Local)",
          imageSrc: "/images/home1.jpeg",
          imageAlt: "Global and local equity markets execution",
          paragraphs: [
            "Our equities capability spans Nigerian listed names and selective global access routes, executed with an institutional mindset: blocks where appropriate, algos where they add value, and human judgment when markets are dislocated. Research touchpoints and corporate-action calendars are shared proactively so clients are never passive recipients of risk.",
            "We size participation to liquidity, free float, and mandate limits—protecting both performance and reputation in crowded or thin names.",
          ],
        },
        {
          title: "ETFs (Derivatives and Commodities)",
          imageSrc: "/images/structure.jpeg",
          imageAlt: "ETFs, derivatives, and commodities market access",
          paragraphs: [
            "Where client mandates and regulations permit, we facilitate exposure through ETFs and related exchange-traded structures that embed derivatives or commodities linkage—always preceded by suitability, risk disclosure, and a clear view of tracking error, roll yield, and collateral mechanics.",
            "These tools can express tactical views, hedge underlying exposures, or improve portfolio implementation efficiency; we do not treat them as retail novelty but as precision instruments with defined roles in the portfolio.",
          ],
        },
        {
          title: "OTC Market",
          imageSrc:
            "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1600&q=88",
          imageAlt: "Over-the-counter trading and negotiated liquidity",
          paragraphs: [
            "The OTC channel is where size, discretion, and counterparty trust matter most. We intermediate negotiated trades and illiquid blocks subject to policy, documentation, and best-execution standards appropriate to the instrument.",
            "Price discovery, confidentiality, and settlement certainty are non-negotiable—particularly for institutions that cannot afford operational surprises after the trade.",
          ],
        },
        {
          title: "Brokerage Service",
          imageSrc:
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1600&q=88",
          imageAlt: "Institutional brokerage and client coverage",
          paragraphs: [
            "Our brokerage service gives you a simple, reliable way to manage your investments. We handle your account setup, support your trades, and provide a single point of contact who understands your needs.",
          ],
        },
      ],
      capabilities: [
        "Government Securities (Bond and Treasury Bills)",
        "Equities (Global and Local)",
        "ETFs (Derivatives and Commodities)",
        "OTC Market",
        "Brokerage Service",
      ],
    },
  },
  {
    slug: "brokerage-services",
    title: "Advisory",
    summary:
      "Debt and equity capital markets, structured finance, and portfolio investing for businesses and institutional clients.",
    imageSrc: "/images/debt-equity.jpeg",
    imageAlt: "Advisory and capital markets concept",
    titleClassName:
      "text-[var(--color-navy)] group-hover:text-[var(--color-cyan)] dark:text-[var(--color-offwhite)] dark:group-hover:text-[var(--color-cyan)]",
    page: {
      metaTitle: "Advisory",
      metaDescription:
        "Advisory: debt and equity capital markets, structured finance, and portfolio investing—capital raising, tailored funding structures, and disciplined portfolio strategies.",
      heroEyebrow: "Service",
      headline: "Advisory",
      capabilitiesHeading: "What We Offer",
      lead:
        "Our advisory arm helps clients raise and manage capital, structure complex financing, and invest with discipline—from the right mix of debt and equity through tailored structured solutions to long-term portfolio outcomes.",
      sections: [
        {
          title: "Debt and Equity Capital Market",
          imageSrc: "/images/debt-equity.jpeg",
          imageAlt: "Debt and equity capital markets",
          paragraphs: [
            "We support businesses in raising and managing capital through both debt and equity financing. Our approach focuses on structuring the right mix of funding to optimize growth, maintain financial stability, and align with long-term strategic goals. From sourcing investors to negotiating terms, we ensure efficient capital deployment and sustainable financial performance.",
          ],
        },
        {
          title: "Structured Finance",
          imageSrc: "/images/structure.jpeg",
          imageAlt: "Structured finance and tailored funding",
          paragraphs: [
            "Our structured finance solutions are designed to address complex financial needs through tailored instruments and strategies. We help clients optimize cash flow, manage risk, and unlock value by structuring deals such as asset-backed financing, project finance, and other customized funding arrangements that go beyond traditional financing methods.",
          ],
        },
        {
          title: "Portfolio Investing",
          imageSrc: "/images/portfolio.jpeg",
          imageAlt: "Portfolio investing and diversification",
          paragraphs: [
            "Our approach focuses on identifying and investing in high-quality, scalable opportunities particularly within the real sector.",
          ],
        },
        {
          title: "Capital Raising & Investor Sourcing",
          imageSrc: "/images/debt-equity.jpeg",
          imageAlt: "Capital raising and investor sourcing",
          paragraphs: [
            "We help clients articulate the investment case, identify aligned investors, and manage process—from early conversations through documentation and closing. The objective is efficient capital formation with terms that fit the business model and stakeholder expectations.",
          ],
        },
        {
          title: "Asset-Backed & Project Finance Structures",
          imageSrc: "/images/structure.jpeg",
          imageAlt: "Asset-backed and project finance",
          paragraphs: [
            "Where cash flows or assets can support tailored structures, we design financing that matches project life, risk allocation, and repayment profiles—coordination between legal, operational, and financial workstreams so execution stays coherent from mandate to drawdown.",
          ],
        },
      ],
      capabilities: [
        "Debt and Equity Capital Market",
        "Structured Finance",
        "Portfolio Investing",
        "Capital Raising & Investor Sourcing",
        "Asset-Backed & Project Finance Structures",
      ],
    },
  },
] as const;

export const HOME_SERVICE_PREVIEW_COUNT = 3;

export function getServiceBySlug(slug: string): ServiceOffering | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
