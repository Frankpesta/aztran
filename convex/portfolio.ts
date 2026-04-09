import { mutation, query, type QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import slugify from "slugify";
import type { GenericId } from "convex/values";
import { requireUser } from "./auth";

function slugFromTitle(title: string): string {
  return slugify(title, { lower: true, strict: true, trim: true });
}

type DbCtx = { db: QueryCtx["db"] };

async function ensureUniquePortfolioSlug(
  ctx: DbCtx,
  base: string,
  excludeId?: GenericId<"portfolio">,
): Promise<string> {
  let candidate = base;
  let n = 1;
  for (;;) {
    const existing = await ctx.db
      .query("portfolio")
      .filter((q) => q.eq(q.field("slug"), candidate))
      .first();
    if (!existing || (excludeId && existing._id === excludeId)) {
      return candidate;
    }
    candidate = `${base}-${n}`;
    n += 1;
  }
}

export const getAllPortfolio = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("portfolio").collect();
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const getPortfolioSummary = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("portfolio").collect();
    return {
      totalDeals: all.length,
      activePositions: all.filter((i) => i.status === "active").length,
      sectorsCovered: new Set(all.map((i) => i.sector)).size,
      regionsActive: new Set(all.map((i) => i.region)).size,
    };
  },
});

export const getFeaturedPortfolio = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("portfolio")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .collect();
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const getPortfolioBySector = query({
  args: { sector: v.string() },
  handler: async (ctx, args) => {
    if (args.sector === "All") {
      const rows = await ctx.db.query("portfolio").collect();
      return rows.sort((a, b) => a.sortOrder - b.sortOrder);
    }
    const rows = await ctx.db
      .query("portfolio")
      .withIndex("by_sector", (q) => q.eq("sector", args.sector))
      .collect();
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const getPortfolioByStatus = query({
  args: {
    status: v.union(
      v.literal("active"),
      v.literal("exited"),
      v.literal("pipeline"),
    ),
  },
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("portfolio")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const getAllPortfolioAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const rows = await ctx.db.query("portfolio").collect();
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const getPortfolioById = query({
  args: { id: v.id("portfolio") },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    return await ctx.db.get(args.id);
  },
});

const portfolioInput = {
  title: v.string(),
  slug: v.string(),
  sector: v.string(),
  region: v.string(),
  description: v.string(),
  highlights: v.array(v.string()),
  dealSize: v.optional(v.string()),
  returnRate: v.optional(v.string()),
  status: v.union(
    v.literal("active"),
    v.literal("exited"),
    v.literal("pipeline"),
  ),
  imageId: v.optional(v.id("_storage")),
  imageUrl: v.optional(v.string()),
  year: v.number(),
  featured: v.boolean(),
  sortOrder: v.number(),
};

export const createPortfolioItem = mutation({
  args: portfolioInput,
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const slug = await ensureUniquePortfolioSlug(
      ctx,
      args.slug || slugFromTitle(args.title),
    );
    return await ctx.db.insert("portfolio", { ...args, slug });
  },
});

export const updatePortfolioItem = mutation({
  args: {
    id: v.id("portfolio"),
    patch: v.object({
      title: v.optional(v.string()),
      slug: v.optional(v.string()),
      sector: v.optional(v.string()),
      region: v.optional(v.string()),
      description: v.optional(v.string()),
      highlights: v.optional(v.array(v.string())),
      dealSize: v.optional(v.string()),
      returnRate: v.optional(v.string()),
      status: v.optional(
        v.union(
          v.literal("active"),
          v.literal("exited"),
          v.literal("pipeline"),
        ),
      ),
      imageId: v.optional(v.id("_storage")),
      imageUrl: v.optional(v.string()),
      year: v.optional(v.number()),
      featured: v.optional(v.boolean()),
      sortOrder: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Portfolio item not found");
    const patch = { ...args.patch };
    if (patch.slug !== undefined || patch.title !== undefined) {
      const title = patch.title ?? existing.title;
      const base = slugFromTitle(patch.slug ?? title);
      patch.slug = await ensureUniquePortfolioSlug(ctx, base, args.id);
    }
    await ctx.db.patch(args.id, patch);
  },
});

export const deletePortfolioItem = mutation({
  args: { id: v.id("portfolio") },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const row = await ctx.db.get(args.id);
    if (!row) return;
    if (row.imageId) {
      await ctx.storage.delete(row.imageId);
    }
    await ctx.db.delete(args.id);
  },
});

export const reorderPortfolio = mutation({
  args: { id: v.id("portfolio"), newSortOrder: v.number() },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    await ctx.db.patch(args.id, { sortOrder: args.newSortOrder });
  },
});
