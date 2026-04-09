"use client";

import { useMutation, useQuery } from "convex/react";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { toast } from "sonner";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { GenericId } from "convex/values";
import type { PortfolioStatus } from "@/types";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { useRecaptchaGate } from "@/hooks/useRecaptchaGate";

type StorageId = GenericId<"_storage">;

const SECTORS = [
  "Real Estate",
  "Energy",
  "Infrastructure",
  "Private Equity",
  "Technology",
] as const;
const REGIONS = ["West Africa", "Pan-Africa", "Global"] as const;

type FormState = {
  title: string;
  slug: string;
  sector: string;
  region: string;
  description: string;
  highlights: string[];
  highlightInput: string;
  dealSize: string;
  returnRate: string;
  status: PortfolioStatus;
  year: number;
  featured: boolean;
  sortOrder: number;
  imageId?: StorageId;
  imageUrl?: string;
};

function empty(): FormState {
  return {
    title: "",
    slug: "",
    sector: SECTORS[0],
    region: REGIONS[0],
    description: "",
    highlights: [],
    highlightInput: "",
    dealSize: "",
    returnRate: "",
    status: "active",
    year: new Date().getFullYear(),
    featured: false,
    sortOrder: 0,
  };
}

function fromDoc(d: Doc<"portfolio">): FormState {
  return {
    title: d.title,
    slug: d.slug,
    sector: d.sector,
    region: d.region,
    description: d.description,
    highlights: d.highlights,
    highlightInput: "",
    dealSize: d.dealSize ?? "",
    returnRate: d.returnRate ?? "",
    status: d.status,
    year: d.year,
    featured: d.featured,
    sortOrder: d.sortOrder,
    imageId: d.imageId,
    imageUrl: d.imageUrl,
  };
}

/**
 * Create and edit form for portfolio records with highlights list and storage upload.
 */
export function PortfolioForm({
  itemId,
}: {
  itemId?: Id<"portfolio">;
}): ReactElement {
  const router = useRouter();
  const staffReady = useConvexStaffSessionReady();
  const existing = useQuery(
    api.portfolio.getPortfolioById,
    staffReady && itemId ? { id: itemId } : "skip",
  );
  const liveUrl = useQuery(
    api.storage.getFileUrl,
    existing?.imageId ? { storageId: existing.imageId } : "skip",
  );

  const verifyHuman = useRecaptchaGate();
  const create = useMutation(api.portfolio.createPortfolioItem);
  const update = useMutation(api.portfolio.updatePortfolioItem);

  const [form, setForm] = useState<FormState>(empty());
  const [ready, setReady] = useState(!itemId);

  useEffect(() => {
    if (!itemId) {
      setForm(empty());
      setReady(true);
      return;
    }
    if (existing) {
      setForm(fromDoc(existing));
      setReady(true);
    }
  }, [itemId, existing]);

  const previewUrl = useQuery(
    api.storage.getFileUrl,
    form.imageId ? { storageId: form.imageId } : "skip",
  );
  const imgPreview = previewUrl ?? form.imageUrl ?? liveUrl ?? null;

  const set = useCallback(<K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
  }, []);

  if (!ready) {
    return (
      <div className="p-8 text-sm text-zinc-400">Loading…</div>
    );
  }

  const submit = async (): Promise<void> => {
    try {
      await verifyHuman("admin_portfolio_save");
    } catch {
      toast.error("Verification failed. Please try again.");
      return;
    }
    const base = {
      title: form.title,
      slug: form.slug || slugify(form.title, { lower: true, strict: true }),
      sector: form.sector,
      region: form.region,
      description: form.description,
      highlights: form.highlights,
      dealSize: form.dealSize || undefined,
      returnRate: form.returnRate || undefined,
      status: form.status,
      year: form.year,
      featured: form.featured,
      sortOrder: form.sortOrder,
      imageId: form.imageId,
      imageUrl: imgPreview ?? undefined,
    };
    if (itemId) {
      await update({ id: itemId, patch: base });
    } else {
      await create(base);
    }
    router.push("/admin/portfolio");
  };

  return (
    <motion.div
      className="mx-auto max-w-2xl space-y-5 rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-xl md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Button type="button" onClick={() => void submit()}>
        Save
      </Button>
      <div>
        <Label className="text-zinc-300">Title</Label>
        <Input
          className="mt-2"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          onBlur={() =>
            set(
              "slug",
              slugify(form.title, { lower: true, strict: true, trim: true }),
            )
          }
        />
      </div>
      <div>
        <Label className="text-zinc-300">Slug</Label>
        <Input
          className="mt-2 font-mono text-sm"
          value={form.slug}
          onChange={(e) => set("slug", e.target.value)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label className="text-zinc-300">Sector</Label>
          <Select
            value={form.sector}
            onValueChange={(v) => {
              if (v) set("sector", v);
            }}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SECTORS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-zinc-300">Region</Label>
          <Select
            value={form.region}
            onValueChange={(v) => {
              if (v) set("region", v);
            }}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="text-zinc-300">Description</Label>
        <Textarea
          className="mt-2"
          rows={4}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>
      <div>
        <Label className="text-zinc-300">Highlights</Label>
        <div className="mt-2 flex gap-2">
          <Input
            value={form.highlightInput}
            onChange={(e) => set("highlightInput", e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            disabled={form.highlights.length >= 5}
            onClick={() => {
              const v = form.highlightInput.trim();
              if (!v) return;
              setForm({
                ...form,
                highlights: [...form.highlights, v],
                highlightInput: "",
              });
            }}
          >
            Add
          </Button>
        </div>
        <ul className="mt-2 list-disc pl-5">
          {form.highlights.map((h, i) => (
            <li key={i} className="flex justify-between gap-2">
              {h}
              <button
                type="button"
                className="text-destructive"
                onClick={() =>
                  setForm({
                    ...form,
                    highlights: form.highlights.filter((_, j) => j !== i),
                  })
                }
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label className="text-zinc-300">Deal size</Label>
          <Input
            className="mt-2"
            value={form.dealSize}
            onChange={(e) => set("dealSize", e.target.value)}
          />
        </div>
        <div>
          <Label className="text-zinc-300">Return rate</Label>
          <Input
            className="mt-2"
            value={form.returnRate}
            onChange={(e) => set("returnRate", e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label className="text-zinc-300">Status</Label>
          <Select
            value={form.status}
            onValueChange={(v) => {
              if (v === "active" || v === "exited" || v === "pipeline") {
                set("status", v);
              }
            }}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="exited">Exited</SelectItem>
              <SelectItem value="pipeline">Pipeline</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-zinc-300">Year</Label>
          <Input
            type="number"
            className="mt-2"
            value={form.year}
            onChange={(e) => set("year", Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          id="feat"
          checked={form.featured}
          onCheckedChange={(c) => set("featured", c)}
        />
        <Label htmlFor="feat" className="text-zinc-300">
          Featured
        </Label>
      </div>
      <div>
        <Label className="text-zinc-300">Sort order</Label>
        <Input
          type="number"
          className="mt-2"
          value={form.sortOrder}
          onChange={(e) => set("sortOrder", Number(e.target.value))}
        />
      </div>
      <ImageUploader
        storageId={form.imageId}
        previewUrl={imgPreview}
        label="Cover image"
        onUploaded={(sid) => set("imageId", sid)}
        onRemoved={() =>
          setForm((f) => ({ ...f, imageId: undefined, imageUrl: undefined }))
        }
      />
    </motion.div>
  );
}
