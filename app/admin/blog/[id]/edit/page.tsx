import type { ReactElement } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { BlogForm } from "@/components/admin/BlogForm";
import type { Id } from "@/convex/_generated/dataModel";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditBlogPage({ params }: PageProps): Promise<ReactElement> {
  const { id } = await params;
  return (
    <div>
      <AdminTopbar title="Edit blog post" />
      <BlogForm postId={id as Id<"blogPosts">} />
    </div>
  );
}
