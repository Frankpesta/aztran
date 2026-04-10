export type ServiceSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
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
    title: "Asset management",
    summary:
      "SEC-licensed fund and portfolio management—preserving capital, generating consistent returns, and building long-term wealth across diversified mandates.",
    imageSrc:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=88",
    imageAlt: "Institutional finance documents and strategy review",
    titleClassName:
      "text-[var(--color-navy)] group-hover:text-[color-mix(in_srgb,var(--color-navy)_45%,var(--color-cyan))] dark:text-[var(--color-offwhite)] dark:group-hover:text-[var(--color-cyan)]",
    page: {
      metaTitle: "Asset management",
      metaDescription:
        "Licensed by the SEC as a fund and portfolio manager: diversified portfolios, financial planning, family office, and investment education for corporates, HNIs, and mass-affluent clients.",
      heroEyebrow: "Service",
      headline: "Asset management",
      capabilitiesHeading: "Our solutions & services",
      lead:
        "Licensed by the SEC as a fund and portfolio manager, our Asset Management business delivers world-class investment solutions designed to preserve capital, generate consistent returns, and build long-term wealth.",
      sections: [
        {
          title: "Diversified portfolios & research",
          paragraphs: [
            "We manage diversified portfolios across Eurobond-backed investments, equities and ETFs, and alternative assets, supported by disciplined risk management and rigorous research.",
          ],
        },
        {
          title: "Aligned to every client",
          paragraphs: [
            "Through personalized financial planning, portfolio management, private banking, family office services, and investment education, we align strategies with each client’s unique risk appetite, investment horizon, and long-term objectives. Serving corporate institutions, High Net Worth Individuals, and mass affluent clients, we combine timely market insights, technology-driven tools, and relationship-focused service to create, grow, protect, and seamlessly transfer wealth.",
          ],
        },
        {
          title: "Partnership for the long run",
          paragraphs: [
            "Guided by excellence, integrity, and innovation, we partner with clients throughout their investment journey, delivering exceptional service, robust governance, and innovative solutions that drive sustainable financial success.",
          ],
        },
      ],
      capabilities: [
        "Euro bond-backed investment",
        "Equities & ETFs",
        "Financial planning",
        "Portfolio management",
        "Family office",
        "Investment Education",
      ],
    },
  },
  {
    slug: "global-markets-trading",
    title: "Global markets & brokerage",
    summary:
      "The Group’s multi-currency treasury: brokerage, execution across local and international securities, ALM, and large-ticket liquidity when markets move.",
    imageSrc:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=88",
    imageAlt: "Market data and global trading visualization",
    titleClassName:
      "text-[var(--color-cyan)] dark:text-[var(--color-cyan)] group-hover:text-[color-mix(in_srgb,var(--color-cyan)_85%,var(--color-navy))]",
    page: {
      metaTitle: "Global markets & brokerage",
      metaDescription:
        "Global markets and brokerage: fixed income, government securities, sovereign and corporate bonds, Nigerian and international equities, ETFs, and OTC access.",
      heroEyebrow: "Service",
      headline: "Global markets & brokerage",
      capabilitiesHeading: "Our solutions & services",
      lead:
        "Our Global Markets, Trading, and Brokerage division acts as the Group’s multi-currency treasury, providing brokerage services and facilitating the execution of local and international securities trades, including sovereign and corporate bonds, and Treasury Bills.",
      introBeforeServices: [
        "The division also houses the Asset and Liability Management (ALM) team, which monitors liquidity and optimizes capital deployment across the Group.",
        "At Aztran, we leverage a broad network of institutional counterparties to deliver real-time market insights, including pricing trends, trading flows, and market activity, ensuring competitive pricing and informed investment decisions.",
        "Our large-ticket execution capabilities enable us to handle high-volume trades across multiple asset classes, even during market volatility, providing liquidity and access often unavailable through traditional banking channels.",
      ],
      sections: [
        {
          title: "Fixed Income",
          bullets: [
            "Fixed Income Instruments",
            "Local and International Bills",
            "Government Securities",
            "Sovereign & corporate bonds",
          ],
        },
        {
          title: "Equities",
          bullets: [
            "Nigerian Equities",
            "ETFs",
            "Select foreign equities & index funds",
            "OTC market",
          ],
        },
      ],
      capabilities: [
        "Fixed Income Instruments",
        "Local and International Bills",
        "Government Securities",
        "Sovereign & corporate bonds",
        "Nigerian Equities",
        "ETFs",
        "Select foreign equities & index funds",
        "OTC market",
      ],
    },
  },
  {
    slug: "brokerage-services",
    title: "Brokerage services",
    summary:
      "High-touch brokerage for institutions: onboarding, custody alignment, corporate actions, and responsive coverage as your programs evolve.",
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=88",
    imageAlt: "Modern city skyline representing global financial connectivity",
    titleClassName:
      "text-[var(--color-navy)] group-hover:text-[var(--color-cyan)] dark:text-[var(--color-offwhite)] dark:group-hover:text-[var(--color-cyan)]",
    page: {
      metaTitle: "Brokerage services",
      metaDescription:
        "Institutional brokerage: account structure, execution support, corporate actions, and relationship coverage for complex clients.",
      heroEyebrow: "Service",
      headline: "Brokerage services",
      lead:
        "Brokerage is more than a ticket: it is account structure, documentation, corporate actions, and a team that answers when markets gap or issuers move.",
      sections: [
        {
          title: "Institutional onboarding",
          paragraphs: [
            "Legal entities, signatories, and trading authorities are mapped once and kept current. We coordinate with custodians and administrators you appoint so capital movement stays predictable.",
            "Product and market access are enabled in line with your investment policy and jurisdictional requirements—no silent capability creep.",
          ],
        },
        {
          title: "Day-to-day coverage",
          paragraphs: [
            "You receive a consistent coverage model: named contacts who understand your mandates, escalation paths for breaks, and proactive communication around reorganizations, listings, and holiday calendars.",
            "When new programs launch, we align tickets, limits, and reporting hooks before the first trade.",
          ],
        },
        {
          title: "Who this fits",
          paragraphs: [
            "Funds, corporates, and family offices that need reliable brokerage coverage, clear documentation, and human judgment when standard workflows do not fit the situation.",
          ],
        },
      ],
      capabilities: [
        "Account and authority set-up",
        "Corporate actions coordination",
        "Custody and administrator alignment",
        "Dedicated coverage and escalation",
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
