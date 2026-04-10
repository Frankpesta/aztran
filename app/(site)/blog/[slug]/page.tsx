import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { ConvexStorageImage } from "@/components/ui/ConvexStorageImage";
import { api } from "@/convex/_generated/api";
import { serverFetchQuery } from "@/lib/server-convex-query";

type PageProps = { params: Promise<{ slug: string }> };

export const runtime = "nodejs";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await serverFetchQuery(api.blogPosts.getAllBlogSlugs);
    return slugs.map((slug: string) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await serverFetchQuery(api.blogPosts.getBlogPostBySlug, { slug });
  if (!doc) return { title: "Blog" };
  const title = doc.seoTitle ?? doc.title;
  const description = doc.seoDescription ?? doc.summary;
  return { title, description, openGraph: { title, description, type: "article" } };
}

export default async function BlogArticlePage({ params }: PageProps): Promise<ReactElement> {
  const { slug } = await params;
  const doc = await serverFetchQuery(api.blogPosts.getBlogPostBySlug, { slug });
  if (!doc) notFound();

  let coverUrl: string | null = null;
  if (doc.coverImageId) {
    try {
      coverUrl = await serverFetchQuery(api.storage.getFileUrl, {
        storageId: doc.coverImageId,
      });
    } catch {
      coverUrl = null;
    }
  }

  const sectionImageUrls: (string | null)[] = [];
  for (const s of doc.sections) {
    if (s.imageStorageId) {
      try {
        sectionImageUrls.push(
          await serverFetchQuery(api.storage.getFileUrl, {
            storageId: s.imageStorageId,
          }),
        );
      } catch {
        sectionImageUrls.push(null);
      }
    } else {
      sectionImageUrls.push(null);
    }
  }

  return (
    <article className="pb-section pt-28">
      <div className="mx-auto max-w-[760px] px-4 md:px-6">
        {doc.seriesName ? (
          <p className="font-body text-caption uppercase tracking-[0.2em] text-[var(--color-cyan)]">
            {doc.seriesName}
          </p>
        ) : null}
        <p className="mt-2 font-body text-caption uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-navy)_58%,transparent)] dark:text-[var(--color-silver)]">
          {doc.category}
          {doc.readTimeMinutes ? (
            <>
              {" "}
              · {doc.readTimeMinutes} min read
            </>
          ) : null}{" "}
          · {doc.displayDate}
        </p>
        <h1 className="mt-4 font-display text-h1 leading-snug text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
          {doc.title}
        </h1>
        <p className="mt-4 font-body text-label text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
          By {doc.author}
        </p>
      </div>

      {coverUrl ? (
        <div className="mx-auto mt-10 max-w-[900px] px-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)]">
            <ConvexStorageImage
              src={coverUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto mt-12 max-w-[720px] px-4 md:px-6">
        <div className="article-prose font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)]">
          {doc.intro.split("\n\n").map((para, i) => (
            <p key={i} className="mb-6 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      </div>

      {doc.sections.map((sec, idx) => {
        const imgUrl = sectionImageUrls[idx];
        return (
          <section
            key={idx}
            className="mx-auto mt-16 max-w-[720px] border-t border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] px-4 pt-16 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] md:px-6"
          >
            {sec.heading ? (
              <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                {sec.heading}
              </h2>
            ) : null}
            <div
              className={`article-prose font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:text-[var(--color-silver)] ${sec.heading ? "mt-6" : ""}`}
            >
              {sec.paragraphs.map((p, j) => (
                <p key={j} className="mb-6 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
            {imgUrl ? (
              <figure className="mt-10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)]">
                  <ConvexStorageImage
                    src={imgUrl}
                    alt={sec.imageCaption ?? ""}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                {sec.imageCaption ? (
                  <figcaption className="mt-3 text-center font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
                    {sec.imageCaption}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}
          </section>
        );
      })}

      <div className="mx-auto mt-16 max-w-container px-4 text-center md:px-8">
        <Link
          href="/blog"
          className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]"
        >
          ← Back to blog
        </Link>
      </div>
    </article>
  );
}
