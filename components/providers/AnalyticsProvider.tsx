"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

/**
 * Pushes Consent Mode v2 defaults before GTM loads; updates flow through the cookie banner.
 */
export function AnalyticsProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  useEffect(() => {
    const w = window as unknown as { dataLayer: object[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({
      event: "consent_default",
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
  }, []);

  return <>{children}</>;
}
