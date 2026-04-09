import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { MarketReportsAdminTable } from "@/components/admin/MarketReportsAdminTable";
import { AdminPrimaryLink } from "@/components/admin/AdminPrimaryLink";

export default function AdminMarketReportsPage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Market reports"
        action={
          <AdminPrimaryLink href="/admin/market-reports/new">New report</AdminPrimaryLink>
        }
      />
      <div className="p-8">
        <MarketReportsAdminTable />
      </div>
    </div>
  );
}
