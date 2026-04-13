import { redirect } from "next/navigation";

/**
 * Market reports index consolidated under Insights (category-filtered listing).
 */
export default function MarketReportsIndexRedirect(): never {
  redirect("/insights/market-report");
}
