"use node";

import { v } from "convex/values";
import * as React from "react";
import { render } from "@react-email/render";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { ContactAcknowledgementEmail } from "./emails/ContactAcknowledgement";
import { ContactNotificationEmail } from "./emails/ContactNotification";

type RecaptchaVerify = {
  success: boolean;
  score?: number;
};

/**
 * Verifies reCAPTCHA, records the score, and sends team notification and submitter acknowledgement via Resend.
 */
export const deliverContactEmails = internalAction({
  args: {
    submissionId: v.id("contactSubmissions"),
    recaptchaToken: v.string(),
  },
  handler: async (ctx, args) => {
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
          response: args.recaptchaToken,
        }),
      },
    );

    const verified = (await verifyRes.json()) as RecaptchaVerify;
    if (!verified.success || (verified.score ?? 0) < 0.5) {
      throw new Error("reCAPTCHA verification failed");
    }

    await ctx.runMutation(internal.contact.patchRecaptchaOnSubmission, {
      id: args.submissionId,
      score: verified.score ?? 0,
    });

    const submission = await ctx.runQuery(internal.contact.getSubmissionInternal, {
      id: args.submissionId,
    });
    if (!submission) {
      throw new Error("Submission not found");
    }

    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    /** Primary inbox for new contact submissions (defaults to investments@aztranlimited.com). */
    const notifyInbox =
      process.env.CONTACT_NOTIFICATION_EMAIL?.trim() ||
      process.env.RESEND_TEAM_EMAIL?.trim() ||
      "investments@aztranlimited.com";
    if (!resendKey || !from) {
      throw new Error("Missing Resend configuration");
    }

    const notifyHtml = await render(
      React.createElement(ContactNotificationEmail, { submission }),
    );
    const ackHtml = await render(
      React.createElement(ContactAcknowledgementEmail, {
        name: submission.fullName,
      }),
    );

    const send = async (to: string, subject: string, html: string) => {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, subject, html }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Resend error: ${text}`);
      }
    };

    await send(
      notifyInbox,
      `New Contact Form Submission — ${submission.subject}`,
      notifyHtml,
    );
    await send(
      submission.email,
      "We Have Received Your Message — Aztran Global Investments",
      ackHtml,
    );
  },
});
