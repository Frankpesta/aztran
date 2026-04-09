import { paginationOptsValidator } from "convex/server";
import { mutation, query, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { requireUser } from "./auth";
import { blogSection, publishStatus } from "./contentValidators";
import { ensureUniqueSlug, slugFromTitle } from "./slugHelpers";
import type { Doc } from "./_generated/dataModel";

async function deleteBlogAssets(ctx: MutationCtx, row: Doc<"blogPosts">) {
  if (row.coverImageId) {
    await ctx.storage.delete(row.coverImageId);
  }
  for (const s of row.sections) {
    if (s.imageStorageId) {
      await ctx.storage.delete(s.imageStorageId);
    }
  }
}

const blogCreateArgs = {
  title: v.string(),
  slug: v.string(),
  seriesName: v.optional(v.string()),
  referenceDate: v.string(),
  displayDate: v.string(),
  author: v.string(),
  category: v.string(),
  tags: v.array(v.string()),
  status: publishStatus,
  isFeatured: v.boolean(),
  intro: v.string(),
  sections: v.array(blogSection),
  coverImageId: v.optional(v.id("_storage")),
  readTimeMinutes: v.optional(v.number()),
  summary: v.string(),
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  publishedAt: v.optional(v.number()),
  createdBy: v.optional(v.string()),
  updatedBy: v.optional(v.string()),
};

const blogPatchArgs = v.object({
  title: v.optional(v.string()),
  slug: v.optional(v.string()),
  seriesName: v.optional(v.string()),
  referenceDate: v.optional(v.string()),
  displayDate: v.optional(v.string()),
  author: v.optional(v.string()),
  category: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  status: v.optional(publishStatus),
  isFeatured: v.optional(v.boolean()),
  intro: v.optional(v.string()),
  sections: v.optional(v.array(blogSection)),
  coverImageId: v.optional(v.id("_storage")),
  readTimeMinutes: v.optional(v.number()),
  summary: v.optional(v.string()),
  seoTitle: v.optional(v.string()),
  seoDescription: v.optional(v.string()),
  publishedAt: v.optional(v.number()),
  createdBy: v.optional(v.string()),
  updatedBy: v.optional(v.string()),
});

export const listPublishedBlogPostsPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
    category: v.optional(v.string()),
  },
  handler: async (ctx, { paginationOpts, category }) => {
    let q = ctx.db
      .query("blogPosts")
      .withIndex("by_status_referenceDate", (iq) => iq.eq("status", "published"))
      .order("desc");
    if (category && category !== "All") {
      q = q.filter((f) => f.eq(f.field("category"), category));
    }
    return await q.paginate(paginationOpts);
  },
});

export const getHomeBlogPosts = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const n = limit ?? 8;
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_status_referenceDate", (q) => q.eq("status", "published"))
      .order("desc")
      .take(n);
  },
});

export const getBlogPostBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const row = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (!row || row.status !== "published") return null;
    return row;
  },
});

export const getBlogPostsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, { category }) => {
    const rows = await ctx.db
      .query("blogPosts")
      .withIndex("by_status_and_category", (q) =>
        q.eq("status", "published").eq("category", category),
      )
      .collect();
    return rows.sort((a, b) => b.referenceDate.localeCompare(a.referenceDate));
  },
});

export const getAllBlogSlugs = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("blogPosts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    return rows.map((r) => r.slug);
  },
});

export const getPublishedBlogCategories = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("blogPosts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();
    return Array.from(new Set(rows.map((r) => r.category))).sort((a, b) =>
      a.localeCompare(b),
    );
  },
});

export const getFeaturedBlogPosts = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db
      .query("blogPosts")
      .withIndex("by_featured", (q) => q.eq("isFeatured", true))
      .collect();
    return rows
      .filter((r) => r.status === "published")
      .sort((a, b) => b.referenceDate.localeCompare(a.referenceDate))
      .slice(0, 4);
  },
});

export const getAllBlogPosts = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const rows = await ctx.db.query("blogPosts").collect();
    return rows.sort((a, b) => b.referenceDate.localeCompare(a.referenceDate));
  },
});

export const getBlogPostById = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    return await ctx.db.get(id);
  },
});

export const createBlogPost = mutation({
  args: blogCreateArgs,
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const slug = await ensureUniqueSlug(
      ctx,
      "blogPosts",
      args.slug || slugFromTitle(args.title),
    );
    return await ctx.db.insert("blogPosts", { ...args, slug });
  },
});

export const updateBlogPost = mutation({
  args: {
    id: v.id("blogPosts"),
    patch: blogPatchArgs,
  },
  handler: async (ctx, { id, patch }) => {
    await requireUser(ctx);
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Blog post not found");
    const nextPatch = { ...patch };
    if (nextPatch.slug !== undefined || nextPatch.title !== undefined) {
      const title = nextPatch.title ?? existing.title;
      const base = slugFromTitle(nextPatch.slug ?? title);
      nextPatch.slug = await ensureUniqueSlug(ctx, "blogPosts", base, id);
    }
    await ctx.db.patch(id, nextPatch);
  },
});

export const publishBlogPost = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, {
      status: "published",
      publishedAt: Date.now(),
    });
  },
});

export const unpublishBlogPost = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status: "draft" });
  },
});

export const archiveBlogPost = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    await ctx.db.patch(id, { status: "archived" });
  },
});

export const deleteBlogPost = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, { id }) => {
    await requireUser(ctx);
    const row = await ctx.db.get(id);
    if (!row) return;
    await deleteBlogAssets(ctx, row);
    await ctx.db.delete(id);
  },
});
