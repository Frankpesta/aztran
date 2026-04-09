"use client";

import { useState, type ReactElement, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import { AdminFooter } from "@/components/admin/AdminFooter";
import { StaffSignOutButton } from "@/components/admin/StaffSignOutButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

type AdminChromeProps = {
  children: ReactNode;
};

function useAdminBarePage(): boolean {
  const pathname = usePathname();
  return (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/accept-invite")
  );
}

/**
 * Dedicated admin shell: responsive sidebar / drawer, main column, footer.
 * Auth flows (login / accept invite) render full-bleed without the console chrome.
 */
export function AdminChrome({ children }: AdminChromeProps): ReactElement {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const bare = useAdminBarePage();

  if (bare) {
    return (
      <div className="flex min-h-svh w-full bg-[#070a12] text-zinc-100">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full bg-[#070a12] text-zinc-100">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col border-r border-white/10 bg-[#0c1222] shadow-xl md:flex">
        <AdminNavigation />
      </aside>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <div className="flex min-h-svh flex-1 flex-col md:pl-[260px]">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-[#0c1222]/90 px-4 py-3 backdrop-blur-md md:hidden">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <SheetTrigger className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400/60">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </SheetTrigger>
              <Link
                href="/admin"
                className="min-w-0 truncate text-sm font-semibold tracking-tight text-white"
                onClick={() => setMobileNavOpen(false)}
              >
                Aztran Admin
              </Link>
            </div>
            <StaffSignOutButton
              variant="ghost"
              size="sm"
              label="Sign out"
              className="shrink-0 text-zinc-300 hover:bg-white/10 hover:text-white"
            />
          </header>

          <SheetContent
            side="left"
            className="w-[280px] border-white/10 bg-[#0c1222] p-0 text-white"
          >
            <AdminNavigation onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>

          <div className="flex flex-1 flex-col">
            <div className="flex-1">{children}</div>
            <AdminFooter />
          </div>
        </div>
      </Sheet>
    </div>
  );
}
