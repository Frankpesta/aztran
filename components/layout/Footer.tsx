import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { SocialIconLinks } from "@/components/contact/SocialIconLinks";
import { FooterTraceArt } from "@/components/layout/FooterTraceArt";
import { COMPANY_LEGAL_NAME, SITE_LOGO_PATH_ON_DARK } from "@/lib/brand";
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/contact-info";

/**
 * Footer with animated linework, gradients, and statutory naming.
 */
export function Footer(): ReactElement {
  return (
    <footer className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--color-cyan)_45%,transparent)] bg-[var(--color-navy)] text-[var(--color-silver)]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_10%_-20%,color-mix(in_srgb,var(--color-cyan)_14%,transparent),transparent_55%),radial-gradient(ellipse_90%_60%_at_100%_100%,color-mix(in_srgb,var(--color-cyan)_10%,transparent),transparent_50%)]"
        aria-hidden
      />
      <div className="footer-grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-container px-4 pt-14 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 border-b border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)] pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src={SITE_LOGO_PATH_ON_DARK}
                alt={COMPANY_LEGAL_NAME}
                width={720}
                height={216}
                className="h-[4.5rem] w-auto max-w-[min(100%,440px)] object-contain object-left sm:h-20 sm:max-w-[500px] md:h-24 md:max-w-[560px] lg:h-28 lg:max-w-[600px]"
              />
            </Link>
            <p className="sr-only">{COMPANY_LEGAL_NAME}</p>
          </div>
          <p className="max-w-md font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-silver)_92%,white)]">
            SEC Licensed institutional platform for asset management, global markets, and brokerage—built
            for transparent governance and long-term capital partnerships.
          </p>
        </div>

        <div className="relative pb-28">
          <FooterTraceArt />
          <div className="relative z-[1] grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="relative rounded-xl border border-[color-mix(in_srgb,var(--color-cyan)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_04%,transparent)] p-6 shadow-[inset_0_1px_0_0_color-mix(in_srgb,var(--color-cyan)_25%,transparent)] backdrop-blur-sm">
            <p className="font-body text-caption font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
              Licensed in Nigeria
            </p>
            <p className="mt-3 font-body text-body leading-relaxed">
              {COMPANY_LEGAL_NAME} operates under Securities and Exchange Commission Nigeria oversight.
            </p>
          </div>

          <div>
            <p className="font-body text-label font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
              Quick links
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-body">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/insights", label: "Insights" },
                { href: "/insights/macro-report", label: "Macro Report" },
                { href: "/insights/market-report", label: "Market Report" },
                { href: "/insights/market-buzz", label: "Market Buzz" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 transition-[color,translate] duration-300 hover:translate-x-1 hover:text-[var(--color-cyan)]"
                  >
                    <span
                      className="h-px w-4 origin-left scale-x-50 bg-[var(--color-cyan)] opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100"
                      aria-hidden
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-label font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
              Services
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-body">
              <li>
                <Link
                  href="/services/asset-management"
                  className="inline-flex transition-[color,translate] hover:translate-x-1 hover:text-[var(--color-cyan)]"
                >
                  Asset management
                </Link>
              </li>
              <li>
                <Link
                  href="/services/global-markets-trading"
                  className="inline-flex transition-[color,translate] hover:translate-x-1 hover:text-[var(--color-cyan)]"
                >
                  Global markets & brokerage
                </Link>
              </li>
              <li>
                <Link
                  href="/services/brokerage-services"
                  className="inline-flex transition-[color,translate] hover:translate-x-1 hover:text-[var(--color-cyan)]"
                >
                  Advisory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-body text-label font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
              Contact
            </p>
            <address className="mt-4 not-italic">
              <p className="font-body text-body leading-relaxed">
                {CONTACT_ADDRESS_LINES.join(", ")}
              </p>
              <p className="mt-3 font-body text-body">
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-[var(--color-cyan)]"
                >
                  <Phone
                    className="size-4 shrink-0 text-[var(--color-cyan)] opacity-90"
                    aria-hidden
                  />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </p>
              <p className="mt-2 font-body text-body">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2.5 break-all transition-colors hover:text-[var(--color-cyan)]"
                >
                  <Mail
                    className="size-4 shrink-0 text-[var(--color-cyan)] opacity-90"
                    aria-hidden
                  />
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="mt-6 font-body text-label font-semibold uppercase tracking-[0.2em] text-[var(--color-cyan)]">
                Social
              </p>
              <SocialIconLinks variant="dark" className="mt-3" />
            </address>
          </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)] bg-[color-mix(in_srgb,black_35%,var(--color-navy))] px-4 py-6">
        <p className="mx-auto max-w-container text-center font-body text-caption leading-relaxed text-[color-mix(in_srgb,var(--color-silver)_88%,transparent)]">
          © {new Date().getFullYear()} {COMPANY_LEGAL_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
