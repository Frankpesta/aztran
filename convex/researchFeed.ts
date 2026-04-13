import { query } from "./_generated/server";
import { v } from "convex/values";

const MACRO = "Macro Report";

/**
 * Public marketing feeds that merge insights, blog posts, and structured market reports.
 * Sort key is ISO date string (referenceDate / reportDate).
 */
export const getMergedResearchFeed = query({
  args: { limit: v.number() },
  handler: async (ctx, { limit }) => {
    const cap = Math.min(Math.max(limit, 1), 150);
    const takeEach = Math.min(cap * 3, 300);
    const [ins, blogs, reps] = await Promise.all([
      ctx.db
        .query("insights")
        .withIndex("by_status_referenceDate", (q) => q.eq("status", "published"))
        .order("desc")
        .take(takeEach),
      ctx.db
        .query("blogPosts")
        .withIndex("by_status_referenceDate", (q) => q.eq("status", "published"))
        .order("desc")
        .take(takeEach),
      ctx.db
        .query("marketReports")
        .withIndex("by_status_and_date", (q) => q.eq("status", "published"))
        .order("desc")
        .take(takeEach),
    ]);
    const items = [
      ...ins.map((doc) => ({ kind: "insight" as const, ref: doc.referenceDate, doc })),
      ...blogs.map((doc) => ({ kind: "blog" as const, ref: doc.referenceDate, doc })),
      ...reps.map((doc) => ({ kind: "marketReport" as const, ref: doc.reportDate, doc })),
    ];
    items.sort((a, b) => b.ref.localeCompare(a.ref));
    return items.slice(0, cap);
  },
});

/** Structured desk reports only (matches `/insights/market-report`). */
export const getMergedMarketLaneFeed = query({
  args: { limit: v.number() },
  handler: async (ctx, { limit }) => {
    const cap = Math.min(Math.max(limit, 1), 150);
    const reps = await ctx.db
      .query("marketReports")
      .withIndex("by_status_and_date", (q) => q.eq("status", "published"))
      .order("desc")
      .take(cap);
    return reps.map((doc) => ({
      kind: "marketReport" as const,
      ref: doc.reportDate,
      doc,
    }));
  },
});

/** Blog posts only (matches `/insights/market-buzz`). */
export const getMergedBuzzLaneFeed = query({
  args: { limit: v.number() },
  handler: async (ctx, { limit }) => {
    const cap = Math.min(Math.max(limit, 1), 150);
    const blogs = await ctx.db
      .query("blogPosts")
      .withIndex("by_status_referenceDate", (q) => q.eq("status", "published"))
      .order("desc")
      .take(cap);
    return blogs.map((doc) => ({
      kind: "blog" as const,
      ref: doc.referenceDate,
      doc,
    }));
  },
});

/** Macro Report lane — category string matches `INSIGHT_CATEGORIES.macroReport` in site-nav. */
export const getMacroInsightsFeed = query({
  args: { limit: v.number() },
  handler: async (ctx, { limit }) => {
    const cap = Math.min(Math.max(limit, 1), 150);
    const rows = await ctx.db
      .query("insights")
      .withIndex("by_status_referenceDate", (q) => q.eq("status", "published"))
      .order("desc")
      .filter((f) => f.eq(f.field("category"), MACRO))
      .take(cap);
    return rows.map((doc) => ({ kind: "insight" as const, ref: doc.referenceDate, doc }));
  },
});
