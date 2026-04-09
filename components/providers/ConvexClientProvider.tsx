"use client";

import { ConvexProviderWithAuth } from "convex/react";
import { ConvexReactClient } from "convex/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Convex + custom staff JWT from an httpOnly cookie (see /api/auth/convex-token).
 */
export function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const convex = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
    }
    return new ConvexReactClient(url);
  }, []);

  return (
    <ConvexProviderWithAuth client={convex} useAuth={useStaffConvexAuth}>
      {children}
    </ConvexProviderWithAuth>
  );
}

function useStaffConvexAuth(): {
  isLoading: boolean;
  isAuthenticated: boolean;
  fetchAccessToken: (args: {
    forceRefreshToken: boolean;
  }) => Promise<string | null>;
} {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
  });

  const fetchAccessToken = useCallback(
    async (_args: { forceRefreshToken: boolean }) => {
      const response = await fetch("/api/auth/convex-token", {
        credentials: "include",
        cache: "no-store",
      });
      if (!response.ok) {
        setAuthState({ isLoading: false, isAuthenticated: false });
        return null;
      }
      const data = (await response.json()) as { token: string | null };
      if (data.token) {
        setAuthState({ isLoading: false, isAuthenticated: true });
        return data.token;
      }
      setAuthState({ isLoading: false, isAuthenticated: false });
      return null;
    },
    [],
  );

  useEffect(() => {
    void fetchAccessToken({ forceRefreshToken: false });
  }, [fetchAccessToken]);

  return useMemo(
    () => ({
      isLoading: authState.isLoading,
      isAuthenticated: authState.isAuthenticated,
      fetchAccessToken,
    }),
    [authState.isLoading, authState.isAuthenticated, fetchAccessToken],
  );
}
