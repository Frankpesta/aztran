import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import { ConvexStorageImage } from "@/components/ui/ConvexStorageImage";
import { InsightCard } from "@/components/ui/InsightCard";
import { serverFetchQuery } from "@/lib/server-convex-query";

type PageProps = { params: Promise<{ slug: string }> };

export const runtime = "nodejs";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await serverFetchQuery(api.insights.getAllInsightSlugs);
    return slugs.map((slug: string) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await serverFetchQuery(api.insights.getInsightBySlug, { slug });
  if (!doc) {
    return { title: "Insight" };
  }
  const title = doc.seoTitle ?? doc.title;
  const description = doc.seoDescription ?? doc.summary;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function InsightArticlePage({
  params,
}: PageProps): Promise<ReactElement> {
  const { slug } = await params;
  const doc = await serverFetchQuery(api.insights.getInsightBySlug, { slug });
  if (!doc) {
    notFound();
  }

  let related: Doc<"insights">[] = [];
  try {
    const byCat = await serverFetchQuery(api.insights.getInsightsByCategory, {
      category: doc.category,
    });
    related = (byCat as Doc<"insights">[])
      .filter((x: Doc<"insights">) => x._id !== doc._id)
      .slice(0, 3);
  } catch {
    related = [];
  }

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

  let pdfUrl: string | null = null;
  if (doc.pdfStorageId) {
    try {
      pdfUrl = await serverFetchQuery(api.storage.getFileUrl, {
        storageId: doc.pdfStorageId,
      });
    } catch {
      pdfUrl = null;
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.title,
    datePublished: doc.referenceDate,
    author: { "@type": "Organization", name: "Aztran Global Investments" },
    articleSection: doc.category,
    keywords: doc.tags.join(", "),
  };

  return (
    <article className="pb-section pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative mx-auto max-w-container px-4 md:px-8">
        <div className="pointer-events-none absolute -right-20 -top-20 size-[420px] rounded-full bg-[color-mix(in_srgb,var(--color-cyan)_08%,transparent)] blur-3xl dark:bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)]" />
      </div>

      <div className="mx-auto max-w-[760px] px-4 md:px-6">
        <p className="font-body text-caption uppercase tracking-[0.2em] text-[var(--color-cyan)]">
          {doc.category}
          {doc.readTimeMinutes ? (
            <span className="text-[color-mix(in_srgb,var(--color-navy)_58%,transparent)] dark:text-[var(--color-silver)]">
              {" "}
              · {doc.readTimeMinutes} min read
            </span>
          ) : null}
          <span className="text-[color-mix(in_srgb,var(--color-navy)_58%,transparent)] dark:text-[var(--color-silver)]">
            {" "}
            · {doc.displayDate}
          </span>
        </p>
        <h1 className="mt-4 font-display text-h1 leading-snug text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
          {doc.title}
        </h1>
        {doc.sources.length > 0 ? (
          <p className="mt-3 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
            Sources: {doc.sources.join(" · ")}
          </p>
        ) : null}
      </div>

      {coverUrl ? (
        <div className="mx-auto mt-10 max-w-[900px] px-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_92%,var(--color-white))] shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--color-navy)_35%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_94%,black)]">
            <ConvexStorageImage
              src={coverUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-contain object-center"
              priority
            />
          </div>
        </div>
      ) : null}

      {doc.metrics && doc.metrics.length > 0 ? (
        <div className="mx-auto mt-14 max-w-[900px] px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doc.metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[color-mix(in_srgb,var(--color-cyan)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-cyan)_06%,transparent)] p-6 dark:bg-[color-mix(in_srgb,var(--color-cyan)_08%,transparent)]"
              >
                <p className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]">
                  {m.label}
                </p>
                {m.yoyValue ? (
                  <p className="mt-3 font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                    {m.yoyValue}
                  </p>
                ) : null}
                {m.yoyContext ? (
                  <p className="mt-1 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
                    {m.yoyContext}
                  </p>
                ) : null}
                {m.momValue ? (
                  <p className="mt-4 font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                    {m.momValue}{" "}
                    <span className="font-body text-caption font-normal text-[color-mix(in_srgb,var(--color-navy)_58%,transparent)] dark:text-[var(--color-silver)]">
                      MoM
                    </span>
                  </p>
                ) : null}
                {m.momContext ? (
                  <p className="mt-1 font-body text-caption text-[color-mix(in_srgb,var(--color-navy)_62%,transparent)] dark:text-[var(--color-silver)]">
                    {m.momContext}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mx-auto mt-14 max-w-[720px] space-y-12 px-4 md:px-6">
        {doc.sections.map((sec, idx) => (
          <section key={idx} className="border-t border-[color-mix(in_srgb,var(--color-silver)_40%,transparent)] pt-10 first:border-t-0 first:pt-0 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)]">
            {sec.heading.trim() ? (
              <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                {sec.heading}
              </h2>
            ) : null}
            <ul
              className={`list-none space-y-4 ${idx > 0 || sec.heading.trim() ? "mt-6" : ""}`}
            >
              {sec.bullets.map((b, j) => (
                <li
                  key={j}
                  className="relative pl-6 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-[var(--color-cyan)] dark:text-[var(--color-silver)]"
                >
                  {b}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {pdfUrl ? (
        <div className="mx-auto mt-14 max-w-[720px] px-4 md:px-6">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-cyan)] bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] px-5 py-3 font-body text-label uppercase tracking-wide text-[var(--color-navy)] transition-colors hover:bg-[var(--color-cyan)] dark:text-[var(--color-offwhite)]"
          >
            Download PDF{doc.pdfFileName ? `: ${doc.pdfFileName}` : ""}
          </a>
        </div>
      ) : null}

      {related.length > 0 ? (
        <div className="mx-auto mt-20 max-w-container border-t border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] px-4 pt-16 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] md:px-8">
          <h2 className="font-display text-h2 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
            Related insights
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r: Doc<"insights">) => (
              <InsightCard key={r._id} insight={r} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/insights"
              className="font-body text-label uppercase tracking-wide text-[var(--color-cyan)]"
            >
              Back to Insights
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}
