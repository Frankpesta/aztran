import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { BRAND } from "../../lib/brand";

export type ContactAcknowledgementProps = {
  name: string;
};

/**
 * Acknowledgement email sent to the contact form submitter.
 */
export function ContactAcknowledgementEmail({
  name,
}: ContactAcknowledgementProps) {
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
              Aztran Global Investments
            </Heading>
          </Section>
          <Section style={{ padding: "24px" }}>
            <Text style={{ color: BRAND.navy, fontSize: "14px", margin: "0 0 16px" }}>
              Dear {name},
            </Text>
            <Text style={{ color: BRAND.navy, fontSize: "13px", margin: "0 0 12px" }}>
              We have received your message. A member of our team will review your inquiry
              and respond within two business days.
            </Text>
            <Text style={{ color: BRAND.navy, fontSize: "13px", margin: "0" }}>
              Regards,
              <br />
              Office of the Managing Director
              <br />
              Aztran Global Investments Limited
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
