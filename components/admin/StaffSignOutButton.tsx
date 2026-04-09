"use client";

import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { performStaffLogout } from "@/lib/staff-logout-client";
import { cn } from "@/lib/utils";

type StaffSignOutButtonProps = {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm";
  label?: string;
};

export function StaffSignOutButton({
  className,
  variant = "outline",
  size = "default",
  label = "Sign out",
}: StaffSignOutButtonProps): ReactElement {
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
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={busy}
      className={cn("gap-2", className)}
      onClick={() => void logout()}
    >
      {busy ? (
        <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden />
      ) : (
        <LogOut className="size-4 shrink-0" aria-hidden />
      )}
      {label}
    </Button>
  );
}
