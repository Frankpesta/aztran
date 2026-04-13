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
      <section className="relative overflow-hidden bg-[var(--color-navy)] text-[var(--color-white)]">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-navy)] via-[color-mix(in_srgb,var(--color-navy)_90%,black)] to-[color-mix(in_srgb,var(--color-navy)_72%,black)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-[color-mix(in_srgb,var(--color-cyan)_14%,transparent)] to-[color-mix(in_srgb,var(--color-cyan)_8%,transparent)] opacity-70 mix-blend-screen"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-container flex-col px-4 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32">
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
        </div>
      </section>

      <article className="border-b border-[color-mix(in_srgb,var(--color-silver)_55%,transparent)] bg-[var(--color-white)] py-section dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[var(--color-navy)]">
        <div className="mx-auto max-w-container px-4 md:px-8">
          <div className="mx-auto max-w-3xl space-y-5 border-b border-[color-mix(in_srgb,var(--color-silver)_50%,transparent)] pb-12 font-body text-[1.0625rem] leading-[1.75] text-[color-mix(in_srgb,var(--color-navy)_88%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:text-[var(--color-silver)] md:text-[1.125rem] md:leading-[1.8] lg:pb-16">
            <p className="font-medium text-[color-mix(in_srgb,var(--color-navy)_92%,transparent)] dark:text-[var(--color-offwhite)]">
              {page.lead}
            </p>
            {page.introBeforeServices?.map((para, i) => (
              <p key={`intro-${i}`}>{para}</p>
            ))}
          </div>

          <div className="grid gap-12 pt-12 lg:grid-cols-[1fr_minmax(260px,320px)] lg:gap-16 lg:pt-16">
            <div className="space-y-12">
              {page.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-display text-h2 font-bold tracking-[-0.02em] text-[var(--color-navy)] dark:text-[var(--color-offwhite)]">
                    {section.title}
                  </h2>
                  {section.imageSrc ? (
                    <div className="relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-silver)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_90%,var(--color-white))] shadow-[0_20px_50px_-36px_color-mix(in_srgb,var(--color-navy)_22%,transparent)] dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_92%,black)]">
                      <Image
                        src={section.imageSrc}
                        alt={section.imageAlt ?? section.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 640px, 100vw"
                      />
                    </div>
                  ) : null}
                  <div className="mt-4 space-y-4 font-body text-body leading-relaxed text-[color-mix(in_srgb,var(--color-navy)_78%,transparent)] dark:text-[var(--color-silver)]">
                    {section.paragraphs?.map((p, i) => (
                      <p key={`${section.title}-p-${i}`}>{p}</p>
                    ))}
                    {section.bullets && section.bullets.length > 0 ? (
                      <ul className="list-none space-y-3 pl-0.5">
                        {section.bullets.map((item) => (
                          <li
                            key={`${section.title}-${item}`}
                            className="flex gap-3"
                          >
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--color-cyan)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
            <aside className="h-fit rounded-2xl border border-[color-mix(in_srgb,var(--color-silver)_55%,transparent)] bg-[color-mix(in_srgb,var(--color-offwhite)_80%,var(--color-white))] p-6 dark:border-[color-mix(in_srgb,var(--color-silver)_22%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)] md:sticky md:top-28">
              <p className="font-body text-label uppercase tracking-[0.18em] text-[var(--color-cyan)]">
                {page.capabilitiesHeading ?? "Capabilities"}
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
