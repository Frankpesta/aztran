import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ContactsTable } from "@/components/admin/ContactsTable";

export default function AdminContactsPage(): ReactElement {
  return (
    <div>
      <AdminTopbar title="Contact Submissions" />
      <div className="p-8">
        <ContactsTable />
      </div>
    </div>
  );
}
