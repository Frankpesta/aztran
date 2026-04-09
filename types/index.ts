import type { Doc } from "../convex/_generated/dataModel";

export type InsightDoc = Doc<"insights">;
export type BlogPostDoc = Doc<"blogPosts">;
export type MarketReportDoc = Doc<"marketReports">;
export type PortfolioDoc = Doc<"portfolio">;
export type StatDoc = Doc<"stats">;
export type ContactSubmissionDoc = Doc<"contactSubmissions">;

export type PortfolioStatus = PortfolioDoc["status"];
export type PortfolioSector = PortfolioDoc["sector"];
