"use client";

import { useMutation, useQuery } from "convex/react";
import type { ReactElement } from "react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { useRecaptchaGate } from "@/hooks/useRecaptchaGate";
import type { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

/**
 * Inline stats editor with upsert semantics per row.
 */
export function StatsManager(): ReactElement {
  const staffReady = useConvexStaffSessionReady();
  const rows =
    useQuery(api.stats.getAllStats, staffReady ? {} : "skip") ?? [];
  const verifyHuman = useRecaptchaGate();
  const upsert = useMutation(api.stats.upsertStat);
  const reorder = useMutation(api.stats.reorderStats);
  const setVis = useMutation(api.stats.updateStatVisibility);

  const guard = async (): Promise<boolean> => {
    try {
      await verifyHuman("admin_stats_write");
      return true;
    } catch {
      toast.error("Verification failed. Please try again.");
      return false;
    }
  };

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({
    key: "",
    label: "",
    value: "",
    numericValue: "",
    prefix: "",
    suffix: "",
    sortOrder: 0,
    isVisible: true,
  });

  return (
    <div className="space-y-6">
      <Button type="button" onClick={() => setOpen(true)}>
        Add New Stat
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Numeric</TableHead>
            <TableHead>Prefix</TableHead>
            <TableHead>Suffix</TableHead>
            <TableHead>Visible</TableHead>
            <TableHead>Order</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r: Doc<"stats">) => (
            <StatRow
              key={r._id}
              row={r}
              onSave={async (patch) => {
                if (!(await guard())) return;
                await upsert({
                  key: patch.key,
                  label: patch.label,
                  value: patch.value,
                  numericValue: patch.numericValue,
                  prefix: patch.prefix,
                  suffix: patch.suffix,
                  sortOrder: patch.sortOrder,
                  isVisible: patch.isVisible,
                });
              }}
              onReorder={(n) => {
                void (async () => {
                  if (!(await guard())) return;
                  await reorder({ id: r._id, newSortOrder: n });
                })();
              }}
              onVis={async (v) => {
                if (!(await guard())) throw new Error("aborted");
                await setVis({ id: r._id, isVisible: v });
              }}
            />
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New stat</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <div>
              <Label>Key</Label>
              <Input
                className="mt-1"
                value={draft.key}
                onChange={(e) => setDraft({ ...draft, key: e.target.value })}
              />
            </div>
            <div>
              <Label>Label</Label>
              <Input
                className="mt-1"
                value={draft.label}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              />
            </div>
            <div>
              <Label>Value</Label>
              <Input
                className="mt-1"
                value={draft.value}
                onChange={(e) => setDraft({ ...draft, value: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                void (async () => {
                  if (!(await guard())) return;
                  await upsert({
                    key: draft.key,
                    label: draft.label,
                    value: draft.value,
                    numericValue: draft.numericValue
                      ? Number(draft.numericValue)
                      : undefined,
                    prefix: draft.prefix || undefined,
                    suffix: draft.suffix || undefined,
                    sortOrder: draft.sortOrder,
                    isVisible: draft.isVisible,
                  });
                  setOpen(false);
                })();
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatRow({
  row,
  onSave,
  onReorder,
  onVis,
}: {
  row: Doc<"stats">;
  onSave: (p: {
    key: string;
    label: string;
    value: string;
    numericValue?: number;
    prefix?: string;
    suffix?: string;
    sortOrder: number;
    isVisible: boolean;
  }) => Promise<void>;
  onReorder: (n: number) => void;
  onVis: (v: boolean) => Promise<void>;
}): ReactElement {
  const [local, setLocal] = useState({
    key: row.key,
    label: row.label,
    value: row.value,
    numericValue: row.numericValue?.toString() ?? "",
    prefix: row.prefix ?? "",
    suffix: row.suffix ?? "",
    sortOrder: row.sortOrder,
    isVisible: row.isVisible,
  });

  return (
    <TableRow>
      <TableCell>
        <Input
          value={local.key}
          disabled
          className="font-mono text-xs"
          aria-label="Stat key"
        />
      </TableCell>
      <TableCell>
        <Input
          value={local.label}
          onChange={(e) => setLocal({ ...local, label: e.target.value })}
        />
      </TableCell>
      <TableCell>
        <Input
          value={local.value}
          onChange={(e) => setLocal({ ...local, value: e.target.value })}
        />
      </TableCell>
      <TableCell>
        <Input
          value={local.numericValue}
          onChange={(e) =>
            setLocal({ ...local, numericValue: e.target.value })
          }
        />
      </TableCell>
      <TableCell>
        <Input
          value={local.prefix}
          onChange={(e) => setLocal({ ...local, prefix: e.target.value })}
        />
      </TableCell>
      <TableCell>
        <Input
          value={local.suffix}
          onChange={(e) => setLocal({ ...local, suffix: e.target.value })}
        />
      </TableCell>
      <TableCell>
        <Switch
          checked={local.isVisible}
          onCheckedChange={(c) => {
            void onVis(c)
              .then(() => setLocal({ ...local, isVisible: c }))
              .catch(() => {});
          }}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={local.sortOrder}
          onChange={(e) =>
            setLocal({ ...local, sortOrder: Number(e.target.value) })
          }
          onBlur={() => onReorder(local.sortOrder)}
        />
      </TableCell>
      <TableCell>
        <Button
          type="button"
          size="sm"
          onClick={() =>
            void onSave({
              key: local.key,
              label: local.label,
              value: local.value,
              numericValue: local.numericValue
                ? Number(local.numericValue)
                : undefined,
              prefix: local.prefix || undefined,
              suffix: local.suffix || undefined,
              sortOrder: local.sortOrder,
              isVisible: local.isVisible,
            })
          }
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
}
