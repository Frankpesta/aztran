"use client";

import { useMutation } from "convex/react";
import { useCallback, useRef, useState, type ReactElement } from "react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { GenericId } from "convex/values";
import { useRecaptchaGate } from "@/hooks/useRecaptchaGate";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

type StorageId = GenericId<"_storage">;

/**
 * Convex storage upload control with optional preview and removal.
 */
export function ImageUploader({
  storageId,
  previewUrl,
  onUploaded,
  onRemoved,
  label = "Cover image",
}: {
  storageId?: StorageId;
  previewUrl?: string | null;
  onUploaded: (storageId: StorageId) => void;
  onRemoved: () => void;
  label?: string;
}): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const verifyHuman = useRecaptchaGate();
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const deleteFile = useMutation(api.storage.deleteFile);
  const [loading, setLoading] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);

  const onFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      setLoading(true);
      setJustUploaded(false);
      try {
        await verifyHuman("admin_storage_upload");
        const postUrl = await generateUploadUrl();
        const res = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        if (!res.ok) {
          throw new Error(`Upload failed (${res.status})`);
        }
        const json = (await res.json()) as { storageId?: StorageId };
        if (!json.storageId) {
          throw new Error("No storage id returned");
        }
        onUploaded(json.storageId);
        toast.success("Image uploaded", {
          description: file.name,
        });
        setJustUploaded(true);
        window.setTimeout(() => setJustUploaded(false), 4000);
      } catch (e) {
        toast.error("Upload failed", {
          description:
            e instanceof Error ? e.message : "Check your connection and try again.",
        });
      } finally {
        setLoading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [generateUploadUrl, onUploaded, verifyHuman],
  );

  const remove = useCallback(async () => {
    try {
      if (storageId) {
        await verifyHuman("admin_storage_delete");
        await deleteFile({ storageId });
      }
      onRemoved();
      setJustUploaded(false);
      toast.success("Image removed");
    } catch {
      toast.error("Could not remove file. Try again.");
    }
  }, [deleteFile, storageId, onRemoved, verifyHuman]);

  return (
    <div>
      <p className="mb-2 font-body text-label uppercase tracking-wide text-[var(--color-silver)]">
        {label}
      </p>
      {previewUrl ? (
        <div className="relative mb-3 h-40 w-full max-w-sm overflow-hidden rounded-md border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      {justUploaded && previewUrl ? (
        <p className="mb-3 flex items-center gap-2 font-body text-caption text-emerald-400">
          <CheckCircle2 className="size-4 shrink-0" aria-hidden />
          Saved to draft — remember to save or publish your post.
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            void onFile(e.target.files?.[0]);
          }}
        />
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => inputRef.current?.click()}
        >
          {loading ? "Uploading…" : previewUrl ? "Replace image" : "Select image"}
        </Button>
        {previewUrl ? (
          <Button type="button" variant="ghost" onClick={() => void remove()}>
            Remove
          </Button>
        ) : null}
        {loading ? (
          <span className="font-body text-caption text-zinc-500">Uploading…</span>
        ) : null}
      </div>
    </div>
  );
}
