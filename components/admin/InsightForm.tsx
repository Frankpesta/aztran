"use client";

import { useMutation, useQuery } from "convex/react";
import slugify from "slugify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { toast } from "sonner";
import type { GenericId } from "convex/values";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { PdfUploader } from "@/components/admin/PdfUploader";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { useRecaptchaGate } from "@/hooks/useRecaptchaGate";
import { Switch } from "@/components/ui/switch";
import {
  estimateInsightReadMinutes,
  INSIGHT_CATEGORIES,
} from "@/lib/content-form-defaults";

type StorageId = GenericId<"_storage">;

type SectionDraft = { heading: string; bulletsText: string };

type MetricDraft = {
  label: string;
  yoyValue: string;
  yoyContext: string;
  momValue: string;
  momContext: string;
};

type FormState = {
  title: string;
  slug: string;
  referenceDate: string;
  displayDate: string;
  category: string;
  tags: string[];
  tagInput: string;
  sources: string[];
  sourceInput: string;
  isFeatured: boolean;
  metrics: MetricDraft[];
  sections: SectionDraft[];
  summary: string;
  seoTitle: string;
  seoDescription: string;
  coverImageId?: StorageId;
  pdfStorageId?: StorageId;
  pdfFileName?: string;
};

function emptyMetric(): MetricDraft {
  return {
    label: "",
    yoyValue: "",
    yoyContext: "",
    momValue: "",
    momContext: "",
  };
}

function emptySection(): SectionDraft {
  return { heading: "", bulletsText: "" };
}

function emptyForm(): FormState {
  const today = new Date().toISOString().slice(0, 10);
  return {
    title: "",
    slug: "",
    referenceDate: today,
    displayDate: "",
    category: INSIGHT_CATEGORIES[0],
    tags: [],
    tagInput: "",
    sources: [],
    sourceInput: "",
    isFeatured: false,
    metrics: [],
    sections: [emptySection()],
    summary: "",
    seoTitle: "",
    seoDescription: "",
  };
}

function bulletsFromText(t: string): string[] {
  return t
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function sectionsToPayload(sections: SectionDraft[]) {
  return sections
    .map((s) => ({
      heading: s.heading.trim(),
      bullets: bulletsFromText(s.bulletsText),
    }))
    .filter((s) => s.heading || s.bullets.length > 0);
}

function metricsToPayload(metrics: MetricDraft[]) {
  const cleaned = metrics.filter((m) => m.label.trim());
  return cleaned.length ? cleaned : undefined;
}

function fromDoc(d: Doc<"insights">): FormState {
  return {
    title: d.title,
    slug: d.slug,
    referenceDate: d.referenceDate,
    displayDate: d.displayDate,
    category: d.category,
    tags: d.tags,
    tagInput: "",
    sources: d.sources,
    sourceInput: "",
    isFeatured: d.isFeatured,
    metrics: (d.metrics ?? []).map((m) => ({
      label: m.label,
      yoyValue: m.yoyValue ?? "",
      yoyContext: m.yoyContext ?? "",
      momValue: m.momValue ?? "",
      momContext: m.momContext ?? "",
    })),
    sections:
      d.sections.length > 0
        ? d.sections.map((s) => ({
            heading: s.heading,
            bulletsText: s.bullets.join("\n"),
          }))
        : [emptySection()],
    summary: d.summary,
    seoTitle: d.seoTitle ?? "",
    seoDescription: d.seoDescription ?? "",
    coverImageId: d.coverImageId,
    pdfStorageId: d.pdfStorageId,
    pdfFileName: d.pdfFileName,
  };
}

export function InsightForm({
  insightId,
}: {
  insightId?: Id<"insights">;
}): ReactElement {
  const router = useRouter();
  const staffReady = useConvexStaffSessionReady();
  const existing = useQuery(
    api.insights.getInsightById,
    staffReady && insightId ? { id: insightId } : "skip",
  );
  const coverUrl = useQuery(
    api.storage.getFileUrl,
    existing?.coverImageId ? { storageId: existing.coverImageId } : "skip",
  );

  const verifyHuman = useRecaptchaGate();
  const createInsight = useMutation(api.insights.createInsight);
  const updateInsight = useMutation(api.insights.updateInsight);
  const publishInsight = useMutation(api.insights.publishInsight);
  const unpublishInsight = useMutation(api.insights.unpublishInsight);
  const deleteInsight = useMutation(api.insights.deleteInsight);

  const [form, setForm] = useState<FormState>(() => emptyForm());
  const [hydrated, setHydrated] = useState(!insightId);

  useEffect(() => {
    if (!insightId) {
      setForm(emptyForm());
      setHydrated(true);
      return;
    }
    if (existing) {
      setForm(fromDoc(existing));
      setHydrated(true);
    }
  }, [insightId, existing]);

  const liveCoverUrl = useQuery(
    api.storage.getFileUrl,
    form.coverImageId ? { storageId: form.coverImageId } : "skip",
  );

  const previewCover = liveCoverUrl ?? coverUrl ?? null;

  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  const [confirmOpen, setConfirmOpen] = useState(false);

  if (insightId && !hydrated) {
    return <div className="p-8 text-sm text-zinc-400">Loading…</div>;
  }

  const guard = async (action: string): Promise<boolean> => {
    try {
      await verifyHuman(action);
      return true;
    } catch {
      toast.error("Verification failed. Please try again.");
      return false;
    }
  };

  const commitTags = (): void => {
    const parts = form.tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (parts.length === 0) return;
    setForm({
      ...form,
      tags: [...form.tags, ...parts],
      tagInput: "",
    });
  };

  const commitSources = (): void => {
    const parts = form.sourceInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (parts.length === 0) return;
    setForm({
      ...form,
      sources: [...form.sources, ...parts],
      sourceInput: "",
    });
  };

  const payloadSections = sectionsToPayload(form.sections);
  const readMinutes = estimateInsightReadMinutes(payloadSections);

  const buildArgs = (status: "draft" | "published") => ({
    title: form.title,
    slug: form.slug || slugify(form.title, { lower: true, strict: true }),
    referenceDate: form.referenceDate,
    displayDate: form.displayDate || form.referenceDate,
    category: form.category,
    tags: form.tags,
    sources: form.sources,
    status,
    isFeatured: form.isFeatured,
    metrics: metricsToPayload(form.metrics),
    sections: payloadSections,
    coverImageId: form.coverImageId,
    pdfStorageId: form.pdfStorageId,
    pdfFileName: form.pdfFileName,
    summary: form.summary,
    readTimeMinutes: readMinutes,
    seoTitle: form.seoTitle || undefined,
    seoDescription: form.seoDescription || undefined,
  });

  const saveDraft = async (): Promise<void> => {
    if (!(await guard("admin_insight_draft"))) return;
    const args = buildArgs("draft");
    if (insightId) {
      await updateInsight({
        id: insightId,
        patch: { ...args },
      });
    } else {
      await createInsight(args);
    }
    router.push("/admin/insights");
  };

  const publish = async (): Promise<void> => {
    if (!(await guard("admin_insight_publish"))) return;
    if (insightId) {
      await updateInsight({
        id: insightId,
        patch: { ...buildArgs("draft") },
      });
      await publishInsight({ id: insightId });
    } else {
      const id = await createInsight(buildArgs("draft"));
      await publishInsight({ id });
    }
    router.push("/admin/insights");
  };

  const unpublish = async (): Promise<void> => {
    if (!insightId) return;
    if (!(await guard("admin_insight_unpublish"))) return;
    await unpublishInsight({ id: insightId });
    router.refresh();
  };

  const remove = async (): Promise<void> => {
    if (!insightId) return;
    if (!(await guard("admin_insight_delete"))) return;
    await deleteInsight({ id: insightId });
    setConfirmOpen(false);
    router.push("/admin/insights");
  };

  const published = existing?.status === "published";

  return (
    <motion.div
      className="mx-auto max-w-3xl space-y-6 rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-xl md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-wrap justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => void saveDraft()}>
          Save Draft
        </Button>
        <Button type="button" onClick={() => void publish()}>
          Publish
        </Button>
        {insightId && published ? (
          <Button type="button" variant="secondary" onClick={() => void unpublish()}>
            Unpublish
          </Button>
        ) : null}
        {insightId ? (
          <Button type="button" variant="destructive" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            onBlur={() => {
              if (!form.slug && form.title) {
                set(
                  "slug",
                  slugify(form.title, { lower: true, strict: true, trim: true }),
                );
              }
            }}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            className="mt-2 font-mono text-sm"
          />
        </div>
        <div>
          <Label htmlFor="referenceDate">Reference date (ISO)</Label>
          <Input
            id="referenceDate"
            type="date"
            value={form.referenceDate}
            onChange={(e) => set("referenceDate", e.target.value)}
            className="mt-2"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="displayDate">Display date</Label>
          <Input
            id="displayDate"
            value={form.displayDate}
            onChange={(e) => set("displayDate", e.target.value)}
            placeholder="February 2026"
            className="mt-2"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select
            value={form.category}
            onValueChange={(v) => {
              if (v) set("category", v);
            }}
          >
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INSIGHT_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-end gap-2 rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="featured">Featured</Label>
            <Switch
              id="featured"
              checked={form.isFeatured}
              onCheckedChange={(c) => set("isFeatured", c)}
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="summary">Summary (listings)</Label>
        <Textarea
          id="summary"
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
          className="mt-2 min-h-[88px]"
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags</Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="tags"
            value={form.tagInput}
            onChange={(e) => set("tagInput", e.target.value)}
            placeholder="Comma-separated"
          />
          <Button type="button" variant="secondary" onClick={commitTags}>
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {form.tags.map((t) => (
            <button
              key={t}
              type="button"
              className="rounded-full border px-3 py-1 font-body text-caption"
              onClick={() =>
                setForm({
                  ...form,
                  tags: form.tags.filter((x) => x !== t),
                })
              }
            >
              {t} ×
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="sources">Sources</Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="sources"
            value={form.sourceInput}
            onChange={(e) => set("sourceInput", e.target.value)}
            placeholder="Comma-separated"
          />
          <Button type="button" variant="secondary" onClick={commitSources}>
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {form.sources.map((t) => (
            <button
              key={t}
              type="button"
              className="rounded-full border px-3 py-1 font-body text-caption"
              onClick={() =>
                setForm({
                  ...form,
                  sources: form.sources.filter((x) => x !== t),
                })
              }
            >
              {t} ×
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
            Hero metrics
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setForm({ ...form, metrics: [...form.metrics, emptyMetric()] })}
          >
            <Plus className="mr-1 size-4" />
            Add metric
          </Button>
        </div>
        {form.metrics.length === 0 ? (
          <p className="text-sm text-zinc-500">Optional infographic-style metrics.</p>
        ) : null}
        {form.metrics.map((m, idx) => (
          <div
            key={idx}
            className="space-y-3 rounded-lg border border-white/10 p-4"
          >
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() =>
                  setForm({
                    ...form,
                    metrics: form.metrics.filter((_, i) => i !== idx),
                  })
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <Input
              placeholder="Label"
              value={m.label}
              onChange={(e) => {
                const next = [...form.metrics];
                next[idx] = { ...m, label: e.target.value };
                setForm({ ...form, metrics: next });
              }}
            />
            <div className="grid gap-2 md:grid-cols-2">
              <Input
                placeholder="YoY value"
                value={m.yoyValue}
                onChange={(e) => {
                  const next = [...form.metrics];
                  next[idx] = { ...m, yoyValue: e.target.value };
                  setForm({ ...form, metrics: next });
                }}
              />
              <Input
                placeholder="YoY context"
                value={m.yoyContext}
                onChange={(e) => {
                  const next = [...form.metrics];
                  next[idx] = { ...m, yoyContext: e.target.value };
                  setForm({ ...form, metrics: next });
                }}
              />
              <Input
                placeholder="MoM value"
                value={m.momValue}
                onChange={(e) => {
                  const next = [...form.metrics];
                  next[idx] = { ...m, momValue: e.target.value };
                  setForm({ ...form, metrics: next });
                }}
              />
              <Input
                placeholder="MoM context"
                value={m.momContext}
                onChange={(e) => {
                  const next = [...form.metrics];
                  next[idx] = { ...m, momContext: e.target.value };
                  setForm({ ...form, metrics: next });
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
            Sections
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setForm({ ...form, sections: [...form.sections, emptySection()] })
            }
          >
            <Plus className="mr-1 size-4" />
            Add section
          </Button>
        </div>
        {form.sections.map((s, idx) => (
          <div key={idx} className="space-y-2 rounded-lg border border-white/10 p-4">
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-destructive"
                disabled={form.sections.length <= 1}
                onClick={() =>
                  setForm({
                    ...form,
                    sections: form.sections.filter((_, i) => i !== idx),
                  })
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <Input
              placeholder="Heading"
              value={s.heading}
              onChange={(e) => {
                const next = [...form.sections];
                next[idx] = { ...s, heading: e.target.value };
                setForm({ ...form, sections: next });
              }}
            />
            <Textarea
              placeholder="One bullet per line"
              value={s.bulletsText}
              onChange={(e) => {
                const next = [...form.sections];
                next[idx] = { ...s, bulletsText: e.target.value };
                setForm({ ...form, sections: next });
              }}
              className="min-h-[120px]"
            />
          </div>
        ))}
      </div>

      <ImageUploader
        storageId={form.coverImageId}
        previewUrl={previewCover}
        onUploaded={(sid) => set("coverImageId", sid)}
        onRemoved={() => {
          setForm((f) => ({
            ...f,
            coverImageId: undefined,
          }));
        }}
      />

      <PdfUploader
        storageId={form.pdfStorageId}
        fileName={form.pdfFileName}
        onUploaded={({ storageId, fileName: fn }) =>
          setForm((f) => ({ ...f, pdfStorageId: storageId, pdfFileName: fn }))
        }
        onRemoved={() =>
          setForm((f) => ({
            ...f,
            pdfStorageId: undefined,
            pdfFileName: undefined,
          }))
        }
      />

      <p className="font-body text-caption text-[var(--color-silver)]">
        Estimated read time: {readMinutes} min
      </p>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-2 font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
          <ChevronDown className="size-4" />
          SEO
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          <div>
            <Label htmlFor="seoTitle">SEO title</Label>
            <Input
              id="seoTitle"
              value={form.seoTitle}
              onChange={(e) => set("seoTitle", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="seoDescription">SEO description</Label>
            <Textarea
              id="seoDescription"
              value={form.seoDescription}
              onChange={(e) => set("seoDescription", e.target.value)}
              className="mt-2"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete insight</DialogTitle>
          </DialogHeader>
          <p className="font-body text-body">This action cannot be undone.</p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={() => void remove()}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
