import Link from "next/link";
import type { ReactElement } from "react";
import type { BlogPostDoc } from "@/types";
import { cn } from "@/lib/utils";

export function BlogCard({
  post,
  className,
}: {
  post: BlogPostDoc;
  className?: string;
}): ReactElement {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] bg-[var(--color-white)] p-7 shadow-[0_6px_28px_-12px_color-mix(in_srgb,var(--color-navy)_12%,transparent)] transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-[color-mix(in_srgb,var(--color-cyan)_40%,transparent)] hover:shadow-[0_24px_48px_-16px_color-mix(in_srgb,var(--color-navy)_18%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)]",
        className,
      )}
    >
      {post.seriesName ? (
        <p className="font-body text-caption uppercase tracking-[0.2em] text-[var(--color-cyan)]">
          {post.seriesName}
        </p>
      ) : null}
      <p className="mt-1 font-body text-caption uppercase tracking-[0.2em] text-[var(--color-cyan)]">
        {post.category}
      </p>
      <h3 className="mt-3 font-display text-h3 leading-snug text-[var(--color-navy)] group-hover:text-[var(--color-cyan)] dark:text-[var(--color-offwhite)]">
        {post.title}
      </h3>
      <p className="mt-2 font-body text-caption text-[var(--color-silver)]">
        {post.displayDate} · {post.author}
      </p>
      <p className="mt-3 line-clamp-3 flex-1 font-body text-body text-[color-mix(in_srgb,var(--color-navy)_78%,transparent)] dark:text-[var(--color-silver)]">
        {post.summary}
      </p>
      <span className="mt-4 inline-flex font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
        Read article →
      </span>
    </Link>
  );
}
