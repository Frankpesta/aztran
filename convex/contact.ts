import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { requireUser } from "./auth";

export const getSubmissionInternal = internalQuery({
  args: { id: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const patchRecaptchaOnSubmission = internalMutation({
  args: {
    id: v.id("contactSubmissions"),
    score: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { recaptchaScore: args.score });
  },
});

export const submitContactForm = mutation({
  args: {
    fullName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    recaptchaToken: v.string(),
  },
  handler: async (ctx, args) => {
    const { recaptchaToken, ...fields } = args;
    const id = await ctx.db.insert("contactSubmissions", {
      ...fields,
      submittedAt: Date.now(),
      isRead: false,
      isArchived: false,
    });
    await ctx.scheduler.runAfter(
      0,
      internal.contactActions.deliverContactEmails,
      {
        submissionId: id,
        recaptchaToken,
      },
    );
    return id;
  },
});

export const getSubmissions = query({
  args: {
    filter: v.optional(
      v.union(v.literal("all"), v.literal("unread"), v.literal("archived")),
    ),
  },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    const f = args.filter ?? "all";
    const rows = await ctx.db.query("contactSubmissions").collect();
    const sorted = rows.sort((a, b) => b.submittedAt - a.submittedAt);
    if (f === "archived") {
      return sorted.filter((r) => r.isArchived);
    }
    if (f === "unread") {
      return sorted.filter((r) => !r.isArchived && !r.isRead);
    }
    return sorted.filter((r) => !r.isArchived);
  },
});

export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);
    const rows = await ctx.db.query("contactSubmissions").collect();
    return rows.filter((r) => !r.isRead && !r.isArchived).length;
  },
});

export const markAsRead = mutation({
  args: { id: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    await ctx.db.patch(args.id, { isRead: true });
  },
});

export const archiveSubmission = mutation({
  args: { id: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await requireUser(ctx);
    await ctx.db.patch(args.id, { isArchived: true, isRead: true });
  },
});
