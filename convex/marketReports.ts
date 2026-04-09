import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireUser } from "./auth";
import {
  marketReportFgnBonds,
  marketReportGlobalMarkets,
  marketReportLocalEquities,
  marketReportMoneyMarket,
  marketReportSsaEurobonds,
  marketReportTreasuryBills,
  publishStatus,
} from "./contentValidators";
import { ensureUniqueSlug, slugFromTitle } from "./slugHelpers";

const marketReportCreateArgs = {
  slug: v.string(),
  title: v.string(),
  reportDate: v.string(),
  displayDate: v.string(),
  status: publishStatus,
  publishedAt: v.optional(v.number()),
  createdBy: v.optional(v.string()),
  updatedBy: v.optional(v.string()),
  pdfStorageId: v.optional(v.id("_storage")),
  pdfFileName: v.optional(v.string()),
  moneyMarket: marketReportMoneyMarket,
  treasuryBills: marketReportTreasuryBills,
  fgnBonds: marketReportFgnBonds,
  ssaEurobonds: marketReportSsaEurobonds,
  localEquities: marketReportLocalEquities,
  globalMarkets: marketReportGlobalMarkets,
  sources: v.optional(v.string()),
  disclaimer: v.optional(v.string()),
};

const marketReportPatchArgs = v.object({
  slug: v.optional(v.string()),
  title: v.optional(v.string()),
  reportDate: v.optional(v.string()),
  displayDate: v.optional(v.string()),
  status: v.optional(publishStatus),
  publishedAt: v.optional(v.number()),
  createdBy: v.optional(v.string()),
  updatedBy: v.optional(v.string()),
  pdfStorageId: v.optional(v.id("_storage")),
  pdfFileName: v.optional(v.string()),
  moneyMarket: v.optional(marketReportMoneyMarket),
  treasuryBills: v.optional(marketReportTreasuryBills),
  fgnBonds: v.optional(marketReportFgnBonds),
  ssaEurobonds: v.optional(marketReportSsaEurobonds),
  localEquities: v.optional(marketReportLocalEquities),
  globalMarkets: v.optional(marketReportGlobalMarkets),
  sources: v.optional(v.string()),
  disclaimer: v.optional(v.string()),
});

export const listPublishedMarketReportsPaginated = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, { paginationOpts }) => {
    return await ctx.db
      .query("marketReports")
      .withIndex("by_status_and_date", (q) => q.eq("status", "published"))
      .order("desc")
      .paginate(paginationOpts);
  },
});

export const getHomeMarketReports = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const n = limit ?? 8;
    return await ctx.db
      .query("marketReports")
      .withIndex("by_status_and_date", (q) => q.eq("status", "published"))
      .order("desc")
      .take(n);
  },
});

export const getMarketReportBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const row = await ctx.db
      .query("marketReports")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!row || row.status !== "published") return null;
    return row;
  },
});

export const getAllMarketReportSlugs = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("marketReports")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    return rows.map((r) => r.slug);
  },
});

export const getAllMarketReports = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const rows = await ctx.db.query("marketReports").collect();
    return rows.sort((a, b) => b.reportDate.localeCompare(a.reportDate));
  },
});

export const getMarketReportById = query({
  args: { id: v.id("marketReports") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    return await ctx.db.get(id);
  },
});

export const createMarketReport = mutation({
  args: marketReportCreateArgs,
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const slug = await ensureUniqueSlug(
      ctx,
      "marketReports",
      args.slug || slugFromTitle(args.title),
    );
    return await ctx.db.insert("marketReports", { ...args, slug });
  },
});

export const updateMarketReport = mutation({
  args: {
    id: v.id("marketReports"),
    patch: marketReportPatchArgs,
  },
  handler: async (ctx, { id, patch }) => {
    await requireUser(ctx);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Market report not found");
    const nextPatch = { ...patch };
    if (nextPatch.slug !== undefined || nextPatch.title !== undefined) {
      const title = nextPatch.title ?? existing.title;
      const base = slugFromTitle(nextPatch.slug ?? title);
      nextPatch.slug = await ensureUniqueSlug(ctx, "marketReports", base, id);
    }
    await ctx.db.patch(id, nextPatch);
  },
});

export const publishMarketReport = mutation({
  args: { id: v.id("marketReports") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, {
      status: "published",
      publishedAt: Date.now(),
    });
  },
});

export const unpublishMarketReport = mutation({
  args: { id: v.id("marketReports") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status: "draft" });
  },
});

export const archiveMarketReport = mutation({
  args: { id: v.id("marketReports") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status: "archived" });
  },
});

export const deleteMarketReport = mutation({
  args: { id: v.id("marketReports") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    const row = await ctx.db.get(id);
    if (!row) return;
    if (row.pdfStorageId) {
      await ctx.storage.delete(row.pdfStorageId);
    }
    await ctx.db.delete(id);
  },
});
