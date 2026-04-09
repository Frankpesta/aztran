"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

type RecaptchaVerify = {
  success: boolean;
  score?: number;
};

/**
 * Server-side reCAPTCHA v3 check for admin and other client-initiated actions.
 * Pair with `executeRecaptcha(action)` on the client before sensitive mutations.
 */
export const assertValidToken = action({
  args: { token: v.string() },
  handler: async (_ctx, args) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      throw new Error("Missing RECAPTCHA_SECRET_KEY");
    }

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: args.token,
        }),
      },
    );

    const verified = (await verifyRes.json()) as RecaptchaVerify;
    if (!verified.success || (verified.score ?? 0) < 0.5) {
      throw new Error("reCAPTCHA verification failed");
    }

    return { score: verified.score ?? 0 };
  },
});
