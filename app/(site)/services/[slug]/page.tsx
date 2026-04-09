import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactElement } from "react";
import { ChevronRight } from "lucide-react";
import { ContactCTABand } from "@/components/sections/ContactCTABand";
import {
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/lib/services";
import { cn } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams(): { slug: string }[] {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service" };
  }
  return {
    title: service.page.metaTitle,
    description: service.page.metaDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps): Promise<ReactElement> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }
  const { page } = service;

  return (
    <>
      <section className="relative min-h-[48vh] overflow-hidden bg-[var(--color-navy)] text-[var(--color-white)]">
        <div className="absolute inset-0">
          <Image
            src={service.imageSrc}
            alt={service.imageAlt}
            fill
            className="object-cover opacity-35"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/80 to-[var(--color-navy)]/55" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/15 to-transparent mix-blend-screen" />
        </div>
        <div className="relative mx-auto flex min-h-[48vh] max-w-container flex-col justify-end px-4 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32">
          <nav
            className="mb-8 font-body text-caption uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-silver)_88%,transparent)]"
            aria-label="Breadcrumb"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-[var(--color-cyan)]">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-3.5 opacity-60" aria-hidden />
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-[var(--color-cyan)]"
                >
                  Services
                </Link>
              </li>
              <ChevronRight className="size-3.5 opacity-60" aria-hidden />
              <li className="text-[var(--color-cyan)]">{page.headline}</li>
            </ol>
          </nav>
          <p className="font-body text-label uppercase tracking-[0.22em] text-[var(--color-cyan)]">
            {page.heroEyebrow}
          </p>
          <h1
            className={cn(
              "mt-4 max-w-4xl font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.12] tracking-tight",
              service.slug === "global-markets-trading" && "text-[var(--color-cyan)]",
              service.slug !== "global-markets-trading" && "text-[var(--color-white)]",
            )}
          >
            {page.headline}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-silver)_95%,transparent)] md:text-base">
            {page.lead}
          </p>
        </div>
      </section>

      <article className="border-b border-[color-mix(in_srgb,var(--color-silver)_55%,transparent)] bg-[var(--color-white)] py-section dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[var(--color-navy)]">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(260px,320px)] lg:gap-16">
            <div className="space-y-12">
              {page.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-display text-h3 text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_78%,transparent)] dark:text-[var(--color-silver)]">
                    {section.paragraphs.map((p, i) => (
                      <p key={`${section.title}-${i}`}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <aside className="h-fit rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_55%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_80%,var(--color-white))] p-6 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)] md:sticky md:top-28">
              <p className="font-body text-label uppercase tracking-[0.18em] text-[var(--color-cyan)]">
                Capabilities
              </p>
              <ul className="mt-4 space-y-3 font-body text-body text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                {page.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] pb-3 last:border-0 last:pb-0 dark:border-[color-mix(in_srgb,var(--color-silver)_18%,transparent)]"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-[var(--color-navy)] px-4 py-3 font-body text-label uppercase tracking-wide text-[var(--color-white)] transition-[background,transform] hover:bg-[color-mix(in_srgb,var(--color-navy)_88%,var(--color-cyan))] dark:bg-[var(--color-cyan)] dark:text-[var(--color-navy)] dark:hover:bg-[color-mix(in_srgb,var(--color-cyan)_92%,white)]"
              >
                Discuss this service
              </Link>
            </aside>
          </div>

          <p className="mt-16 font-body text-body text-[color-mix(in_srgb,var(--color-navy)_65%,transparent)] dark:text-[var(--color-silver)]">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-[var(--color-cyan)] transition-[gap,color] hover:gap-2"
            >
              ← All services
            </Link>
          </p>
        </div>
      </article>

      <ContactCTABand />
    </>
  );
}
