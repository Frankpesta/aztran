import type { TeamMember } from "@/components/ui/TeamMemberCard";

/**
 * Co-CEO profiles for the About page.
 * Set `fullName` when approved; until then the card headline uses `leadershipFocus`.
 * Replace portraits, LinkedIn URLs, and `bioParagraphs` with final copy.
 */
export type CoCEOProfile = {
  id: string;
  fullName?: string;
  title: string;
  /** Distinct mandate line — used as the main heading until `fullName` is set. */
  leadershipFocus: string;
  imageSrc: string;
  linkedInHref: string;
  /** One or two short paragraphs, in display order. */
  bioParagraphs: readonly string[];
};

export const CO_CEOS: readonly CoCEOProfile[] = [
  {
    id: "ceo-investments",
    title: "Co-Chief Executive Officer",
    leadershipFocus: "Investments, trading & capital formation",
    imageSrc:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=720&fit=crop",
    linkedInHref: "https://www.linkedin.com/company/aztran-global-investments/",
    bioParagraphs: [
      "Leads the firm’s deployment of institutional capital across public and private markets, with emphasis on execution quality and counterparty discipline.",
      "Prior to co-founding the partnership, held senior mandates in multi-asset trading and capital structuring for regulated institutions.",
    ],
  },
  {
    id: "ceo-governance",
    title: "Co-Chief Executive Officer",
    leadershipFocus: "Governance, risk & stakeholder advisory",
    imageSrc:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=720&fit=crop",
    linkedInHref: "https://www.linkedin.com/company/aztran-global-investments/",
    bioParagraphs: [
      "Directs governance architecture, investment policy, and risk oversight—ensuring mandates remain aligned with regulatory expectations and client objectives.",
      "Brings deep experience in board-level advisory and institutional controls across cross-border transactions.",
    ],
  },
];

/**
 * Optional additional leadership tiles (e.g. committee chairs). Empty until real profiles are ready.
 */
export const TEAM_MEMBERS: TeamMember[] = [];
