import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireUser } from "./auth";

export const getVisibleStats = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("stats").collect();
    return rows
      .filter((r) => r.isVisible)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const getAllStats = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const rows = await ctx.db.query("stats").collect();
    return rows.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const upsertStat = mutation({
  args: {
    key: v.string(),
    label: v.string(),
    value: v.string(),
    numericValue: v.optional(v.number()),
    prefix: v.optional(v.string()),
    suffix: v.optional(v.string()),
    sortOrder: v.number(),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const existing = await ctx.db
      .query("stats")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, {
        label: args.label,
        value: args.value,
        numericValue: args.numericValue,
        prefix: args.prefix,
        suffix: args.suffix,
        sortOrder: args.sortOrder,
        isVisible: args.isVisible,
      });
      return existing._id;
    }
    return await ctx.db.insert("stats", args);
  },
});

export const updateStatVisibility = mutation({
  args: { id: v.id("stats"), isVisible: v.boolean() },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    await ctx.db.patch(args.id, { isVisible: args.isVisible });
  },
});

export const reorderStats = mutation({
  args: { id: v.id("stats"), newSortOrder: v.number() },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    await ctx.db.patch(args.id, { sortOrder: args.newSortOrder });
  },
});
