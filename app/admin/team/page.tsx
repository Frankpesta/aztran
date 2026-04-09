"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import type { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type PendingInviteRow = {
  id: Id<"staffInvites">;
  email: string;
  createdAt: number;
  expiresAt: number;
};

type TeamMemberRow = {
  id: Id<"staffUsers">;
  email: string;
  name?: string;
  role: "admin" | "moderator";
  createdAt: number;
  lastLoginAt?: number;
};

export default function AdminTeamPage(): ReactElement {
  const staffReady = useConvexStaffSessionReady();
  const me = useQuery(api.staff.me);
  const team = useQuery(
    api.staff.listTeam,
    staffReady && me?.role === "admin" ? {} : "skip",
  );
  const pending = useQuery(
    api.staff.listPendingInvites,
    staffReady && me?.role === "admin" ? {} : "skip",
  );
  const inviteMod = useMutation(api.staffMutations.createModeratorInvite);
  const [email, setEmail] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);

  if (me === undefined) {
    return (
      <div className="p-8 text-sm text-zinc-400">
        Loading your permissions…
      </div>
    );
  }

  if (!me) {
    return (
      <div className="mx-auto max-w-lg p-10 text-center">
        <h1 className="text-lg font-semibold text-white">Session issue</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Sign in again from the login page.
        </p>
      </div>
    );
  }

  if (me.role !== "admin") {
    return (
      <div className="mx-auto max-w-lg p-10 text-center">
        <h1 className="text-lg font-semibold text-white">Restricted area</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Only the platform administrator can manage team invitations.
        </p>
      </div>
    );
  }

  async function sendInvite(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setInviteBusy(true);
    try {
      await inviteMod({ email: email.trim() });
      toast.success("Invitation sent");
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send invite");
    } finally {
      setInviteBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-6 md:p-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Team & invitations
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Invite moderators by email. They will receive a secure link to create
          their password. You remain the only administrator on the platform.
        </p>
      </div>

      <section className="rounded-xl border border-white/10 bg-[#0c1222] p-6 shadow-lg">
        <h2 className="text-sm font-semibold text-white">Invite a moderator</h2>
        <form
          onSubmit={(e) => void sendInvite(e)}
          className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end"
        >
          <div className="flex-1 space-y-2">
            <Label htmlFor="invite-email" className="text-zinc-300">
              Work email
            </Label>
            <Input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@organization.com"
              required
              className="border-white/15 bg-[#070a12] text-white placeholder:text-zinc-600"
            />
          </div>
          <button
            type="submit"
            disabled={inviteBusy}
            className="shrink-0 rounded-lg bg-cyan-400 px-5 py-2 text-sm font-semibold text-[#070a12] hover:opacity-95 disabled:opacity-50"
          >
            {inviteBusy ? "Sending…" : "Send invitation"}
          </button>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">Pending invites</h2>
        {pending === undefined ? (
          <p className="text-sm text-zinc-500">Loading…</p>
        ) : pending.length === 0 ? (
          <p className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-8 text-center text-sm text-zinc-500">
            No open invitations.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Table>
              <TableHeader className="bg-[#0c1222]">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Email</TableHead>
                  <TableHead className="text-zinc-400">Sent</TableHead>
                  <TableHead className="text-zinc-400">Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(pending as PendingInviteRow[]).map((row) => (
                  <TableRow key={row.id} className="border-white/10">
                    <TableCell className="font-mono text-[13px] text-zinc-200">
                      {row.email}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-400">
                      {new Date(row.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-400">
                      {new Date(row.expiresAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">People with access</h2>
        {team === undefined ? (
          <p className="text-sm text-zinc-500">Loading…</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Table>
              <TableHeader className="bg-[#0c1222]">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Email</TableHead>
                  <TableHead className="text-zinc-400">Role</TableHead>
                  <TableHead className="text-zinc-400">Last sign-in</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(team as TeamMemberRow[]).map((row) => (
                  <TableRow key={row.id} className="border-white/10">
                    <TableCell className="text-sm text-zinc-200">
                      {row.email}
                      {row.name ? (
                        <span className="mt-0.5 block text-xs text-zinc-500">
                          {row.name}
                        </span>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          row.role === "admin"
                            ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                            : "border-white/10 bg-white/5 text-zinc-300"
                        }
                      >
                        {row.role === "admin" ? "Administrator" : "Moderator"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-400">
                      {row.lastLoginAt
                        ? new Date(row.lastLoginAt).toLocaleString()
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}
