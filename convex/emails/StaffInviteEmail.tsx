import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Hr,
  Link,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { BRAND } from "../../lib/brand";

export type StaffInviteEmailProps = {
  invitedEmail: string;
  invitedByLabel: string;
  acceptUrl: string;
  expiresAtIso: string;
};

/**
 * Invitation to join the Aztran admin console as a moderator.
 */
export function StaffInviteEmail({
  invitedEmail,
  invitedByLabel,
  acceptUrl,
  expiresAtIso,
}: StaffInviteEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: BRAND.offwhite,
          fontFamily:
            'ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif',
          margin: 0,
          padding: "32px 16px",
        }}
      >
        <Container
          style={{
            backgroundColor: BRAND.white,
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "560px",
            margin: "0 auto",
            border: `1px solid ${BRAND.silver}`,
            boxShadow: "0 12px 40px rgba(0, 31, 63, 0.08)",
          }}
        >
          <Section
            style={{
              backgroundColor: BRAND.navy,
              padding: "28px 28px 24px",
            }}
          >
            <Text
              style={{
                margin: 0,
                color: BRAND.cyan,
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Aztran · Administration
            </Text>
            <Heading
              as="h1"
              style={{
                margin: "12px 0 0",
                color: BRAND.white,
                fontSize: "22px",
                fontWeight: 600,
                lineHeight: 1.35,
              }}
            >
              You’ve been invited to the operations console
            </Heading>
            <Text
              style={{
                margin: "14px 0 0",
                color: BRAND.silver,
                fontSize: "14px",
                lineHeight: 1.55,
              }}
            >
              <strong style={{ color: BRAND.white }}>{invitedByLabel}</strong> is
              inviting you to join as a <strong style={{ color: BRAND.white }}>moderator</strong>.
              Moderators can help manage content and inbound contacts; only the
              platform administrator can invite new team members.
            </Text>
          </Section>

          <Section style={{ padding: "26px 28px" }}>
            <Text
              style={{
                margin: "0 0 8px",
                color: BRAND.navy,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              Your invitation is addressed to
            </Text>
            <Text
              style={{
                margin: 0,
                color: "#374151",
                fontSize: "15px",
                fontFamily: "DM Mono, Menlo, monospace",
              }}
            >
              {invitedEmail}
            </Text>

            <div style={{ margin: "28px 0", textAlign: "center" as const }}>
              <Button
                href={acceptUrl}
                style={{
                  backgroundColor: BRAND.cyan,
                  color: BRAND.navy,
                  borderRadius: "6px",
                  padding: "14px 28px",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Accept invitation & create your account
              </Button>
            </div>

            <Text
              style={{
                margin: "0 0 20px",
                color: "#6b7280",
                fontSize: "13px",
                lineHeight: 1.55,
              }}
            >
              This link expires on{" "}
              <strong style={{ color: BRAND.navy }}>{expiresAtIso}</strong>. If you
              were not expecting this message, you can ignore it—no account will be
              created without completing the steps above.
            </Text>

            <Hr
              style={{
                borderColor: BRAND.silver,
                borderWidth: "1px 0 0",
                margin: "0 0 18px",
              }}
            />

            <Text
              style={{
                margin: 0,
                color: "#9ca3af",
                fontSize: "11px",
                lineHeight: 1.55,
              }}
            >
              Trouble with the button? Copy this URL into your browser:
            </Text>
            <Link
              href={acceptUrl}
              style={{
                color: BRAND.navy,
                fontSize: "11px",
                wordBreak: "break-all" as const,
              }}
            >
              {acceptUrl}
            </Link>
          </Section>
        </Container>
        <Text
          style={{
            margin: "20px auto 0",
            maxWidth: "560px",
            textAlign: "center" as const,
            color: "#9ca3af",
            fontSize: "11px",
          }}
        >
          Aztran · Institutional intelligence and advisory
        </Text>
      </Body>
    </Html>
  );
}
