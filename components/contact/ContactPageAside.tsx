import type { ReactElement } from "react";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { SocialIconLinks } from "@/components/contact/SocialIconLinks";
import {
  CONTACT_ADDRESS_LINES,
  CONTACT_EMAIL,
  CONTACT_EMAIL_GMAIL_URL,
  CONTACT_HOURS,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
} from "@/lib/contact-info";

/**
 * Contact details and social links for the marketing contact page.
 */
export function ContactPageAside(): ReactElement {
  return (
    <aside className="relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-white)_92%,var(--color-offwhite))] p-8 shadow-[0_20px_50px_-24px_color-mix(in_srgb,var(--color-navy)_25%,transparent)] md:p-10 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_90%,black)]">
      <div
        className="pointer-events-none absolute -right-16 top-0 size-48 rounded-full bg-[var(--color-cyan)]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-[var(--color-navy)]/8 blur-3xl dark:bg-[var(--color-cyan)]/8"
        aria-hidden
      />

      <div className="relative">
        <p className="font-body text-label uppercase tracking-[0.22em] text-[var(--color-cyan)]">
          Partnership desk
        </p>
        <h2 className="mt-3 font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
          Work with Aztran
        </h2>
        <p className="mt-4 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_72%,transparent)] dark:text-[var(--color-silver)]">
          Introductory calls are scheduled by the office of the Managing Director.
          Use the form or reach us through the channels below.
        </p>

        <ul className="mt-10 space-y-6 font-body text-body leading-relaxed text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
          <li className="flex gap-4">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--color-cyan)_14%,transparent)] text-[var(--color-navy)] dark:text-[var(--color-cyan)]">
              <MapPin className="size-5" aria-hidden />
            </span>
            <span className="text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
              {CONTACT_ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--color-cyan)_14%,transparent)] text-[var(--color-navy)] dark:text-[var(--color-cyan)]">
              <Phone className="size-5" aria-hidden />
            </span>
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="font-medium text-[var(--color-navy)] transition-colors hover:text-[var(--color-cyan)] dark:text-[var(--color-offwhite)]"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
          </li>
          <li className="flex items-center gap-4">
            <a
              href={CONTACT_EMAIL_GMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
              aria-label={`Email ${CONTACT_EMAIL} (opens Gmail compose)`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--color-cyan)_14%,transparent)] text-[var(--color-navy)] transition-[background,color,transform] group-hover:scale-105 group-hover:bg-[color-mix(in_srgb,var(--color-cyan)_28%,transparent)] group-hover:text-[var(--color-cyan)] dark:text-[var(--color-cyan)] dark:group-hover:text-[var(--color-offwhite)]">
                <Mail className="size-5" aria-hidden />
              </span>
              <span className="font-mono text-[13px] font-medium text-[var(--color-navy)] underline-offset-2 transition-colors group-hover:text-[var(--color-cyan)] group-hover:underline dark:text-[var(--color-offwhite)]">
                {CONTACT_EMAIL}
              </span>
            </a>
          </li>
          <li className="flex gap-4">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--color-cyan)_14%,transparent)] text-[var(--color-navy)] dark:text-[var(--color-cyan)]">
              <Clock className="size-5" aria-hidden />
            </span>
            <span className="text-[color-mix(in_srgb,var(--color-navy)_82%,transparent)] dark:text-[var(--color-silver)]">
              {CONTACT_HOURS}
            </span>
          </li>
        </ul>

        <div className="mt-10 border-t border-[color-mix(in_srgb,var(--color-silver)_50%,transparent)] pt-8 dark:border-[color-mix(in_srgb,var(--color-silver)_20%,transparent)]">
          <p className="font-body text-label uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-navy)_55%,transparent)] dark:text-[var(--color-silver)]">
            Social
          </p>
          <SocialIconLinks variant="light" className="mt-4" />
        </div>
      </div>
    </aside>
  );
}
