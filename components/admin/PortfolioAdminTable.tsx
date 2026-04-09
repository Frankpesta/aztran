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
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";

/**
 * Administrative portfolio grid with reorder controls using numeric sort order.
 */
export function PortfolioAdminTable(): ReactElement {
  const staffReady = useConvexStaffSessionReady();
  const rows =
    useQuery(api.portfolio.getAllPortfolioAdmin, staffReady ? {} : "skip") ??
    [];
  const verifyHuman = useRecaptchaGate();
  const reorder = useMutation(api.portfolio.reorderPortfolio);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Sector</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Order</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row: Doc<"portfolio">) => (
          <TableRow key={row._id}>
            <TableCell className="font-medium">{row.title}</TableCell>
            <TableCell>{row.sector}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
            <TableCell>
              <input
                type="number"
                defaultValue={row.sortOrder}
                className="w-16 rounded border bg-transparent px-2 py-1 font-body text-caption"
                aria-label={`Sort order for ${row.title}`}
                onBlur={(e) => {
                  const v = Number(e.target.value);
                  if (Number.isNaN(v)) return;
                  void (async () => {
                    try {
                      await verifyHuman("admin_portfolio_reorder");
                    } catch {
                      toast.error("Verification failed. Please try again.");
                      return;
                    }
                    await reorder({ id: row._id, newSortOrder: v });
                  })();
                }}
              />
            </TableCell>
            <TableCell className="space-x-2 text-right">
              <Link
                href={`/admin/portfolio/${row._id}/edit`}
                className="inline-flex h-7 items-center rounded-[min(var(--radius-md),12px)] border border-border bg-background px-2.5 text-[0.8rem] font-medium hover:bg-muted"
              >
                Edit
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
