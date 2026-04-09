import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { PortfolioAdminTable } from "@/components/admin/PortfolioAdminTable";
import { AdminPrimaryLink } from "@/components/admin/AdminPrimaryLink";

export default function AdminPortfolioPage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Portfolio"
        action={
          <AdminPrimaryLink href="/admin/portfolio/new">New Item</AdminPrimaryLink>
        }
      />
      <div className="p-8">
        <PortfolioAdminTable />
      </div>
    </div>
  );
}
