"use client";

import { useAction } from "convex/react";
import { useCallback } from "react";
import { api } from "@/convex/_generated/api";
import { executeRecaptcha } from "@/lib/recaptcha";

/**
 * Runs reCAPTCHA v3 + Convex verification before admin or storage mutations.
 */
export function useRecaptchaGate(): (actionName: string) => Promise<void> {
  const assert = useAction(api.recaptchaActions.assertValidToken);
  return useCallback(
    async (actionName: string) => {
      const token = await executeRecaptcha(actionName);
      await assert({ token });
    },
    [assert],
  );
}
