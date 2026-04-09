"use client";

import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import type { ReactElement } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MarketReportsAdminTable(): ReactElement {
  const staffReady = useConvexStaffSessionReady();
  const rows =
    useQuery(api.marketReports.getAllMarketReports, staffReady ? {} : "skip") ?? [];
  const verifyHuman = useRecaptchaGate();
  const remove = useMutation(api.marketReports.deleteMarketReport);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Report date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row: Doc<"marketReports">) => (
          <TableRow key={row._id}>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell className="whitespace-nowrap font-body text-caption">
              {row.reportDate}
            </TableCell>
            <TableCell>
              <Badge variant={row.status === "published" ? "default" : "secondary"}>
                {row.status}
              </Badge>
            </TableCell>
            <TableCell className="space-x-2 text-right">
              <Link
                href={`/admin/market-reports/${row._id}/edit`}
                className="inline-flex h-7 items-center rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 text-[0.8rem] font-medium hover:bg-muted"
              >
                Edit
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => {
                  if (!confirm("Delete this market report?")) return;
                  void (async () => {
                    try {
                      await verifyHuman("admin_market_report_delete");
                    } catch {
                      toast.error("Verification failed. Please try again.");
                      return;
                    }
                    await remove({ id: row._id });
                  })();
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
