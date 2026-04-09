import type { TeamMember } from "@/components/ui/TeamMemberCard";

/**
 * Co–managing partner profiles for the About page (`CoCEOSection`).
 * Portraits live in `/public/images/` (e.g. `victor.jpeg`, `taiwo.jpeg`).
 */
export type CoCEOProfile = {
  id: string;
  fullName?: string;
  title: string;
  /** Distinct mandate line — used as the main heading until `fullName` is set; with `fullName`, shown as the subtitle. */
  leadershipFocus: string;
  imageSrc: string;
  linkedInHref: string;
  /** One or two short paragraphs, in display order. */
  bioParagraphs: readonly string[];
};

export const CO_CEOS: readonly CoCEOProfile[] = [
  {
    id: "victor-aluyi",
    fullName: "Victor Aluyi",
    title: "Co-Managing Partner",
    leadershipFocus: "Investments, trading & capital formation",
    imageSrc: "/images/victor.jpeg",
    linkedInHref: "https://www.linkedin.com/company/aztran-global-investments/",
    bioParagraphs: [
      "Co-leads the firm’s investment and markets agenda—deploying institutional capital across public and private markets with emphasis on execution quality, liquidity, and counterparty discipline.",
      "Works with sovereign, pension, and private institutional clients on mandate design, portfolio implementation, and capital formation.",
    ],
  },
  {
    id: "taiwo-adams",
    fullName: "Taiwo Adams",
    title: "Co-Managing Partner",
    leadershipFocus: "Governance, risk & stakeholder advisory",
    imageSrc: "/images/taiwo.jpeg",
    linkedInHref: "https://www.linkedin.com/company/aztran-global-investments/",
    bioParagraphs: [
      "Co-leads governance architecture, investment policy, and risk oversight—keeping mandates aligned with regulatory expectations in Nigeria and with each client’s objectives.",
      "Advises boards and investment committees on controls, reporting transparency, and institutional best practice across cross-border programmes.",
    ],
  },
];

/**
 * Optional additional leadership tiles (e.g. committee chairs). Empty until real profiles are ready.
 */
export const TEAM_MEMBERS: TeamMember[] = [];
