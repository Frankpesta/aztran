import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { BlogAdminTable } from "@/components/admin/BlogAdminTable";
import { AdminPrimaryLink } from "@/components/admin/AdminPrimaryLink";
import { MarketingSiteBlogNote } from "@/components/admin/MarketingSiteBlogNote";

export default function AdminBlogPage(): ReactElement {
  return (
    <div>
      <AdminTopbar
        title="Blog"
        action={<AdminPrimaryLink href="/admin/blog/new">New post</AdminPrimaryLink>}
      />
      <div className="space-y-6 p-8">
        <MarketingSiteBlogNote />
        <BlogAdminTable />
      </div>
    </div>
  );
}
