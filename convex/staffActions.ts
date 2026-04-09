"use node";

import { v } from "convex/values";
import bcrypt from "bcryptjs";
import type { Id } from "./_generated/dataModel";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";
import { hashInviteToken } from "./staffToken";

export const verifyLoginCredentials = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args): Promise<{ staffId: Id<"staffUsers"> }> => {
    const email = args.email.trim().toLowerCase();
    const user = await ctx.runQuery(internal.staffInternal.getByEmail, {
      email,
    });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const ok = await bcrypt.compare(args.password, user.passwordHash);
    if (!ok) {
      throw new Error("Invalid email or password");
    }
    await ctx.runMutation(internal.staffInternal.recordStaffLogin, {
      staffUserId: user._id,
    });
    return { staffId: user._id };
  },
});

export const bootstrapFirstAdmin = action({
  args: {
    secret: v.string(),
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ ok: true }> => {
    const expected = process.env.STAFF_BOOTSTRAP_SECRET;
    if (!expected || args.secret !== expected) {
      throw new Error("Not allowed");
    }
    const count = await ctx.runQuery(internal.staffInternal.countStaff, {});
    if (count > 0) {
      throw new Error("Staff accounts already exist");
    }
    const email = args.email.trim().toLowerCase();
    const passwordHash = await bcrypt.hash(args.password, 12);
    await ctx.runMutation(internal.staffInternal.insertStaffUser, {
      email,
      passwordHash,
      name: args.name,
      role: "admin",
    });
    return { ok: true as const };
  },
});

export const acceptModeratorInvite = action({
  args: {
    token: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<{ staffId: Id<"staffUsers"> }> => {
    const tokenHash = await hashInviteToken(args.token.trim());
    const inv = await ctx.runQuery(internal.staffInternal.getInviteByTokenHash, {
      tokenHash,
    });
    if (!inv || inv.usedAt != null || inv.expiresAt < Date.now()) {
      throw new Error("Invalid or expired invitation");
    }
    if (args.password.length < 10) {
      throw new Error("Password must be at least 10 characters");
    }
    const passwordHash = await bcrypt.hash(args.password, 12);
    const staffId = await ctx.runMutation(
      internal.staffInternal.finalizeModeratorSignup,
      {
        inviteId: inv._id,
        passwordHash,
        name: args.name?.trim() || undefined,
      },
    );
    return { staffId };
  },
});
