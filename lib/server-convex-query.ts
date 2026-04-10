import { fetchQuery } from "convex/nextjs";
import type { FunctionReference, FunctionReturnType } from "convex/server";

function convexServerOptions(): {
  url: string;
  skipConvexDeploymentUrlCheck?: true;
} {
  const raw = process.env.NEXT_PUBLIC_CONVEX_URL;
  const url = typeof raw === "string" ? raw.trim() : "";
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL is not set. Add your Convex deployment URL to .env.local (from `npx convex dev` or the Convex dashboard).",
    );
  }
  if (url.includes(".convex.site") || process.env.CONVEX_SKIP_DEPLOYMENT_URL_CHECK === "1") {
    return { url, skipConvexDeploymentUrlCheck: true };
  }
  return { url };
}

/**
 * Run a Convex query from a Next.js Server Component / Route Handler with explicit
 * deployment URL and clearer errors when the server cannot reach Convex (common on
 * Windows + Node when IPv6 is preferred, or when the env URL is wrong).
 *
 * For queries that take no arguments, omit `args` or pass `{}`.
 */
export async function serverFetchQuery<Q extends FunctionReference<"query">>(
  query: Q,
  args?: Record<string, unknown>,
): Promise<FunctionReturnType<Q>> {
  const opts = convexServerOptions();
  const fnArgs = args ?? {};
  try {
    return await fetchQuery(query, fnArgs as never, opts);
  } catch (err) {
    if (err instanceof TypeError && err.message === "fetch failed") {
      let host = "Convex";
      try {
        host = new URL(opts.url).host;
      } catch {
        /* noop */
      }
      throw new Error(
        `Could not reach Convex (${host}). Confirm NEXT_PUBLIC_CONVEX_URL, then try setting NODE_OPTIONS=--dns-result-order=ipv4first (Windows) if the browser works but SSR does not.`,
        { cause: err },
      );
    }
    throw err;
  }
}
