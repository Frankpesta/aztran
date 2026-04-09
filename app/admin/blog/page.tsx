import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { BlogAdminTable } from "@/components/admin/BlogAdminTable";
import { AdminPrimaryLink } from "@/components/admin/AdminPrimaryLink";

export default function AdminBlogPage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Blog"
        action={<AdminPrimaryLink href="/admin/blog/new">New post</AdminPrimaryLink>}
      />
      <div className="p-8">
        <BlogAdminTable />
      </div>
    </div>
  );
}
