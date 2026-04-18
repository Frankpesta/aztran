import { paginationOptsValidator } from "convex/server";
import { mutation, query, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { requireUser } from "./auth";
import type { Id } from "./_generated/dataModel";
import { insightMetric, insightSection, publishStatus } from "./contentValidators";
import { ensureUniqueSlug, slugFromTitle } from "./slugHelpers";

async function deleteInsightAssets(
  ctx: MutationCtx,
  row: { coverImageId?: Id<"_storage">; pdfStorageId?: Id<"_storage"> },
) {
  if (row.coverImageId) {
    await ctx.storage.delete(row.coverImageId);
  }
  if (row.pdfStorageId) {
    await ctx.storage.delete(row.pdfStorageId);
  }
}

const insightCreateArgs = {
  title: v.string(),
  slug: v.string(),
  referenceDate: v.string(),
  displayDate: v.string(),
  category: v.string(),
  tags: v.array(v.string()),
  sources: v.array(v.string()),
  status: publishStatus,
  isFeatured: v.boolean(),
  metrics: v.optional(v.array(insightMetric)),
  sections: v.array(insightSection),
  coverImageId: v.optional(v.id("_storage")),
  pdfStorageId: v.optional(v.id("_storage")),
  pdfFileName: v.optional(v.string()),
  summary: v.string(),
  readTimeMinutes: v.optional(v.number()),
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  publishedAt: v.optional(v.number()),
  createdBy: v.optional(v.string()),
  updatedBy: v.optional(v.string()),
};

const insightPatchArgs = v.object({
  title: v.optional(v.string()),
  slug: v.optional(v.string()),
  referenceDate: v.optional(v.string()),
  displayDate: v.optional(v.string()),
  category: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  sources: v.optional(v.array(v.string())),
  status: v.optional(publishStatus),
  isFeatured: v.optional(v.boolean()),
  metrics: v.optional(v.array(insightMetric)),
  sections: v.optional(v.array(insightSection)),
  coverImageId: v.optional(v.id("_storage")),
  pdfStorageId: v.optional(v.id("_storage")),
  pdfFileName: v.optional(v.string()),
  summary: v.optional(v.string()),
  readTimeMinutes: v.optional(v.number()),
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  publishedAt: v.optional(v.number()),
  createdBy: v.optional(v.string()),
  updatedBy: v.optional(v.string()),
});

const MACRO_REPORT_CATEGORY = "Macro Report";
const LEGACY_MACRO_INFLATION_CATEGORY = "Inflation";

export const listPublishedInsightsPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    category: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, category }) => {
    let q = ctx.db
      .query("insights")
      .withIndex("by_status_referenceDate", (iq) => iq.eq("status", "published"))
      .order("desc");
    if (category && category !== "All") {
      if (category === MACRO_REPORT_CATEGORY) {
        q = q.filter((f) =>
          f.or(
            f.eq(f.field("category"), MACRO_REPORT_CATEGORY),
            f.eq(f.field("category"), LEGACY_MACRO_INFLATION_CATEGORY),
          ),
        );
      } else {
        q = q.filter((f) => f.eq(f.field("category"), category));
      }
    }
    return await q.paginate(paginationOpts);
  },
});

export const getHomeInsights = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const n = limit ?? 8;
    return await ctx.db
      .query("insights")
      .withIndex("by_status_referenceDate", (q) => q.eq("status", "published"))
      .order("desc")
      .take(n);
  },
});

export const getInsightBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const row = await ctx.db
      .query("insights")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!row || row.status !== "published") return null;
    return row;
  },
});

export const getInsightsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, { category }) => {
    const rows = await ctx.db
      .query("insights")
      .withIndex("by_status_and_category", (q) =>
        q.eq("status", "published").eq("category", category),
      )
      .collect();
    return rows.sort((a, b) => b.referenceDate.localeCompare(a.referenceDate));
  },
});

export const getAllInsightSlugs = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("insights")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    return rows.map((r) => r.slug);
  },
});

export const getPublishedInsightCategories = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("insights")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    return Array.from(new Set(rows.map((r) => r.category))).sort((a, b) =>
      a.localeCompare(b),
    );
  },
});

export const getFeaturedInsights = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("insights")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .collect();
    return rows
      .filter((r) => r.status === "published")
      .sort((a, b) => b.referenceDate.localeCompare(a.referenceDate))
      .slice(0, 4);
  },
});

export const getAllInsights = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const rows = await ctx.db.query("insights").collect();
    return rows.sort((a, b) => b.referenceDate.localeCompare(a.referenceDate));
  },
});

export const getInsightById = query({
  args: { id: v.id("insights") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    return await ctx.db.get(id);
  },
});

export const createInsight = mutation({
  args: insightCreateArgs,
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const slug = await ensureUniqueSlug(
      ctx,
      "insights",
      args.slug || slugFromTitle(args.title),
    );
    return await ctx.db.insert("insights", { ...args, slug });
  },
});

export const updateInsight = mutation({
  args: {
    id: v.id("insights"),
    patch: insightPatchArgs,
  },
  handler: async (ctx, { id, patch }) => {
    await requireUser(ctx);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Insight not found");
    const nextPatch = { ...patch };
    if (nextPatch.slug !== undefined || nextPatch.title !== undefined) {
      const title = nextPatch.title ?? existing.title;
      const base = slugFromTitle(nextPatch.slug ?? title);
      nextPatch.slug = await ensureUniqueSlug(ctx, "insights", base, id);
    }
    await ctx.db.patch(id, nextPatch);
  },
});

export const publishInsight = mutation({
  args: { id: v.id("insights") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, {
      status: "published",
      publishedAt: Date.now(),
    });
  },
});

export const unpublishInsight = mutation({
  args: { id: v.id("insights") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, {
      status: "draft",
    });
  },
});

export const archiveInsight = mutation({
  args: { id: v.id("insights") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status: "archived" });
  },
});

export const deleteInsight = mutation({
  args: { id: v.id("insights") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    const row = await ctx.db.get(id);
    if (!row) return;
    await deleteInsightAssets(ctx, row);
    await ctx.db.delete(id);
  },
});
