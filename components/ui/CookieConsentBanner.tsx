"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactElement } from "react";

const STORAGE_KEY = "aztran_consent_given";

/**
 * GDPR-oriented consent bar that coordinates with GTM Consent Mode v2 via `dataLayer`.
 */
export function CookieConsentBanner(): ReactElement | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setVisible(stored === null);
  }, []);

  const accept = (): void => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    const w = window as unknown as { dataLayer: object[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({
      event: "consent_update",
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    setVisible(false);
  };

  const decline = (): void => {
    window.localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-[color-mix(in_srgb,var(--color-cyan)_30%,transparent)] bg-[var(--color-navy)] px-4 py-5 md:px-10"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
        >
          <div className="mx-auto flex max-w-container flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl font-body text-body text-[var(--color-silver)]">
              We use cookies to improve your experience and analyse site
              performance.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={accept}
                className="rounded-sm bg-[var(--color-cyan)] px-5 py-2 font-body text-label uppercase tracking-wide text-[var(--color-navy)]"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={decline}
                className="rounded-sm border border-[var(--color-silver)] px-5 py-2 font-body text-label uppercase tracking-wide text-[var(--color-silver)]"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
