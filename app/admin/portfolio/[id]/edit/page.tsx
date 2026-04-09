import type { ReactElement } from "react";
import type { Id } from "@/convex/_generated/dataModel";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { PortfolioForm } from "@/components/admin/PortfolioForm";

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactElement> {
  const { id } = await params;
  return (
    <div>
      <AdminTopbar title="Edit Portfolio Item" />
      <PortfolioForm itemId={id as Id<"portfolio">} />
    </div>
  );
}
