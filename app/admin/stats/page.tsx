import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { StatsManager } from "@/components/admin/StatsManager";

export default function AdminStatsPage(): ReactElement {
  return (
    <div>
      <AdminTopbar title="Live Statistics" />
      <div className="p-8">
        <StatsManager />
      </div>
    </div>
  );
}
