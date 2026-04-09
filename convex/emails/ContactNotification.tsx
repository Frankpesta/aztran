import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Hr,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { BRAND } from "../../lib/brand";

export type ContactNotificationProps = {
  submission: {
    fullName: string;
    email: string;
    phone?: string;
    organization?: string;
    subject: string;
    message: string;
    submittedAt: number;
  };
};

/**
 * Internal notification email sent to the Aztran team when a contact form is submitted.
 */
export function ContactNotificationEmail({
  submission,
}: ContactNotificationProps) {
  const when = new Date(submission.submittedAt).toISOString();
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: BRAND.offwhite,
          fontFamily: "DM Mono, Courier New, monospace",
          margin: 0,
          padding: "24px",
        }}
      >
        <Container
          style={{
            backgroundColor: BRAND.white,
            borderRadius: "4px",
            overflow: "hidden",
            maxWidth: "560px",
            margin: "0 auto",
            border: `1px solid ${BRAND.silver}`,
          }}
        >
          <Section
            style={{
              backgroundColor: BRAND.navy,
              padding: "20px 24px",
            }}
          >
            <Heading
              as="h1"
              style={{
                color: BRAND.white,
                fontFamily: "Georgia, EB Garamond, serif",
                fontSize: "22px",
                fontWeight: 600,
                margin: 0,
              }}
            >
              New Contact Submission
            </Heading>
          </Section>
          <Section style={{ padding: "24px" }}>
            <Text style={{ color: BRAND.navy, fontSize: "13px", margin: "0 0 8px" }}>
              <strong>Subject:</strong> {submission.subject}
            </Text>
            <Text style={{ color: BRAND.silver, fontSize: "12px", margin: "0 0 16px" }}>
              Received {when}
            </Text>
            <Hr style={{ borderColor: BRAND.silver, margin: "16px 0" }} />
            <Text style={{ color: BRAND.navy, fontSize: "13px", margin: "8px 0" }}>
              <strong>Name:</strong> {submission.fullName}
            </Text>
            <Text style={{ color: BRAND.navy, fontSize: "13px", margin: "8px 0" }}>
              <strong>Email:</strong> {submission.email}
            </Text>
            {submission.phone ? (
              <Text style={{ color: BRAND.navy, fontSize: "13px", margin: "8px 0" }}>
                <strong>Phone:</strong> {submission.phone}
              </Text>
            ) : null}
            {submission.organization ? (
              <Text style={{ color: BRAND.navy, fontSize: "13px", margin: "8px 0" }}>
                <strong>Organization:</strong> {submission.organization}
              </Text>
            ) : null}
            <Hr style={{ borderColor: BRAND.silver, margin: "16px 0" }} />
            <Text
              style={{
                color: BRAND.navy,
                fontSize: "13px",
                margin: "0",
                whiteSpace: "pre-wrap",
              }}
            >
              {submission.message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
