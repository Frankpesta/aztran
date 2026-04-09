/**
 * Reads the staff JWT cookie via the Next route Convex expects on the browser client.
 * Same contract as {@link ConvexProviderWithAuth}'s `fetchAccessToken` (Convex does not expose it from `useConvexAuth()` typings).
 */
export async function fetchStaffConvexAccessToken(_args: {
  forceRefreshToken: boolean;
}): Promise<string | null> {
  const response = await fetch("/api/auth/convex-token", {
    credentials: "include",
    cache: "no-store",
  });
  if (!response.ok) {
    return null;
  }
  const data = (await response.json()) as { token: string | null };
  return data.token ?? null;
}
