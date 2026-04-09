import {
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { v } from "convex/values";

export const getByEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("staffUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

export const getInviteByTokenHash = internalQuery({
  args: { tokenHash: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("staffInvites")
      .withIndex("by_token_hash", (q) => q.eq("tokenHash", args.tokenHash))
      .unique();
  },
});

export const insertStaffUser = internalMutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    name: v.optional(v.string()),
    role: v.union(v.literal("admin"), v.literal("moderator")),
    invitedBy: v.optional(v.id("staffUsers")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("staffUsers", {
      email: args.email,
      passwordHash: args.passwordHash,
      name: args.name,
      role: args.role,
      createdAt: Date.now(),
      invitedBy: args.invitedBy,
    });
  },
});

export const markInviteUsed = internalMutation({
  args: { inviteId: v.id("staffInvites") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.inviteId, { usedAt: Date.now() });
  },
});

export const getInviteById = internalQuery({
  args: { id: v.id("staffInvites") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const finalizeModeratorSignup = internalMutation({
  args: {
    inviteId: v.id("staffInvites"),
    passwordHash: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const inv = await ctx.db.get(args.inviteId);
    if (!inv || inv.usedAt != null || inv.expiresAt < Date.now()) {
      throw new Error("Invalid or expired invitation");
    }
    const existing = await ctx.db
      .query("staffUsers")
      .withIndex("by_email", (q) => q.eq("email", inv.email))
      .unique();
    if (existing) {
      throw new Error("An account with this email already exists");
    }
    const id = await ctx.db.insert("staffUsers", {
      email: inv.email,
      passwordHash: args.passwordHash,
      name: args.name,
      role: "moderator",
      createdAt: Date.now(),
      invitedBy: inv.invitedBy,
    });
    await ctx.db.patch(args.inviteId, { usedAt: Date.now() });
    return id;
  },
});

export const recordStaffLogin = internalMutation({
  args: { staffUserId: v.id("staffUsers") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.staffUserId, { lastLoginAt: Date.now() });
  },
});

/** Records first admin bootstrap (role already admin on insert). */
export const countStaff = internalQuery({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("staffUsers").collect();
    return all.length;
  },
});
