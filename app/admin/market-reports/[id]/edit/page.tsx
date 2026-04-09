import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { MarketReportForm } from "@/components/admin/MarketReportForm";
import type { Id } from "@/convex/_generated/dataModel";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditMarketReportPage({
  params,
}: PageProps): Promise<ReactElement> {
  const { id } = await params;
  return (
    <div>
      <AdminTopbar title="Edit market report" />
      <MarketReportForm reportId={id as Id<"marketReports">} />
    </div>
  );
}
