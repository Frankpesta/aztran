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
  /** One or more paragraphs, in display order. */
  bioParagraphs: readonly string[];
};

export const CO_CEOS: readonly CoCEOProfile[] = [
  {
    id: "victor-aluyi",
    fullName: "Victor Aluyi",
    title: "Co-Managing Partner",
    leadershipFocus: "Investment research, portfolio management & capital markets",
    imageSrc: "/images/victor.jpeg",
    linkedInHref: "https://www.linkedin.com/company/aztran-global-investments/",
    bioParagraphs: [
      "Victor is a seasoned investment professional with over 18 years of experience in investment research and portfolio management, including senior leadership roles overseeing the deployment of client and proprietary funds and managing key client and regulatory relationships.",
      "He most recently led the investment team at Sankore Global Investments. Previously, he served as Head of Asset Management at Comercio Partners Asset Management and held senior roles at Elixir Investment Partners (Head of Fixed Income, managing portfolios over ₦65 billion), ARM Investment Managers (Portfolio Manager overseeing naira and USD portfolios exceeding $100 million in AUM), and Assur Asset Management (now AXA Mansard Investments), where he rose to Head of the Equities Desk.",
      "He began his career in equity research at FutureView Financial Services.",
      "Victor holds a bachelor\u2019s degree in Economics from Obafemi Awolowo University and has completed advanced training at institutions including Lagos Business School, the West African Capital Market School, and the New York Institute of Finance. He is also active in market development, regularly providing financial market commentary on CNBC and ARISE TV, and facilitating training for the Financial Markets Dealers\u2019 Association.",
    ],
  },
  {
    id: "taiwo-adams",
    fullName: "Taiwo Adams",
    title: "Co-Managing Partner",
    leadershipFocus: "Brokerage services, markets & institutional stakeholder advisory",
    imageSrc: "/images/taiwo.jpeg",
    linkedInHref: "https://www.linkedin.com/company/aztran-global-investments/",
    bioParagraphs: [
      "Taiwo Adams is a Co-Managing Partner of Aztran Limited, with over 13 years of experience in fixed income trading, financial market analysis, and public administration. He is a seasoned leader known for strategic insight, operational excellence, and driving growth in the financial services sector.",
      "As Head of Brokerage Services at Comercio Partners, Nigeria's leading investment firm, he led the execution of transactions exceeding ₦4 trillion, delivering over 20% annual revenue growth through effective trade strategy execution, strong team leadership, expanded market coverage, and rigorous oversight across multiple asset classes.",
      "Beyond the private sector, Taiwo served as Senior Special Assistant to the Governor on Commerce and Industry in Lagos State, where he supported economic development by improving SME access to finance, coordinating high-impact corporate engagements, and promoting cost-efficient, technology-driven solutions.",
      "He holds a BSc in Business Administration/Finance from the University of Detroit Mercy, USA, and is a member of the ACI Financial Markets Association. Outside of work, Taiwo is passionate about sports, fitness, and overall well-being, reflecting a balanced and disciplined approach to life and leadership.",
    ],
  },
];

/**
 * Optional additional leadership tiles (e.g. committee chairs). Empty until real profiles are ready.
 */
export const TEAM_MEMBERS: TeamMember[] = [];
