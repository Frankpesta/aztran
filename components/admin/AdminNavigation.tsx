"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users } from "lucide-react";
import { useQuery } from "convex/react";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { cn } from "@/lib/utils";
import { ADMIN_NAV } from "@/components/admin/adminNavConfig";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { StaffAccountMenu } from "@/components/admin/StaffAccountMenu";

type AdminNavigationProps = {
  /** Close mobile drawer after navigation */
  onNavigate?: () => void;
  className?: string;
};

/**
 * Shared admin nav links (desktop rail + mobile drawer).
 */
export function AdminNavigation({
  onNavigate,
  className,
}: AdminNavigationProps): ReactElement {
  const pathname = usePathname();
  const staffReady = useConvexStaffSessionReady();
  const me = useQuery(api.staff.me);
  /** `getUnreadCount` uses `requireUser`; wait until Convex has the staff JWT. */
  const unread = useQuery(
    api.contact.getUnreadCount,
    staffReady ? {} : "skip",
  );

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="px-5 py-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400">
          Aztran
        </p>
        <p className="mt-1 text-lg font-semibold tracking-tight text-white">
          Admin
        </p>
        <p className="mt-0.5 text-[11px] text-zinc-500">Operations console</p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 px-2 pb-4">
        {me?.role === "admin" ? (
          <Link
            href="/admin/team"
            onClick={() => onNavigate?.()}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors",
              pathname === "/admin/team" ||
                pathname.startsWith("/admin/team/")
                ? "bg-cyan-400/15 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.35)]"
                : "text-zinc-400 hover:bg-white/5 hover:text-white",
            )}
          >
            <Users className="size-4 shrink-0 opacity-80" />
            Team
          </Link>
        ) : null}
        {ADMIN_NAV.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const badge =
            item.href === "/admin/contacts" &&
            typeof unread === "number" &&
            unread > 0 ? (
              <span className="ml-auto rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-semibold text-[#070a12]">
                {unread}
              </span>
            ) : null;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onNavigate?.()}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors",
                active
                  ? "bg-cyan-400/15 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.35)]"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className="size-4 shrink-0 opacity-80" />
              {item.label}
              {badge}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3 space-y-3">
        <div className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            Theme
          </span>
          <ThemeToggle variant="admin" />
        </div>
        {me ? (
          <StaffAccountMenu email={me.email} role={me.role} />
        ) : (
          <div className="h-10 animate-pulse rounded-md bg-white/5" />
        )}
      </div>
    </div>
  );
}
