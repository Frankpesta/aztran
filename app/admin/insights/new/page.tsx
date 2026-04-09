import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { InsightForm } from "@/components/admin/InsightForm";

export default function NewInsightPage(): ReactElement {
  return (
    <div>
      <AdminTopbar title="New insight" />
      <InsightForm />
    </div>
  );
}
