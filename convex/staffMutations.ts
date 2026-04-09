import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation } from "./_generated/server";
import { requireAdmin } from "./auth";
import { hashInviteToken, randomInviteSecret } from "./staffToken";

const INVITE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export const createModeratorInvite = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const { user } = await requireAdmin(ctx);
    const email = normalizeEmail(args.email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address");
    }

    const existingUser = await ctx.db
      .query("staffUsers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    if (existingUser) {
      throw new Error("This email already has an account");
    }

    const sameEmailInvites = await ctx.db
      .query("staffInvites")
      .withIndex("by_email", (q) => q.eq("email", email))
      .collect();
    const now = Date.now();
    const hasPending = sameEmailInvites.some(
      (i) => !i.usedAt && i.expiresAt > now,
    );
    if (hasPending) {
      throw new Error("A pending invitation already exists for this email");
    }

    const plainToken = randomInviteSecret();
    const tokenHash = await hashInviteToken(plainToken);
    const inviteId = await ctx.db.insert("staffInvites", {
      email,
      tokenHash,
      role: "moderator",
      invitedBy: user._id,
      createdAt: now,
      expiresAt: now + INVITE_TTL_MS,
    });

    await ctx.scheduler.runAfter(
      0,
      internal.staffInviteDelivery.deliverModeratorInvite,
      {
        inviteId,
        plainToken,
        invitedByLabel: user.name?.trim() || user.email,
      },
    );

    return { inviteId };
  },
});
