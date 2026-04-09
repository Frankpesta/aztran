import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { MarketReportForm } from "@/components/admin/MarketReportForm";

export default function NewMarketReportPage(): ReactElement {
  return (
    <div>
      <AdminTopbar title="New market report" />
      <MarketReportForm />
    </div>
  );
}
