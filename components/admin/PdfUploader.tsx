"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { useCallback, useRef, useState, type ReactElement } from "react";
import { toast } from "sonner";
import { fetchStaffConvexAccessToken } from "@/lib/convex-staff-token-client";
import { CONVEX_REJECTED_SESSION_UPLOAD } from "@/lib/convex-staff-session-copy";
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
  const { isLoading: authLoading, isAuthenticated } = useConvexAuth();
  const sessionReady = !authLoading && isAuthenticated;
  const inputRef = useRef<HTMLInputElement>(null);
  const verifyHuman = useRecaptchaGate();
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const deleteFile = useMutation(api.storage.deleteFile);
  const [loading, setLoading] = useState(false);
  const [justUploaded, setJustUploaded] = useState(false);

  const onFile = useCallback(
    async (file: File | undefined) => {
      if (!file) return;
      if (!sessionReady) {
        toast.error("Session not ready", {
          description: "Wait until you are signed in, then try again.",
        });
        return;
      }
      setLoading(true);
      setJustUploaded(false);
      try {
        await verifyHuman("admin_storage_upload");
        const token = await fetchStaffConvexAccessToken({
          forceRefreshToken: false,
        });
        if (!token) {
          toast.error("No Convex token", {
            description: "Log in again at /admin/login, then retry the upload.",
          });
          return;
        }
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
        const raw = e instanceof Error ? e.message : "";
        if (/unauthorized/i.test(raw)) {
          toast.error("Upload blocked (unauthorized)", {
            description:
              "Convex did not accept your staff session. Refresh the page, log in again, and ensure AUTH_JWT_ISSUER and AUTH_JWT_JWKS in the Convex dashboard match your Next.js JWT keys.",
          });
        } else {
          toast.error("Upload failed", {
            description: raw || "Check your connection and try again.",
          });
        }
      } finally {
        setLoading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [generateUploadUrl, onUploaded, verifyHuman, sessionReady],
  );

  const remove = useCallback(async () => {
    if (!sessionReady) {
      toast.error("Session not ready");
      return;
    }
    try {
      if (storageId) {
        await verifyHuman("admin_storage_delete");
        const token = await fetchStaffConvexAccessToken({
          forceRefreshToken: false,
        });
        if (!token) {
          toast.error("No Convex token", { description: "Log in again and retry." });
          return;
        }
        await deleteFile({ storageId });
      }
      onRemoved();
      setJustUploaded(false);
      toast.success("PDF removed");
    } catch {
      toast.error("Could not remove file. Try again.");
    }
  }, [deleteFile, storageId, onRemoved, verifyHuman, sessionReady]);

  return (
    <div>
      <p className="mb-2 font-body text-label uppercase tracking-wide text-[var(--color-silver)]">
        {label}
      </p>
      {authLoading ? (
        <p className="mb-2 font-body text-caption text-zinc-500">Connecting your session…</p>
      ) : !isAuthenticated ? (
        <p className="mb-2 font-body text-caption text-amber-400/90">
          {CONVEX_REJECTED_SESSION_UPLOAD}
        </p>
      ) : null}
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
          disabled={loading || !sessionReady}
          onClick={() => inputRef.current?.click()}
        >
          {loading ? "Uploading…" : storageId ? "Replace PDF" : "Select PDF"}
        </Button>
        {storageId ? (
          <Button
            type="button"
            variant="ghost"
            disabled={!sessionReady}
            onClick={() => void remove()}
          >
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
