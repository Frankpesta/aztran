import type { Doc } from "@/convex/_generated/dataModel";

/** Row returned by `researchFeed` Convex queries (ref is sort key; optional for UI). */
export type ResearchFeedItem =
  | { kind: "insight"; ref: string; doc: Doc<"insights"> }
  | { kind: "blog"; ref: string; doc: Doc<"blogPosts"> }
  | { kind: "marketReport"; ref: string; doc: Doc<"marketReports"> };
