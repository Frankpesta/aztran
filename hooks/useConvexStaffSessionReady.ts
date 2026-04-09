import { useConvexAuth } from "convex/react";

/**
 * True after Convex finishes loading custom auth and the client holds a valid token.
 * Use to skip `useQuery` calls that call `requireUser` / `requireAdmin` so pre-auth
 * subscriptions do not throw `Unauthorized` in Convex.
 */
export function useConvexStaffSessionReady(): boolean {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return !isLoading && isAuthenticated;
}
