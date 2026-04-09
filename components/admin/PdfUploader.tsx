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
 * Convex storage upload for PDF attachments (insights, market reports).
 */
export function PdfUploader({
  storageId,
  fileName,
  onUploaded,
  onRemoved,
  label = "PDF attachment",
}: {
  storageId?: StorageId;
  fileName?: string;
  onUploaded: (payload: { storageId: StorageId; fileName: string }) => void;
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
          headers: { "Content-Type": file.type || "application/pdf" },
          body: file,
        });
        if (!res.ok) {
          throw new Error(`Upload failed (${res.status})`);
        }
        const json = (await res.json()) as { storageId?: StorageId };
        if (!json.storageId) {
          throw new Error("No storage id returned");
        }
        onUploaded({ storageId: json.storageId, fileName: file.name });
        toast.success("PDF uploaded", {
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
      toast.success("PDF removed");
    } catch {
      toast.error("Could not remove file. Try again.");
    }
  }, [deleteFile, storageId, onRemoved, verifyHuman]);

  return (
    <div>
      <p className="mb-2 font-body text-label uppercase tracking-wide text-[var(--color-silver)]">
        {label}
      </p>
      {fileName ? (
        <p className="mb-3 font-mono text-xs text-zinc-300">{fileName}</p>
      ) : null}
      {justUploaded && fileName ? (
        <p className="mb-3 flex items-center gap-2 font-body text-caption text-emerald-400">
          <CheckCircle2 className="size-4 shrink-0" aria-hidden />
          PDF linked — save or publish to keep it with this item.
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
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
          {loading ? "Uploading…" : storageId ? "Replace PDF" : "Select PDF"}
        </Button>
        {storageId ? (
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
