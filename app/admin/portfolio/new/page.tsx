import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { PortfolioForm } from "@/components/admin/PortfolioForm";

export default function NewPortfolioPage(): ReactElement {
  return (
    <div>
      <AdminTopbar title="New Portfolio Item" />
      <PortfolioForm />
    </div>
  );
}
