import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPage(): ReactElement {
  return (
    <div>
      <AdminTopbar title="New blog post" />
      <BlogForm />
    </div>
  );
}
