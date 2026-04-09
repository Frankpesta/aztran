import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import { AdminChrome } from "@/components/admin/AdminChrome";

const adminSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-admin-ui",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

/**
 * Dedicated admin application shell (separate from public site layout in `app/(site)/layout.tsx`).
 */
export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <div
      className={`${adminSans.variable} min-h-svh`}
      style={{
        fontFamily:
          "var(--font-admin-ui), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <AdminChrome>{children}</AdminChrome>
    </div>
  );
}
