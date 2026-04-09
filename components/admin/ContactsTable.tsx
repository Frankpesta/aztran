"use client";

import { useMutation, useQuery } from "convex/react";
import { Fragment, useState, type ReactElement } from "react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { useRecaptchaGate } from "@/hooks/useRecaptchaGate";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Tab = "all" | "unread" | "archived";

/**
 * Contact inbox with filter tabs, expansion for message body, and archive controls.
 */
export function ContactsTable(): ReactElement {
  const staffReady = useConvexStaffSessionReady();
  const [tab, setTab] = useState<Tab>("all");
  const filter = tab === "all" ? "all" : tab === "unread" ? "unread" : "archived";
  const rows =
    useQuery(
      api.contact.getSubmissions,
      staffReady ? { filter } : "skip",
    ) ?? [];
  const verifyHuman = useRecaptchaGate();
  const markRead = useMutation(api.contact.markAsRead);
  const archive = useMutation(api.contact.archiveSubmission);
  const [openId, setOpenId] = useState<string | null>(null);

  const guard = async (): Promise<boolean> => {
    try {
      await verifyHuman("admin_contact_inbox");
      return true;
    } catch {
      toast.error("Verification failed. Please try again.");
      return false;
    }
  };

  return (
    <div>
      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r: Doc<"contactSubmissions">) => (
            <Fragment key={r._id}>
              <TableRow
                className="cursor-pointer"
                onClick={() => {
                  setOpenId(openId === r._id ? null : r._id);
                  if (!r.isRead) {
                    void (async () => {
                      if (!(await guard())) return;
                      await markRead({ id: r._id });
                    })();
                  }
                }}
              >
                <TableCell>{r.fullName}</TableCell>
                <TableCell>{r.organization ?? "—"}</TableCell>
                <TableCell>{r.subject}</TableCell>
                <TableCell className="whitespace-nowrap font-body text-caption">
                  {new Date(r.submittedAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={r.isRead ? "secondary" : "default"}>
                    {r.isRead ? "Read" : "Unread"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      void (async () => {
                        if (!(await guard())) return;
                        await archive({ id: r._id });
                      })();
                    }}
                  >
                    Archive
                  </Button>
                </TableCell>
              </TableRow>
              {openId === r._id ? (
                <TableRow>
                  <TableCell colSpan={6} className="bg-muted/40">
                    <p className="whitespace-pre-wrap font-body text-body">
                      {r.message}
                    </p>
                  </TableCell>
                </TableRow>
              ) : null}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
