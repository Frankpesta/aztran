"use node";

import { v } from "convex/values";
import * as React from "react";
import { render } from "@react-email/render";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { StaffInviteEmail } from "./emails/StaffInviteEmail";

export const deliverModeratorInvite = internalAction({
  args: {
    inviteId: v.id("staffInvites"),
    plainToken: v.string(),
    invitedByLabel: v.string(),
  },
  handler: async (ctx, args): Promise<void> => {
    const invite = await ctx.runQuery(internal.staffInternal.getInviteById, {
      id: args.inviteId,
    });
    if (!invite || invite.usedAt != null) {
      return;
    }

    const baseUrl =
      process.env.PUBLIC_SITE_URL ??
      process.env.SITE_URL ??
      "http://localhost:3000";
    const acceptUrl = `${baseUrl.replace(/\/$/, "")}/admin/accept-invite?token=${encodeURIComponent(args.plainToken)}`;

    const resendKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!resendKey || !from) {
      console.error(
        "Moderator invite email skipped: set RESEND_API_KEY and RESEND_FROM_EMAIL in Convex.",
      );
      return;
    }

    const expiresAtIso = new Date(invite.expiresAt).toISOString();
    const html = await render(
      React.createElement(StaffInviteEmail, {
        invitedEmail: invite.email,
        invitedByLabel: args.invitedByLabel,
        acceptUrl,
        expiresAtIso,
      }),
    );

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [invite.email],
        subject: "You’re invited to Aztran Admin",
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Resend failed: ${res.status} ${errText}`);
    }
  },
});
