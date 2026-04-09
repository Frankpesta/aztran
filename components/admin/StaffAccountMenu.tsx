"use client";

import { Loader2, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { performStaffLogout } from "@/lib/staff-logout-client";

type StaffAccountMenuProps = {
  email: string;
  role: "admin" | "moderator";
  className?: string;
};

export function StaffAccountMenu({
  email,
  role,
  className,
}: StaffAccountMenuProps): ReactElement {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout(): Promise<void> {
    setBusy(true);
    try {
      await performStaffLogout();
      router.push("/admin/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={busy}
        className={cn(
          "flex w-full items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-left text-[13px] outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400/50 disabled:opacity-60",
          className,
        )}
      >
        {busy ? (
          <Loader2 className="size-4 shrink-0 animate-spin text-cyan-300" />
        ) : (
          <User className="size-4 shrink-0 text-cyan-300" />
        )}
        <span className="min-w-0 flex-1 truncate text-zinc-200">{email}</span>
        <span
          className={cn(
            "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            role === "admin"
              ? "bg-cyan-400/20 text-cyan-200"
              : "bg-zinc-700 text-zinc-300",
          )}
        >
          {role === "admin" ? "Admin" : "Mod"}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-56 border-white/10 bg-[#0c1222] text-zinc-100"
      >
        <DropdownMenuLabel className="font-normal text-zinc-400">
          Signed in
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer gap-2 focus:bg-red-500/15 focus:text-red-200"
          onSelect={(e) => {
            e.preventDefault();
            void logout();
          }}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
