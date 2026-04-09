import type { ReactElement, ReactNode } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { SiteAtmosphere } from "@/components/layout/SiteAtmosphere";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsentBanner } from "@/components/ui/CookieConsentBanner";

/**
 * Public marketing site shell (navbar + footer). Admin uses `app/admin/layout.tsx` only.
 */
export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <>
      <Navbar />
      <main className="relative isolate flex-1 overflow-x-clip">
        <SiteAtmosphere />
        <div className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}
