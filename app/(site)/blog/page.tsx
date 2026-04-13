import { redirect } from "next/navigation";

/**
 * Blog listing removed from public IA; legacy index forwards to Insights.
 */
export default function BlogIndexRedirect(): never {
  redirect("/insights");
}
