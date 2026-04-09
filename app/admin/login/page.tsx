"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactElement } from "react";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { ArrowRight, LayoutDashboard, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AdminLoginContent(): ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [inviteToken, setInviteToken] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);

  async function onLogin(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? "Could not sign in");
        return;
      }
      window.location.assign(nextPath.startsWith("/") ? nextPath : "/admin");
    } finally {
      setBusy(false);
    }
  }

  function onContinueInvite(e: React.FormEvent): void {
    e.preventDefault();
    const trimmed = inviteToken.trim();
    if (trimmed.length < 12) {
      toast.error("Paste the full invitation code from your email.");
      return;
    }
    setInviteBusy(true);
    router.push(`/admin/accept-invite?token=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="relative min-h-svh bg-[#050810] text-zinc-100">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(12,192,223,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(0,31,63,0.5),transparent_50%)]" />

      <div className="relative mx-auto grid min-h-svh w-full max-w-[100rem] lg:grid-cols-2">
        {/* Brand column */}
        <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-white/[0.07] bg-[#070d18] px-10 py-12 lg:flex xl:px-14 xl:py-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `linear-gradient(135deg, transparent 0%, rgba(12,192,223,0.06) 45%, transparent 65%),
                repeating-linear-gradient(-12deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px)`,
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 text-cyan-400">
              <LayoutDashboard className="size-8 shrink-0 opacity-90" aria-hidden />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em]">
                  Aztran
                </p>
                <p className="text-lg font-semibold tracking-tight text-white">
                  Operations console
                </p>
              </div>
            </div>
            <p className="mt-10 max-w-md font-display text-3xl font-medium leading-snug tracking-tight text-white xl:text-4xl">
              Institutional controls, clear governance, one place for your
              team.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-400">
              Sign in with your staff credentials, or complete a moderator
              invitation from the secure link we emailed you.
            </p>
          </div>
          <div className="relative flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-cyan-400" aria-hidden />
            <p className="text-xs leading-relaxed text-zinc-500">
              Sessions are httpOnly cookies and JWT-backed for Convex. Only
              invited moderators can register; the platform has a single
              administrator.
            </p>
          </div>
        </aside>

        {/* Auth column — centered */}
        <main className="relative flex flex-col justify-center px-5 py-12 sm:px-10 lg:px-12 xl:px-16">
          <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
            <LayoutDashboard className="size-7 text-cyan-400" aria-hidden />
            <div className="text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-400">
                Aztran
              </p>
              <p className="text-sm font-semibold text-white">Admin access</p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl lg:max-w-2xl">
            <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0c1222]/90 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md">
              <div className="grid divide-y divide-white/[0.08] md:grid-cols-2 md:divide-x md:divide-y-0">
                {/* Sign in */}
                <div className="flex flex-col p-8 sm:p-10">
                  <h1 className="text-lg font-semibold tracking-tight text-white">
                    Sign in
                  </h1>
                  <p className="mt-1 text-sm text-zinc-500">
                    Staff email and password.
                  </p>
                  <form
                    className="mt-8 flex flex-1 flex-col space-y-5"
                    onSubmit={(e) => void onLogin(e)}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="admin-email" className="text-zinc-400">
                        Email
                      </Label>
                      <Input
                        id="admin-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 border-white/12 bg-[#070a12] text-white placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password" className="text-zinc-400">
                        Password
                      </Label>
                      <Input
                        id="admin-password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11 border-white/12 bg-[#070a12] text-white placeholder:text-zinc-600"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={busy}
                      className="mt-auto w-full rounded-xl bg-cyan-400 py-3 text-sm font-semibold text-[#070a12] shadow-[0_0_24px_-4px_rgba(12,192,223,0.5)] transition-[opacity,transform] hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
                    >
                      {busy ? "Signing in…" : "Sign in"}
                    </button>
                  </form>
                </div>

                {/* Invitation signup */}
                <div className="flex flex-col bg-[#080e18]/80 p-8 sm:p-10">
                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    Accept invitation
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    New moderators: use the token from your invite email.
                  </p>
                  <form
                    className="mt-8 flex flex-1 flex-col space-y-5"
                    onSubmit={onContinueInvite}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="invite-token" className="text-zinc-400">
                        Invitation token
                      </Label>
                      <Input
                        id="invite-token"
                        type="text"
                        autoComplete="off"
                        placeholder="Paste from email…"
                        value={inviteToken}
                        onChange={(e) => setInviteToken(e.target.value)}
                        className="h-11 border-white/12 bg-[#070a12] font-mono text-sm text-white placeholder:text-zinc-600"
                      />
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-600">
                      Prefer the link? Open the message on the device where you
                      will set your password—we will send you to the full
                      setup screen.
                    </p>
                    <button
                      type="submit"
                      disabled={inviteBusy}
                      className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/35 bg-cyan-400/10 py-3 text-sm font-semibold text-cyan-300 transition-[background,border-color] hover:border-cyan-400/55 hover:bg-cyan-400/15 disabled:opacity-50"
                    >
                      Continue
                      <ArrowRight className="size-4" aria-hidden />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <p className="mt-10 text-center text-xs text-zinc-600">
              <Link
                href="/"
                className="text-cyan-400/90 underline-offset-4 transition-colors hover:text-cyan-300 hover:underline"
              >
                ← Back to public site
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminLoginPage(): ReactElement {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center bg-[#050810] text-sm text-zinc-400">
          Loading…
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
