export type ServiceSection = {
  title: string;
  paragraphs: string[];
};

export type ServicePageContent = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  headline: string;
  lead: string;
  sections: ServiceSection[];
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
      "Institutional portfolios, mandate design, and risk-aware allocation for sovereigns, funds, and large family offices.",
    imageSrc:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=88",
    imageAlt: "Institutional finance documents and strategy review",
    titleClassName:
      "text-[var(--color-navy)] group-hover:text-[color-mix(in_srgb,var(--color-navy)_45%,var(--color-cyan))] dark:text-[var(--color-offwhite)] dark:group-hover:text-[var(--color-cyan)]",
    page: {
      metaTitle: "Asset management",
      metaDescription:
        "Institutional asset management: portfolio construction, oversight, and transparent reporting aligned to your mandate.",
      heroEyebrow: "Service",
      headline: "Asset management",
      lead:
        "We build and oversee portfolios with clear investment objectives, documented risk budgets, and reporting schedules suited to institutional stakeholders—not retail defaults stretched upstream.",
      sections: [
        {
          title: "Mandate-first construction",
          paragraphs: [
            "Every relationship starts with constraints and outcomes: liquidity, time horizon, regulatory context, and any liability-aware or policy benchmarks you require.",
            "Implementation is staged with governance checkpoints so allocations, managers, and instruments remain traceable to the mandate you approved.",
          ],
        },
        {
          title: "Oversight and reporting",
          paragraphs: [
            "Positions, exposures, and performance are monitored against pre-agreed risk and attribution frameworks. You receive narratives that connect market moves to decisions, not only month-end tables.",
            "Where external managers or sleeves are used, we coordinate diligence, onboarding, and ongoing surveillance under a single accountability line.",
          ],
        },
        {
          title: "Who this fits",
          paragraphs: [
            "Sovereign entities, pension systems, endowments, corporates with large balance-sheet investable pools, and sophisticated family offices seeking institutional process without product sprawl.",
          ],
        },
      ],
      capabilities: [
        "Strategic and tactical allocation",
        "Manager selection and oversight",
        "Risk budgeting and attribution",
        "Custom reporting and board-ready materials",
      ],
    },
  },
  {
    slug: "global-markets-trading",
    title: "Global markets & trading",
    summary:
      "Cross-asset execution, liquidity sourcing, and disciplined workflow across major venues—built for size, speed, and auditability.",
    imageSrc:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1600&q=88",
    imageAlt: "Market data and global trading visualization",
    titleClassName:
      "text-[var(--color-cyan)] dark:text-[var(--color-cyan)] group-hover:text-[color-mix(in_srgb,var(--color-cyan)_85%,var(--color-navy))]",
    page: {
      metaTitle: "Global markets & trading",
      metaDescription:
        "Global markets and trading: institutional execution, liquidity, and governance across equities, FX, and derivatives where applicable.",
      heroEyebrow: "Service",
      headline: "Global markets & trading",
      lead:
        "Trading is treated as a controlled function: documented workflows, clear escalation paths, and systematic capture of orders and fills so compliance and internal review can reconstruct any day.",
      sections: [
        {
          title: "Execution and liquidity",
          paragraphs: [
            "We work with trusted liquidity providers and platforms appropriate to your size and instrument set. Routing prioritizes best execution criteria you define—not generic defaults.",
            "Large clips are staged when needed to manage market impact and information leakage, with communication protocols agreed in advance.",
          ],
        },
        {
          title: "Governance and controls",
          paragraphs: [
            "Pre-trade limits, approval matrices, and post-trade reconciliation are part of the standard stack. Surveillance outputs are designed to be useful to risk and compliance, not merely checkbox artifacts.",
            "Cross-border and multi-currency programs include treasury and settlement considerations embedded in the operating model from day one.",
          ],
        },
        {
          title: "Who this fits",
          paragraphs: [
            "Institutions that trade at meaningful scale, require multi-asset or multi-currency capability, and need an audit trail that survives regulatory or board scrutiny.",
          ],
        },
      ],
      capabilities: [
        "Equities and ETFs",
        "FX and treasury-linked trades",
        "Listed derivatives where mandated",
        "Workflow and TCA documentation",
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
