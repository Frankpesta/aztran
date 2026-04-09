"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";

/**
 * Root client providers: Convex, theming, analytics hooks, and toasts.
 */
export function AppProviders({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <ConvexClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <AnalyticsProvider>{children}</AnalyticsProvider>
        <Toaster position="top-center" />
      </ThemeProvider>
    </ConvexClientProvider>
  );
}
