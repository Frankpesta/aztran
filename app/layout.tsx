import type { Metadata } from "next";
import { EB_Garamond, DM_Mono } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
} from "@/lib/site-metadata";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  applicationName: "Aztran Global Investments",
  title: {
    default: SITE_TITLE,
    template: "%s · Aztran Global Investments",
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: appUrl,
    siteName: "Aztran Global Investments Limited",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ebGaramond.variable} ${dmMono.variable} min-h-svh flex flex-col bg-[var(--color-offwhite)] font-body text-body text-[var(--color-navy)] antialiased dark:bg-[var(--color-navy)] dark:text-[var(--color-offwhite)]`}
      >
        {/* Third-party scripts must be outside client provider trees to avoid React script-in-client errors */}
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        {recaptchaKey ? (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaKey}`}
            strategy="afterInteractive"
          />
        ) : null}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
