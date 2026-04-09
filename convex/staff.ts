import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { requireAdmin } from "./auth";
import { hashInviteToken } from "./staffToken";

export const me = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.subject) {
      return null;
    }
    const user = await ctx.db.get(identity.subject as Id<"staffUsers">);
    if (!user) {
      return null;
    }
    return {
      email: user.email,
      name: user.name,
      role: user.role,
    };
  },
});

export const listTeam = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const users = await ctx.db.query("staffUsers").collect();
    return users
      .map((u) => ({
        id: u._id,
        email: u.email,
        name: u.name,
        role: u.role,
        createdAt: u.createdAt,
        lastLoginAt: u.lastLoginAt,
      }))
      .sort((a, b) => a.email.localeCompare(b.email));
  },
});

export const listPendingInvites = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const invites = await ctx.db.query("staffInvites").collect();
    const now = Date.now();
    return invites
      .filter((i) => !i.usedAt && i.expiresAt > now)
      .map((i) => ({
        id: i._id,
        email: i.email,
        createdAt: i.createdAt,
        expiresAt: i.expiresAt,
      }))
      .sort((a, b) => b.createdAt - a.createdAt);
  },
});

/**
 * Shapes the accept-invite screen; safe to call with the secret from the email link.
 */
export const validateInvite = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const tokenHash = await hashInviteToken(args.token.trim());
    const inv = await ctx.db
      .query("staffInvites")
      .withIndex("by_token_hash", (q) => q.eq("tokenHash", tokenHash))
      .unique();
    const now = Date.now();
    if (!inv || inv.usedAt != null || inv.expiresAt < now) {
      return { valid: false as const };
    }
    return { valid: true as const, email: inv.email };
  },
});
