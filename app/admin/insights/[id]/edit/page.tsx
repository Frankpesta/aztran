import type { ReactElement } from "react";
import type { Id } from "@/convex/_generated/dataModel";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { InsightForm } from "@/components/admin/InsightForm";

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  const { id } = await params;
  return (
    <div>
      <AdminTopbar title="Edit insight" />
      <InsightForm insightId={id as Id<"insights">} />
    </div>
  );
}
