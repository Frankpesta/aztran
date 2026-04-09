import { query } from "./_generated/server";
import { requireUser } from "./auth";

const MS_DAY = 86_400_000;

function utcDayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

function lastNDayKeys(n: number, endMs: number): string[] {
  const keys: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    keys.push(utcDayKey(endMs - i * MS_DAY));
  }
  return keys;
}

/**
 * Aggregated KPIs for the authenticated admin landing view.
 */
export const getAdminOverview = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const insights = await ctx.db.query("insights").collect();
    const blogPosts = await ctx.db.query("blogPosts").collect();
    const marketReports = await ctx.db.query("marketReports").collect();
    const portfolio = await ctx.db.query("portfolio").collect();
    const stats = await ctx.db.query("stats").collect();
    const contacts = await ctx.db.query("contactSubmissions").collect();

    const publishedInsights = insights.filter((p) => p.status === "published").length;
    const publishedBlog = blogPosts.filter((p) => p.status === "published").length;
    const publishedReports = marketReports.filter((p) => p.status === "published")
      .length;

    const unreadContacts = contacts.filter((c) => !c.isRead && !c.isArchived)
      .length;

    const now = Date.now();
    const dayKeys = lastNDayKeys(14, now);
    const contactByDay = new Map(dayKeys.map((d) => [d, 0]));
    for (const c of contacts) {
      if (c.isArchived) continue;
      const k = utcDayKey(c.submittedAt);
      if (contactByDay.has(k)) {
        contactByDay.set(k, (contactByDay.get(k) ?? 0) + 1);
      }
    }
    const contactTrend = dayKeys.map((day) => ({
      day,
      count: contactByDay.get(day) ?? 0,
    }));

    const publishedByDay = new Map(dayKeys.map((d) => [d, 0]));
    const bumpPublishDay = (ts: number | undefined) => {
      if (ts === undefined) return;
      const k = utcDayKey(ts);
      if (publishedByDay.has(k)) {
        publishedByDay.set(k, (publishedByDay.get(k) ?? 0) + 1);
      }
    };
    for (const p of insights) {
      if (p.status !== "published") continue;
      bumpPublishDay(p.publishedAt);
    }
    for (const p of blogPosts) {
      if (p.status !== "published") continue;
      bumpPublishDay(p.publishedAt);
    }
    for (const p of marketReports) {
      if (p.status !== "published") continue;
      bumpPublishDay(p.publishedAt);
    }

    const publishedPostTrend = dayKeys.map((day) => ({
      day,
      count: publishedByDay.get(day) ?? 0,
    }));

    const recentContent = [
      ...insights.map((p) => ({
        kind: "insight" as const,
        id: p._id,
        title: p.title,
        status: p.status,
        sortKey: p.publishedAt ?? p._creationTime,
        href: `/admin/insights/${p._id}/edit`,
      })),
      ...blogPosts.map((p) => ({
        kind: "blog" as const,
        id: p._id,
        title: p.title,
        status: p.status,
        sortKey: p.publishedAt ?? p._creationTime,
        href: `/admin/blog/${p._id}/edit`,
      })),
      ...marketReports.map((p) => ({
        kind: "report" as const,
        id: p._id,
        title: p.title,
        status: p.status,
        sortKey: p.publishedAt ?? p._creationTime,
        href: `/admin/market-reports/${p._id}/edit`,
      })),
    ]
      .sort((a, b) => b.sortKey - a.sortKey)
      .slice(0, 12);

    return {
      publishedInsights,
      publishedBlog,
      publishedReports,
      portfolioCount: portfolio.length,
      statsCount: stats.length,
      unreadContacts,
      recentContent,
      recentContacts: contacts
        .sort((a, b) => b.submittedAt - a.submittedAt)
        .slice(0, 5),
      contactTrend,
      publishedPostTrend,
    };
  },
});
