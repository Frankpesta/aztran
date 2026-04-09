import slugify from "slugify";
import type { Id } from "./_generated/dataModel";
import type { QueryCtx } from "./_generated/server";

type SlugTable = "insights" | "blogPosts" | "marketReports";

type SlugDocId = Id<"insights"> | Id<"blogPosts"> | Id<"marketReports">;

type DbCtx = { db: QueryCtx["db"] };

export function slugFromTitle(title: string): string {
  return slugify(title, { lower: true, strict: true, trim: true });
}

export async function ensureUniqueSlug(
  ctx: DbCtx,
  table: SlugTable,
  base: string,
  excludeId?: SlugDocId,
): Promise<string> {
  let candidate = base;
  let n = 1;
  for (;;) {
    const existing = await ctx.db
      .query(table)
      .withIndex("by_slug", (q) => q.eq("slug", candidate))
      .first();
    if (!existing || (excludeId && existing._id === excludeId)) {
      return candidate;
    }
    candidate = `${base}-${n}`;
    n += 1;
  }
}
