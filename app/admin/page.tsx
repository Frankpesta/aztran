import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { DashboardMetrics } from "@/components/admin/DashboardMetrics";

export default function AdminHomePage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Dashboard"
        subtitle="Operational overview, inbound trends, and recent content activity."
      />
      <DashboardMetrics />
    </div>
  );
}
