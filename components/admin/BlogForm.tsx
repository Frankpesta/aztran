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
import { MarketingSiteBlogNote } from "@/components/admin/MarketingSiteBlogNote";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useConvexStaffSessionReady } from "@/hooks/useConvexStaffSessionReady";
import { useRecaptchaGate } from "@/hooks/useRecaptchaGate";
import { Switch } from "@/components/ui/switch";
import {
  BLOG_CATEGORIES,
  estimateBlogReadMinutes,
} from "@/lib/content-form-defaults";

type StorageId = GenericId<"_storage">;

type SectionDraft = {
  heading: string;
  paragraphsText: string;
  imageStorageId?: StorageId;
  imageCaption: string;
};

type FormState = {
  title: string;
  slug: string;
  seriesName: string;
  referenceDate: string;
  displayDate: string;
  author: string;
  category: string;
  tags: string[];
  tagInput: string;
  isFeatured: boolean;
  intro: string;
  sections: SectionDraft[];
  summary: string;
  seoTitle: string;
  seoDescription: string;
  coverImageId?: StorageId;
};

function emptySection(): SectionDraft {
  return { heading: "", paragraphsText: "", imageCaption: "" };
}

function emptyForm(): FormState {
  const today = new Date().toISOString().slice(0, 10);
  return {
    title: "",
    slug: "",
    seriesName: "",
    referenceDate: today,
    displayDate: "",
    author: "Aztran Research Team",
    category: BLOG_CATEGORIES[0],
    tags: [],
    tagInput: "",
    isFeatured: false,
    intro: "",
    sections: [emptySection()],
    summary: "",
    seoTitle: "",
    seoDescription: "",
  };
}

function paragraphsFromText(t: string): string[] {
  const parts = t.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return [];
  return parts;
}

function sectionsToPayload(sections: SectionDraft[]) {
  return sections
    .map((s) => ({
      heading: s.heading.trim() || undefined,
      paragraphs: paragraphsFromText(s.paragraphsText),
      imageStorageId: s.imageStorageId,
      imageCaption: s.imageCaption.trim() || undefined,
    }))
    .filter((s) => s.paragraphs.length > 0 || s.heading || s.imageStorageId);
}

function fromDoc(d: Doc<"blogPosts">): FormState {
  return {
    title: d.title,
    slug: d.slug,
    seriesName: d.seriesName ?? "",
    referenceDate: d.referenceDate,
    displayDate: d.displayDate,
    author: d.author,
    category: d.category,
    tags: d.tags,
    tagInput: "",
    isFeatured: d.isFeatured,
    intro: d.intro,
    sections:
      d.sections.length > 0
        ? d.sections.map((s) => ({
            heading: s.heading ?? "",
            paragraphsText: s.paragraphs.join("\n\n"),
            imageStorageId: s.imageStorageId,
            imageCaption: s.imageCaption ?? "",
          }))
        : [emptySection()],
    summary: d.summary,
    seoTitle: d.seoTitle ?? "",
    seoDescription: d.seoDescription ?? "",
    coverImageId: d.coverImageId,
  };
}

function SectionImageSlot({
  storageId,
  onUploaded,
  onRemoved,
}: {
  storageId?: StorageId;
  onUploaded: (id: StorageId) => void;
  onRemoved: () => void;
}): ReactElement {
  const url = useQuery(
    api.storage.getFileUrl,
    storageId ? { storageId } : "skip",
  );
  return (
    <ImageUploader
      storageId={storageId}
      previewUrl={url ?? null}
      label="Section image"
      onUploaded={onUploaded}
      onRemoved={onRemoved}
    />
  );
}

export function BlogForm({
  postId,
}: {
  postId?: Id<"blogPosts">;
}): ReactElement {
  const router = useRouter();
  const staffReady = useConvexStaffSessionReady();
  const existing = useQuery(
    api.blogPosts.getBlogPostById,
    staffReady && postId ? { id: postId } : "skip",
  );
  const coverUrl = useQuery(
    api.storage.getFileUrl,
    existing?.coverImageId ? { storageId: existing.coverImageId } : "skip",
  );

  const verifyHuman = useRecaptchaGate();
  const createBlogPost = useMutation(api.blogPosts.createBlogPost);
  const updateBlogPost = useMutation(api.blogPosts.updateBlogPost);
  const publishBlogPost = useMutation(api.blogPosts.publishBlogPost);
  const unpublishBlogPost = useMutation(api.blogPosts.unpublishBlogPost);
  const deleteBlogPost = useMutation(api.blogPosts.deleteBlogPost);

  const [form, setForm] = useState<FormState>(() => emptyForm());
  const [hydrated, setHydrated] = useState(!postId);

  useEffect(() => {
    if (!postId) {
      setForm(emptyForm());
      setHydrated(true);
      return;
    }
    if (existing) {
      setForm(fromDoc(existing));
      setHydrated(true);
    }
  }, [postId, existing]);

  const liveCoverUrl = useQuery(
    api.storage.getFileUrl,
    form.coverImageId ? { storageId: form.coverImageId } : "skip",
  );

  const previewCover = liveCoverUrl ?? coverUrl ?? null;

  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  const [confirmOpen, setConfirmOpen] = useState(false);

  if (postId && !hydrated) {
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

  const readMinutes = estimateBlogReadMinutes(
    form.intro,
    sectionsToPayload(form.sections),
  );

  const buildArgs = (status: "draft" | "published", validatePublish: boolean) => {
    const payloadSections = sectionsToPayload(form.sections);
    if (validatePublish && !form.intro.trim() && payloadSections.length === 0) {
      toast.error("Add an intro or at least one section with content.");
      throw new Error("validation");
    }
    return {
      title: form.title,
      slug: form.slug || slugify(form.title, { lower: true, strict: true }),
      seriesName: form.seriesName.trim() || undefined,
      referenceDate: form.referenceDate,
      displayDate: form.displayDate || form.referenceDate,
      author: form.author,
      category: form.category,
      tags: form.tags,
      status,
      isFeatured: form.isFeatured,
      intro: form.intro,
      sections: payloadSections,
      coverImageId: form.coverImageId,
      readTimeMinutes: estimateBlogReadMinutes(form.intro, payloadSections),
      summary: form.summary,
      seoTitle: form.seoTitle || undefined,
      seoDescription: form.seoDescription || undefined,
    };
  };

  const saveDraft = async (): Promise<void> => {
    if (!(await guard("admin_blog_draft"))) return;
    let args;
    try {
      args = buildArgs("draft", false);
    } catch {
      return;
    }
    if (postId) {
      await updateBlogPost({ id: postId, patch: { ...args } });
    } else {
      await createBlogPost(args);
    }
    router.push("/admin/blog");
  };

  const publish = async (): Promise<void> => {
    if (!(await guard("admin_blog_publish"))) return;
    let args;
    try {
      args = buildArgs("draft", true);
    } catch {
      return;
    }
    if (postId) {
      await updateBlogPost({ id: postId, patch: { ...args } });
      await publishBlogPost({ id: postId });
    } else {
      const id = await createBlogPost(args);
      await publishBlogPost({ id });
    }
    router.push("/admin/blog");
  };

  const unpublish = async (): Promise<void> => {
    if (!postId) return;
    if (!(await guard("admin_blog_unpublish"))) return;
    await unpublishBlogPost({ id: postId });
    router.refresh();
  };

  const remove = async (): Promise<void> => {
    if (!postId) return;
    if (!(await guard("admin_blog_delete"))) return;
    await deleteBlogPost({ id: postId });
    setConfirmOpen(false);
    router.push("/admin/blog");
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
        {postId && published ? (
          <Button type="button" variant="secondary" onClick={() => void unpublish()}>
            Unpublish
          </Button>
        ) : null}
        {postId ? (
          <Button type="button" variant="destructive" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        ) : null}
      </div>

      <MarketingSiteBlogNote />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label htmlFor="btitle">Title</Label>
          <Input
            id="btitle"
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
          <Label htmlFor="bslug">Slug</Label>
          <Input
            id="bslug"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            className="mt-2 font-mono text-sm"
          />
        </div>
        <div>
          <Label htmlFor="bref">Reference date</Label>
          <Input
            id="bref"
            type="date"
            value={form.referenceDate}
            onChange={(e) => set("referenceDate", e.target.value)}
            className="mt-2"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="bdisp">Display date</Label>
          <Input
            id="bdisp"
            value={form.displayDate}
            onChange={(e) => set("displayDate", e.target.value)}
            placeholder="March 17, 2026"
            className="mt-2"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="series">Series name</Label>
          <Input
            id="series"
            value={form.seriesName}
            onChange={(e) => set("seriesName", e.target.value)}
            placeholder="Market Buzz"
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
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
              {BLOG_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-end gap-2 rounded-lg border border-white/10 p-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bfeatured">Featured</Label>
            <Switch
              id="bfeatured"
              checked={form.isFeatured}
              onCheckedChange={(c) => set("isFeatured", c)}
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="intro">Intro</Label>
        <Textarea
          id="intro"
          value={form.intro}
          onChange={(e) => set("intro", e.target.value)}
          className="mt-2 min-h-[120px]"
        />
      </div>

      <div>
        <Label htmlFor="bsum">Summary</Label>
        <Textarea
          id="bsum"
          value={form.summary}
          onChange={(e) => set("summary", e.target.value)}
          className="mt-2 min-h-[88px]"
        />
      </div>

      <div>
        <Label htmlFor="btags">Tags</Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="btags"
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
          <div key={idx} className="space-y-3 rounded-lg border border-white/10 p-4">
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
              placeholder="Optional heading"
              value={form.sections[idx].heading}
              onChange={(e) => {
                const next = [...form.sections];
                next[idx] = { ...next[idx], heading: e.target.value };
                setForm({ ...form, sections: next });
              }}
            />
            <Textarea
              placeholder="Paragraphs (separate with a blank line)"
              value={s.paragraphsText}
              onChange={(e) => {
                const next = [...form.sections];
                next[idx] = { ...next[idx], paragraphsText: e.target.value };
                setForm({ ...form, sections: next });
              }}
              className="min-h-[140px]"
            />
            <Input
              placeholder="Image caption"
              value={s.imageCaption}
              onChange={(e) => {
                const next = [...form.sections];
                next[idx] = { ...next[idx], imageCaption: e.target.value };
                setForm({ ...form, sections: next });
              }}
            />
            <SectionImageSlot
              storageId={s.imageStorageId}
              onUploaded={(id) => {
                const next = [...form.sections];
                next[idx] = { ...next[idx], imageStorageId: id };
                setForm({ ...form, sections: next });
              }}
              onRemoved={() => {
                const next = [...form.sections];
                next[idx] = { ...next[idx], imageStorageId: undefined };
                setForm({ ...form, sections: next });
              }}
            />
          </div>
        ))}
      </div>

      <ImageUploader
        storageId={form.coverImageId}
        previewUrl={previewCover}
        onUploaded={(sid) => set("coverImageId", sid)}
        onRemoved={() => setForm((f) => ({ ...f, coverImageId: undefined }))}
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
            <Label htmlFor="bseoTitle">SEO title</Label>
            <Input
              id="bseoTitle"
              value={form.seoTitle}
              onChange={(e) => set("seoTitle", e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="bseoDesc">SEO description</Label>
            <Textarea
              id="bseoDesc"
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
            <DialogTitle>Delete blog post</DialogTitle>
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
