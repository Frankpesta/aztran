import type { Id } from "./_generated/dataModel";
import type { MutationCtx, QueryCtx } from "./_generated/server";

/**
 * Requires an authenticated Convex JWT tied to an existing staff user.
 */
export async function requireUser(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.subject) {
    throw new Error("Unauthorized");
  }
  const user = await ctx.db.get(identity.subject as Id<"staffUsers">);
  if (!user) {
    throw new Error("Unauthorized");
  }
  return identity;
}

/**
 * Requires the signed-in staff member to be the sole platform administrator.
 */
export async function requireAdmin(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.subject) {
    throw new Error("Unauthorized");
  }
  const user = await ctx.db.get(identity.subject as Id<"staffUsers">);
  if (!user || user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return { identity, user };
}
