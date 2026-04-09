import Link from "next/link";
import type { ReactElement } from "react";
import { SocialIconLinks } from "@/components/contact/SocialIconLinks";
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/contact-info";

/**
 * Institutional footer with quick links, service categories, and statutory contact lines.
 */
export function Footer(): ReactElement {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-cyan)] bg-[var(--color-navy)] text-[var(--color-silver)]">
      <div className="footer-grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-container gap-12 px-4 py-section md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-xl tracking-[0.24em] text-[var(--color-white)]">
            AZTRAN GLOBAL
          </p>
          <p className="mt-4 max-w-xs font-body text-body leading-relaxed">
            Institutional investment management with disciplined underwriting and
            transparent governance.
          </p>
        </div>
        <div>
          <p className="font-body text-label uppercase tracking-[0.2em] text-[var(--color-cyan)]">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 font-body text-body">
            <li>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 transition-[color,translate] hover:translate-x-0.5 hover:text-[var(--color-cyan)]"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1 transition-[color,translate] hover:translate-x-0.5 hover:text-[var(--color-cyan)]"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1 transition-[color,translate] hover:translate-x-0.5 hover:text-[var(--color-cyan)]"
              >
                Insights
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 transition-[color,translate] hover:translate-x-0.5 hover:text-[var(--color-cyan)]"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/market-reports"
                className="inline-flex items-center gap-1 transition-[color,translate] hover:translate-x-0.5 hover:text-[var(--color-cyan)]"
              >
                Market reports
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 transition-[color,translate] hover:translate-x-0.5 hover:text-[var(--color-cyan)]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-body text-label uppercase tracking-[0.2em] text-[var(--color-cyan)]">
            Services
          </p>
          <ul className="mt-4 space-y-2 font-body text-body">
            <li>
              <Link
                href="/services/asset-management"
                className="inline-flex transition-[color,translate] hover:translate-x-0.5 hover:text-[var(--color-cyan)]"
              >
                Asset management
              </Link>
            </li>
            <li>
              <Link
                href="/services/global-markets-trading"
                className="inline-flex transition-[color,translate] hover:translate-x-0.5 hover:text-[var(--color-cyan)]"
              >
                Global markets & trading
              </Link>
            </li>
            <li>
              <Link
                href="/services/brokerage-services"
                className="inline-flex transition-[color,translate] hover:translate-x-0.5 hover:text-[var(--color-cyan)]"
              >
                Brokerage services
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-body text-label uppercase tracking-[0.2em] text-[var(--color-cyan)]">
            Contact
          </p>
          <address className="mt-4 not-italic">
            <p className="font-body text-body leading-relaxed">
              {CONTACT_ADDRESS_LINES.join(", ")}
            </p>
            <p className="mt-2 font-body text-body">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="hover:text-[var(--color-cyan)]"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </p>
            <p className="mt-2 font-body text-body">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-[var(--color-cyan)]"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-6 font-body text-label uppercase tracking-[0.2em] text-[var(--color-cyan)]">
              Social
            </p>
            <SocialIconLinks variant="dark" className="mt-3" />
          </address>
        </div>
      </div>
      <div className="relative border-t border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] px-4 py-6 text-center font-body text-caption text-[var(--color-silver)]">
        © {new Date().getFullYear()} Aztran Global Investments Limited. All rights reserved.
      </div>
    </footer>
  );
}
