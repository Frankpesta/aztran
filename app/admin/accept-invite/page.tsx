"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactElement } from "react";
import { Suspense, useState } from "react";
import { useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AcceptInviteContent(): ReactElement {
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token") ?? "";
  const validation = useQuery(
    api.staff.validateInvite,
    tokenParam.length > 10 ? { token: tokenParam } : "skip",
  );
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 10) {
      toast.error("Use at least 10 characters for your password");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/auth/accept-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: tokenParam,
          password,
          name: name.trim() || undefined,
        }),
        credentials: "include",
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? "Could not create your account");
        return;
      }
      toast.success("Welcome aboard");
      window.location.assign("/admin");
    } finally {
      setBusy(false);
    }
  }

  if (!tokenParam) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-white">Missing invitation</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Open the link from your invite email, or ask your administrator to
            send a new invitation.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block text-sm text-cyan-400 hover:underline"
          >
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  if (validation === undefined) {
    return (
      <div className="flex min-h-svh items-center justify-center px-4">
        <p className="text-sm text-zinc-400">Checking your invitation…</p>
      </div>
    );
  }

  if (!validation.valid) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-semibold text-white">
            Invitation unavailable
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            This link may have expired or already been used. Contact your
            administrator for a new invite.
          </p>
          <Link
            href="/admin/login"
            className="mt-6 inline-block text-sm text-cyan-400 hover:underline"
          >
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400">
            Aztran Admin
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white">
            Accept invitation
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            You’re joining as a <span className="text-zinc-200">moderator</span>{" "}
            for{" "}
            <span className="font-mono text-cyan-200/90">{validation.email}</span>
          </p>
        </div>

        <form
          onSubmit={(e) => void onSubmit(e)}
          className="space-y-5 rounded-xl border border-white/10 bg-[#0c1222] p-8 shadow-xl"
        >
          <div className="space-y-2">
            <Label htmlFor="invite-name" className="text-zinc-300">
              Display name <span className="text-zinc-500">(optional)</span>
            </Label>
            <Input
              id="invite-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="border-white/15 bg-[#070a12] text-white placeholder:text-zinc-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-password" className="text-zinc-300">
              Password
            </Label>
            <Input
              id="invite-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={10}
              className="border-white/15 bg-[#070a12] text-white placeholder:text-zinc-600"
            />
            <p className="text-[11px] text-zinc-500">
              At least 10 characters. You’ll use this to sign in at /admin/login.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-confirm" className="text-zinc-300">
              Confirm password
            </Label>
            <Input
              id="invite-confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="border-white/15 bg-[#070a12] text-white placeholder:text-zinc-600"
            />
          </div>
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-cyan-400 py-2.5 text-sm font-semibold text-[#070a12] transition-opacity hover:opacity-95 disabled:opacity-50"
          >
            {busy ? "Creating account…" : "Create account & sign in"}
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500">
          Wrong person? Close this page—no account is created until you submit
          the form.
        </p>
      </div>
    </div>
  );
}

export default function AcceptInvitePage(): ReactElement {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center text-sm text-zinc-400">
          Loading…
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
}
